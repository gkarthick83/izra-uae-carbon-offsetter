require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/config/database');
const logger = require('./src/utils/logger');

// Import routes with error handling
let authRoutes, userRoutes, projectRoutes, marketplaceRoutes, sponsorshipRoutes, investmentRoutes;

try {
  authRoutes = require('./src/routes/auth');
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.error('❌ Error loading auth routes:', error.message);
}

try {
  userRoutes = require('./src/routes/users');
  console.log('✅ User routes loaded');
} catch (error) {
  console.error('❌ Error loading user routes:', error.message);
}

try {
  projectRoutes = require('./src/routes/projects');
  console.log('✅ Project routes loaded');
} catch (error) {
  console.error('❌ Error loading project routes:', error.message);
}

try {
  marketplaceRoutes = require('./src/routes/marketplace');
  console.log('✅ Marketplace routes loaded');
} catch (error) {
  console.error('❌ Error loading marketplace routes:', error.message);
}

try {
  sponsorshipRoutes = require('./src/routes/sponsorships');
  console.log('✅ Sponsorship routes loaded');
} catch (error) {
  console.error('❌ Error loading sponsorship routes:', error.message);
}

try {
  investmentRoutes = require('./src/routes/investments');
  console.log('✅ Investment routes loaded');
} catch (error) {
  console.error('❌ Error loading investment routes:', error.message);
}

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Logging middleware
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'IZRA Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes (only use if successfully loaded)
if (authRoutes) app.use('/api/auth', authRoutes);
if (userRoutes) app.use('/api/users', userRoutes);
if (projectRoutes) app.use('/api/projects', projectRoutes);
if (marketplaceRoutes) app.use('/api/marketplace', marketplaceRoutes);
if (sponsorshipRoutes) app.use('/api/sponsorships', sponsorshipRoutes);
if (investmentRoutes) app.use('/api/investments', investmentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  
  // Ensure status code is a valid integer
  const statusCode = typeof err.status === 'number' ? err.status : 
                     typeof err.statusCode === 'number' ? err.statusCode : 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app;
