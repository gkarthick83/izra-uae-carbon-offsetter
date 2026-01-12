// Test MongoDB integration
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Project = require('./src/models/Project');

async function testMongoDB() {
  console.log('🔍 Testing MongoDB Integration...\n');

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/izra-carbon-offsetter');
    console.log('✅ Connected to MongoDB successfully');

    // Test creating a user
    console.log('\n1. Creating test user...');
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('test123', 12);
    
    const testUser = await User.create({
      email: `mongodb-test-${Date.now()}@example.com`,
      password: hashedPassword,
      role: 'buyer',
      profile: {
        fullName: 'MongoDB Test User',
        country: 'UAE'
      }
    });
    console.log(`✅ User created: ${testUser.email}`);

    // Test creating a project
    console.log('\n2. Creating test project...');
    const testProject = await Project.create({
      sellerId: testUser._id,
      projectName: 'MongoDB Test Project',
      projectType: 'mangrove',
      location: {
        emirate: 'dubai',
        region: 'Test Region'
      },
      totalCredits: 500,
      availableCredits: 500,
      pricing: {
        AED: 25,
        USD: 6.8,
        USDT: 6.8
      },
      description: 'Test project for MongoDB integration'
    });
    console.log(`✅ Project created: ${testProject.projectName}`);

    // Test querying
    console.log('\n3. Querying data...');
    const users = await User.find({});
    const projects = await Project.find({});
    
    console.log(`✅ Found ${users.length} users`);
    console.log(`✅ Found ${projects.length} projects`);

    // Test user-project relationship
    console.log('\n4. Testing relationships...');
    const userWithProjects = await User.findById(testUser._id);
    const projectWithSeller = await Project.findById(testProject._id).populate('sellerId', 'email profile.fullName');
    
    console.log(`✅ User: ${userWithProjects.email}`);
    console.log(`✅ Project seller: ${projectWithSeller.sellerId.email}`);

    // Cleanup test data
    console.log('\n5. Cleaning up test data...');
    await User.deleteOne({ _id: testUser._id });
    await Project.deleteOne({ _id: testProject._id });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 MongoDB integration test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
    console.log('\n💡 Make sure MongoDB is running on localhost:27017');
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

// Run the test
testMongoDB();
