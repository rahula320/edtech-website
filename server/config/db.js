const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;
    
    if (!connectionString) {
      console.error('MongoDB connection string is not defined in environment variables');
      process.exit(1);
    }
    
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection errors after initial connection
    mongoose.connection.on('error', err => {
      console.error(`MongoDB connection error: ${err}`);
    });
    
    // Handle when the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    // If Node process ends, close the MongoDB connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
      });
    });
    
    return conn;
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 