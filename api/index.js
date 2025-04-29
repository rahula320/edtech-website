// This file serves as a serverless entry point for Vercel
require('dotenv').config();

// Set the Vercel flag to identify serverless environment
process.env.VERCEL = '1'; 

// Import the Express app
const app = require('../server/server');

// Export the Express app as a serverless function
module.exports = app; 