// Simple MongoDB test
const mongoose = require('mongoose');

async function simpleTest() {
  console.log('🔍 Simple MongoDB Test...\n');

  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/test-db');
    console.log('✅ Connected to MongoDB');

    // Test basic schema
    const testSchema = new mongoose.Schema({
      name: String,
      value: Number
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    // Clear existing data
    await TestModel.deleteMany({});
    
    // Create test document
    const doc = await TestModel.create({
      name: 'Test Document',
      value: 42
    });
    
    console.log(`✅ Created document: ${doc.name}`);
    
    // Query document
    const found = await TestModel.findOne({});
    console.log(`✅ Found document: ${found.name}, value: ${found.value}`);
    
    // Clean up
    await TestModel.deleteMany({});
    console.log('✅ Cleaned up test data');
    
    console.log('\n🎉 Simple MongoDB test passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

simpleTest();
