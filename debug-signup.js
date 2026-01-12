// Debug script to test registration exactly as the frontend would send it
const http = require('http');

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

async function testRegistration() {
  console.log('🧪 Testing Registration with various scenarios...\n');

  const testCases = [
    {
      name: 'Valid Registration',
      data: {
        email: 'debug@test.com',
        password: 'test123',
        role: 'buyer',
        profile: {
          fullName: 'Debug User',
          phone: '',
          country: 'UAE'
        }
      }
    },
    {
      name: 'Empty Email',
      data: {
        email: '',
        password: 'test123',
        role: 'buyer',
        profile: {
          fullName: 'Debug User',
          phone: '',
          country: 'UAE'
        }
      }
    },
    {
      name: 'Short Password',
      data: {
        email: 'debug2@test.com',
        password: '123',
        role: 'buyer',
        profile: {
          fullName: 'Debug User',
          phone: '',
          country: 'UAE'
        }
      }
    },
    {
      name: 'Empty Name',
      data: {
        email: 'debug3@test.com',
        password: 'test123',
        role: 'buyer',
        profile: {
          fullName: '',
          phone: '',
          country: 'UAE'
        }
      }
    },
    {
      name: 'Invalid Email',
      data: {
        email: 'invalid-email',
        password: 'test123',
        role: 'buyer',
        profile: {
          fullName: 'Debug User',
          phone: '',
          country: 'UAE'
        }
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`📝 Testing: ${testCase.name}`);
    console.log(`📤 Data:`, JSON.stringify(testCase.data, null, 2));
    
    try {
      const response = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, testCase.data);

      console.log(`📥 Status: ${response.statusCode}`);
      console.log(`📥 Response:`, response.body);
      
      if (response.statusCode === 201) {
        console.log('✅ SUCCESS');
      } else {
        console.log('❌ FAILED');
        
        // Try to parse error details
        try {
          const errorData = JSON.parse(response.body);
          if (errorData.errors) {
            console.log('🔍 Validation Errors:');
            errorData.errors.forEach(err => {
              console.log(`   - ${err.field}: ${err.message}`);
            });
          }
        } catch (e) {
          // Could not parse error details
        }
      }
    } catch (error) {
      console.log(`💥 Network Error: ${error.message}`);
    }
    
    console.log('---\n');
  }
}

// Run the test
testRegistration().catch(console.error);
