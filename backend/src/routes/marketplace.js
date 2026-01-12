const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');
const { catchAsync, NotFoundError } = require('../utils/errorHandler');
const Transaction = require('../models/Transaction');
const Project = require('../models/Project');

const router = express.Router();

// @route   GET /api/marketplace/credits
// @desc    Get available carbon credits for marketplace
// @access  Public
router.get('/credits', validate(schemas.projectFilters, 'query'), catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    projectType,
    emirate,
    minPrice,
    maxPrice,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter for available credits
  const filter = {
    status: 'active',
    availableCredits: { $gt: 0 }
  };
  
  if (projectType) filter.projectType = projectType;
  if (emirate) filter['location.emirate'] = emirate;
  
  // Price range filter
  if (minPrice || maxPrice) {
    filter['pricing.USD'] = {};
    if (minPrice) filter['pricing.USD'].$gte = parseFloat(minPrice);
    if (maxPrice) filter['pricing.USD'].$lte = parseFloat(maxPrice);
  }

  // Build sort
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const projects = await Project.find(filter)
    .populate('sellerId', 'email profile.fullName profile.avatar')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort(sort);

  const total = await Project.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      credits: projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @route   POST /api/marketplace/orders
// @desc    Create a new order (cart)
// @access  Private
router.post('/orders', protect, validate(schemas.createTransaction), catchAsync(async (req, res) => {
  const { projectId, credits, currency, paymentMethod } = req.body;

  // Verify project exists and has enough credits
  const project = await Project.findById(projectId);
  if (!project) {
    throw new NotFoundError('Project');
  }

  const totalCreditsRequested = credits.reduce((sum, credit) => sum + credit.amount, 0);
  
  if (project.availableCredits < totalCreditsRequested) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient credits available'
    });
  }

  // Calculate total amount
  const totalAmount = credits.reduce((sum, credit) => {
    return sum + (credit.amount * credit.pricePerCredit);
  }, 0);

  // Create transaction
  const transaction = await Transaction.create({
    buyerId: req.user._id,
    sellerId: project.sellerId,
    projectId,
    credits,
    totalAmount,
    currency,
    paymentMethod,
    status: 'pending'
  });

  // Reserve credits
  await Project.findByIdAndUpdate(projectId, {
    $inc: { availableCredits: -totalCreditsRequested }
  });

  const populatedTransaction = await Transaction.findById(transaction._id)
    .populate('buyerId', 'email profile.fullName')
    .populate('sellerId', 'email profile.fullName')
    .populate('projectId', 'projectName projectType');

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: {
      transaction: populatedTransaction
    }
  });
}));

// @route   GET /api/marketplace/orders
// @desc    Get user's orders
// @access  Private
router.get('/orders', protect, validate(schemas.transactionFilters, 'query'), catchAsync(async (req, res) => {
  const { page = 1, limit = 10, status, startDate, endDate } = req.query;

  const filter = { buyerId: req.user._id };
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  const transactions = await Transaction.find(filter)
    .populate('buyerId', 'email profile.fullName')
    .populate('sellerId', 'email profile.fullName')
    .populate('projectId', 'projectName projectType location.emirate')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Transaction.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @route   GET /api/marketplace/orders/:id
// @desc    Get specific order details
// @access  Private
router.get('/orders/:id', protect, catchAsync(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id)
    .populate('buyerId', 'email profile.fullName')
    .populate('sellerId', 'email profile.fullName')
    .populate('projectId', 'projectName projectType location.emirate description');

  if (!transaction) {
    throw new NotFoundError('Transaction');
  }

  // Check if user is buyer or seller
  if (transaction.buyerId._id.toString() !== req.user._id.toString() && 
      transaction.sellerId._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      transaction
    }
  });
}));

// @route   POST /api/marketplace/transactions/:id/complete
// @desc    Complete transaction (after payment)
// @access  Private
router.post('/transactions/:id/complete', protect, catchAsync(async (req, res) => {
  const { paymentDetails } = req.body;

  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    throw new NotFoundError('Transaction');
  }

  // Verify transaction belongs to user
  if (transaction.buyerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  // Update transaction status
  await transaction.updateStatus('completed', 'Payment completed', req.user._id);
  
  // Update payment details
  transaction.paymentDetails = {
    ...transaction.paymentDetails,
    ...paymentDetails,
    paidAt: new Date()
  };

  await transaction.save();

  res.status(200).json({
    success: true,
    message: 'Transaction completed successfully',
    data: {
      transaction
    }
  });
}));

// @route   GET /api/marketplace/stats
// @desc    Get marketplace statistics
// @access  Public
router.get('/stats', catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  
  const dateRange = {};
  if (startDate) dateRange.startDate = new Date(startDate);
  if (endDate) dateRange.endDate = new Date(endDate);

  const stats = await Transaction.getTransactionStats(dateRange);

  res.status(200).json({
    success: true,
    data: {
      stats
    }
  });
}));

// Seller routes
router.use('/seller', protect, authorize('seller'));

// @route   GET /api/marketplace/seller/transactions
// @desc    Get seller's transactions
// @access  Private (Seller)
router.get('/seller/transactions', protect, validate(schemas.transactionFilters, 'query'), catchAsync(async (req, res) => {
  const { page = 1, limit = 10, status, startDate, endDate } = req.query;

  const transactions = await Transaction.getUserTransactions(req.user._id, 'seller');

  // Apply filters
  let filteredTransactions = transactions;
  if (status) {
    filteredTransactions = filteredTransactions.filter(t => t.status === status);
  }
  if (startDate || endDate) {
    filteredTransactions = filteredTransactions.filter(t => {
      const transactionDate = new Date(t.createdAt);
      if (startDate && transactionDate < new Date(startDate)) return false;
      if (endDate && transactionDate > new Date(endDate)) return false;
      return true;
    });
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + limit);

  res.status(200).json({
    success: true,
    data: {
      transactions: paginatedTransactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredTransactions.length,
        pages: Math.ceil(filteredTransactions.length / limit)
      }
    }
  });
}));

module.exports = router;
