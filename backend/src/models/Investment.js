const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  investmentId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return `INV${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
  },
  investorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Investor ID is required']
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required']
  },
  investmentType: {
    type: String,
    enum: ['equity', 'debt', 'revenue_sharing', 'carbon_credit_future'],
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Investment amount is required'],
    min: [1000, 'Minimum investment amount is 1000']
  },
  currency: {
    type: String,
    enum: ['AED', 'USD', 'USDT'],
    required: true
  },
  equityDetails: {
    equityPercentage: {
      type: Number,
      min: [0.1, 'Equity percentage must be at least 0.1%'],
      max: [100, 'Equity percentage cannot exceed 100%']
    },
    votingRights: {
      type: Boolean,
      default: false
    },
    boardSeat: {
      type: Boolean,
      default: false
    },
    liquidationPreference: {
      type: Number,
      default: 1 // 1x preference
    }
  },
  debtDetails: {
    interestRate: {
      type: Number,
      min: [0, 'Interest rate cannot be negative']
    },
    termMonths: {
      type: Number,
      min: [1, 'Term must be at least 1 month']
    },
    repaymentSchedule: {
      type: String,
      enum: ['monthly', 'quarterly', 'bullet', 'amortized'],
      default: 'monthly'
    },
    collateral: String,
    securityType: {
      type: String,
      enum: ['secured', 'unsecured', 'partially_secured']
    }
  },
  revenueSharing: {
    percentage: {
      type: Number,
      min: [0, 'Revenue share percentage cannot be negative'],
      max: [100, 'Revenue share percentage cannot exceed 100%']
    },
    durationMonths: {
      type: Number,
      min: [1, 'Duration must be at least 1 month']
    },
    minimumRevenue: Number,
    capAmount: Number
  },
  carbonCreditFuture: {
    creditsPerYear: Number,
    pricePerCredit: Number,
    contractDuration: Number, // in years
    priceEscalation: {
      type: Number,
      default: 0 // annual percentage increase
    }
  },
  expectedReturns: {
    annualReturnRate: {
      type: Number,
      required: true,
      min: [0, 'Expected return rate cannot be negative']
    },
    totalExpectedReturn: Number,
    paybackPeriodMonths: Number,
    irr: Number // Internal Rate of Return
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partially_paid', 'failed'],
    default: 'pending'
  },
  paymentDetails: {
    paymentIntentId: String,
    stripeChargeId: String,
    paymentMethod: String,
    paidAt: Date,
    partiallyPaidAmount: Number
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'defaulted', 'exited'],
    default: 'pending'
  },
  investmentDate: {
    type: Date,
    default: Date.now
  },
  maturityDate: Date,
  returns: [{
    returnDate: Date,
    amount: Number,
    type: {
      type: String,
      enum: ['interest', 'principal', 'dividend', 'capital_gain', 'revenue_share']
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'reinvested'],
      default: 'pending'
    },
    transactionId: String
  }],
  documents: [{
    type: String, // URL to document
    name: String,
    documentType: {
      type: String,
      enum: ['investment_agreement', 'prospectus', 'due_diligence', 'term_sheet', 'other']
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  milestones: [{
    title: String,
    description: String,
    targetDate: Date,
    completedDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'delayed'],
      default: 'pending'
    },
    amount: Number
  }],
  riskAssessment: {
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'very_high'],
      required: true
    },
    riskFactors: [String],
    mitigationStrategies: [String],
    dueDiligenceScore: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  reporting: {
    frequency: {
      type: String,
      enum: ['monthly', 'quarterly', 'annually'],
      default: 'quarterly'
    },
    lastReportDate: Date,
    nextReportDate: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
investmentSchema.index({ investorId: 1 });
investmentSchema.index({ projectId: 1 });
investmentSchema.index({ status: 1 });
investmentSchema.index({ investmentType: 1 });
investmentSchema.index({ 'riskAssessment.riskLevel': 1 });
investmentSchema.index({ createdAt: -1 });

// Virtual for total returns received
investmentSchema.virtual('totalReturnsReceived').get(function() {
  return this.returns
    .filter(r => r.status === 'paid')
    .reduce((total, r) => total + r.amount, 0);
});

// Virtual for pending returns
investmentSchema.virtual('pendingReturns').get(function() {
  return this.returns
    .filter(r => r.status === 'pending')
    .reduce((total, r) => total + r.amount, 0);
});

// Virtual for ROI percentage
investmentSchema.virtual('roiPercentage').get(function() {
  if (this.amount === 0) return 0;
  return (this.totalReturnsReceived / this.amount) * 100;
});

// Virtual for investment duration
investmentSchema.virtual('investmentDuration').get(function() {
  const start = this.investmentDate;
  const end = this.maturityDate || new Date();
  return Math.floor((end - start) / (1000 * 60 * 60 * 24)); // days
});

// Pre-save middleware to calculate expected returns
investmentSchema.pre('save', function(next) {
  if (this.isModified('amount') || this.isModified('expectedReturns.annualReturnRate')) {
    const annualRate = this.expectedReturns.annualReturnRate / 100;
    const termYears = this.debtDetails?.termMonths / 12 || 5; // default 5 years
    this.expectedReturns.totalExpectedReturn = this.amount * (1 + annualRate * termYears);
    this.expectedReturns.paybackPeriodMonths = Math.ceil(12 / annualRate);
  }
  next();
});

// Instance method to add return
investmentSchema.methods.addReturn = function(returnData) {
  this.returns.push({
    ...returnData,
    returnDate: returnData.returnDate || new Date()
  });
  return this.save();
};

// Instance method to update status
investmentSchema.methods.updateStatus = function(newStatus, reason) {
  this.status = newStatus;
  if (newStatus === 'completed' || newStatus === 'exited') {
    this.maturityDate = new Date();
  }
  return this.save();
};

// Static method to get investor portfolio
investmentSchema.statics.getInvestorPortfolio = async function(investorId) {
  const portfolio = await this.find({ investorId })
    .populate('projectId', 'projectName projectType status location.emirate')
    .sort({ createdAt: -1 });

  const summary = {
    totalInvested: portfolio.reduce((sum, inv) => sum + inv.amount, 0),
    totalReturns: portfolio.reduce((sum, inv) => sum + inv.totalReturnsReceived, 0),
    activeInvestments: portfolio.filter(inv => inv.status === 'active').length,
    completedInvestments: portfolio.filter(inv => inv.status === 'completed').length,
    averageROI: portfolio.length > 0 ? portfolio.reduce((sum, inv) => sum + inv.roiPercentage, 0) / portfolio.length : 0
  };

  return { portfolio, summary };
};

// Static method to get investment statistics
investmentSchema.statics.getInvestmentStats = async function(filters = {}) {
  const matchStage = { ...filters };
  
  const stats = await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalInvestments: { $sum: 1 },
        totalAmount: { $sum: '$amount' },
        totalReturns: { $sum: '$totalReturnsReceived' },
        averageInvestment: { $avg: '$amount' },
        investmentsByType: {
          $push: '$investmentType'
        },
        investmentsByRisk: {
          $push: '$riskAssessment.riskLevel'
        },
        investmentsByStatus: {
          $push: '$status'
        }
      }
    }
  ]);

  return stats[0] || {
    totalInvestments: 0,
    totalAmount: 0,
    totalReturns: 0,
    averageInvestment: 0,
    investmentsByType: [],
    investmentsByRisk: [],
    investmentsByStatus: []
  };
};

module.exports = mongoose.model('Investment', investmentSchema);
