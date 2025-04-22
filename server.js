// Basic Express server for Vercel
const express = require('express');
const path = require('path');
const cors = require('cors');

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint for basic health check
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Admin login endpoint with no database dependency
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple hardcoded check for admin credentials
  if (email === 'admin@acmyx.com' && password === 'admin123') {
    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      admin: { email, role: 'admin' }
    });
  }
  
  return res.status(401).json({
    success: false,
    message: 'Invalid admin credentials'
  });
});

// Admin status check endpoint
app.get('/api/admin/status', (req, res) => {
  // In a real app, this would check session state
  // For now, we'll just return a successful response for testing
  return res.status(200).json({ isAdmin: true });
});

// Admin logout endpoint
app.get('/api/admin/logout', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Admin logged out successfully'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // All remaining requests return the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Server error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Export the Express app for serverless
module.exports = app;

// Start server if not in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} 