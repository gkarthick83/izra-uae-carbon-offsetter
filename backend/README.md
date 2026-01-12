# IZRA Carbon Offsetter Backend

Backend API for the IZRA UAE Carbon Offsetter Platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Multi-role system (admin, seller, buyer, investor, sponsor)
- **KYC Verification**: Document upload and verification system
- **Project Management**: Carbon credit project registration and management
- **Marketplace**: Carbon credit trading platform
- **Sponsorships**: Tree planting and mangrove restoration sponsorships
- **Investments**: Project investment opportunities
- **Payment Integration**: Stripe and other payment methods
- **File Upload**: Cloudinary integration for documents and images
- **Security**: Rate limiting, CORS, helmet, input validation
- **Logging**: Winston-based logging system
- **Error Handling**: Comprehensive error handling with custom error classes

## 📋 Prerequisites

- Node.js (v18+)
- MongoDB (v5+)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB**:
   ```bash
   # Make sure MongoDB is running on localhost:27017
   mongod
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/         # Database and configuration files
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Authentication, validation, error handling
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── services/       # Business logic services
│   ├── utils/          # Helper functions and utilities
│   └── app.js         # Express app configuration
├── uploads/            # Temporary file uploads
├── logs/              # Application logs
├── .env               # Environment variables
├── package.json
└── server.js          # Server entry point
```

## 🔐 Environment Variables

Required environment variables:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/izra-carbon-offsetter

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRE=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for different user roles
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Joi-based request validation
- **Password Hashing**: bcrypt for secure password storage
- **CORS Configuration**: Cross-origin resource sharing setup
- **Helmet**: Security headers middleware
- **File Upload Security**: Secure file handling with Cloudinary

## 📊 API Documentation

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/refresh` | Refresh access token | Public |
| POST | `/api/auth/logout` | Logout user | Private |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/me` | Update profile | Private |

### Project Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create project | Seller |
| PUT | `/api/projects/:id` | Update project | Owner/Admin |
| DELETE | `/api/projects/:id` | Delete project | Owner/Admin |

### Marketplace Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/marketplace/credits` | Get available credits | Public |
| POST | `/api/marketplace/orders` | Create order | Private |
| GET | `/api/marketplace/orders` | Get user orders | Private |
| GET | `/api/marketplace/stats` | Get marketplace stats | Public |

### Sponsorship Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/sponsorships` | Create sponsorship | Sponsor |
| GET | `/api/sponsorships` | Get sponsorships | Sponsor |
| GET | `/api/sponsorships/:id` | Get sponsorship | Owner/Admin |
| GET | `/api/sponsorships/public` | Get public sponsorships | Public |

### Investment Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/investments` | Create investment | Investor |
| GET | `/api/investments` | Get investments | Investor |
| GET | `/api/investments/portfolio` | Get portfolio | Investor |
| GET | `/api/investments/opportunities` | Get opportunities | Public |

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Scripts

```bash
# Start development server
npm run dev

# Start production server
npm start

# Run with nodemon
npm run server

# Run frontend and backend together
npm run dev:full
```

## 🚀 Deployment

1. **Set production environment variables**:
   ```bash
   NODE_ENV=production
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   ```

2. **Install production dependencies**:
   ```bash
   npm ci --only=production
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the IZRA development team.

---

Built with ❤️ for the UAE Carbon Offsetter Platform
