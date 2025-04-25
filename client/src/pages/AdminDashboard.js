import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import moment from 'moment';
import { toast } from 'react-toastify';
import '../styles/AdminDashboard.css';
import { 
  FiUsers, FiUserCheck, FiBriefcase, FiRefreshCw, 
  FiCalendar, FiMail, FiLink, FiGlobe, FiCheckCircle,
  FiXCircle, FiTrash2, FiDownload, FiGrid, FiList,
  FiLogOut, FiEye, FiChevronRight, FiAlertCircle,
  FiFilter, FiSearch, FiMapPin, FiExternalLink, FiX,
  FiHome, FiSettings, FiTrendingUp, FiPieChart,
  FiDollarSign, FiDatabase, FiFileText, FiArrowDown,
  FiArrowUp, FiServer, FiActivity, FiClipboard, FiBarChart2, FiChevronDown, FiChevronLeft, FiClock, FiArrowRight, FiEdit, FiInbox, FiAlertTriangle, FiMenu, FiTrash
} from 'react-icons/fi';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // State for applications
  const [mentorApplications, setMentorApplications] = useState([]);
  const [bdaApplications, setBdaApplications] = useState([]);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // State for UI
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [applicationType, setApplicationType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // State for metrics
  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    mentorApplications: 0,
    bdaApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0
  });

  // Add notification state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success', 'error', 'warning'
  });

  // Function to check login status and set auth header if token exists
  const setupAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Set authorization header for all future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  // Fetch applications data
  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    
    // Setup authentication
    setupAuth();
    
    try {
      // For direct API testing, try accessing the API health endpoint first
      try {
        const healthCheck = await axios.get('/api/health');
        console.log('API health check:', healthCheck.data);
      } catch (healthErr) {
        console.warn('API health check failed:', healthErr);
      }
      
      // Fetch mentor applications - try both paths
      let mentorData = [];
      try {
        // First try the /api prefix path
        const mentorResponse = await axios.get('/api/applications/mentor');
        console.log('Mentor applications (direct):', mentorResponse.data);
        mentorData = mentorResponse.data;
      } catch (mentorErr) {
        console.warn('Failed to fetch mentor applications with /api prefix:', mentorErr);
        try {
          // Try without the /api prefix (in case of proxy setup)
          const fallbackResponse = await api.get('/applications/mentor');
          console.log('Mentor applications (fallback):', fallbackResponse.data);
          mentorData = fallbackResponse.data;
        } catch (fallbackErr) {
          console.error('All mentor application fetch attempts failed:', fallbackErr);
          // Try admin routes as last resort
          try {
            const adminResponse = await api.get('/admin/applications/mentor');
            console.log('Mentor applications (admin route):', adminResponse.data);
            mentorData = adminResponse.data;
          } catch (adminErr) {
            console.error('Admin mentor route also failed:', adminErr);
          }
        }
      }
      
      // Fetch BDA applications with similar fallback approach
      let bdaData = [];
      try {
        const bdaResponse = await axios.get('/api/applications/bda');
        console.log('BDA applications (direct):', bdaResponse.data);
        bdaData = bdaResponse.data;
      } catch (bdaErr) {
        console.warn('Failed to fetch BDA applications with /api prefix:', bdaErr);
        try {
          const fallbackResponse = await api.get('/applications/bda');
          console.log('BDA applications (fallback):', fallbackResponse.data);
          bdaData = fallbackResponse.data;
        } catch (fallbackErr) {
          console.error('All BDA application fetch attempts failed:', fallbackErr);
          try {
            const adminResponse = await api.get('/admin/applications/bda');
            console.log('BDA applications (admin route):', adminResponse.data);
            bdaData = adminResponse.data;
          } catch (adminErr) {
            console.error('Admin BDA route also failed:', adminErr);
          }
        }
      }
      
      // TEMPORARY: If both API calls fail, use mock data for testing UI
      if (mentorData.length === 0) {
        console.warn('Using mock mentor data for testing');
        mentorData = [
          {
            id: 'm1',
            full_name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 (555) 123-4567',
            status: 'pending',
            type: 'mentor',
            timestamp: '2023-11-15T14:32:00Z',
            company: 'Google',
            designation: 'Senior Software Engineer',
            experience: 5,
            domains: ['Web Development', 'AI/ML', 'Data Science']
          },
          {
            id: 'm2',
            full_name: 'Michael Johnson',
            email: 'michael.j@example.com',
            phone: '+1 (555) 987-6543',
            status: 'approved',
            type: 'mentor',
            timestamp: '2023-11-10T09:45:00Z',
            company: 'Tesla',
            designation: 'Engineering Manager',
            experience: 8,
            domains: ['IoT', 'Hardware Design', 'Robotics']
          }
        ];
      }
      
      if (bdaData.length === 0) {
        console.warn('Using mock BDA data for testing');
        bdaData = [
          {
            id: 'b1',
            full_name: 'Robert Chen',
            email: 'robert.c@example.com',
            phone: '+1 (555) 345-6789',
            status: 'pending',
            type: 'bda',
            timestamp: '2023-11-18T11:15:00Z',
            education: 'MBA, Harvard University',
            experience: 3
          },
          {
            id: 'b2',
            full_name: 'Sarah Miller',
            email: 'sarah.m@example.com',
            phone: '+1 (555) 456-7890',
            status: 'approved',
            type: 'bda',
            timestamp: '2023-11-12T10:30:00Z',
            education: 'Marketing, Columbia University',
            experience: 2
          }
        ];
      }
      
      // Update states with fetched data
      setMentorApplications(mentorData);
      setBdaApplications(bdaData);
      
      // Calculate metrics
      const totalMentorApps = mentorData.length;
      const totalBDAApps = bdaData.length;
      
      const pendingMentorApps = mentorData.filter(app => app.status === 'pending').length;
      const pendingBDAApps = bdaData.filter(app => app.status === 'pending').length;
      
      const approvedMentorApps = mentorData.filter(app => app.status === 'approved').length;
      const approvedBDAApps = bdaData.filter(app => app.status === 'approved').length;
      
      const rejectedMentorApps = mentorData.filter(app => app.status === 'rejected').length;
      const rejectedBDAApps = bdaData.filter(app => app.status === 'rejected').length;
      
      // Update metrics state
      setMetrics({
        totalApplications: totalMentorApps + totalBDAApps,
        pendingApplications: pendingMentorApps + pendingBDAApps,
        approvedApplications: approvedMentorApps + approvedBDAApps,
        rejectedApplications: rejectedMentorApps + rejectedBDAApps,
        mentorApplications: totalMentorApps,
        bdaApplications: totalBDAApps
      });
      
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to fetch applications data. Please try again later.');
      
      // Set empty arrays for applications if fetch fails
      setMentorApplications([]);
      setBdaApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Make fetchApplications useCallback to avoid dependency issues
  const memoizedFetchApplications = useCallback(fetchApplications, []);

  // Initial data load
  useEffect(() => {
    memoizedFetchApplications();
  }, [memoizedFetchApplications]);

  // Add a separate useEffect to handle tab changes and auto-select application type
  useEffect(() => {
    if (activeTab === 'applications' && !applicationType) {
      // Default to mentor applications if no type is selected
      setApplicationType('mentor');
    }
  }, [activeTab, applicationType]);

  // Handle admin logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Navigate to login page
    navigate('/admin/login');
  };

  // View application details
  const handleViewApplicationDetails = (application) => {
    setCurrentApplication(application);
    setShowDetailsModal(true);
  };

  // Update application status
  const handleUpdateStatus = (application) => {
    setCurrentApplication(application);
    setShowStatusModal(true);
  };

  const handleUpdateStatusSubmit = async (newStatus) => {
    try {
      setIsLoading(true);
      
      const endpoint = applicationType === 'mentor' 
        ? `/applications/mentor/${currentApplication.id || currentApplication._id}` 
        : `/applications/bda/${currentApplication.id || currentApplication._id}`;
      
      try {
        const response = await api.put(endpoint, { status: newStatus });
        console.log('Status update response:', response.data);
      } catch (apiErr) {
        console.error('API error updating application status:', apiErr);
      }
      
      // Update the application in the state
      if (applicationType === 'mentor') {
        setMentorApplications(
          mentorApplications.map(app => 
            (app.id || app._id) === (currentApplication.id || currentApplication._id) 
              ? { ...app, status: newStatus } 
              : app
          )
        );
      } else {
        setBdaApplications(
          bdaApplications.map(app => 
            (app.id || app._id) === (currentApplication.id || currentApplication._id) 
              ? { ...app, status: newStatus } 
              : app
          )
        );
      }
      
      // Close modal and refresh metrics
      setShowStatusModal(false);
      setCurrentApplication(null);
      fetchApplications(); // Refresh the data to update metrics
      
      // Show success notification
      setNotification({
        show: true,
        message: 'Application status updated successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Error updating application status:', error);
      
      // Show error notification
      setNotification({
        show: true,
        message: 'Failed to update application status',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete application
  const handleDeleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      try {
        setIsLoading(true);
        
        const endpoint = applicationType === 'mentor' 
          ? `/applications/mentor/${id}` 
          : `/applications/bda/${id}`;
        
        try {
          const response = await api.delete(endpoint);
          console.log('Delete response:', response.data);
        } catch (apiErr) {
          console.error('API error deleting application:', apiErr);
        }
        
        // Remove the application from the state
        if (applicationType === 'mentor') {
          setMentorApplications(mentorApplications.filter(app => (app.id || app._id) !== id));
        } else {
          setBdaApplications(bdaApplications.filter(app => (app.id || app._id) !== id));
        }
        
        // Close modals and refresh metrics
        setShowDetailsModal(false);
        setCurrentApplication(null);
        fetchApplications(); // Refresh the data to update metrics
        
        // Show success notification
        setNotification({
          show: true,
          message: 'Application deleted successfully',
          type: 'success'
        });
      } catch (error) {
        console.error('Error deleting application:', error);
        
        // Show error notification
        setNotification({
          show: true,
          message: 'Failed to delete application',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Helper functions
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved': return 'approved';
      case 'rejected': return 'rejected';
      default: return 'pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <FiCheckCircle />;
      case 'rejected': return <FiXCircle />;
      default: return <FiClock />;
    }
  };

  const capitalizeStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Filter applications based on search and status
  const filterApplications = (applications) => {
    return applications.filter(app => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        !searchTerm || 
        app.full_name?.toLowerCase().includes(searchLower) || 
        app.email?.toLowerCase().includes(searchLower);
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  // Get filtered applications
  const getFilteredApplications = () => {
    if (applicationType === 'mentor') {
      return filterApplications(mentorApplications);
    } else if (applicationType === 'bda') {
      return filterApplications(bdaApplications);
    }
    return [];
  };

  // Render status update modal
  const StatusUpdateModal = () => {
    const [newStatus, setNewStatus] = useState(currentApplication?.status || 'pending');
    
    return (
      <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
        <div className="modal-container" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Update Application Status</h3>
            <button className="close-btn" onClick={() => setShowStatusModal(false)}>&times;</button>
          </div>
          <div className="modal-content">
            <p>Change status for {currentApplication?.full_name || currentApplication?.name || 'Applicant'}</p>
            
            <div className="status-options">
              <div 
                className={`status-option ${newStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setNewStatus('pending')}
              >
                <FiClock />
                <span>Pending</span>
              </div>
              <div 
                className={`status-option ${newStatus === 'approved' ? 'active' : ''}`}
                onClick={() => setNewStatus('approved')}
              >
                <FiCheckCircle />
                <span>Approved</span>
              </div>
              <div 
                className={`status-option ${newStatus === 'rejected' ? 'active' : ''}`}
                onClick={() => setNewStatus('rejected')}
              >
                <FiXCircle />
                <span>Rejected</span>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </button>
              <button 
                className="update-btn"
                onClick={() => handleUpdateStatusSubmit(newStatus)}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Application details modal
  const ApplicationDetailsModal = () => {
    if (!currentApplication) return null;
    
    const isMentor = applicationType === 'mentor';
    
    return (
      <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
        <div className="modal-container details-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{isMentor ? 'Mentor' : 'BDA'} Application Details</h3>
            <button className="close-btn" onClick={() => setShowDetailsModal(false)}>&times;</button>
          </div>
          
          <div className="modal-content">
            <div className="applicant-profile">
              <div className="applicant-avatar large">
                {getInitials(currentApplication?.full_name || currentApplication?.name || 'Anonymous')}
              </div>
              <div className="applicant-info-details">
                <h4>{currentApplication?.full_name || currentApplication?.name || 'Anonymous'}</h4>
                <p>{currentApplication?.email || 'No email provided'}</p>
                <span className={`status-badge ${getStatusClass(currentApplication?.status)}`}>
                  {capitalizeStatus(currentApplication?.status || 'pending')}
                </span>
              </div>
            </div>
            
            <div className="application-details">
              <div className="details-section">
                <h5>Personal Information</h5>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Full Name</span>
                    <span className="detail-value">{currentApplication?.full_name || currentApplication?.name || 'Not provided'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{currentApplication?.email || 'Not provided'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{currentApplication?.phone || 'Not provided'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Application Date</span>
                    <span className="detail-value">
                      {currentApplication?.timestamp ? moment(currentApplication.timestamp).format('MMMM D, YYYY') : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Conditional sections based on application type */}
              {isMentor && (
                <>
                  <div className="details-section">
                    <h5>Professional Information</h5>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Company</span>
                        <span className="detail-value">{currentApplication?.company || 'Not provided'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Designation</span>
                        <span className="detail-value">{currentApplication?.designation || 'Not provided'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Experience</span>
                        <span className="detail-value">{currentApplication?.experience || 'Not provided'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">LinkedIn</span>
                        <span className="detail-value">
                          {currentApplication?.linkedin ? (
                            <a href={currentApplication.linkedin} target="_blank" rel="noopener noreferrer">
                              View Profile <FiExternalLink />
                            </a>
                          ) : 'Not provided'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="details-section">
                    <h5>Mentoring Preferences</h5>
                    <div className="details-grid">
                      <div className="detail-item full-width">
                        <span className="detail-label">Domains</span>
                        <div className="domains-list">
                          {currentApplication?.domains && currentApplication.domains.length > 0 ? (
                            currentApplication.domains.map((domain, idx) => (
                              <span key={idx} className="domain-tag">{domain}</span>
                            ))
                          ) : (
                            <span>No domains specified</span>
                          )}
                        </div>
                      </div>
                      <div className="detail-item full-width">
                        <span className="detail-label">Why do you want to mentor?</span>
                        <p className="detail-text">{currentApplication?.why_mentor || 'Not provided'}</p>
                      </div>
                      <div className="detail-item full-width">
                        <span className="detail-label">Previous mentoring experience</span>
                        <p className="detail-text">{currentApplication?.previous_experience || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {!isMentor && (
                <>
                  <div className="details-section">
                    <h5>Educational Background</h5>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Education</span>
                        <span className="detail-value">{currentApplication?.education || 'Not provided'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Institution</span>
                        <span className="detail-value">{currentApplication?.institution || 'Not provided'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Graduation Year</span>
                        <span className="detail-value">{currentApplication?.graduation_year || 'Not provided'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">LinkedIn</span>
                        <span className="detail-value">
                          {currentApplication?.linkedin ? (
                            <a href={currentApplication.linkedin} target="_blank" rel="noopener noreferrer">
                              View Profile <FiExternalLink />
                            </a>
                          ) : 'Not provided'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="details-section">
                    <h5>BDA Position Information</h5>
                    <div className="details-grid">
                      <div className="detail-item full-width">
                        <span className="detail-label">Skills</span>
                        <div className="domains-list">
                          {currentApplication?.skills && currentApplication.skills.length > 0 ? (
                            currentApplication.skills.map((skill, idx) => (
                              <span key={idx} className="domain-tag">{skill}</span>
                            ))
                          ) : (
                            <span>No skills specified</span>
                          )}
                        </div>
                      </div>
                      <div className="detail-item full-width">
                        <span className="detail-label">Why do you want to join as a BDA?</span>
                        <p className="detail-text">{currentApplication?.why_bda || 'Not provided'}</p>
                      </div>
                      <div className="detail-item full-width">
                        <span className="detail-label">Previous experience</span>
                        <p className="detail-text">{currentApplication?.previous_experience || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="modal-actions">
              <button 
                className="action-btn edit-btn"
                onClick={() => {
                  setShowDetailsModal(false);
                  handleUpdateStatus(currentApplication);
                }}
              >
                <FiEdit /> Change Status
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete this ${isMentor ? 'mentor' : 'BDA'} application?`)) {
                    handleDeleteApplication(currentApplication.id || currentApplication._id);
                    setShowDetailsModal(false);
                  }
                }}
              >
                <FiTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar component
  const Sidebar = ({ activePage, setActivePage, isCollapsed, setIsCollapsed }) => {
    const [showApplicationsDropdown, setShowApplicationsDropdown] = useState(false);
    
    const handleApplicationsClick = (type) => {
      setActiveTab('applications');
      setApplicationType(type);
    };
    
    return (
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h3>{isCollapsed ? 'AA' : 'Admin Area'}</h3>
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            <FiChevronLeft />
          </button>
        </div>
        
        <div className="sidebar-links">
          <button 
            className={activePage === 'dashboard' ? 'active' : ''} 
            onClick={() => setActivePage('dashboard')}
          >
            <FiBarChart2 />
            {!isCollapsed && <span>Dashboard</span>}
          </button>
          
          <div className="dropdown-container">
            <button 
              className={`dropdown-trigger ${activePage.includes('applications') ? 'active' : ''}`}
              onClick={() => setShowApplicationsDropdown(!showApplicationsDropdown)}
            >
              <FiClipboard />
              {!isCollapsed && (
                <>
                  <span>Applications</span>
                  <FiChevronDown className={showApplicationsDropdown ? 'rotated' : ''} />
                </>
              )}
            </button>
            
            {showApplicationsDropdown && (
              <div className="dropdown-menu">
                <button 
                  className={applicationType === 'bda' && activePage === 'applications' ? 'active' : ''} 
                  onClick={() => handleApplicationsClick('bda')}
                >
                  {!isCollapsed && <span>BDA Applications</span>}
                </button>
                <button 
                  className={applicationType === 'mentor' && activePage === 'applications' ? 'active' : ''} 
                  onClick={() => handleApplicationsClick('mentor')}
                >
                  {!isCollapsed && <span>Mentor Applications</span>}
                </button>
              </div>
            )}
          </div>
          
          <button 
            className={activePage === 'settings' ? 'active' : ''} 
            onClick={() => setActivePage('settings')}
          >
            <FiSettings />
            {!isCollapsed && <span>Settings</span>}
          </button>
        </div>
      </div>
    );
  };

  // Applications content component
  const Applications = () => {
    // Filter applications based on current filters
    const filteredApplications = applicationType === 'mentor' 
      ? filterApplications(mentorApplications)
      : filterApplications(bdaApplications);

    return (
      <div className="applications-content">
        <div className="section-header">
          <h2>{applicationType === 'mentor' ? 'Mentor' : 'BDA'} Applications</h2>
          <div className="filter-controls">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="search-box">
              <FiSearch />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>
        </div>

        <div className="applications-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map(app => (
                  <tr key={app.id || app._id}>
                    <td>
                      <div className="applicant-info">
                        <div className="applicant-avatar">
                          {getInitials(app.full_name || app.name || 'Anonymous')}
                        </div>
                        <span>{app.full_name || app.name || 'Anonymous'}</span>
                      </div>
                    </td>
                    <td>{app.email || '-'}</td>
                    <td>{app.timestamp ? moment(app.timestamp).format('MMM D, YYYY') : '-'}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(app.status)}`}>
                        {capitalizeStatus(app.status || 'pending')}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn view-btn" 
                          title="View Details"
                          onClick={() => handleViewApplicationDetails(app)}
                        >
                          <FiEye />
                        </button>
                        <button 
                          className="action-btn edit-btn" 
                          title="Edit Status"
                          onClick={() => handleUpdateStatus(app)}
                        >
                          <FiEdit />
                        </button>
                        <button 
                          className="action-btn delete-btn" 
                          title="Delete"
                          onClick={() => handleDeleteApplication(app.id || app._id)}
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-applications">
                    <div className="empty-state">
                      <FiInbox />
                      <p>No applications found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Notification component
  const Notification = () => {
    // Move useEffect outside of conditional rendering
    useEffect(() => {
      if (notification.show) {
        const timer = setTimeout(() => {
          setNotification({ ...notification, show: false });
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }, [notification]);
    
    if (!notification.show) return null;
    
    return (
      <div className={`notification ${notification.type}`}>
        {notification.type === 'success' && <FiCheckCircle />}
        {notification.type === 'error' && <FiAlertCircle />}
        {notification.type === 'warning' && <FiAlertTriangle />}
        <p>{notification.message}</p>
        <button 
          className="close-notification" 
          onClick={() => setNotification({ ...notification, show: false })}
        >
          <FiX />
        </button>
      </div>
    );
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <Sidebar 
        activePage={activeTab} 
        setActivePage={setActiveTab} 
        isCollapsed={!sidebarOpen} 
        setIsCollapsed={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      {/* Main Content */}
      <div className={`admin-main ${sidebarOpen ? '' : 'expanded'}`}>
        {/* Header */}
        <div className="admin-header">
          <div className="header-title">
            {activeTab === 'dashboard' && <h1><FiPieChart /> Dashboard</h1>}
            {activeTab === 'applications' && applicationType === 'mentor' && <h1><FiUserCheck /> Mentor Applications</h1>}
            {activeTab === 'applications' && applicationType === 'bda' && <h1><FiBriefcase /> BDA Applications</h1>}
            {activeTab === 'settings' && <h1><FiSettings /> Settings</h1>}
          </div>
          
          <div className="header-actions">
            <button className="refresh-btn" onClick={memoizedFetchApplications}>
              <FiRefreshCw /> {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
            <div className="admin-avatar">
              {localStorage.getItem('adminUser')?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
        </div>
        
        {/* Loading and Error States */}
        {isLoading && (
          <div className="admin-loading-container">
            <div className="loading-spinner"></div>
            <p>Loading data...</p>
          </div>
        )}
        
        {error && !isLoading && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={memoizedFetchApplications}>Try Again</button>
          </div>
        )}
        
        {/* Dashboard View */}
        {!isLoading && !error && activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon"><FiUsers /></div>
                <div className="metric-info">
                  <h3>Total Applications</h3>
                  <p className="metric-value">{metrics.totalApplications || '-'}</p>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon"><FiFileText /></div>
                <div className="metric-info">
                  <h3>Pending</h3>
                  <p className="metric-value">{metrics.pendingApplications || '-'}</p>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon"><FiCheckCircle /></div>
                <div className="metric-info">
                  <h3>Approved</h3>
                  <p className="metric-value">{metrics.approvedApplications || '-'}</p>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon"><FiXCircle /></div>
                <div className="metric-info">
                  <h3>Rejected</h3>
                  <p className="metric-value">{metrics.rejectedApplications || '-'}</p>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon"><FiUserCheck /></div>
                <div className="metric-info">
                  <h3>Mentor Applications</h3>
                  <p className="metric-value">{metrics.mentorApplications || '-'}</p>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon"><FiBriefcase /></div>
                <div className="metric-info">
                  <h3>BDA Applications</h3>
                  <p className="metric-value">{metrics.bdaApplications || '-'}</p>
                </div>
              </div>
            </div>
            
            <div className="recent-applications">
              <h3>Recent Applications</h3>
              <div className="tabs">
                <button 
                  className={applicationType === 'mentor' ? 'active' : ''}
                  onClick={() => {
                    setActiveTab('applications');
                    setApplicationType('mentor');
                  }}
                >
                  Mentor Applications
                </button>
                <button 
                  className={applicationType === 'bda' ? 'active' : ''}
                  onClick={() => {
                    setActiveTab('applications');
                    setApplicationType('bda');
                  }}
                >
                  BDA Applications
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Applications View */}
        {!isLoading && !error && activeTab === 'applications' && applicationType && (
          <Applications />
        )}
        
        {/* Settings View */}
        {!isLoading && !error && activeTab === 'settings' && (
          <div className="settings-content">
            <h2>Account Settings</h2>
            <p>This section is under development.</p>
          </div>
        )}
      </div>
      
      {/* Application Modals */}
      {showDetailsModal && <ApplicationDetailsModal />}
      {showStatusModal && <StatusUpdateModal />}
      
      {/* Notification */}
      {notification.show && <Notification />}
    </div>
  );
};

export default AdminDashboard; 