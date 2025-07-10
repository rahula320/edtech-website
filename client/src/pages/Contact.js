import React, { useState } from 'react';
import './Contact.css';
import { submitToGoogleSheets } from '../utils/googleSheetsService';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    domain: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  // Program domains for dropdown - actual programs offered
  const programDomains = [
    "Data Science & Analytics",
    "Artificial Intelligence",
    "Machine Learning with Python",
    "Cloud Computing",
    "Web Development",
    "UI/UX Design & Development",
    "Embedded Systems",
    "Internet of Things (IoT)",
    "AutoCAD",
    "Cyber Security",
    "DevOps",
    "Android Development",
    "iOS Development"
  ];

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
      await submitToGoogleSheets(formData);
      setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', college: '', domain: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero-white">
        <div className="hero-content-centered">
          <h1>Contact Us</h1>
          <p>Have questions or need assistance? We're here to help!</p>
        </div>
      </div>

      <section className="contact-content">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <div className="contact-info-header">
                <h2>Get in Touch</h2>
                <p className="contact-subheading">Contact Information</p>
              </div>
              
              <div className="contact-details">                
                <div className="contact-detail-item">
                  <div className="icon-wrapper">
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="detail-content">
                    <h3>Legal Name</h3>
                    <p>ACMYX Private Limited</p>
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
              
              <div className="contact-hours">
                <h3>Business Hours</h3>
                <p>Monday - Sunday: 12:00 PM - 9:00 PM</p>
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

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="college">College Name <span className="required">*</span></label>
                    <input
                      type="text"
                      id="college"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      required
                      placeholder="Enter your college name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="domain">Domain of Interest <span className="required">*</span></label>
                  <select
                    id="domain"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                    className="domain-select"
                  >
                    <option value="" disabled>Select your domain of interest</option>
                    {programDomains.map((domain, index) => (
                      <option key={index} value={domain}>{domain}</option>
                    ))}
                  </select>
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
    </div>
  );
}

export default Contact;