#!/usr/bin/env node

/**
 * Populate Test Data for IZRA Carbon Offsetter
 * This script creates sample users, projects, and data for testing
 */

const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:5000';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
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

// Store tokens for different users
const tokens = {};

// Register users
async function registerUsers() {
  logInfo('Registering demo users...');
  
  const users = [
    { email: 'admin@izra.com', password: 'admin123', role: 'admin', name: 'Admin User' },
    { email: 'seller@izra.com', password: 'seller123', role: 'seller', name: 'Seller User' },
    { email: 'buyer@izra.com', password: 'buyer123', role: 'buyer', name: 'Buyer User' },
    { email: 'investor@izra.com', password: 'investor123', role: 'investor', name: 'Investor User' },
    { email: 'sponsor@izra.com', password: 'sponsor123', role: 'sponsor', name: 'Sponsor User' }
  ];

  for (const user of users) {
    try {
      const response = await makeRequest({
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

      if (response.statusCode === 201) {
        logSuccess(`${user.role} registered: ${user.email}`);
      } else {
        log(`⚠️  ${user.role} registration: ${response.statusCode}`, 'yellow');
      }
    } catch (error) {
      log(`❌ ${user.role} registration failed: ${error.message}`, 'yellow');
    }
  }
}

// Login users and get tokens
async function loginUsers() {
  logInfo('Logging in users to get tokens...');
  
  const users = [
    { email: 'admin@izra.com', password: 'admin123', role: 'admin' },
    { email: 'seller@izra.com', password: 'seller123', role: 'seller' },
    { email: 'buyer@izra.com', password: 'buyer123', role: 'buyer' },
    { email: 'investor@izra.com', password: 'investor123', role: 'investor' },
    { email: 'sponsor@izra.com', password: 'sponsor123', role: 'sponsor' }
  ];

  for (const user of users) {
    try {
      const response = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, {
        email: user.email,
        password: user.password
      });

      if (response.statusCode === 200) {
        const data = JSON.parse(response.body);
        tokens[user.role] = data.data.tokens.accessToken;
        logSuccess(`${user.role} logged in`);
      } else {
        log(`⚠️  ${user.role} login failed: ${response.statusCode}`, 'yellow');
      }
    } catch (error) {
      log(`❌ ${user.role} login failed: ${error.message}`, 'yellow');
    }
  }
}

// Create sample projects
async function createProjects() {
  logInfo('Creating sample projects...');
  
  if (!tokens.seller) {
    log('❌ Seller token not available', 'yellow');
    return;
  }

  const projects = [
    {
      projectName: 'Dubai Mangrove Restoration',
      projectType: 'mangrove',
      location: { emirate: 'dubai', region: 'Dubai Marina' },
      totalCredits: 5000,
      availableCredits: 5000,
      pricing: { AED: 75, USD: 20.4, USDT: 20.4 },
      description: 'Large-scale mangrove restoration project in Dubai Marina focusing on coastal ecosystem restoration.'
    },
    {
      projectName: 'Abu Dhabi Solar Farm',
      projectType: 'solar',
      location: { emirate: 'abu-dhabi', region: 'Masdar City' },
      totalCredits: 10000,
      availableCredits: 10000,
      pricing: { AED: 50, USD: 13.6, USDT: 13.6 },
      description: 'Solar energy project in Masdar City generating clean energy and carbon credits.'
    },
    {
      projectName: 'Sharjah Desert Greening',
      projectType: 'afforestation',
      location: { emirate: 'sharjah', region: 'Central Sharjah' },
      totalCredits: 3000,
      availableCredits: 3000,
      pricing: { AED: 60, USD: 16.3, USDT: 16.3 },
      description: 'Desert afforestation initiative in Sharjah converting desert land into green spaces.'
    }
  ];

  for (const project of projects) {
    try {
      const response = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/projects',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.seller}`,
          'Content-Type': 'application/json'
        }
      }, project);

      if (response.statusCode === 201) {
        logSuccess(`Project created: ${project.projectName}`);
      } else {
        log(`⚠️  Project creation failed: ${response.statusCode}`, 'yellow');
      }
    } catch (error) {
      log(`❌ Project creation failed: ${error.message}`, 'yellow');
    }
  }
}

// Create sample sponsorships
async function createSponsorships() {
  logInfo('Creating sample sponsorships...');
  
  if (!tokens.sponsor) {
    log('❌ Sponsor token not available', 'yellow');
    return;
  }

  const sponsorships = [
    {
      sponsorshipType: 'tree_planting',
      treeCount: 100,
      location: { emirate: 'dubai', zone: 'Al Qudra' },
      totalAmount: 5000,
      currency: 'USD',
      plantingDetails: {
        treeSpecies: ['mangrove', 'ghaf'],
        plantingDate: new Date().toISOString(),
        expectedGrowth: '2-3 years'
      }
    },
    {
      sponsorshipType: 'tree_planting',
      treeCount: 50,
      location: { emirate: 'abu-dhabi', zone: 'Al Ain' },
      totalAmount: 2500,
      currency: 'USD',
      plantingDetails: {
        treeSpecies: ['date_palm', 'neem'],
        plantingDate: new Date().toISOString(),
        expectedGrowth: '1-2 years'
      }
    }
  ];

  for (const sponsorship of sponsorships) {
    try {
      const response = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/sponsorships',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.sponsor}`,
          'Content-Type': 'application/json'
        }
      }, sponsorship);

      if (response.statusCode === 201) {
        logSuccess(`Sponsorship created: ${sponsorship.treeCount} trees`);
      } else {
        log(`⚠️  Sponsorship creation failed: ${response.statusCode}`, 'yellow');
      }
    } catch (error) {
      log(`❌ Sponsorship creation failed: ${error.message}`, 'yellow');
    }
  }
}

// Create sample investments
async function createInvestments() {
  logInfo('Creating sample investments...');
  
  if (!tokens.investor) {
    log('❌ Investor token not available', 'yellow');
    return;
  }

  const investments = [
    {
      investmentType: 'equity',
      amount: 50000,
      currency: 'USD',
      expectedReturns: { annualReturnRate: 15 },
      riskAssessment: { riskLevel: 'medium' },
      debtDetails: { termMonths: 60 }
    },
    {
      investmentType: 'debt',
      amount: 25000,
      currency: 'USD',
      expectedReturns: { annualReturnRate: 12 },
      riskAssessment: { riskLevel: 'low' },
      debtDetails: { termMonths: 36 }
    }
  ];

  for (const investment of investments) {
    try {
      const response = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/investments',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.investor}`,
          'Content-Type': 'application/json'
        }
      }, investment);

      if (response.statusCode === 201) {
        logSuccess(`Investment created: $${investment.amount} ${investment.investmentType}`);
      } else {
        log(`⚠️  Investment creation failed: ${response.statusCode}`, 'yellow');
      }
    } catch (error) {
      log(`❌ Investment creation failed: ${error.message}`, 'yellow');
    }
  }
}

// Show data summary
async function showDataSummary() {
  logInfo('Checking data summary...');
  
  try {
    // Check projects
    const projectsResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/projects',
      method: 'GET'
    });

    if (projectsResponse.statusCode === 200) {
      const data = JSON.parse(projectsResponse.body);
      logSuccess(`Projects: ${data.data.projects.length} created`);
    }

    // Check marketplace credits
    const creditsResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/marketplace/credits',
      method: 'GET'
    });

    if (creditsResponse.statusCode === 200) {
      const data = JSON.parse(creditsResponse.body);
      logSuccess(`Available Credits: ${data.data.credits.length} listings`);
    }

    // Check sponsorships
    if (tokens.sponsor) {
      const sponsorshipsResponse = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/sponsorships',
        method: 'GET',
        headers: { 'Authorization': `Bearer ${tokens.sponsor}` }
      });

      if (sponsorshipsResponse.statusCode === 200) {
        const data = JSON.parse(sponsorshipsResponse.body);
        logSuccess(`Sponsorships: ${data.data.sponsorships?.length || 0} created`);
      }
    }

    // Check investments
    if (tokens.investor) {
      const investmentsResponse = await makeRequest({
        hostname: 'localhost',
        port: 5000,
        path: '/api/investments',
        method: 'GET',
        headers: { 'Authorization': `Bearer ${tokens.investor}` }
      });

      if (investmentsResponse.statusCode === 200) {
        const data = JSON.parse(investmentsResponse.body);
        logSuccess(`Investments: ${data.data.investments?.length || 0} created`);
      }
    }

  } catch (error) {
    log(`❌ Error checking data: ${error.message}`, 'yellow');
  }
}

// Main function
async function populateData() {
  log('\n🌱 IZRA Carbon Offsetter - Test Data Population', 'cyan');
  log('================================================\n');

  try {
    await registerUsers();
    await loginUsers();
    await createProjects();
    await createSponsorships();
    await createInvestments();
    await showDataSummary();

    log('\n🎉 Test data population completed!', 'green');
    log('\nDemo Credentials:', 'blue');
    log('Admin: admin@izra.com / admin123', 'blue');
    log('Seller: seller@izra.com / seller123', 'blue');
    log('Buyer: buyer@izra.com / buyer123', 'blue');
    log('Investor: investor@izra.com / investor123', 'blue');
    log('Sponsor: sponsor@izra.com / sponsor123', 'blue');
    
    log('\nNext steps:', 'blue');
    log('1. Test login with these credentials', 'blue');
    log('2. Browse projects at http://localhost:5000/api/projects', 'blue');
    log('3. Test marketplace functionality', 'blue');
    log('4. Check database with: mongo izra-carbon-offsetter', 'blue');

  } catch (error) {
    log(`\n❌ Population failed: ${error.message}`, 'yellow');
    log('\nTroubleshooting:', 'yellow');
    log('1. Ensure backend is running on port 5000', 'yellow');
    log('2. Check MongoDB is running', 'yellow');
    log('3. Verify network connectivity', 'yellow');
  }
}

// Run the script
if (require.main === module) {
  populateData().catch(console.error);
}

module.exports = { populateData };
