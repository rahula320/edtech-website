const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');

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

// Get all applications (both mentor and BDA)
router.get('/applications', (req, res) => {
  try {
    const applications = [...mentorApplications, ...bdaApplications];
    const metrics = calculateMetrics();
    
    res.status(200).json({
      success: true,
      data: {
        applications,
        metrics
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Get mentor applications
router.get('/applications/mentor', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mentorApplications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Get BDA applications
router.get('/applications/bda', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: bdaApplications
    });
  } catch (error) {
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
router.put('/applications/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }
    
    let application;
    let applications;
    
    // Check if the application is a mentor application
    const mentorIndex = mentorApplications.findIndex(app => app.id === id);
    if (mentorIndex !== -1) {
      mentorApplications[mentorIndex].status = status;
      application = mentorApplications[mentorIndex];
      applications = 'mentor';
    } else {
      // Check if the application is a BDA application
      const bdaIndex = bdaApplications.findIndex(app => app.id === id);
      if (bdaIndex !== -1) {
        bdaApplications[bdaIndex].status = status;
        application = bdaApplications[bdaIndex];
        applications = 'bda';
      } else {
        return res.status(404).json({
          success: false,
          error: 'Application not found'
        });
      }
    }
    
    res.status(200).json({
      success: true,
      data: {
        application,
        applications
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Delete application
router.delete('/applications/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if the application is a mentor application
    const mentorIndex = mentorApplications.findIndex(app => app.id === id);
    if (mentorIndex !== -1) {
      const deletedApplication = mentorApplications[mentorIndex];
      mentorApplications = mentorApplications.filter(app => app.id !== id);
      
      return res.status(200).json({
        success: true,
        data: {
          deletedApplication,
          type: 'mentor'
        }
      });
    }
    
    // Check if the application is a BDA application
    const bdaIndex = bdaApplications.findIndex(app => app.id === id);
    if (bdaIndex !== -1) {
      const deletedApplication = bdaApplications[bdaIndex];
      bdaApplications = bdaApplications.filter(app => app.id !== id);
      
      return res.status(200).json({
        success: true,
        data: {
          deletedApplication,
          type: 'bda'
        }
      });
    }
    
    return res.status(404).json({
      success: false,
      error: 'Application not found'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

module.exports = router; 