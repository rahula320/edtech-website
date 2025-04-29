const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database connection string
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_K0kMEJpBm5eo@ep-royal-smoke-a8mn67cm-pooler.eastus2.azure.neon.tech/neondb?sslmode=require';

// Create Sequelize instance
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false // Set to console.log to see the SQL queries
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