const mongoose = require('mongoose');

const sponsorshipSchema = new mongoose.Schema({
  sponsorshipId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return `SPN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
  },
  sponsorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sponsor ID is required']
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required']
  },
  sponsorshipType: {
    type: String,
    enum: ['tree_planting', 'mangrove_restoration', 'carbon_offset'],
    default: 'tree_planting'
  },
  treeCount: {
    type: Number,
    required: [true, 'Tree count is required'],
    min: [1, 'Tree count must be at least 1']
  },
  location: {
    emirate: {
      type: String,
      enum: ['abu-dhabi', 'dubai', 'sharjah', 'ajman', 'umm-al-quwain', 'ras-al-khaimah', 'fujairah'],
      required: [true, 'Emirate is required']
    },
    zone: {
      type: String,
      required: [true, 'Zone is required'],
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
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount must be positive']
  },
  currency: {
    type: String,
    enum: ['AED', 'USD', 'USDT'],
    required: true
  },
  pricePerTree: {
    type: Number,
    required: true,
    min: [0, 'Price per tree must be positive']
  },
  estimatedCO2Offset: {
    type: Number, // in kg CO2 per year
    required: true,
    min: [0, 'Estimated CO2 offset must be positive']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    paymentIntentId: String,
    stripeChargeId: String,
    paymentMethod: String,
    paidAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  plantingDetails: {
    plantingDate: Date,
    expectedCompletionDate: Date,
    actualCompletionDate: Date,
    treeSpecies: [String],
    survivalRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    maintenancePeriod: {
      type: Number, // in months
      default: 24
    }
  },
  certificate: {
    certificateId: String,
    certificateUrl: String,
    issuedAt: Date,
    qrCodeUrl: String,
    digitalSignature: String
  },
  updates: [{
    updateDate: {
      type: Date,
      default: Date.now
    },
    title: String,
    description: String,
    images: [String],
    growthStage: {
      type: String,
      enum: ['seedling', 'sapling', 'young_tree', 'mature_tree']
    },
    co2Absorbed: Number,
    survivalRate: Number
  }],
  impactMetrics: {
    totalCO2Absorbed: {
      type: Number,
      default: 0
    },
    biodiversityImpact: String,
    communityBenefits: [String],
    waterConservation: Number
  },
  visibility: {
    isPublic: {
      type: Boolean,
      default: true
    },
    sponsorName: {
      type: String,
      default: 'Anonymous'
    },
    displayMessage: String,
    socialMediaSharing: {
      type: Boolean,
      default: false
    }
  },
  renewal: {
    isRecurring: {
      type: Boolean,
      default: false
    },
    renewalPeriod: {
      type: String,
      enum: ['monthly', 'quarterly', 'annually']
    },
    nextRenewalDate: Date,
    autoRenew: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
sponsorshipSchema.index({ sponsorId: 1 });
sponsorshipSchema.index({ projectId: 1 });
sponsorshipSchema.index({ status: 1 });
sponsorshipSchema.index({ 'location.emirate': 1 });
sponsorshipSchema.index({ createdAt: -1 });

// Virtual for sponsorship duration
sponsorshipSchema.virtual('sponsorshipDuration').get(function() {
  if (!this.plantingDetails.actualCompletionDate) return null;
  const now = new Date();
  const completion = this.plantingDetails.actualCompletionDate;
  return Math.floor((now - completion) / (1000 * 60 * 60 * 24)); // days
});

// Virtual for total CO2 absorbed to date
sponsorshipSchema.virtual('totalCO2ToDate').get(function() {
  return this.updates.reduce((total, update) => total + (update.co2Absorbed || 0), 0);
});

// Pre-save middleware to calculate estimated CO2 offset
sponsorshipSchema.pre('save', function(next) {
  if (this.isModified('treeCount') || this.isModified('treeSpecies')) {
    // Average CO2 absorption per tree per year (kg)
    const co2PerTree = {
      'mangrove': 25,
      'date_palm': 20,
      'ghaf': 15,
      'neem': 18,
      'sidr': 22
    };
    
    let avgCO2PerTree = 20; // default
    if (this.plantingDetails.treeSpecies && this.plantingDetails.treeSpecies.length > 0) {
      const totalCO2 = this.plantingDetails.treeSpecies.reduce((sum, species) => {
        return sum + (co2PerTree[species] || avgCO2PerTree);
      }, 0);
      avgCO2PerTree = totalCO2 / this.plantingDetails.treeSpecies.length;
    }
    
    this.estimatedCO2Offset = this.treeCount * avgCO2PerTree;
  }
  next();
});

// Instance method to add update
sponsorshipSchema.methods.addUpdate = function(updateData) {
  this.updates.push({
    ...updateData,
    updateDate: new Date()
  });
  return this.save();
};

// Instance method to generate certificate
sponsorshipSchema.methods.generateCertificate = function(certificateData) {
  this.certificate = {
    certificateId: certificateData.certificateId || `CERT${Date.now()}`,
    certificateUrl: certificateData.certificateUrl,
    issuedAt: new Date(),
    qrCodeUrl: certificateData.qrCodeUrl,
    digitalSignature: certificateData.digitalSignature
  };
  return this.save();
};

// Static method to get sponsor statistics
sponsorshipSchema.statics.getSponsorStats = async function(sponsorId) {
  const stats = await this.aggregate([
    { $match: { sponsorId: new mongoose.Types.ObjectId(sponsorId) } },
    {
      $group: {
        _id: null,
        totalSponsorships: { $sum: 1 },
        totalTrees: { $sum: '$treeCount' },
        totalAmount: { $sum: '$totalAmount' },
        totalCO2Offset: { $sum: '$estimatedCO2Offset' },
        activeSponsorships: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        },
        completedSponsorships: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        }
      }
    }
  ]);

  return stats[0] || {
    totalSponsorships: 0,
    totalTrees: 0,
    totalAmount: 0,
    totalCO2Offset: 0,
    activeSponsorships: 0,
    completedSponsorships: 0
  };
};

// Static method to get emirate-wise statistics
sponsorshipSchema.statics.getEmirateStats = async function() {
  const stats = await this.aggregate([
    { $match: { status: { $in: ['active', 'completed'] } } },
    {
      $group: {
        _id: '$location.emirate',
        totalTrees: { $sum: '$treeCount' },
        totalAmount: { $sum: '$totalAmount' },
        totalCO2Offset: { $sum: '$estimatedCO2Offset' },
        sponsorshipCount: { $sum: 1 }
      }
    },
    { $sort: { totalTrees: -1 } }
  ]);

  return stats;
};

module.exports = mongoose.model('Sponsorship', sponsorshipSchema);
