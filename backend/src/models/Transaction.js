const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Buyer ID is required']
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller ID is required']
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required']
  },
  credits: [{
    creditId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: [0.001, 'Credit amount must be positive']
    },
    pricePerCredit: {
      type: Number,
      required: true,
      min: [0, 'Price per credit must be positive']
    },
    currency: {
      type: String,
      enum: ['AED', 'USD', 'USDT'],
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount must be positive']
  },
  currency: {
    type: String,
    enum: ['AED', 'USD', 'USDT'],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'bank_transfer', 'crypto'],
    required: true
  },
  paymentDetails: {
    paymentIntentId: String,
    stripeChargeId: String,
    paypalOrderId: String,
    bankReference: String,
    cryptoTransactionHash: String,
    cryptoWalletAddress: String
  },
  blockchain: {
    transactionHash: String,
    blockNumber: Number,
    gasUsed: Number,
    gasPrice: String,
    network: {
      type: String,
      enum: ['ethereum', 'polygon', 'binance', 'local'],
      default: 'ethereum'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'disputed'],
    default: 'pending'
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'disputed']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  certificates: [{
    certificateId: String,
    certificateUrl: String,
    issuedAt: Date,
    retiredAt: Date
  }],
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  fees: {
    platformFee: {
      type: Number,
      default: 0
    },
    processingFee: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      enum: ['AED', 'USD', 'USDT'],
      default: 'USD'
    }
  },
  dispute: {
    reason: String,
    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    raisedAt: Date,
    resolution: String,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date,
    status: {
      type: String,
      enum: ['none', 'raised', 'investigating', 'resolved'],
      default: 'none'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
transactionSchema.index({ buyerId: 1 });
transactionSchema.index({ sellerId: 1 });
transactionSchema.index({ projectId: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ 'blockchain.transactionHash': 1 });

// Virtual for total credits in transaction
transactionSchema.virtual('totalCredits').get(function() {
  return this.credits.reduce((total, credit) => total + credit.amount, 0);
});

// Virtual for average price per credit
transactionSchema.virtual('averagePricePerCredit').get(function() {
  if (this.totalCredits === 0) return 0;
  return this.totalAmount / this.totalCredits;
});

// Pre-save middleware to set initial status
transactionSchema.pre('save', function(next) {
  if (this.isNew) {
    this.statusHistory.push({
      status: this.status,
      note: 'Transaction initiated'
    });
  }
  next();
});

// Instance method to update status
transactionSchema.methods.updateStatus = function(newStatus, note, updatedBy) {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    note: note || `Status updated to ${newStatus}`,
    updatedBy: updatedBy
  });
  return this.save();
};

// Static method to get user transactions
transactionSchema.statics.getUserTransactions = function(userId, role = 'buyer') {
  const matchField = role === 'buyer' ? 'buyerId' : 'sellerId';
  return this.find({ [matchField]: userId })
    .populate('buyerId', 'email profile.fullName')
    .populate('sellerId', 'email profile.fullName')
    .populate('projectId', 'projectName projectType location.emirate')
    .sort({ createdAt: -1 });
};

// Static method to get transaction statistics
transactionSchema.statics.getTransactionStats = async function(dateRange = {}) {
  const matchStage = {};
  if (dateRange.startDate && dateRange.endDate) {
    matchStage.createdAt = {
      $gte: new Date(dateRange.startDate),
      $lte: new Date(dateRange.endDate)
    };
  }

  const stats = await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalTransactions: { $sum: 1 },
        totalVolume: { $sum: '$totalAmount' },
        totalCredits: { $sum: { $sum: '$credits.amount' } },
        averageTransactionValue: { $avg: '$totalAmount' },
        transactionsByStatus: {
          $push: '$status'
        },
        transactionsByCurrency: {
          $push: '$currency'
        }
      }
    }
  ]);

  return stats[0] || {
    totalTransactions: 0,
    totalVolume: 0,
    totalCredits: 0,
    averageTransactionValue: 0,
    transactionsByStatus: [],
    transactionsByCurrency: []
  };
};

module.exports = mongoose.model('Transaction', transactionSchema);
