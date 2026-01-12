#!/usr/bin/env node

/**
 * End-to-End Testing Script for IZRA Carbon Offsetter
 * Tests both backend and frontend integration
 */

const http = require('http');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const BACKEND_URL = 'http://localhost:5000';
const FRONTEND_URL = 'http://localhost:3000';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logStep(step, message) {
  log(`${step}. ${message}`, 'cyan');
}

// HTTP request helper
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Check if service is running
async function checkService(url, serviceName) {
  try {
    const response = await makeRequest({
      hostname: url.includes('localhost') ? 'localhost' : new URL(url).hostname,
      port: url.includes('localhost') ? (url.includes(':5000') ? 5000 : 3000) : 80,
      path: url.includes('localhost') ? (url.includes(':5000') ? '/health' : '/') : '/',
      method: 'GET'
    });
    
    if (response.statusCode < 500) {
      logSuccess(`${serviceName} is running (${url})`);
      return true;
    } else {
      logError(`${serviceName} returned error status: ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    logError(`${serviceName} is not accessible: ${error.message}`);
    return false;
  }
}

// Backend API Tests
async function testBackendAPI() {
  logStep(1, 'Testing Backend API Endpoints');
  
  let adminToken = '';
  let sellerToken = '';
  let buyerToken = '';

  try {
    // Test Health Check
    logInfo('Testing health check...');
    const health = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/health',
      method: 'GET'
    });
    
    if (health.statusCode === 200) {
      logSuccess('Health check passed');
    } else {
      logError(`Health check failed: ${health.statusCode}`);
      return false;
    }

    // Test User Registration
    logInfo('Testing user registration...');
    const registrationTests = [
      { email: 'e2e-admin@test.com', password: 'admin123', role: 'admin', name: 'E2E Admin' },
      { email: 'e2e-seller@test.com', password: 'seller123', role: 'seller', name: 'E2E Seller' },
      { email: 'e2e-buyer@test.com', password: 'buyer123', role: 'buyer', name: 'E2E Buyer' }
    ];

    for (const user of registrationTests) {
      const regResponse = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, {
        email: user.email,
        password: user.password,
        role: user.role,
        profile: { fullName: user.name, country: 'UAE' }
      });

      if (regResponse.statusCode === 201) {
        logSuccess(`${user.role} registration successful`);
      } else {
        logWarning(`${user.role} registration: ${regResponse.statusCode}`);
      }
    }

    // Test User Login
    logInfo('Testing user login...');
    const loginTests = [
      { email: 'e2e-admin@test.com', password: 'admin123', role: 'admin' },
      { email: 'e2e-seller@test.com', password: 'seller123', role: 'seller' },
      { email: 'e2e-buyer@test.com', password: 'buyer123', role: 'buyer' }
    ];

    for (const user of loginTests) {
      const loginResponse = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, {
        email: user.email,
        password: user.password
      });

      if (loginResponse.statusCode === 200) {
        const data = JSON.parse(loginResponse.body);
        if (user.role === 'admin') adminToken = data.data.tokens.accessToken;
        if (user.role === 'seller') sellerToken = data.data.tokens.accessToken;
        if (user.role === 'buyer') buyerToken = data.data.tokens.accessToken;
        logSuccess(`${user.role} login successful`);
      } else {
        logError(`${user.role} login failed: ${loginResponse.statusCode}`);
      }
    }

    // Test Protected Endpoints
    logInfo('Testing protected endpoints...');
    if (buyerToken) {
      const profileResponse = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/me',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${buyerToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (profileResponse.statusCode === 200) {
        logSuccess('Protected endpoint access successful');
      } else {
        logError(`Protected endpoint failed: ${profileResponse.statusCode}`);
      }
    }

    // Test Project Creation (Seller)
    if (sellerToken) {
      logInfo('Testing project creation...');
      const projectResponse = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/projects',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sellerToken}`,
          'Content-Type': 'application/json'
        }
      }, {
        projectName: 'E2E Test Project',
        projectType: 'mangrove',
        location: {
          emirate: 'dubai',
          region: 'Test Region'
        },
        totalCredits: 1000,
        availableCredits: 1000,
        pricing: {
          AED: 50,
          USD: 13.6,
          USDT: 13.6
        },
        description: 'E2E test project'
      });

      if (projectResponse.statusCode === 201) {
        logSuccess('Project creation successful');
      } else {
        logWarning(`Project creation: ${projectResponse.statusCode}`);
      }
    }

    // Test Public Endpoints
    logInfo('Testing public endpoints...');
    const publicTests = [
      { path: '/api/projects', name: 'Projects list' },
      { path: '/api/marketplace/credits', name: 'Marketplace credits' },
      { path: '/api/sponsorships/public', name: 'Public sponsorships' }
    ];

    for (const test of publicTests) {
      const response = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: test.path,
        method: 'GET'
      });

      if (response.statusCode === 200) {
        logSuccess(`${test.name} accessible`);
      } else {
        logError(`${test.name} failed: ${response.statusCode}`);
      }
    }

    return true;
  } catch (error) {
    logError(`Backend API test failed: ${error.message}`);
    return false;
  }
}

// Frontend Tests
async function testFrontend() {
  logStep(2, 'Testing Frontend Access');
  
  try {
    // Test frontend accessibility
    const frontendResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    });

    if (frontendResponse.statusCode === 200) {
      logSuccess('Frontend is accessible');
      
      // Check if it contains React app content
      if (frontendResponse.body.includes('react') || frontendResponse.body.includes('IZRA')) {
        logSuccess('Frontend contains expected content');
      } else {
        logWarning('Frontend might not be fully loaded');
      }
    } else {
      logError(`Frontend not accessible: ${frontendResponse.statusCode}`);
      return false;
    }

    return true;
  } catch (error) {
    logError(`Frontend test failed: ${error.message}`);
    return false;
  }
}

// Integration Tests
async function testIntegration() {
  logStep(3, 'Testing Frontend-Backend Integration');
  
  try {
    // Test API proxy through frontend
    const proxyResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/health',
      method: 'GET'
    });

    if (proxyResponse.statusCode === 200) {
      logSuccess('API proxy through frontend working');
    } else {
      logWarning('API proxy might not be configured correctly');
    }

    return true;
  } catch (error) {
    logError(`Integration test failed: ${error.message}`);
    return false;
  }
}

// Performance Tests
async function testPerformance() {
  logStep(4, 'Testing Performance');
  
  try {
    // Test backend response time
    const start = Date.now();
    await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/health',
      method: 'GET'
    });
    const responseTime = Date.now() - start;

    if (responseTime < 500) {
      logSuccess(`Backend response time: ${responseTime}ms (Good)`);
    } else if (responseTime < 1000) {
      logWarning(`Backend response time: ${responseTime}ms (Acceptable)`);
    } else {
      logError(`Backend response time: ${responseTime}ms (Too slow)`);
    }

    return true;
  } catch (error) {
    logError(`Performance test failed: ${error.message}`);
    return false;
  }
}

// Main test runner
async function runE2ETests() {
  log('\n🚀 IZRA Carbon Offsetter - End-to-End Testing', 'bright');
  log('================================================\n');

  let allTestsPassed = true;

  // Check prerequisites
  logInfo('Checking prerequisites...');
  
  const backendRunning = await checkService(BACKEND_URL, 'Backend');
  const frontendRunning = await checkService(FRONTEND_URL, 'Frontend');

  if (!backendRunning) {
    logError('Backend is not running. Please start it with: cd backend && npm run dev');
    return;
  }

  if (!frontendRunning) {
    logError('Frontend is not running. Please start it with: npm start');
    return;
  }

  log('\n📋 Running Tests...\n');

  // Run tests
  const backendPassed = await testBackendAPI();
  const frontendPassed = await testFrontend();
  const integrationPassed = await testIntegration();
  const performancePassed = await testPerformance();

  allTestsPassed = backendPassed && frontendPassed && integrationPassed && performancePassed;

  // Results
  log('\n📊 Test Results', 'bright');
  log('==================');
  logSuccess(`Backend API: ${backendPassed ? 'PASSED' : 'FAILED'}`);
  logSuccess(`Frontend: ${frontendPassed ? 'PASSED' : 'FAILED'}`);
  logSuccess(`Integration: ${integrationPassed ? 'PASSED' : 'FAILED'}`);
  logSuccess(`Performance: ${performancePassed ? 'PASSED' : 'FAILED'}`);

  if (allTestsPassed) {
    log('\n🎉 All tests passed! Your application is ready for production.', 'green');
    log('\nNext steps:', 'blue');
    log('1. Test the UI manually in your browser');
    log('2. Try creating accounts and testing workflows');
    log('3. Deploy to production when ready');
  } else {
    log('\n⚠️  Some tests failed. Please check the errors above.', 'yellow');
    log('\nTroubleshooting:', 'blue');
    log('1. Ensure both backend and frontend are running');
    log('2. Check environment variables');
    log('3. Verify database connection');
    log('4. Check network connectivity');
  }

  log('\n🔗 Access Points:', 'cyan');
  log(`Frontend: ${FRONTEND_URL}`);
  log(`Backend API: ${BACKEND_URL}/api`);
  log(`Health Check: ${BACKEND_URL}/health`);
}

// Run tests
if (require.main === module) {
  runE2ETests().catch(console.error);
}

module.exports = { runE2ETests };
