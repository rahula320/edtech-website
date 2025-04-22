import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState({
    email: '',
    role: 'admin'
  });
  const [applications, setApplications] = useState([]);
  const [bdaApplications, setBdaApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeTab, setActiveTab] = useState('mentor');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in using local storage
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin');
      return;
    }
    
    setIsAdmin(true);
    
    // Get admin data from localStorage
    setAdminData({
      email: localStorage.getItem('adminEmail') || '',
      role: localStorage.getItem('adminRole') || 'admin'
    });
    
    // Fetch applications from API
    fetchApplications();
  }, [navigate]);

  // Fetch applications from API
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/applications');
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const data = await response.json();
      
      // Separate mentor and BDA applications
      const mentorApps = data.filter(app => app.type === 'mentor');
      const bdaApps = data.filter(app => app.type === 'bda');
      
      setApplications(mentorApps);
      setBdaApplications(bdaApps);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications. Please try again later.');
      
      // Fallback to empty arrays if API fails
      setApplications([]);
      setBdaApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedApplication(null);
    setSelectedItems([]);
    setSelectAll(false);
  };

  // Toggle selection of an application
  const toggleSelect = (index, event) => {
    event.stopPropagation(); // Prevent opening the application detail view
    
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  // Toggle selection of all applications
  const toggleSelectAll = () => {
    const currentApplications = activeTab === 'mentor' ? applications : bdaApplications;
    
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentApplications.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  // Delete selected applications - Not implemented with real API to avoid data loss
  const deleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    // Ask for confirmation
    if (!window.confirm(`Are you sure you want to delete ${selectedItems.length} application(s)? This action cannot be undone.`)) {
      return;
    }
    
    // In a real implementation, you would make API calls to delete each selected application
    alert("Delete functionality has been disabled in this demo to prevent data loss.");
    
    // Clear selections
    setSelectedItems([]);
    setSelectAll(false);
  };

  // Convert domains array to comma-separated string for CSV
  const formatDomainsForCSV = (domains) => {
    if (!domains) return '';
    if (typeof domains === 'string') return domains;
    if (Array.isArray(domains)) return domains.join(', ');
    return '';
  };

  // Download applications as CSV
  const downloadCSV = () => {
    const currentApplications = activeTab === 'mentor' ? applications : bdaApplications;
    
    // Check if there are applications to download
    if (currentApplications.length === 0) {
      alert('No applications to download.');
      return;
    }
    
    if (activeTab === 'mentor') {
      // Define CSV headers for mentor applications
      const headers = ['Name', 'Email', 'Phone', 'Company', 'Designation', 'Experience', 'Domains', 'Date Applied'];
      
      // Convert applications to CSV format
      const csvData = applications.map(app => [
        app.full_name,
        app.email,
        app.phone,
        app.company,
        app.designation,
        app.experience,
        formatDomainsForCSV(app.domains),
        new Date(app.timestamp).toLocaleString()
      ]);
      
      // Add headers to the beginning
      csvData.unshift(headers);
      
      // Generate and download CSV
      generateAndDownloadCSV(csvData, 'mentor-applications');
    } else {
      // Define CSV headers for BDA applications
      const headers = ['Full Name', 'Email', 'Phone', 'Education', 'Experience', 'LinkedIn Profile', 'Resume URL', 'Date Applied'];
      
      // Convert BDA applications to CSV format
      const csvData = bdaApplications.map(app => [
        app.full_name,
        app.email,
        app.phone,
        app.education,
        app.experience,
        app.portfolio_url || 'Not provided',
        app.resume_url || 'Not uploaded',
        new Date(app.timestamp).toLocaleString()
      ]);
      
      // Add headers to the beginning
      csvData.unshift(headers);
      
      // Generate and download CSV
      generateAndDownloadCSV(csvData, 'bda-applications');
    }
  };

  // Download selected applications as CSV
  const downloadSelectedCSV = () => {
    if (selectedItems.length === 0) {
      alert('No applications selected for download.');
      return;
    }
    
    if (activeTab === 'mentor') {
      // Define CSV headers for mentor applications
      const headers = ['Name', 'Email', 'Phone', 'Company', 'Designation', 'Experience', 'Domains', 'Date Applied'];
      
      // Convert selected applications to CSV format
      const selectedApplications = selectedItems.map(index => applications[index]);
      
      const csvData = selectedApplications.map(app => [
        app.full_name,
        app.email,
        app.phone,
        app.company,
        app.designation,
        app.experience,
        formatDomainsForCSV(app.domains),
        new Date(app.timestamp).toLocaleString()
      ]);
      
      // Add headers to the beginning
      csvData.unshift(headers);
      
      // Generate and download CSV
      generateAndDownloadCSV(csvData, 'selected-mentor-applications');
    } else {
      // Define CSV headers for BDA applications
      const headers = ['Full Name', 'Email', 'Phone', 'Education', 'Experience', 'LinkedIn Profile', 'Resume URL', 'Date Applied'];
      
      // Convert selected BDA applications to CSV format
      const selectedBdaApplications = selectedItems.map(index => bdaApplications[index]);
      
      const csvData = selectedBdaApplications.map(app => [
        app.full_name,
        app.email,
        app.phone,
        app.education,
        app.experience,
        app.portfolio_url || 'Not provided',
        app.resume_url || 'Not uploaded',
        new Date(app.timestamp).toLocaleString()
      ]);
      
      // Add headers to the beginning
      csvData.unshift(headers);
      
      // Generate and download CSV
      generateAndDownloadCSV(csvData, 'selected-bda-applications');
    }
  };

  // Helper function to generate and download CSV
  const generateAndDownloadCSV = (csvData, fileNamePrefix) => {
    // Convert to CSV string with proper escaping
    const csvString = csvData.map(row => 
      row.map(cell => {
        // If the cell contains commas, quotes, or newlines, wrap it in quotes and escape any quotes
        if (/[",\n\r]/.test(String(cell))) {
          return `"${String(cell).replace(/"/g, '""')}"`;
        }
        return String(cell);
      }).join(',')
    ).join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileNamePrefix}-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle refresh button click
  const handleRefresh = () => {
    fetchApplications();
  };

  // Handle logout
  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminRole');
    
    // Redirect to login page
    navigate('/admin');
  };

  if (!isAdmin) {
    return <div className="admin-dashboard loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-info">
          <div className="admin-user-info">
            <span>Logged in as: <strong>{adminData.email}</strong></span>
            <span className="admin-role">{adminData.role}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'mentor' ? 'active' : ''}`}
          onClick={() => handleTabChange('mentor')}
        >
          Mentor Applications
        </button>
        <button 
          className={`tab-button ${activeTab === 'bda' ? 'active' : ''}`}
          onClick={() => handleTabChange('bda')}
        >
          BDA Applications
        </button>
      </div>
      
      <div className="admin-actions">
        <div className="select-actions">
          <button className="action-button refresh-button" onClick={handleRefresh}>
            Refresh Data
          </button>
          <label className="select-all-container">
            <input 
              type="checkbox" 
              checked={selectAll} 
              onChange={toggleSelectAll} 
            />
            <span className="checkbox-text">Select All</span>
          </label>
          <button 
            className="action-button delete-button" 
            onClick={deleteSelected}
            disabled={selectedItems.length === 0}
          >
            Delete Selected
          </button>
        </div>
        <div className="download-actions">
          <button className="action-button" onClick={downloadCSV}>
            Download All
          </button>
          <button 
            className="action-button" 
            onClick={downloadSelectedCSV}
            disabled={selectedItems.length === 0}
          >
            Download Selected
          </button>
        </div>
      </div>
      
      <div className="applications-container">
        {loading ? (
          <div className="loading-indicator">Loading applications...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : activeTab === 'mentor' ? (
          applications.length === 0 ? (
            <div className="no-applications">No mentor applications found.</div>
          ) : (
            <div className="applications-list">
              {applications.map((app, index) => (
                <div 
                  key={index}
                  className={`application-item ${selectedItems.includes(index) ? 'selected' : ''}`}
                  onClick={() => setSelectedApplication(app)}
                >
                  <div className="select-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(index)} 
                      onChange={(e) => toggleSelect(index, e)} 
                    />
                  </div>
                  <div className="application-info">
                    <h3>{app.full_name}</h3>
                    <p><strong>Email:</strong> {app.email}</p>
                    <p><strong>Company:</strong> {app.company}</p>
                    <p><strong>Experience:</strong> {app.experience}</p>
                    <p><strong>Applied:</strong> {new Date(app.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          bdaApplications.length === 0 ? (
            <div className="no-applications">No BDA applications found.</div>
          ) : (
            <div className="applications-list">
              {bdaApplications.map((app, index) => (
                <div 
                  key={index}
                  className={`application-item ${selectedItems.includes(index) ? 'selected' : ''}`}
                  onClick={() => setSelectedApplication(app)}
                >
                  <div className="select-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(index)} 
                      onChange={(e) => toggleSelect(index, e)} 
                    />
                  </div>
                  <div className="application-info">
                    <h3>{app.full_name}</h3>
                    <p><strong>Email:</strong> {app.email}</p>
                    <p><strong>Education:</strong> {app.education}</p>
                    <p><strong>Experience:</strong> {app.experience}</p>
                    <p><strong>Applied:</strong> {new Date(app.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
        
        {selectedApplication && (
          <div className="application-details">
            <button className="close-button" onClick={() => setSelectedApplication(null)}>×</button>
            <h2>Application Details</h2>
            {activeTab === 'mentor' ? (
              <div className="details-content">
                <p><strong>Name:</strong> {selectedApplication.full_name}</p>
                <p><strong>Email:</strong> {selectedApplication.email}</p>
                <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                <p><strong>Company:</strong> {selectedApplication.company}</p>
                <p><strong>Designation:</strong> {selectedApplication.designation}</p>
                <p><strong>Experience:</strong> {selectedApplication.experience}</p>
                <p><strong>Domains:</strong> {formatDomainsForCSV(selectedApplication.domains)}</p>
                <p><strong>Applied:</strong> {new Date(selectedApplication.timestamp).toLocaleString()}</p>
              </div>
            ) : (
              <div className="details-content">
                <p><strong>Full Name:</strong> {selectedApplication.full_name}</p>
                <p><strong>Email:</strong> {selectedApplication.email}</p>
                <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                <p><strong>Education:</strong> {selectedApplication.education}</p>
                <p><strong>Experience:</strong> {selectedApplication.experience}</p>
                <p><strong>LinkedIn:</strong> {selectedApplication.portfolio_url || 'Not provided'}</p>
                <p><strong>Resume URL:</strong> {selectedApplication.resume_url || 'Not uploaded'}</p>
                <p><strong>Applied:</strong> {new Date(selectedApplication.timestamp).toLocaleString()}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 