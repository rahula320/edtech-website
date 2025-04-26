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
  FiArrowUp, FiServer, FiActivity, FiClipboard, FiBarChart2, FiChevronDown, FiChevronLeft, FiClock, FiArrowRight, FiEdit, FiInbox, FiAlertTriangle, FiMenu, FiTrash, FiBox, FiChevronsRight, FiChevronsLeft, FiUserPlus, FiUser
} from 'react-icons/fi';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // State for applications
  const [mentorApplications, setMentorApplications] = useState([]);
  const [bdaApplications, setBdaApplications] = useState([]);
  const [campusAmbassadorApplications, setCampusAmbassadorApplications] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // State for UI
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [applicationType, setApplicationType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // State for metrics
  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    mentorApplications: 0,
    bdaApplications: 0,
    campusAmbassadorApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    registrations: 0
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
          // Try without the /api prefix
          const fallbackResponse = await api.get('/applications/bda');
          console.log('BDA applications (fallback):', fallbackResponse.data);
          bdaData = fallbackResponse.data;
        } catch (fallbackErr) {
          console.error('All BDA application fetch attempts failed:', fallbackErr);
          // Try admin routes as last resort
          try {
            const adminResponse = await api.get('/admin/applications/bda');
            console.log('BDA applications (admin route):', adminResponse.data);
            bdaData = adminResponse.data;
          } catch (adminErr) {
            console.error('Admin BDA route also failed:', adminErr);
          }
        }
      }
      
      // Fetch Campus Ambassador applications with similar fallback approach
      let campusAmbassadorData = [];
      try {
        const campusResponse = await axios.get('/api/applications/campus-ambassador');
        console.log('Campus Ambassador applications (direct):', campusResponse.data);
        campusAmbassadorData = campusResponse.data;
      } catch (campusErr) {
        console.warn('Failed to fetch Campus Ambassador applications with /api prefix:', campusErr);
        try {
          // Try without the /api prefix
          const fallbackResponse = await api.get('/applications/campus-ambassador');
          console.log('Campus Ambassador applications (fallback):', fallbackResponse.data);
          campusAmbassadorData = fallbackResponse.data;
        } catch (fallbackErr) {
          console.error('All Campus Ambassador application fetch attempts failed:', fallbackErr);
          // Try admin routes as last resort
          try {
            const adminResponse = await api.get('/admin/applications/campus-ambassador');
            console.log('Campus Ambassador applications (admin route):', adminResponse.data);
            campusAmbassadorData = adminResponse.data;
          } catch (adminErr) {
            console.error('Admin Campus Ambassador route also failed:', adminErr);
          }
        }
      }
      
      // Update states with fetched data
      setMentorApplications(mentorData);
      setBdaApplications(bdaData);
      setCampusAmbassadorApplications(campusAmbassadorData);
      
      // Calculate metrics
      const totalMentorApps = mentorData.length;
      const totalBDAApps = bdaData.length;
      const totalCampusApps = campusAmbassadorData.length;
      
      const pendingMentorApps = mentorData.filter(app => app.status === 'pending').length;
      const pendingBDAApps = bdaData.filter(app => app.status === 'pending').length;
      const pendingCampusApps = campusAmbassadorData.filter(app => app.status === 'pending').length;

      const approvedMentorApps = mentorData.filter(app => app.status === 'approved').length;
      const approvedBDAApps = bdaData.filter(app => app.status === 'approved').length;
      const approvedCampusApps = campusAmbassadorData.filter(app => app.status === 'approved').length;
      
      const rejectedMentorApps = mentorData.filter(app => app.status === 'rejected').length;
      const rejectedBDAApps = bdaData.filter(app => app.status === 'rejected').length;
      const rejectedCampusApps = campusAmbassadorData.filter(app => app.status === 'rejected').length;
      
      // Update metrics state
      setMetrics(prevMetrics => ({
        totalApplications: totalMentorApps + totalBDAApps + totalCampusApps,
        pendingApplications: pendingMentorApps + pendingBDAApps + pendingCampusApps,
        approvedApplications: approvedMentorApps + approvedBDAApps + approvedCampusApps,
        rejectedApplications: rejectedMentorApps + rejectedBDAApps + rejectedCampusApps,
        mentorApplications: totalMentorApps,
        bdaApplications: totalBDAApps,
        campusAmbassadorApplications: totalCampusApps,
        registrations: prevMetrics.registrations // Preserve the registrations count
      }));
      
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to fetch applications data. Please try again later.');
      
      // Set empty arrays for applications if fetch fails
      setMentorApplications([]);
      setBdaApplications([]);
      setCampusAmbassadorApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch registrations data
  const fetchRegistrations = async () => {
    setIsLoading(true);
    setError(null);
    
    // Setup authentication
    setupAuth();
    
    try {
      // Try with /api prefix first
      let registrationsData = [];
      try {
        const registrationsResponse = await axios.get('/api/registrations');
        console.log('Registrations (direct):', registrationsResponse.data);
        registrationsData = registrationsResponse.data;
      } catch (regErr) {
        console.warn('Failed to fetch registrations with /api prefix:', regErr);
        try {
          // Try without the /api prefix
          const fallbackResponse = await api.get('/registrations');
          console.log('Registrations (fallback):', fallbackResponse.data);
          registrationsData = fallbackResponse.data;
        } catch (fallbackErr) {
          console.error('All registration fetch attempts failed:', fallbackErr);
          // Try admin routes as last resort
          try {
            const adminResponse = await api.get('/admin/registrations');
            console.log('Registrations (admin route):', adminResponse.data);
            registrationsData = adminResponse.data;
          } catch (adminErr) {
            console.error('Admin registrations route also failed:', adminErr);
          }
        }
      }
      
      // Update state with fetched data
      setRegistrations(registrationsData);
      
      // Update metrics for registrations
      setMetrics(prevMetrics => ({
        ...prevMetrics,
        registrations: registrationsData.length
      }));
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setError('Failed to fetch registration data. Please try again later.');
      setRegistrations([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Make fetchApplications useCallback to avoid dependency issues
  const memoizedFetchApplications = useCallback(fetchApplications, []);
  const memoizedFetchRegistrations = useCallback(fetchRegistrations, []);

  // Initial data load
  useEffect(() => {
    memoizedFetchApplications();
    memoizedFetchRegistrations();
  }, [memoizedFetchApplications, memoizedFetchRegistrations]);

  // Add a separate useEffect to handle tab changes and auto-select application type
  useEffect(() => {
    if (activeTab === 'applications' && !applicationType) {
      // Default to mentor applications if no type is selected
      setApplicationType('mentor');
    }
  }, [activeTab, applicationType]);

  // Handle logout with animation
  const handleLogout = () => {
    // Show logout notification
    setNotification({
      show: true,
      message: 'You have been successfully logged out',
      type: 'success'
    });
    
    // Set flag for login page to detect logout
    localStorage.setItem('justLoggedOut', 'true');
    
    // Clear token and user from localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminAuth');
    
    // Add animation class to body
    document.body.classList.add('logout-animation');
    
    // Wait for animation to complete before redirecting
    setTimeout(() => {
      // Get the base URL of the application to handle both development and production
      const baseUrl = window.location.origin;
      
      // Force a hard navigation to the admin login page
      window.location.href = `${baseUrl}/admin`;
    }, 800);
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

  // Handle delete application
  const handleDeleteApplication = async (id, type = applicationType) => {
    if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      try {
        setIsLoading(true);
        
        // Determine the correct API endpoint for deleting
        let endpoint;
        if (type === 'mentor') {
          endpoint = `/api/applications/mentor/${id}`;
        } else if (type === 'bda') {
          endpoint = `/api/applications/bda/${id}`;
        } else if (type === 'campus-ambassador') {
          endpoint = `/api/applications/campus-ambassador/${id}`;
        }

        console.log(`Deleting ${type} application with ID: ${id}`);
        
        // Make API call to delete the application
        try {
          // Try different API patterns to ensure it reaches the correct endpoint
          const deleteResponse = await api.delete(endpoint);
          console.log('Delete API response:', deleteResponse.data);
        } catch (apiErr) {
          console.error(`First delete attempt failed for ${type} application:`, apiErr);
          
          // Try alternate API patterns
          try {
            const alternateEndpoint = `/api/applications/${type}/${id}`;
            const alternateResponse = await api.delete(alternateEndpoint);
            console.log('Alternate delete API response:', alternateResponse.data);
          } catch (altErr) {
            console.error(`Alternate delete attempt failed for ${type} application:`, altErr);
            
            // Try admin endpoint as last resort
            try {
              const adminEndpoint = `/admin/applications/${id}`;
              const adminResponse = await api.delete(adminEndpoint, { 
                data: { type } 
              });
              console.log('Admin delete API response:', adminResponse.data);
            } catch (adminErr) {
              console.error(`Admin delete attempt failed for ${type} application:`, adminErr);
              throw new Error('All delete attempts failed');
            }
          }
        }
        
        // Remove the application from the state
        if (type === 'mentor') {
          setMentorApplications(mentorApplications.filter(app => (app.id || app._id) !== id));
        } else if (type === 'bda') {
          setBdaApplications(bdaApplications.filter(app => (app.id || app._id) !== id));
        } else if (type === 'campus-ambassador') {
          setCampusAmbassadorApplications(campusAmbassadorApplications.filter(app => (app.id || app._id) !== id));
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
          message: 'Failed to delete application: ' + error.message,
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle delete registration
  const handleDeleteRegistration = async (id) => {
    if (window.confirm('Are you sure you want to delete this registration? This action cannot be undone.')) {
      try {
        setIsLoading(true);
        
        // Try different API patterns to ensure it reaches the correct endpoint
        let deleted = false;
        
        try {
          const deleteResponse = await api.delete(`/api/registrations/${id}`);
          console.log('Delete API response:', deleteResponse.data);
          deleted = true;
        } catch (apiErr) {
          console.error('First delete attempt failed for registration:', apiErr);
          
          try {
            const alternateResponse = await api.delete(`/registrations/${id}`);
            console.log('Alternate delete API response:', alternateResponse.data);
            deleted = true;
          } catch (altErr) {
            console.error('Alternate delete attempt failed for registration:', altErr);
            
            try {
              const adminResponse = await api.delete(`/admin/registrations/${id}`);
              console.log('Admin delete API response:', adminResponse.data);
              deleted = true;
            } catch (adminErr) {
              console.error('Admin delete attempt failed for registration:', adminErr);
            }
          }
        }
        
        if (deleted) {
          // Update state by removing the deleted item
          setRegistrations(registrations.filter(reg => (reg.id || reg._id) !== id));
          
          // Show success notification
          setNotification({
            show: true,
            message: 'Registration deleted successfully',
            type: 'success'
          });
        } else {
          throw new Error('All delete attempts failed');
        }
      } catch (error) {
        console.error('Error deleting registration:', error);
        
        // Show error notification
        setNotification({
          show: true,
          message: 'Failed to delete registration',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Export applications to CSV
  const exportToCSV = (apps, type) => {
    // Define headers based on application type
    let headers = [];
    
    if (type === 'mentor') {
      headers = [
        'Full Name', 
        'Email', 
        'Phone', 
        'Company', 
        'Designation', 
        'Experience', 
        'Domains', 
        'Application Date'
      ];
    } else if (type === 'bda') {
      headers = [
        'Full Name', 
        'Email', 
        'Phone', 
        'Education', 
        'Experience', 
        'Application Date'
      ];
    } else if (type === 'campus-ambassador') {
      headers = [
        'Full Name', 
        'Email', 
        'Phone', 
        'College Name', 
        'Year of Study', 
        'Branch', 
        'Department', 
        'Application Date'
      ];
    }
    
    // Create CSV header row
    let csvContent = headers.join(',') + '\n';
    
    // Add rows based on application type
    apps.forEach(app => {
      let row = [];
      
      if (type === 'mentor') {
        row = [
          `"${app.full_name || ''}"`,
          `"${app.email || ''}"`,
          `"${app.phone || ''}"`,
          `"${app.company || ''}"`,
          `"${app.designation || ''}"`,
          `"${app.experience || ''}"`,
          `"${Array.isArray(app.domains) ? app.domains.join('; ') : app.domains || ''}"`,
          `"${app.timestamp ? moment(app.timestamp).format('YYYY-MM-DD') : ''}"`
        ];
      } else if (type === 'bda') {
        row = [
          `"${app.full_name || ''}"`,
          `"${app.email || ''}"`,
          `"${app.phone || ''}"`,
          `"${app.education || ''}"`,
          `"${app.experience || ''}"`,
          `"${app.timestamp ? moment(app.timestamp).format('YYYY-MM-DD') : ''}"`
        ];
      } else if (type === 'campus-ambassador') {
        row = [
          `"${app.full_name || ''}"`,
          `"${app.email || ''}"`,
          `"${app.phone || ''}"`,
          `"${app.college_name || ''}"`,
          `"${app.year_of_study || ''}"`,
          `"${app.branch || ''}"`,
          `"${app.department || ''}"`,
          `"${app.timestamp ? moment(app.timestamp).format('YYYY-MM-DD') : ''}"`
        ];
      }
      
      csvContent += row.join(',') + '\n';
    });
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${type}-applications.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // Filter applications based on search
  const filterApplications = (applications) => {
    return applications.filter(app => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        !searchTerm || 
        app.full_name?.toLowerCase().includes(searchLower) || 
        app.email?.toLowerCase().includes(searchLower);
      
      return matchesSearch;
    });
  };

  // Get filtered applications
  const getFilteredApplications = () => {
    if (applicationType === 'mentor') {
      return filterApplications(mentorApplications);
    } else if (applicationType === 'bda') {
      return filterApplications(bdaApplications);
    } else if (applicationType === 'campus-ambassador') {
      return filterApplications(campusAmbassadorApplications);
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
    const isBDA = applicationType === 'bda';
    const isCampusAmbassador = applicationType === 'campus-ambassador';

    return (
      <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
        <div className="modal-container details-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{isMentor ? 'Mentor' : isBDA ? 'BDA' : 'Campus Ambassador'} Application Details</h3>
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

              {/* Mentor specific details */}
              {isMentor && (
                <div className="details-section">
                  <h5>Mentor Information</h5>
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
                    {currentApplication?.resume_url && (
                      <div className="detail-item">
                        <span className="detail-label">Resume</span>
                        <span className="detail-value">
                          <a href={currentApplication.resume_url} target="_blank" rel="noopener noreferrer">
                            View Resume <FiExternalLink />
                          </a>
                        </span>
                      </div>
                    )}
                    {currentApplication?.portfolio_url && (
                      <div className="detail-item">
                        <span className="detail-label">Portfolio</span>
                        <span className="detail-value">
                          <a href={currentApplication.portfolio_url} target="_blank" rel="noopener noreferrer">
                            View Portfolio <FiExternalLink />
                          </a>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* BDA specific details */}
              {isBDA && (
                <div className="details-section">
                  <h5>BDA Information</h5>
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Education</span>
                      <span className="detail-value">{currentApplication?.education || 'Not provided'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Experience</span>
                      <span className="detail-value">{currentApplication?.experience || 'Not provided'}</span>
                    </div>
                    {currentApplication?.resume_url && (
                      <div className="detail-item">
                        <span className="detail-label">Resume</span>
                        <span className="detail-value">
                          <a href={currentApplication.resume_url} target="_blank" rel="noopener noreferrer">
                            View Resume <FiExternalLink />
                          </a>
                        </span>
                      </div>
                    )}
                    {currentApplication?.portfolio_url && (
                      <div className="detail-item">
                        <span className="detail-label">Portfolio</span>
                        <span className="detail-value">
                          <a href={currentApplication.portfolio_url} target="_blank" rel="noopener noreferrer">
                            View Portfolio <FiExternalLink />
                          </a>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Campus Ambassador specific details */}
              {isCampusAmbassador && (
                <div className="details-section">
                  <h5>Campus Ambassador Information</h5>
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">College Name</span>
                      <span className="detail-value">{currentApplication?.college_name || 'Not provided'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Year of Study</span>
                      <span className="detail-value">{currentApplication?.year_of_study || 'Not provided'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Branch</span>
                      <span className="detail-value">{currentApplication?.branch || 'Not provided'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Department</span>
                      <span className="detail-value">{currentApplication?.department || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button 
                className="action-btn delete-btn"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete this ${isMentor ? 'mentor' : isBDA ? 'BDA' : 'Campus Ambassador'} application?`)) {
                    handleDeleteApplication(currentApplication.id || currentApplication._id, applicationType);
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
    const [showApplicationsDropdown, setShowApplicationsDropdown] = useState(true);
    
    const handleApplicationsClick = (type) => {
      setActiveTab('applications');
      setApplicationType(type);
    };
    
    return (
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h3>{isCollapsed ? 'AC' : 'Admin Console'}</h3>
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
          
          <div className="app-section">
            <div 
              className="section-header-sidebar"
              onClick={() => setShowApplicationsDropdown(!showApplicationsDropdown)}
            >
              <div className="section-title">
                <FiUsers />
                {!isCollapsed && <span>Applications</span>}
              </div>
              {!isCollapsed && <FiChevronDown className={`dropdown-arrow ${showApplicationsDropdown ? 'open' : ''}`} />}
            </div>
            
            {showApplicationsDropdown && (
              <div className="app-links">
                <button 
                  className={applicationType === 'mentor' && activePage === 'applications' ? 'active' : ''} 
                  onClick={() => handleApplicationsClick('mentor')}
                >
                  <FiUser />
                  {!isCollapsed && <span>Mentor Applications</span>}
                </button>
                <button 
                  className={applicationType === 'bda' && activePage === 'applications' ? 'active' : ''} 
                  onClick={() => handleApplicationsClick('bda')}
                >
                  <FiBriefcase />
                  {!isCollapsed && <span>BDA Applications</span>}
                </button>
                <button 
                  className={applicationType === 'campus-ambassador' && activePage === 'applications' ? 'active' : ''} 
                  onClick={() => handleApplicationsClick('campus-ambassador')}
                >
                  <FiUserPlus />
                  {!isCollapsed && <span>Campus Ambassador</span>}
                </button>
              </div>
            )}
          </div>
          
          <button 
            className={activePage === 'registrations' ? 'active' : ''} 
            onClick={() => setActivePage('registrations')}
          >
            <FiClipboard />
            {!isCollapsed && <span>Registrations</span>}
          </button>
          
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
    const filteredApplications = getFilteredApplications();
    
    let typeLabel = "Applications";
    if (applicationType === 'mentor') {
      typeLabel = "Mentor Applications";
    } else if (applicationType === 'bda') {
      typeLabel = "BDA Applications";
    } else if (applicationType === 'campus-ambassador') {
      typeLabel = "Campus Ambassador Applications";
    }
    
    // Get the appropriate applications array
    const allApplications = applicationType === 'mentor' 
      ? mentorApplications 
      : applicationType === 'bda' 
        ? bdaApplications 
        : campusAmbassadorApplications;

    return (
      <div className="applications-content">
        <div className="section-header">
          <h2>{typeLabel}</h2>
          <div className="action-section">
            <div className="search-container">
              <div className="search-box">
                <FiSearch />
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="clear-search" 
                    onClick={() => setSearchTerm('')}
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </div>
            
            <button 
              className="export-btn" 
              onClick={() => exportToCSV(allApplications, applicationType)}
              disabled={allApplications.length === 0}
            >
              <FiDownload /> Export to CSV
            </button>
          </div>
        </div>
          
        <div className="applications-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                {applicationType === 'mentor' && (
                  <>
                    <th>Company</th>
                    <th>Designation</th>
                  </>
                )}
                {applicationType === 'bda' && (
                  <>
                    <th>Education</th>
                  </>
                )}
                {applicationType === 'campus-ambassador' && (
                  <>
                    <th>College</th>
                    <th>Year</th>
                    <th>Branch</th>
                  </>
                )}
                <th>Date</th>
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
                    <td>{app.phone || '-'}</td>
                    {applicationType === 'mentor' && (
                      <>
                        <td>{app.company || '-'}</td>
                        <td>{app.designation || '-'}</td>
                      </>
                    )}
                    {applicationType === 'bda' && (
                      <>
                        <td>{app.education || '-'}</td>
                      </>
                    )}
                    {applicationType === 'campus-ambassador' && (
                      <>
                        <td>{app.college_name || '-'}</td>
                        <td>{app.year_of_study || '-'}</td>
                        <td>{app.branch || '-'}</td>
                      </>
                    )}
                    <td>{app.timestamp ? moment(app.timestamp).format('MMM D, YYYY') : '-'}</td>
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
                          className="action-btn delete-btn" 
                          title="Delete"
                          onClick={() => handleDeleteApplication(app.id || app._id, applicationType)}
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-applications">
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

  // Registrations content component
  const Registrations = () => {
    // Filter registrations based on search term
    const filteredRegistrations = registrations.filter(reg => {
      const searchable = 
        `${reg.name || ''} 
         ${reg.email || ''} 
         ${reg.phone || ''} 
         ${reg.college || ''} 
         ${reg.event_name || ''}`.toLowerCase();
      
      return searchTerm === '' || searchable.includes(searchTerm.toLowerCase());
    });
    
    // Export registrations to CSV
    const exportRegistrationsToCSV = () => {
      exportToCSV(registrations, 'registrations');
    };
    
    return (
      <div className="registrations-content">
        <div className="section-header">
          <h2>Event Registrations</h2>
          <div className="action-section">
            <div className="search-container">
              <div className="search-box">
                <FiSearch />
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="clear-search" 
                    onClick={() => setSearchTerm('')}
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </div>
            
            <button 
              className="export-btn" 
              onClick={exportRegistrationsToCSV}
              disabled={registrations.length === 0}
            >
              <FiDownload /> Export to CSV
            </button>
          </div>
        </div>
          
        <div className="registrations-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event</th>
                <th>College</th>
                <th>Registration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map(reg => (
                  <tr key={reg.id || reg._id}>
                    <td>
                      <div className="applicant-info">
                        <div className="applicant-avatar">
                          {getInitials(reg.name || 'Anonymous')}
                        </div>
                        <span>{reg.name || 'Anonymous'}</span>
                      </div>
                    </td>
                    <td>{reg.email || '-'}</td>
                    <td>{reg.phone || '-'}</td>
                    <td>{reg.event_name || '-'}</td>
                    <td>{reg.college || '-'}</td>
                    <td>{reg.timestamp ? moment(reg.timestamp).format('MMM D, YYYY') : '-'}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn delete-btn" 
                          title="Delete"
                          onClick={() => handleDeleteRegistration(reg.id || reg._id)}
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="no-registrations">
                    <div className="empty-state">
                      <FiInbox />
                      <p>No registrations found</p>
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
            {activeTab === 'applications' && applicationType === 'campus-ambassador' && <h1><FiUserPlus /> Campus Ambassador</h1>}
            {activeTab === 'registrations' && <h1><FiClipboard /> Event Registrations</h1>}
            {activeTab === 'settings' && <h1><FiSettings /> Settings</h1>}
          </div>
          
          <div className="header-actions">
            <button className="refresh-btn" onClick={activeTab === 'registrations' ? memoizedFetchRegistrations : memoizedFetchApplications}>
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
              
              <div className="metric-card">
                <div className="metric-icon"><FiUserPlus /></div>
                <div className="metric-info">
                  <h3>Campus Ambassador</h3>
                  <p className="metric-value">{metrics.campusAmbassadorApplications || '-'}</p>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon"><FiClipboard /></div>
                <div className="metric-info">
                  <h3>Event Registrations</h3>
                  <p className="metric-value">{metrics.registrations || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Applications View */}
        {!isLoading && !error && activeTab === 'applications' && applicationType && (
          <Applications />
        )}
        
        {/* Registrations View */}
        {!isLoading && !error && activeTab === 'registrations' && (
          <Registrations />
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