require('dotenv').config();

// Log loaded environment variables for debugging
console.log('ADMIN_EMAIL loaded:', process.env.ADMIN_EMAIL ? 'Yes' : 'No');
console.log('ADMIN_PASSWORD loaded:', process.env.ADMIN_PASSWORD ? 'Yes' : 'No');

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Import database connection
const db = require('./config/db');
const { createTables } = require('./config/create-tables');

// Import routes
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://acmyx.vercel.app'],
  credentials: true
}));
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
      // Find user in database
      const users = await db.sql`
        SELECT * FROM users WHERE username = ${username}
      `;
      
      if (users.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      const user = users[0];
      
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
    const users = await db.sql`
      SELECT * FROM users WHERE id = ${id}
    `;
    
    if (users.length === 0) {
      return done(null, false);
    }
    
    done(null, users[0]);
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

// Use routes
app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Save to database
    await db.sql`
      INSERT INTO contacts (name, email, message, created_at)
      VALUES (${name}, ${email}, ${message}, ${new Date().toISOString()})
    `;
    
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
    const existingUsers = await db.sql`
      SELECT * FROM users WHERE username = ${username} OR email = ${email}
    `;
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user in database
    await db.sql`
      INSERT INTO users (username, email, password, first_name, last_name, role, created_at)
      VALUES (${username}, ${email}, ${hashedPassword}, ${firstName}, ${lastName}, 'student', ${new Date().toISOString()})
    `;
    
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
    const courses = await db.sql`
      SELECT * FROM courses WHERE status = 'published'
    `;
    
    // Get instructor details for each course
    const coursesWithInstructors = await Promise.all(
      courses.map(async (course) => {
        const instructor = await db.sql`
          SELECT * FROM users WHERE id = ${course.instructor}
        `;
        
        return {
          ...course,
          instructor: {
            $id: instructor[0].id,
            username: instructor[0].username,
            firstName: instructor[0].firstName,
            lastName: instructor[0].lastName
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
    const course = await db.sql`
      SELECT * FROM courses WHERE id = ${req.params.id}
    `;
    
    // Get instructor details
    const instructor = await db.sql`
      SELECT * FROM users WHERE id = ${course[0].instructor}
    `;
    
    // Get enrolled students details if they exist
    let enrolledStudents = [];
    if (course[0].enrolledStudents && course[0].enrolledStudents.length > 0) {
      enrolledStudents = await Promise.all(
        course[0].enrolledStudents.map(async (studentId) => {
          const student = await db.sql`
            SELECT * FROM users WHERE id = ${studentId}
          `;
          
          return {
            $id: student[0].id,
            username: student[0].username,
            firstName: student[0].firstName,
            lastName: student[0].lastName
          };
        })
      );
    }
    
    const courseWithDetails = {
      ...course[0],
      instructor: {
        $id: instructor[0].id,
        username: instructor[0].username,
        firstName: instructor[0].firstName,
        lastName: instructor[0].lastName
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
    
    // Create course in database
    const course = await db.sql`
      INSERT INTO courses (title, description, instructor, price, duration, level, topics, status, enrolledStudents, created_at)
      VALUES (${title}, ${description}, ${req.user.id}, ${price}, ${duration}, ${level}, ${topics}, 'published', ${[]}, ${new Date().toISOString()})
      RETURNING *
    `;
    
    res.json({ success: true, course: course[0] });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: 'Error creating course' });
  }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(`Login attempt for email: ${email}`);
    
    // Find admin user in the database
    let adminUser = null;
    try {
      const admins = await db.sql`
        SELECT id, email, password, role, first_name, last_name FROM users 
        WHERE email = ${email} AND role = 'admin'
      `;
      
      if (admins.length === 0) {
        console.log(`Login failed: No admin found with email ${email}`);
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid admin credentials' 
        });
      }
      
      adminUser = admins[0];
      console.log('Admin user found in database');
    } catch (dbError) {
      console.error('Database error during admin lookup:', dbError);
      return res.status(500).json({ 
        success: false, 
        message: 'Authentication error' 
      });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, adminUser.password);
    if (!isValid) {
      console.log(`Login failed: Password mismatch for admin ${email}`);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid admin credentials' 
      });
    }

    // Login successful 
    console.log(`Admin login successful for ${email}`);
    
    // Set session
    req.session.isAdmin = true;
    req.session.adminEmail = adminUser.email;
    req.session.adminId = adminUser.id;
    req.session.adminRole = adminUser.role;

    // Save session before sending response
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Session error' 
        });
      }
      
      return res.json({ 
        success: true, 
        message: 'Admin login successful',
        admin: { 
          id: adminUser.id,
          email: adminUser.email, 
          role: adminUser.role,
          firstName: adminUser.first_name,
          lastName: adminUser.last_name
        }
      });
    });

  } catch (error) {
    console.error('Admin login route error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Admin status check endpoint
app.get('/api/admin/status', async (req, res) => {
  try {
    // Check if user is authenticated via session
    if (req.session && req.session.isAdmin && req.session.adminEmail) {
      console.log(`Admin status check: authenticated user ${req.session.adminEmail}`);
      
      // Get admin details from database
      try {
        const admins = await db.sql`
          SELECT id, email, role, first_name, last_name 
          FROM users 
          WHERE email = ${req.session.adminEmail} AND role = 'admin'
        `;
        
        if (admins.length === 0) {
          console.log(`Admin not found in database: ${req.session.adminEmail}`);
          return res.json({ 
            isAdmin: false, 
            message: 'Admin session invalid'
          });
        }
        
        const adminUser = admins[0];
        return res.json({ 
          isAdmin: true,
          admin: {
            id: adminUser.id,
            email: adminUser.email,
            role: adminUser.role,
            firstName: adminUser.first_name,
            lastName: adminUser.last_name
          }
        });
      } catch (dbError) {
        console.error('Database error during admin status check:', dbError);
        return res.status(500).json({ 
          isAdmin: false, 
          message: 'Database error' 
        });
      }
    }
    
    // Not authenticated
    return res.json({ 
      isAdmin: false, 
      message: 'Not authenticated' 
    });
    
  } catch (error) {
    console.error('Admin status check error:', error);
    res.status(500).json({ 
      isAdmin: false, 
      message: 'Server error'
    });
  }
});

// Admin logout endpoint
app.get('/api/admin/logout', (req, res) => {
  req.session.isAdmin = false;
  res.json({ success: true, message: 'Admin logged out successfully' });
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
    database: 'Connected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5003;

// Only initialize database if INIT_DB environment variable is set to 'true'
const shouldInitializeDb = process.env.INIT_DB === 'true';

// Function to start the server
async function startServer() {
  try {
    // Test DB connection but don't initialize tables by default
    await db.testConnection();
    
    // Only run initialization if explicitly enabled
    if (shouldInitializeDb) {
      await db.initDatabase();
      
      // Also create tables if we're initializing the database
      console.log('Creating database tables...');
      await createTables();
      console.log('Tables created successfully');
    } else {
      console.log('Skipping database initialization. Set INIT_DB=true to initialize tables.');
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 