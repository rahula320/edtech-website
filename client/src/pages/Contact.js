import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message' });
    }
  };

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>Have questions or need assistance? We're here to help!</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <div className="contact-info-header">
                <h2>Get in Touch</h2>
                <p className="last-updated">Last updated on 26-04-2025 14:34:54</p>
              </div>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="icon-wrapper">
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Merchant Legal entity name</h3>
                    <p>RAHUL KUMAR</p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="icon-wrapper">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Registered Address</h3>
                    <p>15th Cross, 15th Main Road, HSR Layout, Bangalore, Karnataka, PIN: 560102</p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="icon-wrapper">
                    <i className="fas fa-location-arrow"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Operational Address</h3>
                    <p>15th Cross, 15th Main Road, HSR Layout, Bangalore, Karnataka, PIN: 560102</p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="icon-wrapper">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Telephone</h3>
                    <p><a href="tel:9150210762">9150210762</a></p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="icon-wrapper">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Email</h3>
                    <p><a href="mailto:acmyxteams@gmail.com">acmyxteams@gmail.com</a></p>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name <span className="required">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject <span className="required">*</span></label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message <span className="required">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  {status.type === 'loading' ? (
                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Send Message</>
                  )}
                </button>

                {status.message && (
                  <div className={`status-message ${status.type}`}>
                    {status.type === 'success' && <i className="fas fa-check-circle"></i>}
                    {status.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
                    {status.type === 'loading' && <i className="fas fa-spinner fa-spin"></i>}
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map">
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7500154449926!2d77.6264044744771!3d12.91425798744628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1491bfdc8ab7%3A0x3d2ce76aee6e26cc!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1695034580590!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Our location on map"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Contact; 