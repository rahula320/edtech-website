const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edtech', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle MongoDB connection events
    mongoose.connection.on('error', err => {
      console.error('MongoDB Connection Error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB Disconnected. Attempting to reconnect...');
      setTimeout(connectDB, 5000);
    });
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Retry connection after delay
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB; 