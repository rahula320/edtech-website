// Basic Express server for Vercel
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const db = require('./server/config/db');

// Import API routes
const apiRoutes = require('./server/routes/api');

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database on startup
(async function() {
  try {
    const isConnected = await db.testConnection();
    if (isConnected) {
      await db.initDatabase();
    }
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
})();

// Use API routes
app.use('/api', apiRoutes);

// Root endpoint for basic health check - serving a simple HTML page
app.get('/', (req, res) => {
  // Check if we're running in production with React frontend
  if (process.env.NODE_ENV === 'production') {
    try {
      const staticPath = path.join(__dirname, 'client/build');
      return res.sendFile(path.join(staticPath, 'index.html'));
    } catch (error) {
      console.error('Error serving React app:', error);
    }
  }

  // Fallback to our simple HTML page
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACMYX Platform</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        background-color: #f7f9fc;
      }
      h1 {
        color: #2563eb;
        margin-bottom: 1rem;
      }
      .card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .button {
        display: inline-block;
        background-color: #2563eb;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-decoration: none;
        margin-right: 0.5rem;
        margin-top: 1rem;
      }
      .button:hover {
        background-color: #1d4ed8;
      }
      .status {
        padding: 0.5rem;
        background-color: #dcfce7;
        border-radius: 4px;
        display: inline-block;
        color: #166534;
      }
    </style>
  </head>
  <body>
    <h1>ACMYX Education Platform</h1>
    
    <div class="card">
      <h2>Server Status</h2>
      <p>The server is currently <span class="status">Online</span></p>
      <p>Server time: ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="card">
      <h2>Admin Access</h2>
      <p>Access the admin dashboard to manage courses, users, and settings.</p>
      <a href="/admin" class="button">Go to Admin Dashboard</a>
      <p>Please use the configured admin credentials.</p>
    </div>
    
    <div class="card">
      <h2>API Endpoints</h2>
      <p>The following API endpoints are available:</p>
      <ul>
        <li><a href="/api/health">/api/health</a> - Check server health</li>
        <li>/api/admin/login - Admin login endpoint (POST)</li>
        <li>/api/admin/status - Check admin authentication status</li>
        <li>/api/admin/logout - Admin logout endpoint</li>
        <li>/api/applications - Get all applications</li>
        <li>/api/applications/mentor - Get mentor applications</li>
        <li>/api/applications/bda - Get BDA applications</li>
      </ul>
    </div>
  </body>
  </html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files if client/build exists
  try {
    const staticPath = path.join(__dirname, 'client/build');
    app.use(express.static(staticPath));
    
    // All remaining requests return the React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(staticPath, 'index.html'));
    });
  } catch (error) {
    console.error('Error serving static files:', error);
  }
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