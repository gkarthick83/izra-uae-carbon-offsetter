const express = require('express');
const { protect, authorize, kycRequired } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');
const { catchAsync, NotFoundError } = require('../utils/errorHandler');
const Project = require('../models/Project');

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects with filtering
// @access  Public
router.get('/', validate(schemas.projectFilters, 'query'), catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    projectType,
    emirate,
    minPrice,
    maxPrice,
    status = 'active',
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter
  const filter = {};
  if (projectType) filter.projectType = projectType;
  if (emirate) filter['location.emirate'] = emirate;
  if (status) filter.status = status;
  
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
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Public
router.get('/:id', catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('sellerId', 'email profile.fullName profile.avatar profile.phone');

  if (!project) {
    throw new NotFoundError('Project');
  }

  res.status(200).json({
    success: true,
    data: {
      project
    }
  });
}));

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Seller only, KYC required)
router.post('/', protect, authorize('seller'), kycRequired, validate(schemas.createProject), catchAsync(async (req, res) => {
  const projectData = {
    ...req.body,
    sellerId: req.user._id
  };

  const project = await Project.create(projectData);

  const populatedProject = await Project.findById(project._id)
    .populate('sellerId', 'email profile.fullName profile.avatar');

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: {
      project: populatedProject
    }
  });
}));

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Project owner only)
router.put('/:id', protect, validate(schemas.updateProject), catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new NotFoundError('Project');
  }

  // Check ownership or admin
  if (project.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only update your own projects.'
    });
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('sellerId', 'email profile.fullName profile.avatar');

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: {
      project: updatedProject
    }
  });
}));

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Project owner only)
router.delete('/:id', protect, catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new NotFoundError('Project');
  }

  // Check ownership or admin
  if (project.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only delete your own projects.'
    });
  }

  await Project.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  });
}));

// @route   GET /api/projects/marketplace/stats
// @desc    Get marketplace statistics
// @access  Public
router.get('/marketplace/stats', catchAsync(async (req, res) => {
  const stats = await Project.getMarketplaceStats();

  res.status(200).json({
    success: true,
    data: {
      stats
    }
  });
}));

// Admin routes
router.use(authorize('admin'));

// @route   PUT /api/projects/:id/approve
// @desc    Approve project (admin only)
// @access  Admin
router.put('/:id/approve', catchAsync(async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      status: 'approved',
      approvedAt: new Date(),
      approvedBy: req.user._id
    },
    { new: true }
  ).populate('sellerId', 'email profile.fullName');

  if (!project) {
    throw new NotFoundError('Project');
  }

  res.status(200).json({
    success: true,
    message: 'Project approved successfully',
    data: {
      project
    }
  });
}));

module.exports = router;
