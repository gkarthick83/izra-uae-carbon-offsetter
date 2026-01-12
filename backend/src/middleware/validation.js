const Joi = require('joi');
const logger = require('../utils/logger');

// Validation middleware factory
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      
      logger.warn('Validation error:', errorMessage);
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    // Replace the request property with the validated and cleaned data
    req[property] = value;
    next();
  };
};

// Common validation schemas
const schemas = {
  // User registration
  register: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address (like name@example.com)',
      'any.required': 'Email address is required',
      'string.empty': 'Email address is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
      'string.empty': 'Password is required'
    }),
    role: Joi.string().valid('admin', 'seller', 'buyer', 'investor', 'sponsor').default('buyer'),
    profile: Joi.object({
      fullName: Joi.string().min(2).max(100).required().messages({
        'string.min': 'Full name must be at least 2 characters long',
        'string.max': 'Full name cannot exceed 100 characters',
        'any.required': 'Full name is required',
        'string.empty': 'Full name is required'
      }),
      phone: Joi.string().pattern(/^[\+]?[\d\s\-\(\)]{7,20}$/).allow('').optional().messages({
        'string.pattern.base': 'Please provide a valid phone number (like +971 50 123 4567)'
      }),
      country: Joi.string().default('UAE')
    }).required()
  }),

  // User login
  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address (like name@example.com)',
      'any.required': 'Email address is required',
      'string.empty': 'Email address is required'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required'
    })
  }),

  // Update user profile
  updateProfile: Joi.object({
    profile: Joi.object({
      fullName: Joi.string().min(2).max(100),
      phone: Joi.string().pattern(/^[\+]?[\d\s\-\(\)]{7,20}$/).allow('').optional(),
      country: Joi.string(),
      avatar: Joi.string().uri().optional()
    })
  }),

  // Project creation
  createProject: Joi.object({
    projectName: Joi.string().min(2).max(200).required(),
    projectType: Joi.string().valid('mangrove', 'solar', 'afforestation').required(),
    location: Joi.object({
      emirate: Joi.string().valid('abu-dhabi', 'dubai', 'sharjah', 'ajman', 'umm-al-quwain', 'ras-al-khaimah', 'fujairah').required(),
      region: Joi.string().required(),
      coordinates: Joi.object({
        latitude: Joi.number().min(-90).max(90),
        longitude: Joi.number().min(-180).max(180)
      }).optional()
    }).required(),
    verraRegistryId: Joi.string().optional(),
    totalCredits: Joi.number().min(1).required(),
    availableCredits: Joi.number().min(0).required(),
    pricing: Joi.object({
      AED: Joi.number().min(0).required(),
      USD: Joi.number().min(0).required(),
      USDT: Joi.number().min(0).required()
    }).required(),
    description: Joi.string().min(10).max(2000).required(),
    projectedAnnualCO2: Joi.number().min(0).optional(),
    projectDuration: Joi.number().min(1).optional()
  }),

  // Project update
  updateProject: Joi.object({
    projectName: Joi.string().min(2).max(200),
    description: Joi.string().min(10).max(2000),
    totalCredits: Joi.number().min(1),
    availableCredits: Joi.number().min(0),
    pricing: Joi.object({
      AED: Joi.number().min(0),
      USD: Joi.number().min(0),
      USDT: Joi.number().min(0)
    }),
    status: Joi.string().valid('pending', 'approved', 'active', 'completed', 'suspended')
  }),

  // Transaction creation
  createTransaction: Joi.object({
    projectId: Joi.string().required(),
    credits: Joi.array().items(
      Joi.object({
        creditId: Joi.string().required(),
        amount: Joi.number().min(0.001).required(),
        pricePerCredit: Joi.number().min(0).required(),
        currency: Joi.string().valid('AED', 'USD', 'USDT').required()
      })
    ).min(1).required(),
    currency: Joi.string().valid('AED', 'USD', 'USDT').required(),
    paymentMethod: Joi.string().valid('stripe', 'paypal', 'bank_transfer', 'crypto').required()
  }),

  // Sponsorship creation
  createSponsorship: Joi.object({
    projectId: Joi.string().required(),
    sponsorshipType: Joi.string().valid('tree_planting', 'mangrove_restoration', 'carbon_offset').default('tree_planting'),
    treeCount: Joi.number().min(1).required(),
    location: Joi.object({
      emirate: Joi.string().valid('abu-dhabi', 'dubai', 'sharjah', 'ajman', 'umm-al-quwain', 'ras-al-khaimah', 'fujairah').required(),
      zone: Joi.string().required(),
      coordinates: Joi.object({
        latitude: Joi.number().min(-90).max(90),
        longitude: Joi.number().min(-180).max(180)
      }).optional()
    }).required(),
    totalAmount: Joi.number().min(1).required(),
    currency: Joi.string().valid('AED', 'USD', 'USDT').required()
  }),

  // Investment creation
  createInvestment: Joi.object({
    projectId: Joi.string().required(),
    investmentType: Joi.string().valid('equity', 'debt', 'revenue_sharing', 'carbon_credit_future').required(),
    amount: Joi.number().min(1000).required(),
    currency: Joi.string().valid('AED', 'USD', 'USDT').required(),
    expectedReturns: Joi.object({
      annualReturnRate: Joi.number().min(0).required()
    }).required(),
    riskAssessment: Joi.object({
      riskLevel: Joi.string().valid('low', 'medium', 'high', 'very_high').required()
    }).required()
  }),

  // KYC document upload
  uploadKYCDocuments: Joi.object({
    documentType: Joi.string().valid('passport', 'national_id', 'address_proof', 'bank_statement', 'other').required(),
    description: Joi.string().max(500).optional()
  }),

  // Password change
  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required().messages({
      'string.min': 'New password must be at least 6 characters long'
    })
  }),

  // Email verification
  verifyEmail: Joi.object({
    token: Joi.string().required()
  }),

  // Password reset request
  requestPasswordReset: Joi.object({
    email: Joi.string().email().required()
  }),

  // Password reset
  resetPassword: Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  }),

  // Query parameters for filtering
  projectFilters: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    projectType: Joi.string().valid('mangrove', 'solar', 'afforestation'),
    emirate: Joi.string().valid('abu-dhabi', 'dubai', 'sharjah', 'ajman', 'umm-al-quwain', 'ras-al-khaimah', 'fujairah'),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().min(0),
    status: Joi.string().valid('pending', 'approved', 'active', 'completed', 'suspended'),
    sortBy: Joi.string().valid('createdAt', 'price', 'availableCredits', 'projectName').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
  }),

  // Transaction filters
  transactionFilters: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    status: Joi.string().valid('pending', 'processing', 'completed', 'failed', 'refunded', 'disputed'),
    startDate: Joi.date(),
    endDate: Joi.date(),
    currency: Joi.string().valid('AED', 'USD', 'USDT')
  })
};

module.exports = {
  validate,
  schemas
};
