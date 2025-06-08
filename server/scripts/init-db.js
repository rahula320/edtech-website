const { sequelize } = require('../models');

// Function to synchronize models with the database
const initializeDatabase = async () => {
  try {
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully');
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Run the initialization
initializeDatabase(); 