/**
 * API Routes for the ACMYX application
 * Using Neon PostgreSQL database
 */

const express = require('express');
const router = express.Router();
const { sql, updateAdminPassword } = require('../config/db');

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is running',
    endpoints: [
      '/api/health',
      '/api/applications',
      '/api/applications/mentor',
      '/api/applications/bda'
    ]
  });
});

// Get all applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await sql`SELECT * FROM applications ORDER BY timestamp DESC`;
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Submit a mentor application
router.post('/applications/mentor', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      company,
      designation,
      experience,
      education,
      domains,
      resumeUrl,
      portfolioUrl
    } = req.body;

    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full name and email are required' });
    }

    const result = await sql`
      INSERT INTO applications (
        type, full_name, email, phone, company, designation, 
        experience, education, domains, resume_url, portfolio_url
      ) VALUES (
        'mentor', ${fullName}, ${email}, ${phone}, ${company}, ${designation}, 
        ${experience}, ${education}, ${domains}, ${resumeUrl}, ${portfolioUrl}
      ) RETURNING id
    `;

    res.status(201).json({
      success: true,
      message: 'Mentor application submitted successfully',
      applicationId: result[0].id
    });
  } catch (error) {
    console.error('Error submitting mentor application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Submit a BDA application
router.post('/applications/bda', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      education,
      resumeUrl
    } = req.body;

    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full name and email are required' });
    }

    const result = await sql`
      INSERT INTO applications (
        type, full_name, email, phone, education, resume_url
      ) VALUES (
        'bda', ${fullName}, ${email}, ${phone}, ${education}, ${resumeUrl}
      ) RETURNING id
    `;

    res.status(201).json({
      success: true,
      message: 'BDA application submitted successfully',
      applicationId: result[0].id
    });
  } catch (error) {
    console.error('Error submitting BDA application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Admin login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find the admin user with password hashing
    const users = await sql`
      SELECT id, email, password, role, first_name, last_name 
      FROM users 
      WHERE email = ${email} AND role = 'admin'
    `;
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Verify the password using bcrypt
    const bcrypt = require('bcryptjs');
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Set session data
    if (req.session) {
      req.session.isAdmin = true;
      req.session.adminId = user.id;
      req.session.adminEmail = user.email;
      req.session.adminRole = user.role;
    }
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Login failed due to server error' });
  }
});

// Check admin status
router.get('/admin/status', async (req, res) => {
  try {
    // Check if the user is authenticated via session
    if (!req.session || !req.session.isAdmin || !req.session.adminEmail) {
      return res.status(401).json({ 
        isAdmin: false,
        message: 'No active admin session found'
      });
    }
    
    // Retrieve the admin user from the database to confirm they still exist and have admin privileges
    const users = await sql`
      SELECT id, email, role, first_name, last_name 
      FROM users 
      WHERE email = ${req.session.adminEmail} AND role = 'admin'
    `;
    
    if (users.length === 0) {
      // Clear invalid session
      if (req.session) {
        req.session.destroy();
      }
      
      return res.status(401).json({
        isAdmin: false,
        message: 'Admin session is no longer valid'
      });
    }
    
    const user = users[0];
    
    res.status(200).json({ 
      isAdmin: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ error: 'Failed to check admin status due to server error' });
  }
});

// Reset admin password route - use this with caution
router.post('/admin/reset-password', async (req, res) => {
  try {
    // In production, this route should be secured or disabled
    const { email, newPassword, secretKey } = req.body;
    
    // Simple security check - in production use a more secure approach
    // The secretKey should match the SESSION_SECRET env var or another secure value
    if (secretKey !== (process.env.SESSION_SECRET || 'your-secret-key')) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email and new password are required' });
    }
    
    const success = await updateAdminPassword(email, newPassword);
    
    if (success) {
      res.status(200).json({ 
        success: true, 
        message: 'Admin password updated successfully' 
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Admin user not found or password update failed' 
      });
    }
  } catch (error) {
    console.error('Error in admin password reset:', error);
    res.status(500).json({ error: 'Password reset failed due to server error' });
  }
});

module.exports = router; 