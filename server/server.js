require('dotenv').config();

// Remove email/admin logging
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Import database configuration
const { testConnection, sequelize } = require('./config/db');
const Contact = require('./models/Contact');

// Import routes
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://edtech-website.vercel.app', 
        'https://acmyx.com', 
        'https://www.acmyx.com',
        'https://api-edtech-website.vercel.app',
        'https://api.acmyx.com',
        'https://server-eta-weld.vercel.app',
        'https://server-rjkb53sbe-acmyxs-projects.vercel.app',
        /\.vercel\.app$/  // Allow all vercel.app subdomains
      ] 
    : ['http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:3000', '0.0.0.0'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// In-memory users storage
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$rrCvVeuUJ.UYnKpTG7Zw4esrTcUeGUzBHkJOIQu1xwY.rYVQUNnwu', // admin123
    email: 'admin@acmyx.com',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User'
  }
];

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      // Find user in memory
      const user = users.find(u => u.username === username);
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
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

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return done(null, false);
    }
    
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Remove email configuration and transporter setup

// Use routes
app.use('/api', apiRoutes);

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, college, domain, message } = req.body;
    
    // Log the contact request
    console.log('Contact form submission:', { name, email, phone, college, domain, message });
    
    // Validate required fields
    if (!name || !email || !phone || !college || !domain || !message) {
      console.log('Missing required fields:', { 
        name: !!name, 
        email: !!email, 
        phone: !!phone, 
        college: !!college, 
        domain: !!domain, 
        message: !!message 
      });
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    console.log('Contact form validation passed, creating record...');
    
    try {
      // Save to database
      const newContact = await Contact.create({
        name,
        email,
        phone,
        college,
        domain,
        message,
        status: 'new'
      });
      
      console.log('Contact saved to database with ID:', newContact.id);
      
      res.json({ success: true, message: 'Message received and saved successfully' });
    } catch (dbError) {
      console.error('Database error while saving contact:', dbError);
      res.status(500).json({ 
        success: false, 
        message: 'Error saving to database. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
    }
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.username === username || u.email === email);
    
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user in memory
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'student',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, user: req.user });
});

app.get('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ success: true });
  });
});

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is running'
  });
});

// Root endpoint for basic health check - serving a simple HTML page
app.get('/', (req, res) => {
  // Check if we're running in production with React frontend
  if (process.env.NODE_ENV === 'production') {
    try {
      const staticPath = path.join(__dirname, '../client/build');
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
      <h2>API Endpoints</h2>
      <p>The following API endpoints are available:</p>
      <ul>
        <li><a href="/api/health">/api/health</a> - Check server health</li>
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
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Function to start the server
async function startServer() {
  try {
    // Test database connection
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Database connection failed, server may not function correctly.');
    }
    
    // Sync database models with database
    await sequelize.sync();
    console.log('Database synchronized successfully.');
    
    // Get port from environment or default to 3001
    const PORT = process.env.PORT || 3001;
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

// Start the server only in non-Vercel environments
if (!process.env.VERCEL) {
  startServer();
}

// Export the Express app for Vercel
module.exports = app; 