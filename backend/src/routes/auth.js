const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { protect, verifyRefreshToken } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');
const { catchAsync, UnauthorizedError, ValidationError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const router = express.Router();

// Helper function to generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' }
  );

  return { accessToken, refreshToken };
};

// Helper function to send token response
const sendTokenResponse = (user, statusCode, res) => {
  const tokens = generateTokens(user._id);
  
  // Save refresh token to user
  user.refreshToken = tokens.refreshToken;
  user.lastLogin = new Date();
  user.save({ validateBeforeSave: false });

  // Remove sensitive data from response
  const userResponse = user.getPublicProfile();

  res.status(statusCode).json({
    success: true,
    message: 'Authentication successful',
    data: {
      user: userResponse,
      tokens
    }
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validate(schemas.register), catchAsync(async (req, res) => {
  const { email, password, role, profile } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ValidationError('User with this email already exists');
  }

  // Create new user
  const user = await User.create({
    email,
    password,
    role: role || 'buyer',
    profile: {
      ...profile,
      fullName: profile.fullName,
      country: profile.country || 'UAE'
    }
  });

  logger.info(`New user registered: ${email}, role: ${role || 'buyer'}`);

  sendTokenResponse(user, 201, res);
}));

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validate(schemas.login), catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Find user with password
  const user = await User.findByEmailWithPassword(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new UnauthorizedError('Invalid email or password');
  }

  if (!user.profile.isActive) {
    throw new UnauthorizedError('Account is deactivated. Please contact support.');
  }

  logger.info(`User logged in: ${email}`);

  sendTokenResponse(user, 200, res);
}));

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', validate(schemas.verifyEmail), verifyRefreshToken, catchAsync(async (req, res) => {
  const user = req.user;
  const tokens = generateTokens(user._id);

  // Update refresh token
  user.refreshToken = tokens.refreshToken;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      tokens
    }
  });
}));

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, catchAsync(async (req, res) => {
  // Remove refresh token from user
  req.user.refreshToken = undefined;
  await req.user.save({ validateBeforeSave: false });

  logger.info(`User logged out: ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
}));

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  res.status(200).json({
    success: true,
    data: {
      user: user.getPublicProfile()
    }
  });
}));

// @route   PUT /api/auth/me
// @desc    Update current user profile
// @access  Private
router.put('/me', protect, validate(schemas.updateProfile), catchAsync(async (req, res) => {
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

  logger.info(`User profile updated: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: user.getPublicProfile()
    }
  });
}));

// @route   POST /api/auth/change-password
// @desc    Change user password
// @access  Private
router.post('/change-password', protect, validate(schemas.changePassword), catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await User.findById(req.user._id).select('+password');
  
  // Check current password
  if (!(await user.comparePassword(currentPassword))) {
    throw new UnauthorizedError('Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  logger.info(`Password changed for user: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
}));

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', validate(schemas.requestPasswordReset), catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal that user doesn't exist
    return res.status(200).json({
      success: true,
      message: 'If an account with that email exists, a password reset email has been sent.'
    });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = resetTokenExpiry;
  await user.save({ validateBeforeSave: false });

  // TODO: Send email with reset token
  logger.info(`Password reset requested for: ${email}`);

  res.status(200).json({
    success: true,
    message: 'If an account with that email exists, a password reset email has been sent.'
  });
}));

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', validate(schemas.resetPassword), catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;

  // Hash token and compare with stored token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new ValidationError('Token is invalid or has expired');
  }

  // Set new password
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  logger.info(`Password reset completed for: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Password reset successfully'
  });
}));

// @route   GET /api/auth/verify-email/:token
// @desc    Verify email address
// @access  Public
router.get('/verify-email/:token', catchAsync(async (req, res) => {
  const { token } = req.params;

  // Hash token and compare
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new ValidationError('Verification token is invalid or has expired');
  }

  // Verify email
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  logger.info(`Email verified for: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Email verified successfully'
  });
}));

module.exports = router;
