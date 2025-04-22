require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Import Appwrite configuration
const { 
  databases, 
  databaseId, 
  usersCollectionId, 
  coursesCollectionId, 
  contactsCollectionId, 
  ID, 
  Query 
} = require('./config/appwrite');

const app = express();

// Middleware
app.use(cors());
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

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
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
    
    // Save to Appwrite
    await databases.createDocument(
      databaseId,
      contactsCollectionId,
      ID.unique(),
      {
        name,
        email,
        message,
        createdAt: new Date().toISOString()
      }
    );
    
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
    const existingUsers = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal('$or', [
        { username },
        { email }
      ])]
    );
    
    if (existingUsers.documents.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user in Appwrite
    await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'student',
        createdAt: new Date().toISOString()
      }
    );
    
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
    const courses = await databases.listDocuments(
      databaseId,
      coursesCollectionId,
      [Query.equal('status', 'published')]
    );
    
    // Get instructor details for each course
    const coursesWithInstructors = await Promise.all(
      courses.documents.map(async (course) => {
        const instructor = await databases.getDocument(
          databaseId,
          usersCollectionId,
          course.instructor
        );
        
        return {
          ...course,
          instructor: {
            $id: instructor.$id,
            username: instructor.username,
            firstName: instructor.firstName,
            lastName: instructor.lastName
          }
        };
      })
    );
    
    res.json({ success: true, courses: coursesWithInstructors });
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await databases.getDocument(
      databaseId,
      coursesCollectionId,
      req.params.id
    );
    
    // Get instructor details
    const instructor = await databases.getDocument(
      databaseId,
      usersCollectionId,
      course.instructor
    );
    
    // Get enrolled students details if they exist
    let enrolledStudents = [];
    if (course.enrolledStudents && course.enrolledStudents.length > 0) {
      enrolledStudents = await Promise.all(
        course.enrolledStudents.map(async (studentId) => {
          const student = await databases.getDocument(
            databaseId,
            usersCollectionId,
            studentId
          );
          
          return {
            $id: student.$id,
            username: student.username,
            firstName: student.firstName,
            lastName: student.lastName
          };
        })
      );
    }
    
    const courseWithDetails = {
      ...course,
      instructor: {
        $id: instructor.$id,
        username: instructor.username,
        firstName: instructor.firstName,
        lastName: instructor.lastName
      },
      enrolledStudents
    };
    
    res.json({ success: true, course: courseWithDetails });
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
    
    // Create course in Appwrite
    const course = await databases.createDocument(
      databaseId,
      coursesCollectionId,
      ID.unique(),
      {
        title,
        description,
        instructor: req.user.$id,
        price,
        duration,
        level,
        topics,
        status: 'published',
        enrolledStudents: [],
        createdAt: new Date().toISOString()
      }
    );
    
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
    appwrite: 'Connected'
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
    console.log('Server connections closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Performing graceful shutdown...');
  server.close(() => {
    console.log('Server connections closed.');
    process.exit(0);
  });
}); 