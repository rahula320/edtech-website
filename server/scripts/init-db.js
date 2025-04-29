const { sequelize, testConnection } = require('../config/db');
const Contact = require('../models/Contact');

// Function to synchronize models with the database
const initializeDatabase = async () => {
  try {
    // Test the connection first
    const connected = await testConnection();
    if (!connected) {
      console.error('Database connection failed. Cannot initialize tables.');
      process.exit(1);
    }

    // Sync all models
    console.log('Synchronizing database models...');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');

    // Log model information
    console.log('Models initialized:');
    console.log('- Contacts table created/updated');

    process.exit(0);
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

// Run the initialization
initializeDatabase(); 