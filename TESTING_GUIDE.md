# 🧪 IZRA Carbon Offsetter - Testing Guide

## 🚀 Quick Start for End-to-End Testing

### **Prerequisites Checklist**
- ✅ Node.js (v18+) installed
- ✅ MongoDB installed and running
- ✅ Git repository cloned locally

---

## 📋 **Step 1: Start Backend Server**

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
✅ Auth routes loaded
✅ User routes loaded
✅ Project routes loaded
✅ Marketplace routes loaded
✅ Sponsorship routes loaded
✅ Investment routes loaded
info: MongoDB Connected: localhost
info: Server running in development mode on port 5000
```

**Verify Backend:** Open http://localhost:5000/health in browser
- Should show: `{"status":"OK","message":"IZRA Backend API is running"}`

---

## 📋 **Step 2: Start Frontend Server**

```bash
# Open new terminal window
# Navigate to root directory
cd ..

# Start frontend
npm start
```

**Expected Output:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
  ➜  press h to show help
```

**Verify Frontend:** Open http://localhost:3000 in browser
- Should show IZRA Carbon Offsetter homepage

---

## 📋 **Step 3: Run Automated Tests**

```bash
# In root directory, run the end-to-end test
node e2e-test.js
```

**Expected Output:**
```
🚀 IZRA Carbon Offsetter - End-to-End Testing
================================================

ℹ️  Checking prerequisites...
✅ Backend is running (http://localhost:5000)
✅ Frontend is running (http://localhost:3000)

📋 Running Tests...

1. Testing Backend API Endpoints
✅ Health check passed
✅ Admin registration successful
✅ Seller registration successful
✅ Buyer registration successful
✅ Admin login successful
✅ Seller login successful
✅ Buyer login successful
✅ Protected endpoint access successful
✅ Project creation successful
✅ Projects list accessible
✅ Marketplace credits accessible
✅ Public sponsorships accessible

2. Testing Frontend Access
✅ Frontend is accessible
✅ Frontend contains expected content

3. Testing Frontend-Backend Integration
✅ API proxy through frontend working

4. Testing Performance
✅ Backend response time: 45ms (Good)

📊 Test Results
==================
✅ Backend API: PASSED
✅ Frontend: PASSED
✅ Integration: PASSED
✅ Performance: PASSED

🎉 All tests passed! Your application is ready for production.
```

---

## 📋 **Step 4: Manual Testing in Browser**

### **Test Authentication Flow**

1. **Open Frontend:** http://localhost:3000

2. **Test Registration:**
   - Navigate to Register page
   - Fill form with test data:
     - Email: `test@example.com`
     - Password: `123456`
     - Full Name: `Test User`
     - Role: `Buyer`
   - Submit form
   - Should redirect to dashboard

3. **Test Login:**
   - Navigate to Login page
   - Use demo credentials:
     - Email: `admin@izra.com`
     - Password: `admin123`
   - Should login as admin

4. **Test Role-Based Access:**
   - Admin should see all dashboard sections
   - Seller should see project management
   - Buyer should see marketplace
   - Investor should see investment opportunities
   - Sponsor should see sponsorship options

### **Test API Endpoints Manually**

**Using Browser DevTools Console:**

```javascript
// Test health check
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(console.log)

// Test user registration
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'manual@test.com',
    password: '123456',
    role: 'buyer',
    profile: { fullName: 'Manual Test', country: 'UAE' }
  })
})
.then(r => r.json())
.then(console.log)

// Test login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'manual@test.com',
    password: '123456'
  })
})
.then(r => r.json())
.then(console.log)
```

---

## 📋 **Step 5: Test Database Operations**

### **Verify MongoDB Data**

```bash
# Connect to MongoDB
mongo

# Switch to database
use izra-carbon-offsetter

# View users
db.users.find().pretty()

# View projects
db.projects.find().pretty()

# View transactions
db.transactions.find().pretty()

# Exit MongoDB
exit
```

**Expected Results:**
- Should see test users created during registration
- Should see projects if created
- Should see transactions if any marketplace activity

---

## 🔧 **Troubleshooting**

### **Backend Issues**

**Problem:** `MongoDB connection failed`
```bash
# Solution: Start MongoDB service
net start MongoDB

# Or start manually
mongod --dbpath "C:\data\db"
```

**Problem:** `Port 5000 already in use`
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID_NUMBER> /F
```

**Problem:** `Module not found`
```bash
# Solution: Install dependencies
cd backend
npm install
```

### **Frontend Issues**

**Problem:** `Port 3000 already in use`
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID_NUMBER> /F
```

**Problem:** `Proxy errors`
```bash
# Solution: Ensure backend is running on port 5000
# Check vite.config.mjs proxy configuration
```

### **Integration Issues**

**Problem:** CORS errors
```bash
# Solution: Check backend CORS configuration
# Backend should allow http://localhost:3000
```

**Problem:** Authentication failures
```bash
# Solution: Check JWT secrets in backend/.env
# Ensure tokens are stored in localStorage
```

---

## 📊 **Performance Benchmarks**

### **Expected Performance Metrics**

| Operation | Expected Time | Acceptable |
|-----------|---------------|------------|
| Health Check | <50ms | <100ms |
| User Login | <200ms | <500ms |
| Project List | <100ms | <300ms |
| Registration | <300ms | <1000ms |

### **How to Measure**

```javascript
// In browser console
console.time('api-call');
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(() => console.timeEnd('api-call'));
```

---

## 🎯 **Success Criteria**

Your application is **ready for production** when:

- ✅ All automated tests pass
- ✅ Manual registration/login works
- ✅ All user roles can access appropriate features
- ✅ Database operations work correctly
- ✅ API response times are acceptable
- ✅ No CORS or authentication errors
- ✅ Frontend-backend integration works seamlessly

---

## 🚀 **Next Steps After Testing**

1. **Production Deployment:**
   - Set up production environment variables
   - Deploy to cloud hosting
   - Configure production database

2. **Additional Testing:**
   - Load testing with multiple users
   - Security testing
   - Cross-browser compatibility

3. **Documentation:**
   - Update API documentation
   - Create user guides
   - Setup monitoring

---

## 📞 **Support**

If you encounter issues during testing:

1. Check the troubleshooting section above
2. Review the console logs for detailed errors
3. Verify all services are running
4. Check network connectivity
5. Ensure environment variables are correct

**Happy Testing! 🎉**
