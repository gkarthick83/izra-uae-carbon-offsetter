# 🧪 IZRA Testing Commands & Data Setup

## 🚀 **Quick Testing Guide**

### **1. Check Backend Status**
```bash
# Health check
curl http://localhost:5000/health

# Should return: {"status":"OK","message":"IZRA Backend API is running"}
```

### **2. Test Authentication**

#### **Register Demo Users**
```bash
# Admin User
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"admin@izra.com","password":"admin123","role":"admin","profile":{"fullName":"Admin User"}}' \
http://localhost:5000/api/auth/register

# Seller User
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"seller@izra.com","password":"seller123","role":"seller","profile":{"fullName":"Seller User"}}' \
http://localhost:5000/api/auth/register

# Buyer User
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"buyer@izra.com","password":"buyer123","role":"buyer","profile":{"fullName":"Buyer User"}}' \
http://localhost:5000/api/auth/register

# Investor User
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"investor@izra.com","password":"investor123","role":"investor","profile":{"fullName":"Investor User"}}' \
http://localhost:5000/api/auth/register

# Sponsor User
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"sponsor@izra.com","password":"sponsor123","role":"sponsor","profile":{"fullName":"Sponsor User"}}' \
http://localhost:5000/api/auth/register
```

#### **Login and Get Token**
```bash
# Login as Seller (to create projects)
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"seller@izra.com","password":"seller123"}' \
http://localhost:5000/api/auth/login

# Save the token from response for next steps
```

### **3. Create Sample Data**

#### **Create Projects (as Seller)**
```bash
# Use the seller token from login response
TOKEN="your-seller-token-here"

# Mangrove Project
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
-d '{
  "projectName": "Dubai Mangrove Restoration",
  "projectType": "mangrove",
  "location": {
    "emirate": "dubai",
    "region": "Dubai Marina"
  },
  "totalCredits": 5000,
  "availableCredits": 5000,
  "pricing": {
    "AED": 75,
    "USD": 20.4,
    "USDT": 20.4
  },
  "description": "Large-scale mangrove restoration project in Dubai Marina"
}' \
http://localhost:5000/api/projects

# Solar Project
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
-d '{
  "projectName": "Abu Dhabi Solar Farm",
  "projectType": "solar",
  "location": {
    "emirate": "abu-dhabi",
    "region": "Masdar City"
  },
  "totalCredits": 10000,
  "availableCredits": 10000,
  "pricing": {
    "AED": 50,
    "USD": 13.6,
    "USDT": 13.6
  },
  "description": "Solar energy project in Masdar City"
}' \
http://localhost:5000/api/projects

# Afforestation Project
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
-d '{
  "projectName": "Sharjah Desert Greening",
  "projectType": "afforestation",
  "location": {
    "emirate": "sharjah",
    "region": "Central Sharjah"
  },
  "totalCredits": 3000,
  "availableCredits": 3000,
  "pricing": {
    "AED": 60,
    "USD": 16.3,
    "USDT": 16.3
  },
  "description": "Desert afforestation initiative in Sharjah"
}' \
http://localhost:5000/api/projects
```

#### **Create Sponsorships (as Sponsor)**
```bash
# Login as Sponsor first
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"sponsor@izra.com","password":"sponsor123"}' \
http://localhost:5000/api/auth/login

# Use sponsor token
SPONSOR_TOKEN="your-sponsor-token-here"

# Tree Planting Sponsorship
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $SPONSOR_TOKEN" \
-d '{
  "projectId": "PROJECT_ID_FROM_PROJECTS_LIST",
  "sponsorshipType": "tree_planting",
  "treeCount": 100,
  "location": {
    "emirate": "dubai",
    "zone": "Al Qudra"
  },
  "totalAmount": 5000,
  "currency": "USD"
}' \
http://localhost:5000/api/sponsorships
```

#### **Create Investments (as Investor)**
```bash
# Login as Investor first
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"investor@izra.com","password":"investor123"}' \
http://localhost:5000/api/auth/login

# Use investor token
INVESTOR_TOKEN="your-investor-token-here"

# Equity Investment
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $INVESTOR_TOKEN" \
-d '{
  "projectId": "PROJECT_ID_FROM_PROJECTS_LIST",
  "investmentType": "equity",
  "amount": 50000,
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

### **4. View Data**

#### **Check All Projects**
```bash
curl http://localhost:5000/api/projects
```

#### **Check Available Credits**
```bash
curl http://localhost:5000/api/marketplace/credits
```

#### **Check User Profile**
```bash
# Replace TOKEN with your actual token
curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/auth/me
```

#### **Check Sponsorships**
```bash
curl -H "Authorization: Bearer $SPONSOR_TOKEN" http://localhost:5000/api/sponsorships
```

#### **Check Investments**
```bash
curl -H "Authorization: Bearer $INVESTOR_TOKEN" http://localhost:5000/api/investments
```

### **5. Test Marketplace Transactions**

#### **Create Order (as Buyer)**
```bash
# Login as Buyer
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"buyer@izra.com","password":"buyer123"}' \
http://localhost:5000/api/auth/login

# Use buyer token
BUYER_TOKEN="your-buyer-token-here"

# Create order for carbon credits
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $BUYER_TOKEN" \
-d '{
  "projectId": "PROJECT_ID_FROM_PROJECTS_LIST",
  "credits": [{
    "creditId": "credit-001",
    "amount": 100,
    "pricePerCredit": 20.4,
    "currency": "USD"
  }],
  "currency": "USD",
  "paymentMethod": "stripe"
}' \
http://localhost:5000/api/marketplace/orders
```

### **6. Test Database Directly (Optional)**

```bash
# Connect to MongoDB
mongo

# Use the database
use izra-carbon-offsetter

# View all users
db.users.find().pretty()

# View all projects
db.projects.find().pretty()

# View transactions
db.transactions.find().pretty()

# View sponsorships
db.sponsorships.find().pretty()

# View investments
db.investments.find().pretty()

# Exit
exit
```

### **7. Run Automated Tests**

```bash
# Run the comprehensive test suite
node e2e-test.js

# Run API tests only
node test-api.js

# Run MongoDB tests only
node test-mongodb.js
```

## 🎯 **Testing Workflow**

### **Step 1: Setup Users**
1. Register all 5 user types (admin, seller, buyer, investor, sponsor)
2. Login and save tokens for each user type

### **Step 2: Create Content**
1. As **Seller**: Create 3 projects (mangrove, solar, afforestation)
2. As **Sponsor**: Create tree planting sponsorships
3. As **Investor**: Create investments in projects

### **Step 3: Test Marketplace**
1. As **Buyer**: Browse projects and create orders
2. Test the complete transaction flow

### **Step 4: Verify Data**
1. Check all endpoints return expected data
2. Verify database contains all created records
3. Test role-based access control

## 🔍 **Common Testing Scenarios**

### **Authentication Flow**
```bash
# 1. Register user
# 2. Login and get token
# 3. Access protected endpoint with token
# 4. Logout and try accessing protected endpoint (should fail)
```

### **Role-Based Access**
```bash
# Test each role can only access their endpoints:
# - Admin: Can access all endpoints
# - Seller: Can create/manage projects
# - Buyer: Can browse and buy credits
# - Investor: Can create investments
# - Sponsor: Can create sponsorships
```

### **Data Validation**
```bash
# Test invalid data returns appropriate errors:
# - Invalid email format
# - Weak passwords
# - Negative credit amounts
# - Invalid project types
```

## 📊 **Expected Results**

After running the test commands, you should have:

- ✅ 5 registered users with different roles
- ✅ 3 projects (mangrove, solar, afforestation)
- ✅ Sample sponsorships and investments
- ✅ Marketplace transactions
- ✅ Full database with test data

## 🚨 **Troubleshooting**

### **Common Issues**
1. **401 Unauthorized**: Check your token is valid and not expired
2. **403 Forbidden**: Check user has correct role for the endpoint
3. **404 Not Found**: Check endpoint URL is correct
4. **500 Server Error**: Check request data format and required fields

### **Debug Tips**
```bash
# Check server logs for errors
# Check MongoDB is running
# Verify environment variables
# Test with valid JSON format
```

## 🎉 **Success Criteria**

Your testing is successful when:

- ✅ All user registrations work
- ✅ All logins return valid tokens
- ✅ Projects are created and visible
- ✅ Marketplace transactions work
- ✅ Role-based access control functions
- ✅ Database contains all test data
- ✅ No critical errors in logs

**Happy Testing! 🚀**
