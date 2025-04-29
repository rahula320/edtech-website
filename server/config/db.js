const { Sequelize } = require('sequelize');
require('dotenv').config();

// Get environment
const isProduction = process.env.NODE_ENV === 'production';

// Log the environment
console.log(`Running in ${isProduction ? 'production' : 'development'} environment`);

// Database connection string - prioritize environment variable
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_K0kMEJpBm5eo@ep-royal-smoke-a8mn67cm-pooler.eastus2.azure.neon.tech/neondb?sslmode=require';

// Create Sequelize instance with appropriate SSL settings based on environment
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // This might need to be true in production
    }
  },
  logging: isProduction ? false : console.log,
  // Optimize for serverless environment
  pool: {
    max: 2, // Reduce connection pool size for serverless
    min: 0,
    idle: 0, // No idle time
    acquire: 30000,
    evict: 1000 // Run eviction checks more frequently
  }
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