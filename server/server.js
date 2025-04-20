require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

// Import database connection
const connectDB = require('./config/db');

// Import models
const User = require('./models/User');
const Contact = require('./models/Contact');
const Course = require('./models/Course');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/edtech',
    ttl: 24 * 60 * 60 // 1 day
  }),
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      
      const isValid = await user.comparePassword(password);
      if (!isValid) return done(null, false, { message: 'Incorrect password.' });
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    // Create user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName
    });
    
    await user.save();
    
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

// Course routes
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find({ status: 'published' })
      .populate('instructor', 'username firstName lastName')
      .select('-enrolledStudents');
    
    res.json({ success: true, courses });
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'username firstName lastName')
      .populate('enrolledStudents', 'username firstName lastName');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({ success: true, course });
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Error fetching course' });
  }
});

app.post('/api/courses', async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'instructor') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  
  try {
    const { title, description, price, duration, level, topics } = req.body;
    
    const course = new Course({
      title,
      description,
      instructor: req.user._id,
      price,
      duration,
      level,
      topics
    });
    
    await course.save();
    
    res.json({ success: true, course });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: 'Error creating course' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Any request that doesn't match the above should send the index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Performing graceful shutdown...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server and MongoDB connections closed.');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Performing graceful shutdown...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server and MongoDB connections closed.');
      process.exit(0);
    });
  });
}); 