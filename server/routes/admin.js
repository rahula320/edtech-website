const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const { sql } = require('../config/db');

// Mock data for applications (replace with database operations in production)
let mentorApplications = [
  {
    id: 'm1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 123-4567',
    status: 'pending',
    type: 'mentor',
    date: '2023-11-15T14:32:00Z',
    university: 'Stanford University',
    degree: 'PhD in Computer Science',
    domains: ['Web Development', 'AI/ML', 'Data Science'],
    experience: '5 years of teaching experience, worked at Google for 3 years',
    motivation: 'I want to help students learn and grow in the tech industry.',
    availability: '10 hours per week',
    linkedin: 'https://linkedin.com/in/janesmith',
    github: 'https://github.com/janesmith',
    portfolio: 'https://janesmith.dev'
  },
  {
    id: 'm2',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '+1 (555) 987-6543',
    status: 'approved',
    type: 'mentor',
    date: '2023-11-10T09:45:00Z',
    university: 'MIT',
    degree: 'MSc in Electrical Engineering',
    domains: ['IoT', 'Hardware Design', 'Robotics'],
    experience: '8 years at Tesla, led a team of 10 engineers',
    motivation: 'I believe in practical education and want to share my industry knowledge.',
    availability: '6 hours per week',
    linkedin: 'https://linkedin.com/in/michaelj',
    github: 'https://github.com/mjohnson',
    portfolio: 'https://michaelj.tech'
  },
  {
    id: 'm3',
    name: 'Lisa Wong',
    email: 'lisa.wong@example.com',
    phone: '+1 (555) 234-5678',
    status: 'rejected',
    type: 'mentor',
    date: '2023-11-05T16:20:00Z',
    university: 'UC Berkeley',
    degree: 'BSc in Computer Science',
    domains: ['Mobile Development', 'UI/UX Design'],
    experience: '4 years at Apple, iOS developer',
    motivation: 'I want to mentor students interested in mobile app development.',
    availability: '8 hours per week',
    linkedin: 'https://linkedin.com/in/lisawong',
    github: 'https://github.com/lwong',
    portfolio: 'https://lisawong.me'
  }
];

let bdaApplications = [
  {
    id: 'b1',
    name: 'Robert Chen',
    email: 'robert.c@example.com',
    phone: '+1 (555) 345-6789',
    status: 'pending',
    type: 'bda',
    date: '2023-11-18T11:15:00Z',
    university: 'Harvard University',
    degree: 'MBA',
    major: 'Business Administration',
    skills: ['Communication', 'Networking', 'Sales', 'Marketing'],
    experience: '3 years in corporate partnerships',
    motivation: 'I want to connect businesses with talented students.',
    availability: '15 hours per week',
    linkedin: 'https://linkedin.com/in/robertchen'
  },
  {
    id: 'b2',
    name: 'Sarah Miller',
    email: 'sarah.m@example.com',
    phone: '+1 (555) 456-7890',
    status: 'approved',
    type: 'bda',
    date: '2023-11-12T10:30:00Z',
    university: 'Columbia University',
    degree: 'BSc',
    major: 'Marketing',
    skills: ['Digital Marketing', 'Content Creation', 'Event Management'],
    experience: '2 years at a marketing agency',
    motivation: 'I am passionate about connecting students with industry opportunities.',
    availability: '12 hours per week',
    linkedin: 'https://linkedin.com/in/sarahmiller'
  },
  {
    id: 'b3',
    name: 'David Kim',
    email: 'david.k@example.com',
    phone: '+1 (555) 567-8901',
    status: 'rejected',
    type: 'bda',
    date: '2023-11-08T14:45:00Z',
    university: 'NYU',
    degree: 'MSc',
    major: 'Economics',
    skills: ['Data Analysis', 'Project Management', 'Negotiation'],
    experience: '4 years in business development',
    motivation: 'I want to help expand the reach of educational programs.',
    availability: '10 hours per week',
    linkedin: 'https://linkedin.com/in/davidkim'
  }
];

// Helper function to calculate metrics
const calculateMetrics = () => {
  const totalApplications = mentorApplications.length + bdaApplications.length;
  const approvedApplications = [...mentorApplications, ...bdaApplications].filter(app => app.status === 'approved').length;
  const pendingApplications = [...mentorApplications, ...bdaApplications].filter(app => app.status === 'pending').length;
  const rejectedApplications = [...mentorApplications, ...bdaApplications].filter(app => app.status === 'rejected').length;
  
  // Mock data for weekly metrics (would be calculated from database in production)
  const weeklyGrowth = 12.5; // percentage
  const conversionRate = (approvedApplications / totalApplications) * 100;
  
  return {
    totalApplications,
    approvedApplications,
    pendingApplications,
    rejectedApplications,
    weeklyGrowth,
    conversionRate
  };
};

// Apply isAdmin middleware to all admin routes
router.use(isAdmin);

// Get all applications (mentor, BDA, and Campus Ambassador)
router.get('/applications', async (req, res) => {
  try {
    // Fetch applications from the database
    const mentorApplications = await sql`
      SELECT *, 'mentor' as type FROM mentor_applications ORDER BY timestamp DESC
    `;
    
    const bdaApplications = await sql`
      SELECT *, 'bda' as type FROM bda_applications ORDER BY timestamp DESC
    `;
    
    const campusAmbassadorApplications = await sql`
      SELECT *, 'campus-ambassador' as type FROM campus_ambassador_applications ORDER BY timestamp DESC
    `;
    
    // Combine all applications
    const applications = [
      ...mentorApplications, 
      ...bdaApplications,
      ...campusAmbassadorApplications
    ];
    
    // Calculate metrics
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const approvedApplications = applications.filter(app => app.status === 'approved').length;
    const rejectedApplications = applications.filter(app => app.status === 'rejected').length;
    
    const metrics = {
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
      mentorApplications: mentorApplications.length,
      bdaApplications: bdaApplications.length,
      campusAmbassadorApplications: campusAmbassadorApplications.length
    };
    
    res.status(200).json({
      success: true,
      data: {
        applications,
        metrics
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Get mentor applications
router.get('/applications/mentor', async (req, res) => {
  try {
    const applications = await sql`
      SELECT *, 'mentor' as type FROM mentor_applications ORDER BY timestamp DESC
    `;
    
    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching mentor applications:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Get BDA applications
router.get('/applications/bda', async (req, res) => {
  try {
    const applications = await sql`
      SELECT *, 'bda' as type FROM bda_applications ORDER BY timestamp DESC
    `;
    
    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching BDA applications:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Get Campus Ambassador applications 
router.get('/applications/campus-ambassador', async (req, res) => {
  try {
    const applications = await sql`
      SELECT *, 'campus-ambassador' as type FROM campus_ambassador_applications ORDER BY timestamp DESC
    `;
    
    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching Campus Ambassador applications:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Get dashboard metrics
router.get('/metrics', (req, res) => {
  try {
    const metrics = calculateMetrics();
    
    res.status(200).json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Update application status
router.put('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, type } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }
    
    let application;
    
    if (type === 'mentor') {
      // Update mentor application
      application = await sql`
        UPDATE mentor_applications 
        SET status = ${status}, updated_at = NOW() 
        WHERE id = ${id} 
        RETURNING *
      `;
    } else if (type === 'bda') {
      // Update BDA application
      application = await sql`
        UPDATE bda_applications 
        SET status = ${status}, updated_at = NOW() 
        WHERE id = ${id} 
        RETURNING *
      `;
    } else if (type === 'campus-ambassador') {
      // Update Campus Ambassador application
      application = await sql`
        UPDATE campus_ambassador_applications 
        SET status = ${status}, updated_at = NOW() 
        WHERE id = ${id} 
        RETURNING *
      `;
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid application type'
      });
    }
    
    if (application.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        application: application[0],
        type
      }
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Delete application
router.delete('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    
    let deletedApplication;
    
    if (type === 'mentor') {
      // Delete mentor application
      deletedApplication = await sql`
        DELETE FROM mentor_applications 
        WHERE id = ${id} 
        RETURNING *
      `;
    } else if (type === 'bda') {
      // Delete BDA application
      deletedApplication = await sql`
        DELETE FROM bda_applications 
        WHERE id = ${id} 
        RETURNING *
      `;
    } else if (type === 'campus-ambassador') {
      // Delete Campus Ambassador application
      deletedApplication = await sql`
        DELETE FROM campus_ambassador_applications 
        WHERE id = ${id} 
        RETURNING *
      `;
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid application type'
      });
    }
    
    if (deletedApplication.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        deletedApplication: deletedApplication[0],
        type
      }
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

module.exports = router; 