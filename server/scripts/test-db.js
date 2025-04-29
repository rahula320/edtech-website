require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

async function testConnection() {
  try {
    const connectionString = process.env.MONGODB_URI;
    
    if (!connectionString) {
      console.error('MongoDB connection string is not defined in environment variables');
      process.exit(1);
    }
    
    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`Successfully connected to MongoDB: ${mongoose.connection.host}`);
    console.log('Database name:', mongoose.connection.db.databaseName);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Disconnect after testing
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
}

testConnection(); 