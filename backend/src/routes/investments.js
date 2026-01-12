const express = require('express');
const { protect, authorize, kycRequired } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');
const { catchAsync, NotFoundError } = require('../utils/errorHandler');
const Investment = require('../models/Investment');
const Project = require('../models/Project');

const router = express.Router();

// @route   POST /api/investments
// @desc    Create new investment
// @access  Private (Investor only, KYC required)
router.post('/', protect, authorize('investor'), kycRequired, validate(schemas.createInvestment), catchAsync(async (req, res) => {
  const { 
    projectId, 
    investmentType, 
    amount, 
    currency, 
    expectedReturns,
    riskAssessment,
    equityDetails,
    debtDetails,
    revenueSharing,
    carbonCreditFuture
  } = req.body;

  // Verify project exists and is active
  const project = await Project.findById(projectId);
  if (!project) {
    throw new NotFoundError('Project');
  }

  if (project.status !== 'active') {
    return res.status(400).json({
      success: false,
      message: 'Project is not available for investment'
    });
  }

  const investmentData = {
    investorId: req.user._id,
    projectId,
    investmentType,
    amount,
    currency,
    expectedReturns,
    riskAssessment
  };

  // Add type-specific details
  if (investmentType === 'equity') {
    investmentData.equityDetails = equityDetails;
  } else if (investmentType === 'debt') {
    investmentData.debtDetails = debtDetails;
  } else if (investmentType === 'revenue_sharing') {
    investmentData.revenueSharing = revenueSharing;
  } else if (investmentType === 'carbon_credit_future') {
    investmentData.carbonCreditFuture = carbonCreditFuture;
  }

  const investment = await Investment.create(investmentData);

  const populatedInvestment = await Investment.findById(investment._id)
    .populate('investorId', 'email profile.fullName profile.avatar')
    .populate('projectId', 'projectName projectType location.emirate status');

  res.status(201).json({
    success: true,
    message: 'Investment created successfully',
    data: {
      investment: populatedInvestment
    }
  });
}));

// @route   GET /api/investments
// @desc    Get user's investments
// @access  Private (Investor)
router.get('/', protect, authorize('investor'), catchAsync(async (req, res) => {
  const { page = 1, limit = 10, status, investmentType, riskLevel } = req.query;

  const filter = { investorId: req.user._id };
  if (status) filter.status = status;
  if (investmentType) filter.investmentType = investmentType;
  if (riskLevel) filter['riskAssessment.riskLevel'] = riskLevel;

  const investments = await Investment.find(filter)
    .populate('projectId', 'projectName projectType location.emirate status')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Investment.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      investments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @route   GET /api/investments/portfolio
// @desc    Get investor portfolio summary
// @access  Private (Investor)
router.get('/portfolio', protect, authorize('investor'), catchAsync(async (req, res) => {
  const portfolioData = await Investment.getInvestorPortfolio(req.user._id);

  res.status(200).json({
    success: true,
    data: portfolioData
  });
}));

// @route   GET /api/investments/:id
// @desc    Get specific investment details
// @access  Private
router.get('/:id', protect, catchAsync(async (req, res) => {
  const investment = await Investment.findById(req.params.id)
    .populate('investorId', 'email profile.fullName profile.avatar')
    .populate('projectId', 'projectName projectType location.emirate description images');

  if (!investment) {
    throw new NotFoundError('Investment');
  }

  // Check if user is investor or admin
  if (investment.investorId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      investment
    }
  });
}));

// @route   POST /api/investments/:id/returns
// @desc    Add return payment to investment
// @access  Private (Admin or Project Owner)
router.post('/:id/returns', protect, catchAsync(async (req, res) => {
  const { amount, type, transactionId, returnDate } = req.body;

  const investment = await Investment.findById(req.params.id);
  if (!investment) {
    throw new NotFoundError('Investment');
  }

  // TODO: Verify user is admin or project owner
  const returnData = {
    amount,
    type,
    transactionId,
    returnDate: returnDate || new Date()
  };

  await investment.addReturn(returnData);

  res.status(200).json({
    success: true,
    message: 'Return added successfully',
    data: {
      investment
    }
  });
}));

// @route   PUT /api/investments/:id/status
// @desc    Update investment status
// @access  Private (Admin)
router.put('/:id/status', protect, authorize('admin'), catchAsync(async (req, res) => {
  const { status, reason } = req.body;

  const investment = await Investment.findById(req.params.id);
  if (!investment) {
    throw new NotFoundError('Investment');
  }

  await investment.updateStatus(status, reason);

  res.status(200).json({
    success: true,
    message: 'Investment status updated successfully',
    data: {
      investment
    }
  });
}));

// @route   POST /api/investments/:id/milestones
// @desc    Add milestone to investment
// @access  Private (Admin or Project Owner)
router.post('/:id/milestones', protect, catchAsync(async (req, res) => {
  const { title, description, targetDate, amount } = req.body;

  const investment = await Investment.findById(req.params.id);
  if (!investment) {
    throw new NotFoundError('Investment');
  }

  const milestone = {
    title,
    description,
    targetDate: new Date(targetDate),
    amount,
    status: 'pending'
  };

  investment.milestones.push(milestone);
  await investment.save();

  res.status(200).json({
    success: true,
    message: 'Milestone added successfully',
    data: {
      investment
    }
  });
}));

// @route   GET /api/investments/stats
// @desc    Get investment statistics
// @access  Private (Admin)
router.get('/stats', protect, authorize('admin'), catchAsync(async (req, res) => {
  const { startDate, endDate, investmentType, riskLevel } = req.query;

  const filters = {};
  if (startDate || endDate) {
    filters.createdAt = {};
    if (startDate) filters.createdAt.$gte = new Date(startDate);
    if (endDate) filters.createdAt.$lte = new Date(endDate);
  }
  if (investmentType) filters.investmentType = investmentType;
  if (riskLevel) filters['riskAssessment.riskLevel'] = riskLevel;

  const stats = await Investment.getInvestmentStats(filters);

  res.status(200).json({
    success: true,
    data: {
      stats
    }
  });
}));

// @route   GET /api/investments/opportunities
// @desc    Get available investment opportunities
// @access  Public
router.get('/opportunities', catchAsync(async (req, res) => {
  const { page = 1, limit = 10, projectType, minReturn, maxRisk } = req.query;

  // Find active projects that are open for investment
  const filter = { status: 'active' };
  if (projectType) filter.projectType = projectType;

  const projects = await Project.find(filter)
    .populate('sellerId', 'email profile.fullName')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  // Filter by return and risk criteria if specified
  let filteredProjects = projects;
  if (minReturn) {
    // TODO: Implement expected return calculation
    filteredProjects = filteredProjects.filter(p => true); // Placeholder
  }
  if (maxRisk) {
    // TODO: Implement risk assessment
    filteredProjects = filteredProjects.filter(p => true); // Placeholder
  }

  const total = await Project.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      opportunities: filteredProjects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

module.exports = router;
