# 🧪 Manual Testing Guide for IZRA Carbon Offsetter

## 🚀 **Current Status**

✅ **Backend Server**: Running on http://localhost:5000  
✅ **MongoDB**: Connected and working  
✅ **Authentication**: JWT system functional  
✅ **API Endpoints**: All routes working  

## 📋 **Step-by-Step Testing**

### **1. Test Basic API Connectivity**

```bash
# Check if backend is running
curl http://localhost:5000/health

# Expected: {"status":"OK","message":"IZRA Backend API is running"}
```

### **2. Test User Registration**

```bash
# Register a new user
curl -X POST -H "Content-Type: application/json" \
-d '{
  "email": "testuser@example.com",
  "password": "test123",
  "role": "buyer",
  "profile": {
    "fullName": "Test User",
    "country": "UAE"
  }
}' \
http://localhost:5000/api/auth/register

# Expected: 201 Created with user data and tokens
```

### **3. Test User Login**

```bash
# Login with the registered user
curl -X POST -H "Content-Type: application/json" \
-d '{
  "email": "testuser@example.com",
  "password": "test123"
}' \
http://localhost:5000/api/auth/login

# Expected: 200 OK with user data and tokens
```

### **4. Test Protected Endpoints**

```bash
# Get the token from login response, then:
TOKEN="your-jwt-token-here"

# Test user profile access
curl -H "Authorization: Bearer $TOKEN" \
http://localhost:5000/api/auth/me

# Expected: 200 OK with user profile data
```

### **5. Test Public Endpoints**

```bash
# View all projects (public)
curl http://localhost:5000/api/projects

# View marketplace credits (public)
curl http://localhost:5000/api/marketplace/credits

# View public sponsorships
curl http://localhost:5000/api/sponsorships/public

# Expected: 200 OK with data (may be empty initially)
```

## 👥 **Test Different User Roles**

### **Register Different Role Users**

```bash
# Admin
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"admin@test.com","password":"admin123","role":"admin","profile":{"fullName":"Admin"}}' \
http://localhost:5000/api/auth/register

# Seller
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"seller@test.com","password":"seller123","role":"seller","profile":{"fullName":"Seller"}}' \
http://localhost:5000/api/auth/register

# Investor
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"investor@test.com","password":"investor123","role":"investor","profile":{"fullName":"Investor"}}' \
http://localhost:5000/api/auth/register

# Sponsor
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"sponsor@test.com","password":"sponsor123","role":"sponsor","profile":{"fullName":"Sponsor"}}' \
http://localhost:5000/api/auth/register
```

### **Test Role-Specific Features**

#### **As Seller - Create Projects**
```bash
# Login as seller first to get token
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"seller@test.com","password":"seller123"}' \
http://localhost:5000/api/auth/login

# Use the seller token to create a project
SELLER_TOKEN="seller-token-here"

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $SELLER_TOKEN" \
-d '{
  "projectName": "Test Mangrove Project",
  "projectType": "mangrove",
  "location": {
    "emirate": "dubai",
    "region": "Test Region"
  },
  "totalCredits": 1000,
  "availableCredits": 1000,
  "pricing": {
    "AED": 50,
    "USD": 13.6,
    "USDT": 13.6
  },
  "description": "Test project for manual testing"
}' \
http://localhost:5000/api/projects
```

#### **As Sponsor - Create Sponsorships**
```bash
# Login as sponsor
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"sponsor@test.com","password":"sponsor123"}' \
http://localhost:5000/api/auth/login

# Create sponsorship
SPONSOR_TOKEN="sponsor-token-here"

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $SPONSOR_TOKEN" \
-d '{
  "sponsorshipType": "tree_planting",
  "treeCount": 50,
  "location": {
    "emirate": "dubai",
    "zone": "Test Zone"
  },
  "totalAmount": 2500,
  "currency": "USD"
}' \
http://localhost:5000/api/sponsorships
```

#### **As Investor - Create Investments**
```bash
# Login as investor
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"investor@test.com","password":"investor123"}' \
http://localhost:5000/api/auth/login

# Create investment
INVESTOR_TOKEN="investor-token-here"

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $INVESTOR_TOKEN" \
-d '{
  "investmentType": "equity",
  "amount": 10000,
  "currency": "USD",
  "expectedReturns": {
    "annualReturnRate": 15
  },
  "riskAssessment": {
    "riskLevel": "medium"
  }
}' \
http://localhost:5000/api/investments
```

## 🔍 **Database Testing**

### **Check MongoDB Directly**

```bash
# Connect to MongoDB
mongo

# Use the database
use izra-carbon-offsetter

# View all users
db.users.find().pretty()

# View projects
db.projects.find().pretty()

# View transactions
db.transactions.find().pretty()

# Exit
exit
```

### **Expected Database Structure**

- **users**: Authentication and profile data
- **projects**: Carbon credit projects
- **transactions**: Marketplace transactions
- **sponsorships**: Tree planting sponsorships
- **investments**: Project investments

## 🧪 **Test Error Handling**

### **Test Authentication Errors**

```bash
# Invalid login
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"invalid@test.com","password":"wrong"}' \
http://localhost:5000/api/auth/login

# Expected: 401 Unauthorized

# Access protected endpoint without token
curl http://localhost:5000/api/auth/me

# Expected: 401 Unauthorized

# Access protected endpoint with invalid token
curl -H "Authorization: Bearer invalid-token" \
http://localhost:5000/api/auth/me

# Expected: 401 Unauthorized
```

### **Test Validation Errors**

```bash
# Register with invalid email
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"invalid-email","password":"123","role":"invalid","profile":{"fullName":"Test"}}' \
http://localhost:5000/api/auth/register

# Expected: 400 Bad Request with validation errors
```

### **Test Authorization Errors**

```bash
# Try to create project as buyer (should fail)
# Login as buyer first, then:
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $BUYER_TOKEN" \
-d '{"projectName":"Test"}' \
http://localhost:5000/api/projects

# Expected: 403 Forbidden
```

## 📊 **Performance Testing**

### **Check Response Times**

```bash
# Test API response time
time curl http://localhost:5000/health

# Test database query time
time curl http://localhost:5000/api/projects

# Expected: <200ms for simple queries
```

## 🎯 **Success Criteria**

Your testing is successful when:

### **✅ Basic Functionality**
- [ ] Health check returns 200 OK
- [ ] User registration works
- [ ] User login returns JWT tokens
- [ ] Protected endpoints require authentication
- [ ] Public endpoints work without authentication

### **✅ Role-Based Access**
- [ ] Admin can access all endpoints
- [ ] Seller can create projects
- [ ] Buyer can browse marketplace
- [ ] Investor can create investments
- [ ] Sponsor can create sponsorships

### **✅ Data Persistence**
- [ ] Users are saved in MongoDB
- [ ] Projects are stored correctly
- [ ] Transactions are recorded
- [ ] Data relationships work

### **✅ Error Handling**
- [ ] Invalid credentials return 401
- [ ] Invalid data returns 400
- [ ] Unauthorized actions return 403
- [ ] Not found returns 404

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Connection Refused**: Backend not running
   ```bash
   cd backend && npm run dev
   ```

2. **MongoDB Connection Error**: MongoDB not running
   ```bash
   net start MongoDB
   ```

3. **Authentication Failures**: Check JWT secrets
   ```bash
   # Check backend/.env file
   ```

4. **CORS Errors**: Check frontend configuration
   ```bash
   # Verify vite.config.mjs proxy settings
   ```

## 🎉 **Testing Complete!**

When all tests pass, your IZRA Carbon Offsetter is:
- ✅ Fully functional
- ✅ Ready for frontend integration
- ✅ Prepared for production deployment
- ✅ All features working correctly

**Next Steps:**
1. Integrate with React frontend
2. Add comprehensive UI testing
3. Deploy to production
4. Set up monitoring

**Happy Testing! 🚀**
