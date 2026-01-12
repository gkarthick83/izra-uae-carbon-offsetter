const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');
const { catchAsync, NotFoundError } = require('../utils/errorHandler');
const Sponsorship = require('../models/Sponsorship');
const Project = require('../models/Project');

const router = express.Router();

// @route   POST /api/sponsorships
// @desc    Create new sponsorship
// @access  Private (Sponsor only)
router.post('/', protect, authorize('sponsor'), validate(schemas.createSponsorship), catchAsync(async (req, res) => {
  const { projectId, sponsorshipType, treeCount, location, totalAmount, currency } = req.body;

  // Verify project exists
  const project = await Project.findById(projectId);
  if (!project) {
    throw new NotFoundError('Project');
  }

  // Calculate price per tree
  const pricePerTree = totalAmount / treeCount;

  // Estimate CO2 offset (average 20kg per tree per year)
  const estimatedCO2Offset = treeCount * 20;

  const sponsorship = await Sponsorship.create({
    sponsorId: req.user._id,
    projectId,
    sponsorshipType,
    treeCount,
    location,
    totalAmount,
    currency,
    pricePerTree,
    estimatedCO2Offset
  });

  const populatedSponsorship = await Sponsorship.findById(sponsorship._id)
    .populate('sponsorId', 'email profile.fullName profile.avatar')
    .populate('projectId', 'projectName projectType location.emirate');

  res.status(201).json({
    success: true,
    message: 'Sponsorship created successfully',
    data: {
      sponsorship: populatedSponsorship
    }
  });
}));

// @route   GET /api/sponsorships
// @desc    Get user's sponsorships
// @access  Private (Sponsor)
router.get('/', protect, authorize('sponsor'), catchAsync(async (req, res) => {
  const { page = 1, limit = 10, status, emirate } = req.query;

  const filter = { sponsorId: req.user._id };
  if (status) filter.status = status;
  if (emirate) filter['location.emirate'] = emirate;

  const sponsorships = await Sponsorship.find(filter)
    .populate('projectId', 'projectName projectType location.emirate')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Sponsorship.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      sponsorships,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @route   GET /api/sponsorships/:id
// @desc    Get specific sponsorship details
// @access  Private
router.get('/:id', protect, catchAsync(async (req, res) => {
  const sponsorship = await Sponsorship.findById(req.params.id)
    .populate('sponsorId', 'email profile.fullName profile.avatar')
    .populate('projectId', 'projectName projectType location.emirate description images');

  if (!sponsorship) {
    throw new NotFoundError('Sponsorship');
  }

  // Check if user is sponsor or admin
  if (sponsorship.sponsorId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      sponsorship
    }
  });
}));

// @route   POST /api/sponsorships/:id/updates
// @desc    Add update to sponsorship
// @access  Private (Admin or Project Owner)
router.post('/:id/updates', protect, catchAsync(async (req, res) => {
  const { title, description, images, growthStage, co2Absorbed, survivalRate } = req.body;

  const sponsorship = await Sponsorship.findById(req.params.id);
  if (!sponsorship) {
    throw new NotFoundError('Sponsorship');
  }

  // TODO: Verify user is admin or project owner
  const updateData = {
    title,
    description,
    images,
    growthStage,
    co2Absorbed,
    survivalRate
  };

  await sponsorship.addUpdate(updateData);

  res.status(200).json({
    success: true,
    message: 'Update added successfully',
    data: {
      sponsorship
    }
  });
}));

// @route   POST /api/sponsorships/:id/certificate
// @desc    Generate certificate for sponsorship
// @access  Private (Admin)
router.post('/:id/certificate', protect, authorize('admin'), catchAsync(async (req, res) => {
  const { certificateUrl, qrCodeUrl, digitalSignature } = req.body;

  const sponsorship = await Sponsorship.findById(req.params.id);
  if (!sponsorship) {
    throw new NotFoundError('Sponsorship');
  }

  const certificateData = {
    certificateId: `CERT${Date.now()}`,
    certificateUrl,
    qrCodeUrl,
    digitalSignature
  };

  await sponsorship.generateCertificate(certificateData);

  res.status(200).json({
    success: true,
    message: 'Certificate generated successfully',
    data: {
      sponsorship
    }
  });
}));

// @route   GET /api/sponsorships/stats/user
// @desc    Get sponsor statistics
// @access  Private (Sponsor)
router.get('/stats/user', protect, authorize('sponsor'), catchAsync(async (req, res) => {
  const stats = await Sponsorship.getSponsorStats(req.user._id);

  res.status(200).json({
    success: true,
    data: {
      stats
    }
  });
}));

// @route   GET /api/sponsorships/stats/emirates
// @desc    Get emirate-wise sponsorship statistics
// @access  Public
router.get('/stats/emirates', catchAsync(async (req, res) => {
  const stats = await Sponsorship.getEmirateStats();

  res.status(200).json({
    success: true,
    data: {
      stats
    }
  });
}));

// @route   GET /api/sponsorships/public
// @desc    Get public sponsorships (for showcase)
// @access  Public
router.get('/public', catchAsync(async (req, res) => {
  const { page = 1, limit = 10, emirate } = req.query;

  const filter = { 
    'visibility.isPublic': true,
    status: { $in: ['active', 'completed'] }
  };
  if (emirate) filter['location.emirate'] = emirate;

  const sponsorships = await Sponsorship.find(filter)
    .select('sponsorshipId treeCount location estimatedCO2Offset visibility.sponsorName visibility.displayMessage createdAt')
    .populate('sponsorId', 'profile.fullName')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Sponsorship.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      sponsorships,
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
