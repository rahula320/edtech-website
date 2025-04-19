import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin');
      return;
    }
    setIsAdmin(true);
    
    // Load mentor applications from localStorage
    const mentorApplications = JSON.parse(localStorage.getItem('mentorApplications') || '[]');
    setApplications(mentorApplications);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
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
              <li className="active">Mentor Applications</li>
            </ul>
          </nav>
        </div>
        
        <main className="main-content">
          {selectedApplication ? (
            <div className="application-details">
              <button 
                className="back-button" 
                onClick={() => setSelectedApplication(null)}
              >
                Back to List
              </button>
              <h2>Application Details</h2>
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
          ) : (
            <>
              <h2>Mentor Applications</h2>
              {applications.length === 0 ? (
                <div className="no-applications">
                  <p>No mentor applications received yet.</p>
                </div>
              ) : (
                <div className="applications-list">
                  {applications.map((application, index) => (
                    <div 
                      key={index} 
                      className="application-item"
                      onClick={() => setSelectedApplication(application)}
                    >
                      <div className="application-header">
                        <h3>{application.name}</h3>
                        <span className="application-time">
                          {new Date(application.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="application-meta">
                        <span>{application.designation} at {application.company}</span>
                        <span>{application.domains.length} domain(s) selected</span>
                      </div>
                    </div>
                  ))}
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