const express = require('express');
const { protect, authorize, kycRequired } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');
const { catchAsync } = require('../utils/errorHandler');
const User = require('../models/User');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/users/profile
// @desc    Get user profile with full details
// @access  Private
router.get('/profile', catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  res.status(200).json({
    success: true,
    data: {
      user: user.getPublicProfile()
    }
  });
}));

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', validate(schemas.updateProfile), catchAsync(async (req, res) => {
  const { profile } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { 
      $set: { 
        'profile.fullName': profile.fullName,
        'profile.phone': profile.phone,
        'profile.country': profile.country,
        'profile.avatar': profile.avatar
      }
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: user.getPublicProfile()
    }
  });
}));

// @route   POST /api/users/kyc-documents
// @desc    Upload KYC documents
// @access  Private
router.post('/kyc-documents', kycRequired, validate(schemas.uploadKYCDocuments), catchAsync(async (req, res) => {
  const { documentType, description } = req.body;
  
  // TODO: Handle file upload
  const documentUrl = `https://example.com/documents/${Date.now()}.pdf`;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { 
      $push: { 
        'profile.kycDocuments': {
          type: documentType,
          url: documentUrl,
          description,
          uploadedAt: new Date()
        }
      }
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'KYC document uploaded successfully',
    data: {
      user: user.getPublicProfile()
    }
  });
}));

// @route   GET /api/users/kyc-status
// @desc    Get KYC verification status
// @access  Private
router.get('/kyc-status', catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  res.status(200).json({
    success: true,
    data: {
      kycStatus: user.profile.kycStatus,
      kycDocuments: user.profile.kycDocuments
    }
  });
}));

// Admin routes
router.use(authorize('admin'));

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Admin
router.get('/', catchAsync(async (req, res) => {
  const { page = 1, limit = 10, role, kycStatus } = req.query;
  
  const filter = {};
  if (role) filter.role = role;
  if (kycStatus) filter['profile.kycStatus'] = kycStatus;

  const users = await User.find(filter)
    .select('-password -refreshToken')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @route   PUT /api/users/:id/kyc
// @desc    Update user KYC status (admin only)
// @access  Admin
router.put('/:id/kyc', catchAsync(async (req, res) => {
  const { kycStatus, reason } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { 
      'profile.kycStatus': kycStatus,
      'profile.kycReason': reason
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'KYC status updated successfully',
    data: {
      user: user.getPublicProfile()
    }
  });
}));

module.exports = router;
