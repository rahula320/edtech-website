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

// Get all applications (updated to combine results from both tables)
router.get('/applications', async (req, res) => {
  try {
    // Get mentor applications
    const mentorApplications = await sql`
      SELECT *, 'mentor' as type FROM mentor_applications ORDER BY timestamp DESC
    `;
    
    // Get BDA applications
    const bdaApplications = await sql`
      SELECT *, 'bda' as type FROM bda_applications ORDER BY timestamp DESC
    `;
    
    // Combine and sort by timestamp
    const allApplications = [...mentorApplications, ...bdaApplications]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.status(200).json(allApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get mentor applications
router.get('/applications/mentor', async (req, res) => {
  try {
    const applications = await sql`
      SELECT *, 'mentor' as type FROM mentor_applications ORDER BY timestamp DESC
    `;
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching mentor applications:', error);
    res.status(500).json({ error: 'Failed to fetch mentor applications' });
  }
});

// Get BDA applications
router.get('/applications/bda', async (req, res) => {
  try {
    const applications = await sql`
      SELECT *, 'bda' as type FROM bda_applications ORDER BY timestamp DESC
    `;
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching BDA applications:', error);
    res.status(500).json({ error: 'Failed to fetch BDA applications' });
  }
});

// Submit a mentor application
router.post('/applications/mentor', async (req, res) => {
  try {
    console.log('Received mentor application data:', req.body);
    
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

    // Process domains field correctly - store as an array
    let domainsArray = [];
    if (domains) {
      if (Array.isArray(domains)) {
        domainsArray = domains;
      } else if (typeof domains === 'string') {
        domainsArray = domains.split(',').map(domain => domain.trim());
      }
    }
    
    // Convert to PostgreSQL array format
    const domainsStr = domainsArray.map(domain => `"${domain}"`).join(',');
    const domainsArrayStr = `{${domainsStr}}`;

    console.log('Saving mentor application with data:', { 
      fullName, email, phone, company, designation, 
      experience, education, domains: domainsArray
    });

    // Parse experience to integer if it's a string
    let experienceValue = 0;
    if (experience) {
      if (typeof experience === 'string') {
        experienceValue = parseInt(experience) || 0;
      } else if (typeof experience === 'number') {
        experienceValue = experience;
      }
    }

    // Insert application into mentor_applications table
    const result = await sql`
      INSERT INTO mentor_applications (
        full_name, email, phone, company, designation, 
        experience, education, domains, resume_url, portfolio_url
      ) VALUES (
        ${fullName || ''}, 
        ${email}, 
        ${phone || ''}, 
        ${company || ''}, 
        ${designation || ''}, 
        ${experienceValue}, 
        ${education || ''},
        ${domainsArrayStr}::text[],
        ${resumeUrl || ''}, 
        ${portfolioUrl || ''}
      ) RETURNING id
    `;

    console.log('Mentor application saved successfully:', result[0].id);

    res.status(201).json({
      success: true,
      message: 'Mentor application submitted successfully',
      applicationId: result[0].id
    });
  } catch (error) {
    console.error('Error submitting mentor application:', error);
    res.status(500).json({ 
      error: 'Failed to submit application', 
      details: error.message,
      stack: error.stack
    });
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
      experience,
      resumeUrl,
      portfolioUrl
    } = req.body;

    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full name and email are required', body: req.body });
    }

    // Parse experience to integer if it's a string
    let experienceValue = 0;
    if (experience) {
      if (typeof experience === 'string') {
        experienceValue = parseInt(experience) || 0;
      } else if (typeof experience === 'number') {
        experienceValue = experience;
      }
    }

    const result = await sql`
      INSERT INTO bda_applications (
        full_name, email, phone, education, 
        experience, resume_url, portfolio_url
      ) VALUES (
        ${fullName || req.body.full_name || ''}, 
        ${email}, 
        ${phone || ''}, 
        ${education || ''}, 
        ${experienceValue}, 
        ${resumeUrl || req.body.resume_url || ''}, 
        ${portfolioUrl || req.body.portfolio_url || ''}
      ) RETURNING id
    `;

    console.log('BDA application saved successfully:', result[0].id);

    res.status(201).json({
      success: true,
      message: 'BDA application submitted successfully',
      applicationId: result[0].id
    });
  } catch (error) {
    console.error('Error submitting BDA application:', error);
    res.status(500).json({ error: 'Failed to submit application', message: error.message });
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

// Delete multiple applications by IDs
router.delete('/applications/batch', async (req, res) => {
  try {
    const { ids, type } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Valid application IDs are required' });
    }
    
    if (!type || !['mentor', 'bda'].includes(type)) {
      return res.status(400).json({ error: 'Valid application type is required (mentor or bda)' });
    }
    
    console.log(`Deleting ${ids.length} ${type} applications with IDs:`, ids);
    
    let result;
    if (type === 'mentor') {
      result = await sql`
        DELETE FROM mentor_applications
        WHERE id IN ${sql(ids)}
        RETURNING id
      `;
    } else {
      result = await sql`
        DELETE FROM bda_applications
        WHERE id IN ${sql(ids)}
        RETURNING id
      `;
    }
    
    console.log(`Deleted ${result.length} applications`);
    
    res.status(200).json({
      success: true,
      message: `${result.length} applications deleted successfully`,
      deletedIds: result.map(item => item.id)
    });
  } catch (error) {
    console.error('Error deleting applications:', error);
    res.status(500).json({ error: 'Failed to delete applications', message: error.message });
  }
});

// Update application status
router.patch('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, type } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'Application ID is required' });
    }
    
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Valid status is required (pending, approved, or rejected)' });
    }
    
    if (!type || !['mentor', 'bda'].includes(type)) {
      return res.status(400).json({ error: 'Valid application type is required (mentor or bda)' });
    }
    
    console.log(`Updating ${type} application ${id} status to ${status}`);
    
    let result;
    if (type === 'mentor') {
      result = await sql`
        UPDATE mentor_applications
        SET status = ${status},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING id, status
      `;
    } else {
      result = await sql`
        UPDATE bda_applications
        SET status = ${status},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING id, status
      `;
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      application: result[0]
    });
  } catch (error) {
    console.error(`Error updating application status:`, error);
    res.status(500).json({ error: 'Failed to update application status', message: error.message });
  }
});

module.exports = router; 