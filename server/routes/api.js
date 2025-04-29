/**
 * API Routes for the application
 * In-memory implementation
 */

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// In-memory data storage
const storage = {
  mentorApplications: [],
  bdaApplications: [],
  campusAmbassadorApplications: []
};

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is running',
    endpoints: [
      '/api/health',
      '/api/applications',
      '/api/applications/mentor',
      '/api/applications/bda',
      '/api/applications/campus-ambassador',
      '/api/contacts'
    ]
  });
});

// Get all applications (combined from both tables)
router.get('/applications', async (req, res) => {
  try {
    // Combine and sort by timestamp
    const allApplications = [
      ...storage.mentorApplications.map(app => ({ ...app, type: 'mentor' })),
      ...storage.bdaApplications.map(app => ({ ...app, type: 'bda' })),
      ...storage.campusAmbassadorApplications.map(app => ({ ...app, type: 'campus-ambassador' }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.status(200).json(allApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get mentor applications
router.get('/applications/mentor', async (req, res) => {
  try {
    const applications = storage.mentorApplications.map(app => ({ ...app, type: 'mentor' }));
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching mentor applications:', error);
    res.status(500).json({ error: 'Failed to fetch mentor applications' });
  }
});

// Get BDA applications
router.get('/applications/bda', async (req, res) => {
  try {
    const applications = storage.bdaApplications.map(app => ({ ...app, type: 'bda' }));
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching BDA applications:', error);
    res.status(500).json({ error: 'Failed to fetch BDA applications' });
  }
});

// Get Campus Ambassador applications
router.get('/applications/campus-ambassador', async (req, res) => {
  try {
    const applications = storage.campusAmbassadorApplications.map(app => ({ ...app, type: 'campus-ambassador' }));
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching Campus Ambassador applications:', error);
    res.status(500).json({ error: 'Failed to fetch Campus Ambassador applications' });
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

    // Process domains field correctly
    let domainsArray = [];
    if (domains) {
      if (Array.isArray(domains)) {
        domainsArray = domains;
      } else if (typeof domains === 'string') {
        domainsArray = domains.split(',').map(domain => domain.trim());
      }
    }

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

    // Create new application
    const newApplication = {
      id: storage.mentorApplications.length + 1,
      full_name: fullName || '',
      email,
      phone: phone || '',
      company: company || '',
      designation: designation || '',
      experience: experienceValue,
      education: education || '',
      domains: domainsArray,
      resume_url: resumeUrl || '',
      portfolio_url: portfolioUrl || '',
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    // Add to storage
    storage.mentorApplications.push(newApplication);

    console.log('Mentor application saved successfully:', newApplication.id);

    res.status(201).json({
      success: true,
      message: 'Mentor application submitted successfully',
      applicationId: newApplication.id
    });
  } catch (error) {
    console.error('Error submitting mentor application:', error);
    res.status(500).json({ 
      error: 'Failed to submit application', 
      details: error.message
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

    // Create new application
    const newApplication = {
      id: storage.bdaApplications.length + 1,
      full_name: fullName,
      email,
      phone: phone || '',
      education: education || '',
      experience: experienceValue,
      resume_url: resumeUrl || '',
      portfolio_url: portfolioUrl || '',
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    // Add to storage
    storage.bdaApplications.push(newApplication);

    res.status(201).json({
      success: true,
      message: 'BDA application submitted successfully',
      applicationId: newApplication.id
    });
  } catch (error) {
    console.error('Error submitting BDA application:', error);
    res.status(500).json({ 
      error: 'Failed to submit application', 
      details: error.message 
    });
  }
});

// Submit a Campus Ambassador application
router.post('/applications/campus-ambassador', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      collegeName,
      yearOfStudy,
      branch,
      department
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !collegeName) {
      return res.status(400).json({ 
        error: 'Full name, email, phone, and college name are required' 
      });
    }

    // Create new application
    const newApplication = {
      id: storage.campusAmbassadorApplications.length + 1,
      full_name: fullName,
      email,
      phone,
      college_name: collegeName,
      year_of_study: yearOfStudy || '1st Year',
      branch: branch || '',
      department: department || '',
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    // Add to storage
    storage.campusAmbassadorApplications.push(newApplication);

    res.status(201).json({
      success: true,
      message: 'Campus Ambassador application submitted successfully',
      applicationId: newApplication.id
    });
  } catch (error) {
    console.error('Error submitting Campus Ambassador application:', error);
    res.status(500).json({ 
      error: 'Failed to submit application', 
      details: error.message 
    });
  }
});

// Update application status endpoints (admin only)
router.put('/applications/mentor/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Find the application
    const application = storage.mentorApplications.find(app => app.id === parseInt(id));
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Update status
    application.status = status;
    application.updated_at = new Date().toISOString();
    
    res.json({ success: true, message: 'Application status updated' });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

router.put('/applications/bda/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Find the application
    const application = storage.bdaApplications.find(app => app.id === parseInt(id));
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Update status
    application.status = status;
    application.updated_at = new Date().toISOString();
    
    res.json({ success: true, message: 'Application status updated' });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

router.put('/applications/campus-ambassador/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Find the application
    const application = storage.campusAmbassadorApplications.find(app => app.id === parseInt(id));
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Update status
    application.status = status;
    application.updated_at = new Date().toISOString();
    
    res.json({ success: true, message: 'Application status updated' });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Get contact by ID
router.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// Update contact status
router.put('/contacts/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByPk(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    contact.status = status;
    await contact.save();
    
    res.status(200).json({ success: true, message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

module.exports = router; 