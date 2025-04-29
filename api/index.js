// This file serves as a serverless entry point for Vercel
const app = require('../server/server');

// Export the Express app as a serverless function
module.exports = app; 