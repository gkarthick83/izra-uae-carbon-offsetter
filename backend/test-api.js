// Simple API test script
const http = require('http');

// Helper function to make HTTP requests
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

// Test the API endpoints
async function testAPI() {
  console.log('🚀 Testing IZRA Backend API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/health',
      method: 'GET'
    });
    console.log(`Status: ${healthResponse.statusCode}`);
    console.log(`Response: ${healthResponse.body}\n`);

    // Test user registration
    console.log('2. Testing user registration...');
    const registerData = {
      email: 'testuser@example.com',
      password: '123456',
      role: 'buyer',
      profile: {
        fullName: 'Test User',
        country: 'UAE'
      }
    };

    const registerResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, registerData);
    console.log(`Status: ${registerResponse.statusCode}`);
    console.log(`Response: ${registerResponse.body}\n`);

    // Parse the response to get tokens
    const registerResult = JSON.parse(registerResponse.body);
    let accessToken = '';
    if (registerResult.success && registerResult.data.tokens) {
      accessToken = registerResult.data.tokens.accessToken;
      console.log('✅ Registration successful! Token received.\n');
    }

    // Test user login
    console.log('3. Testing user login...');
    const loginData = {
      email: 'testuser@example.com',
      password: '123456'
    };

    const loginResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, loginData);
    console.log(`Status: ${loginResponse.statusCode}`);
    console.log(`Response: ${loginResponse.body}\n`);

    // Get the access token from login
    const loginResult = JSON.parse(loginResponse.body);
    if (loginResult.success && loginResult.data.tokens) {
      accessToken = loginResult.data.tokens.accessToken;
      console.log('✅ Login successful! Token received.\n');
    }

    // Test protected endpoint
    console.log('4. Testing protected endpoint (get user profile)...');
    if (accessToken) {
      const profileResponse = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/me',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`Status: ${profileResponse.statusCode}`);
      console.log(`Response: ${profileResponse.body}\n`);
    } else {
      console.log('❌ No access token available for protected endpoint test.\n');
    }

    // Test public endpoints
    console.log('5. Testing public endpoints...');
    
    // Test projects endpoint
    const projectsResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/projects',
      method: 'GET'
    });
    console.log(`Projects endpoint - Status: ${projectsResponse.statusCode}`);
    console.log(`Response: ${projectsResponse.body}\n`);

    // Test marketplace credits endpoint
    const marketplaceResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/marketplace/credits',
      method: 'GET'
    });
    console.log(`Marketplace credits endpoint - Status: ${marketplaceResponse.statusCode}`);
    console.log(`Response: ${marketplaceResponse.body}\n`);

    console.log('🎉 API testing completed!');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.log('\n💡 Make sure the backend server is running on port 5000');
  }
}

// Run the tests
testAPI();
