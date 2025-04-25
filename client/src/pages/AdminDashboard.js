import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import './AdminDashboard.css';
import { 
  FiUsers, FiUserCheck, FiBriefcase, FiRefreshCw, 
  FiCalendar, FiMail, FiLink, FiGlobe, FiCheckCircle,
  FiXCircle, FiTrash2, FiDownload, FiGrid, FiList,
  FiLogOut, FiEye, FiChevronRight, FiAlertCircle,
  FiFilter, FiSearch, FiMapPin, FiExternalLink, FiX
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    mentors: 0,
    bdas: 0,
    pendingReview: 0
  });
  const navigate = useNavigate();

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Check if user is logged in as admin
      if (!localStorage.getItem('adminAuth')) {
        navigate('/admin');
        return;
      }
      
      const response = await axios.get('/api/applications');
      
      const data = response.data;
      setApplications(data);
      
      // Update stats
      const mentorCount = data.filter(app => app.type === 'mentor').length;
      const bdaCount = data.filter(app => app.type === 'bda').length;
      const pendingCount = data.filter(app => app.status === 'pending').length;

      setStats({
        total: data.length,
        mentors: mentorCount,
        bdas: bdaCount,
        pendingReview: pendingCount
      });
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch applications. Please try again later.');
      setIsLoading(false);
      console.error('Error fetching applications:', err);
    }
  }, [navigate]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminRole');
    navigate('/admin');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleToggleSelect = (id) => {
    setSelectedApplications(prev => {
      if (prev.includes(id)) {
        return prev.filter(appId => appId !== id);
    } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(filteredApplications.map(app => app._id));
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseDetails = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  const handleDeleteSelected = async () => {
    if (!selectedApplications.length) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedApplications.length} application(s)?`)) {
      setIsLoading(true);
      try {
        await axios.delete('/api/applications/batch', {
          data: { ids: selectedApplications }
        });
        fetchApplications();
        setSelectedApplications([]);
      } catch (err) {
        toast.error('Failed to delete applications');
        console.error('Error deleting applications:', err);
        setIsLoading(false);
      }
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/applications/${id}`, { status });
      fetchApplications();
      handleCloseDetails();
    } catch (err) {
      toast.error(`Failed to ${status} application. Please try again later.`);
      console.error(`Error updating status to ${status}:`, err);
    }
  };

  const filteredApplications = applications.filter(app => {
    // Filter by tab
    if (activeTab === 'pending' && app.status !== 'pending') return false;
    if (activeTab === 'approved' && app.status !== 'approved') return false;
    if (activeTab === 'rejected' && app.status !== 'rejected') return false;
    if (activeTab === 'mentors' && app.type !== 'mentor') return false;
    if (activeTab === 'bdas' && app.type !== 'bda') return false;
    
    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        app.name?.toLowerCase().includes(search) ||
        app.email?.toLowerCase().includes(search) ||
        app.company?.toLowerCase().includes(search) ||
        app.domains?.some(domain => domain.toLowerCase().includes(search))
      );
    }
    
    return true;
  });

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  if (isLoading && applications.length === 0) {
    return (
      <div className="admin-dashboard loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
        <h1>Admin Dashboard</h1>
          <p className="welcome-message">Welcome back! Here's what's happening with your applications.</p>
        </div>
        <div className="admin-info">
          <div className="admin-user-info">
            <span>Admin User</span>
            <span className="admin-role">Administrator</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon total-icon">
            <FiUsers size={20} />
          </div>
          <div className="stat-content">
            <h2>{stats.total}</h2>
            <p>Total Applications</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon mentor-icon">
            <FiUserCheck size={20} />
          </div>
          <div className="stat-content">
            <h2>{stats.mentors}</h2>
            <p>Mentor Applications</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bda-icon">
            <FiBriefcase size={20} />
          </div>
          <div className="stat-content">
            <h2>{stats.bdas}</h2>
            <p>BDA Applications</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon refresh-icon">
            <FiRefreshCw size={20} />
          </div>
          <div className="stat-content">
            <h2>{stats.pendingReview}</h2>
            <p>Pending Review</p>
          </div>
        </div>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabChange('all')}
        >
          <FiGrid /> All Applications
        </button>
        <button 
          className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => handleTabChange('pending')}
        >
          Pending
        </button>
        <button 
          className={`tab-button ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => handleTabChange('approved')}
        >
          Approved
        </button>
        <button 
          className={`tab-button ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => handleTabChange('rejected')}
        >
          Rejected
        </button>
        <button 
          className={`tab-button ${activeTab === 'mentors' ? 'active' : ''}`}
          onClick={() => handleTabChange('mentors')}
        >
          <FiUserCheck /> Mentors
        </button>
        <button 
          className={`tab-button ${activeTab === 'bdas' ? 'active' : ''}`}
          onClick={() => handleTabChange('bdas')}
        >
          <FiBriefcase /> BDAs
        </button>
      </div>
      
      <div className="admin-actions">
        <div className="select-actions">
          <label className="select-all-container">
            <input 
              type="checkbox" 
              checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0} 
              onChange={handleSelectAll}
              disabled={filteredApplications.length === 0}
            />
            <span>Select All</span>
          </label>
          
          <button 
            className="action-button delete-button" 
            onClick={handleDeleteSelected}
            disabled={selectedApplications.length === 0}
          >
            <FiTrash2 /> Delete Selected
          </button>
          
          <button 
            className="action-button refresh-button" 
            onClick={fetchApplications}
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        <div className="search-filter-group">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search applications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="view-toggle">
            <button 
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <FiGrid />
            </button>
            <button 
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          <FiAlertCircle /> {error}
        </div>
      )}

      {isLoading && (
          <div className="loading-indicator">
            <div className="loading-spinner"></div>
            <p>Loading applications...</p>
          </div>
      )}

      {!isLoading && filteredApplications.length === 0 && (
        <div className="no-applications">
          <FiAlertCircle size={48} />
          <h2>No applications found</h2>
          <p>Try adjusting your filters or search criteria.</p>
          </div>
      )}

      {!isLoading && filteredApplications.length > 0 && (
        <div className={`applications-container ${viewMode === 'grid' ? 'applications-grid' : 'applications-list'}`}>
          {filteredApplications.map(application => (
            <div 
              key={application._id} 
              className={`application-card ${selectedApplications.includes(application._id) ? 'selected' : ''}`}
            >
              <div className="card-select">
                    <input 
                      type="checkbox" 
                  className="select-checkbox"
                  checked={selectedApplications.includes(application._id)}
                  onChange={() => handleToggleSelect(application._id)}
                />
              </div>
              
              <div className={`application-avatar ${application.type}`}>
                {getInitials(application.name)}
              </div>
              
              <div className="application-info">
                <h3>{application.name || 'Unnamed Applicant'}</h3>
                
                <div className="application-meta">
                  <div className="meta-item">
                    <FiMail size={14} />
                    <span>{application.email}</span>
                  </div>
                  
                  {application.company && (
                    <div className="meta-item application-company">
                      <FiBriefcase size={14} />
                      <span>{application.company}</span>
                    </div>
                  )}
                  
                  <div className="meta-item">
                    <FiCalendar size={14} />
                    <span>{moment(application.createdAt).format('MMM D, YYYY')}</span>
                  </div>
                </div>
                
                {application.domains && application.domains.length > 0 && (
                  <div className="application-domains">
                    {application.domains.slice(0, 3).map((domain, index) => (
                      <span key={index} className="domain-tag">{domain}</span>
                    ))}
                    {application.domains.length > 3 && (
                      <span className="domain-tag more">+{application.domains.length - 3}</span>
                    )}
                  </div>
                )}
                
                <div className="application-footer">
                  <span className={`status-badge ${getStatusClass(application.status)}`}>
                    {application.status ? application.status.charAt(0).toUpperCase() + application.status.slice(1) : 'Pending'}
                  </span>
                  
                  <button 
                    className="view-details-button"
                    onClick={() => handleViewDetails(application)}
                  >
                    <span>View Details</span>
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedApplication && (
        <div className="application-modal-backdrop" onClick={handleCloseDetails}>
          <div className="application-details" onClick={e => e.stopPropagation()}>
            <div className="details-header">
            <h2>Application Details</h2>
              <button className="close-button" onClick={handleCloseDetails}>×</button>
            </div>
            
              <div className="details-content">
              <div className="details-row">
                <div className="details-col">
                  <label>Applicant Type</label>
                  <p className="application-type">
                    {selectedApplication.type === 'mentor' ? (
                      <><FiUserCheck /> Mentor</>
                    ) : (
                      <><FiBriefcase /> BDA</>
                    )}
                  </p>
                </div>
                
                <div className="details-col">
                  <label>Status</label>
                  <p>
                    <span className={`status-badge ${getStatusClass(selectedApplication.status)}`}>
                      {selectedApplication.status ? selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1) : 'Pending'}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="details-row">
                <div className="details-col">
                  <label>Full Name</label>
                  <p>{selectedApplication.name || 'N/A'}</p>
                </div>
                
                <div className="details-col">
                  <label>Email</label>
                  <p>{selectedApplication.email}</p>
                </div>
              </div>
              
              <div className="details-row">
                <div className="details-col">
                  <label>Company</label>
                  <p>{selectedApplication.company || 'N/A'}</p>
                </div>
                
                <div className="details-col">
                  <label>Applied On</label>
                  <p>{moment(selectedApplication.createdAt).format('MMM D, YYYY')}</p>
                </div>
              </div>
              
              {selectedApplication.website && (
                <div className="details-row">
                  <div className="details-col full-width">
                    <label>Website</label>
                    <p>
                      <a href={selectedApplication.website} target="_blank" rel="noopener noreferrer" className="details-link">
                        <FiLink /> {selectedApplication.website}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              
              {selectedApplication.domains && selectedApplication.domains.length > 0 && (
                <div className="details-row">
                  <div className="details-col full-width">
                    <label>Domains</label>
                    <div className="details-domains">
                      {selectedApplication.domains.map((domain, index) => (
                        <span key={index} className="domain-tag">{domain}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedApplication.experience && (
                <div className="details-row">
                  <div className="details-col full-width">
                    <label>Experience</label>
                    <p>{selectedApplication.experience}</p>
                  </div>
                </div>
              )}
              
              {selectedApplication.skills && (
                <div className="details-row">
                  <div className="details-col full-width">
                    <label>Skills</label>
                    <p>{selectedApplication.skills}</p>
                  </div>
              </div>
            )}
              
              {selectedApplication.motivation && (
                <div className="details-row">
                  <div className="details-col full-width">
                    <label>Motivation</label>
                    <p>{selectedApplication.motivation}</p>
                  </div>
          </div>
        )}
      </div>
            
            <div className="details-actions">
              {selectedApplication.status !== 'approved' && (
                <button 
                  className="action-button approve-button" 
                  onClick={() => handleUpdateStatus(selectedApplication._id, 'approved')}
                >
                  Approve Application
                </button>
              )}
              {selectedApplication.status !== 'rejected' && (
                <button 
                  className="action-button reject-button" 
                  onClick={() => handleUpdateStatus(selectedApplication._id, 'rejected')}
                >
                  Reject Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 