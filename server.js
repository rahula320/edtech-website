require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Import Appwrite configuration with error handling
let databases, databaseId, usersCollectionId, coursesCollectionId, contactsCollectionId, adminsCollectionId, ID, Query;

try {
  const appwrite = require('./server/config/appwrite');
  ({ 
    databases, 
    databaseId, 
    usersCollectionId, 
    coursesCollectionId, 
    contactsCollectionId,
    adminsCollectionId,
    ID, 
    Query 
  } = appwrite);
  console.log('Appwrite configuration loaded successfully');
} catch (error) {
  console.error('Error loading Appwrite configuration:', error);
}

const app = express();

// CORS Configuration - updated with correct origins
const allowedOrigins = [
  // Local development
  'http://localhost:3000',
  // Vercel deployments - make sure to include all possible URLs
  'https://acmyx-r65i9vmte-edtechrk2319.vercel.app',
  'https://acmyx.vercel.app',
  'https://acmyx-qvrndma01-edtechrk2319.vercel.app',
  // Allow all subdomains of your Vercel deployment
  /^https:\/\/.*-edtechrk2319\.vercel\.app$/
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, or from the same Vercel serverless function)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in our allowed list
    const originAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (!originAllowed) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration - adapted for serverless
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
};

app.use(session(sessionConfig));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// Root endpoint for health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Add the original server logic imported from server/server.js
try {
  const serverLogic = require('./server/server');
  // All routes will be handled by the imported server
} catch (error) {
  console.error('Error importing server logic:', error);
  
  // Fallback passport configuration
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        if (!databases) {
          return done(new Error('Database connection not established'), false);
        }
        
        // Find user in Appwrite
        const users = await databases.listDocuments(
          databaseId,
          usersCollectionId,
          [Query.equal('username', username)]
        );
        
        if (users.documents.length === 0) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        
        const user = users.documents[0];
        
        // Compare passwords
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  
  passport.serializeUser((user, done) => done(null, user.$id));
  passport.deserializeUser(async (id, done) => {
    try {
      if (!databases) {
        return done(new Error('Database connection not established'), null);
      }
      
      const user = await databases.getDocument(
        databaseId,
        usersCollectionId,
        id
      );
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
  // Add a health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'OK',
      message: 'Server is running',
      appwrite: databases ? 'Connected' : 'Not connected',
      timestamp: new Date().toISOString()
    });
  });
  
  // Admin login endpoint
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!databases) {
        return res.status(500).json({ success: false, message: 'Database connection not established' });
      }
      
      // Check if admin credentials match expected values
      if (email !== 'admin@acmyx.com') {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      }
      
      // Hardcoded password check for initial setup
      const isValid = password === 'admin123';
      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      }
      
      // Create admin session
      req.session.isAdmin = true;
      
      return res.json({ 
        success: true, 
        message: 'Admin login successful',
        admin: { email, role: 'admin' }
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
}

// Serve static files from the client build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

// Create a fallback email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  }
});

// Export the Express app for serverless deployment
module.exports = app;

// Start the server for development/testing
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} 