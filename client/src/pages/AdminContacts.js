import React, { useState, useEffect } from 'react';
import ContactService from '../utils/contactService';
import './AdminContacts.css';

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await ContactService.getContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await ContactService.updateContactStatus(id, newStatus);
      // Update local state
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status: newStatus } : contact
      ));
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const viewContactDetails = (contact) => {
    setSelectedContact(contact);
  };

  const closeDetails = () => {
    setSelectedContact(null);
  };

  if (loading) {
    return <div className="admin-contacts loading">Loading contacts...</div>;
  }

  if (error) {
    return <div className="admin-contacts error">{error}</div>;
  }

  return (
    <div className="admin-contacts">
      <h1>Contact Form Submissions</h1>
      
      <div className="contacts-container">
        <div className="contacts-list">
          <h2>All Submissions ({contacts.length})</h2>
          {contacts.length === 0 ? (
            <p>No contact submissions found.</p>
          ) : (
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr 
                    key={contact.id} 
                    className={selectedContact && selectedContact.id === contact.id ? 'selected' : ''}
                  >
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{formatDate(contact.createdAt)}</td>
                    <td>
                      <span className={`status-badge ${contact.status}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="view-btn"
                        onClick={() => viewContactDetails(contact)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {selectedContact && (
          <div className="contact-details">
            <div className="details-header">
              <h2>Contact Details</h2>
              <button className="close-btn" onClick={closeDetails}>×</button>
            </div>
            
            <div className="details-content">
              <div className="detail-row">
                <strong>Name:</strong> {selectedContact.name}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {selectedContact.email}
              </div>
              <div className="detail-row">
                <strong>Submitted:</strong> {formatDate(selectedContact.createdAt)}
              </div>
              <div className="detail-row">
                <strong>Status:</strong> 
                <span className={`status-badge ${selectedContact.status}`}>
                  {selectedContact.status}
                </span>
              </div>
              <div className="detail-row message">
                <strong>Message:</strong> 
                <div className="message-content">
                  {selectedContact.message.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
              
              <div className="status-actions">
                <strong>Change Status:</strong>
                <div className="status-buttons">
                  <button 
                    className={`status-btn new ${selectedContact.status === 'new' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(selectedContact.id, 'new')}
                    disabled={selectedContact.status === 'new'}
                  >
                    New
                  </button>
                  <button 
                    className={`status-btn read ${selectedContact.status === 'read' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(selectedContact.id, 'read')}
                    disabled={selectedContact.status === 'read'}
                  >
                    Read
                  </button>
                  <button 
                    className={`status-btn replied ${selectedContact.status === 'replied' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(selectedContact.id, 'replied')}
                    disabled={selectedContact.status === 'replied'}
                  >
                    Replied
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminContacts; 