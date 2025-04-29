const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database connection string
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_K0kMEJpBm5eo@ep-royal-smoke-a8mn67cm-pooler.eastus2.azure.neon.tech/neondb?sslmode=require';

// Log database connection attempt
console.log(`Attempting to connect to database with ${connectionString.includes('postgresql') ? 'PostgreSQL' : 'unknown'} connection string...`);

// Create Sequelize instance with correct SSL configuration for both development and production
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection
}; 