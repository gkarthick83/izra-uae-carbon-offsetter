const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller ID is required']
  },
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [200, 'Project name cannot exceed 200 characters']
  },
  projectType: {
    type: String,
    enum: ['mangrove', 'solar', 'afforestation'],
    required: [true, 'Project type is required']
  },
  location: {
    emirate: {
      type: String,
      enum: ['abu-dhabi', 'dubai', 'sharjah', 'ajman', 'umm-al-quwain', 'ras-al-khaimah', 'fujairah'],
      required: [true, 'Emirate is required']
    },
    region: {
      type: String,
      required: [true, 'Region is required'],
      trim: true
    },
    coordinates: {
      latitude: {
        type: Number,
        min: -90,
        max: 90
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180
      }
    }
  },
  verraRegistryId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true // Allows multiple null values
  },
  totalCredits: {
    type: Number,
    required: [true, 'Total credits is required'],
    min: [0, 'Total credits must be positive']
  },
  availableCredits: {
    type: Number,
    required: true,
    min: [0, 'Available credits cannot be negative']
  },
  pricing: {
    AED: {
      type: Number,
      required: [true, 'AED price is required'],
      min: [0, 'Price must be positive']
    },
    USD: {
      type: Number,
      required: [true, 'USD price is required'],
      min: [0, 'Price must be positive']
    },
    USDT: {
      type: Number,
      required: [true, 'USDT price is required'],
      min: [0, 'Price must be positive']
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  documents: [{
    type: String, // URLs to verification documents
    name: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  images: [{
    type: String, // URLs to project images
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'active', 'completed', 'suspended'],
    default: 'pending'
  },
  approvedAt: {
    type: Date,
    default: null
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  projectedAnnualCO2: {
    type: Number,
    min: [0, 'Projected CO2 reduction must be positive']
  },
  projectDuration: {
    type: Number, // in years
    min: [1, 'Project duration must be at least 1 year']
  },
  certifications: [{
    name: String,
    issuer: String,
    issueDate: Date,
    expiryDate: Date,
    certificateUrl: String
  }],
  monitoringReports: [{
    reportDate: Date,
    co2Reduced: Number,
    reportUrl: String,
    verified: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
projectSchema.index({ sellerId: 1 });
projectSchema.index({ projectType: 1 });
projectSchema.index({ 'location.emirate': 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ availableCredits: -1 });
projectSchema.index({ 'pricing.USD': 1 });
projectSchema.index({ createdAt: -1 });

// Virtual for sold credits
projectSchema.virtual('soldCredits').get(function() {
  return this.totalCredits - this.availableCredits;
});

// Virtual for percentage sold
projectSchema.virtual('percentageSold').get(function() {
  if (this.totalCredits === 0) return 0;
  return ((this.totalCredits - this.availableCredits) / this.totalCredits) * 100;
});

// Pre-save middleware to ensure availableCredits doesn't exceed totalCredits
projectSchema.pre('save', function(next) {
  if (this.availableCredits > this.totalCredits) {
    this.availableCredits = this.totalCredits;
  }
  next();
});

// Static method to find available projects
projectSchema.statics.findAvailable = function(filters = {}) {
  const query = { 
    status: 'active', 
    availableCredits: { $gt: 0 },
    ...filters 
  };
  return this.find(query).populate('sellerId', 'email profile.fullName profile.avatar');
};

// Static method to get marketplace statistics
projectSchema.statics.getMarketplaceStats = async function() {
  const stats = await this.aggregate([
    {
      $match: { status: 'active' }
    },
    {
      $group: {
        _id: null,
        totalProjects: { $sum: 1 },
        totalAvailableCredits: { $sum: '$availableCredits' },
        averagePricePerCredit: { $avg: '$pricing.USD' },
        projectsByType: {
          $push: {
            type: '$projectType',
            credits: '$availableCredits'
          }
        }
      }
    }
  ]);

  return stats[0] || {
    totalProjects: 0,
    totalAvailableCredits: 0,
    averagePricePerCredit: 0,
    projectsByType: []
  };
};

module.exports = mongoose.model('Project', projectSchema);
