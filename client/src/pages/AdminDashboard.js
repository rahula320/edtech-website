import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [applications, setApplications] = useState([]);
  const [bdaApplications, setBdaApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeTab, setActiveTab] = useState('mentor');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/admin/status', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.isAdmin) {
            setIsAdmin(true);
            
            // Load mentor applications from localStorage
            const mentorApplications = JSON.parse(localStorage.getItem('mentorApplications') || '[]');
            setApplications(mentorApplications);
            
            // Load BDA applications from localStorage
            const bdaApplicationsData = JSON.parse(localStorage.getItem('bdaApplications') || '[]');
            setBdaApplications(bdaApplicationsData);
          } else {
            navigate('/admin');
          }
        } else {
          // Check local fallback
          const adminAuth = localStorage.getItem('adminAuth');
          if (!adminAuth) {
            navigate('/admin');
            return;
          }
          setIsAdmin(true);
          
          // Load mentor applications from localStorage
          const mentorApplications = JSON.parse(localStorage.getItem('mentorApplications') || '[]');
          setApplications(mentorApplications);
          
          // Load BDA applications from localStorage
          const bdaApplicationsData = JSON.parse(localStorage.getItem('bdaApplications') || '[]');
          setBdaApplications(bdaApplicationsData);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        // Fallback to local storage check
        const adminAuth = localStorage.getItem('adminAuth');
        if (!adminAuth) {
          navigate('/admin');
          return;
        }
        setIsAdmin(true);
        
        // Load mentor applications from localStorage
        const mentorApplications = JSON.parse(localStorage.getItem('mentorApplications') || '[]');
        setApplications(mentorApplications);
        
        // Load BDA applications from localStorage
        const bdaApplicationsData = JSON.parse(localStorage.getItem('bdaApplications') || '[]');
        setBdaApplications(bdaApplicationsData);
      }
    };
    
    checkAdminStatus();
  }, [navigate]);

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

  // Delete selected applications
  const deleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    // Ask for confirmation
    if (!window.confirm(`Are you sure you want to delete ${selectedItems.length} application(s)?`)) {
      return;
    }
    
    if (activeTab === 'mentor') {
      // Create a new array with applications that are not selected for deletion
      const updatedApplications = applications.filter((_, index) => !selectedItems.includes(index));
      
      // Update state and localStorage
      setApplications(updatedApplications);
      localStorage.setItem('mentorApplications', JSON.stringify(updatedApplications));
    } else {
      // Create a new array with BDA applications that are not selected for deletion
      const updatedBdaApplications = bdaApplications.filter((_, index) => !selectedItems.includes(index));
      
      // Update state and localStorage
      setBdaApplications(updatedBdaApplications);
      localStorage.setItem('bdaApplications', JSON.stringify(updatedBdaApplications));
    }
    
    // Clear selections
    setSelectedItems([]);
    setSelectAll(false);
  };

  // Convert domains array to comma-separated string for CSV
  const formatDomainsForCSV = (domains) => {
    return domains ? domains.join(', ') : '';
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
        app.name,
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
      const headers = ['Full Name', 'Email', 'Phone', 'Education', 'Experience', 'LinkedIn Profile', 'Resume File', 'Date Applied'];
      
      // Convert BDA applications to CSV format
      const csvData = bdaApplications.map(app => [
        app.fullName,
        app.email,
        app.phone,
        app.education,
        app.experience,
        app.portfolio || 'Not provided',
        app.resume ? app.resume.name : 'Not uploaded',
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
        app.name,
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
      const headers = ['Full Name', 'Email', 'Phone', 'Education', 'Experience', 'LinkedIn Profile', 'Resume File', 'Date Applied'];
      
      // Convert selected BDA applications to CSV format
      const selectedBdaApplications = selectedItems.map(index => bdaApplications[index]);
      
      const csvData = selectedBdaApplications.map(app => [
        app.fullName,
        app.email,
        app.phone,
        app.education,
        app.experience,
        app.portfolio || 'Not provided',
        app.resume ? app.resume.name : 'Not uploaded',
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
        if (/[",\n\r]/.test(cell)) {
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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
    
    // Clear admin from localStorage
    localStorage.removeItem('adminAuth');
    // Redirect to login page
    navigate('/admin');
  };

  if (!isAdmin) {
    return <div className="loading">Checking authentication...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      
      <div className="dashboard-content">
        <div className="sidebar">
          <nav>
            <ul>
              <li 
                className={activeTab === 'mentor' ? 'active' : ''} 
                onClick={() => handleTabChange('mentor')}
              >
                Mentor Applications
              </li>
              <li 
                className={activeTab === 'bda' ? 'active' : ''} 
                onClick={() => handleTabChange('bda')}
              >
                Business Development Applications
              </li>
            </ul>
          </nav>
        </div>
        
        <main className="main-content">
          {/* Mentor Application Details View */}
          {activeTab === 'mentor' && selectedApplication && (
            <div className="application-details">
              <button 
                className="back-button" 
                onClick={() => setSelectedApplication(null)}
              >
                <i className="fas fa-arrow-left"></i> Back to List
              </button>
              <h2>Mentor Application Details</h2>
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{selectedApplication.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedApplication.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{selectedApplication.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Company:</span>
                <span className="detail-value">{selectedApplication.company}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Designation:</span>
                <span className="detail-value">{selectedApplication.designation}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">{selectedApplication.experience} years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Applied On:</span>
                <span className="detail-value">
                  {new Date(selectedApplication.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="detail-row domains-row">
                <span className="detail-label">Domains:</span>
                <div className="domains-list">
                  {selectedApplication.domains.map(domain => (
                    <span key={domain} className="domain-tag">{domain}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* BDA Application Details View */}
          {activeTab === 'bda' && selectedApplication && (
            <div className="application-details">
              <button 
                className="back-button" 
                onClick={() => setSelectedApplication(null)}
              >
                <i className="fas fa-arrow-left"></i> Back to List
              </button>
              <h2>Business Development Application Details</h2>
              <div className="detail-row">
                <span className="detail-label">Full Name:</span>
                <span className="detail-value">{selectedApplication.fullName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedApplication.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{selectedApplication.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Education:</span>
                <span className="detail-value">{selectedApplication.education}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">{selectedApplication.experience} years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">LinkedIn:</span>
                <span className="detail-value">
                  {selectedApplication.portfolio ? (
                    <a href={selectedApplication.portfolio} target="_blank" rel="noopener noreferrer">
                      {selectedApplication.portfolio}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Resume:</span>
                <span className="detail-value resume-info">
                  {selectedApplication.resume ? (
                    <>
                      <i className="fas fa-file-pdf"></i> 
                      {selectedApplication.resume.name} 
                      ({(selectedApplication.resume.size / (1024 * 1024)).toFixed(2)} MB)
                    </>
                  ) : (
                    'Not uploaded'
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Applied On:</span>
                <span className="detail-value">
                  {new Date(selectedApplication.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          )}
          
          {/* Mentor Applications List View */}
          {activeTab === 'mentor' && !selectedApplication && (
            <>
              <div className="applications-header">
                <h2>Mentor Applications</h2>
                <div className="application-actions">
                  <button 
                    className="action-button delete-button"
                    onClick={deleteSelected}
                    disabled={selectedItems.length === 0}
                  >
                    <i className="fas fa-trash"></i> Delete Selected
                  </button>
                  <div className="dropdown">
                    <button className="action-button">
                      <i className="fas fa-download"></i> Export CSV
                    </button>
                    <div className="dropdown-menu">
                      <button onClick={downloadCSV}>All Applications</button>
                      <button 
                        onClick={downloadSelectedCSV}
                        disabled={selectedItems.length === 0}
                      >
                        Selected Applications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {applications.length === 0 ? (
                <div className="no-applications">
                  <p>No mentor applications received yet.</p>
                </div>
              ) : (
                <div className="applications-table-container">
                  <table className="applications-table">
                    <thead>
                      <tr>
                        <th>
                          <input 
                            type="checkbox" 
                            checked={selectAll}
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Company</th>
                        <th>Date Applied</th>
                        <th>Domains</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((application, index) => (
                        <tr 
                          key={index} 
                          className={selectedItems.includes(index) ? 'selected' : ''}
                          onClick={() => setSelectedApplication(application)}
                        >
                          <td onClick={(e) => toggleSelect(index, e)}>
                            <input 
                              type="checkbox" 
                              checked={selectedItems.includes(index)}
                              onChange={(e) => e.stopPropagation()}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td>{application.name}</td>
                          <td>{application.email}</td>
                          <td>{application.designation}</td>
                          <td>{application.company}</td>
                          <td>{new Date(application.timestamp).toLocaleDateString()}</td>
                          <td>{application.domains.length} domain(s)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          
          {/* BDA Applications List View */}
          {activeTab === 'bda' && !selectedApplication && (
            <>
              <div className="applications-header">
                <h2>Business Development Applications</h2>
                <div className="application-actions">
                  <button 
                    className="action-button delete-button"
                    onClick={deleteSelected}
                    disabled={selectedItems.length === 0}
                  >
                    <i className="fas fa-trash"></i> Delete Selected
                  </button>
                  <div className="dropdown">
                    <button className="action-button">
                      <i className="fas fa-download"></i> Export CSV
                    </button>
                    <div className="dropdown-menu">
                      <button onClick={downloadCSV}>All Applications</button>
                      <button 
                        onClick={downloadSelectedCSV}
                        disabled={selectedItems.length === 0}
                      >
                        Selected Applications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {bdaApplications.length === 0 ? (
                <div className="no-applications">
                  <p>No business development applications received yet.</p>
                </div>
              ) : (
                <div className="applications-table-container">
                  <table className="applications-table">
                    <thead>
                      <tr>
                        <th>
                          <input 
                            type="checkbox" 
                            checked={selectAll}
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Education</th>
                        <th>Experience</th>
                        <th>Date Applied</th>
                        <th>Resume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bdaApplications.map((application, index) => (
                        <tr 
                          key={index} 
                          className={selectedItems.includes(index) ? 'selected' : ''}
                          onClick={() => setSelectedApplication(application)}
                        >
                          <td onClick={(e) => toggleSelect(index, e)}>
                            <input 
                              type="checkbox" 
                              checked={selectedItems.includes(index)}
                              onChange={(e) => e.stopPropagation()}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td>{application.fullName}</td>
                          <td>{application.email}</td>
                          <td>{application.education}</td>
                          <td>{application.experience} years</td>
                          <td>{new Date(application.timestamp).toLocaleDateString()}</td>
                          <td>{application.resume ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 