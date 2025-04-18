import React, { useState } from 'react';
import './Careers.css';

function Careers() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    experience: '',
    domains: []
  });
  
  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  
  // Form errors
  const [errors, setErrors] = useState({});

  // Domain options
  const domainOptions = [
    { id: 'data-science', label: 'Data Science & Analytics' },
    { id: 'web-dev', label: 'Web Development' },
    { id: 'mobile-dev', label: 'Mobile App Development' },
    { id: 'cloud', label: 'Cloud Computing' },
    { id: 'ai-ml', label: 'AI & Machine Learning' },
    { id: 'cyber-security', label: 'Cyber Security' },
    { id: 'devops', label: 'DevOps' },
    { id: 'iot', label: 'Internet of Things' },
    { id: 'blockchain', label: 'Blockchain' }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  // Handle domain checkbox changes
  const handleDomainChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        domains: [...formData.domains, value]
      });
    } else {
      setFormData({
        ...formData,
        domains: formData.domains.filter(domain => domain !== value)
      });
    }
    
    // Clear domain error if at least one is selected
    if (errors.domains && checked) {
      setErrors({
        ...errors,
        domains: undefined
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (formData.domains.length === 0) newErrors.domains = 'Please select at least one domain';
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Show success popup
    setShowPopup(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        designation: '',
        experience: '',
        domains: []
      });
    }, 3000);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="careers-page">
      <div className="careers-hero">
        <div className="careers-hero-content">
          <h1>Join Our Mission to Transform Education</h1>
          <p>We're looking for passionate individuals who want to make a difference in the lives of students around the world. Explore our open positions and become part of our team.</p>
        </div>
      </div>

      <section className="careers-why-join">
        <div className="container">
          <h2>Why Work With Us</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-rocket"></i>
              <h3>Make an Impact</h3>
              <p>Help thousands of students transform their careers and achieve their dreams through education.</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-laptop-house"></i>
              <h3>Remote-First Culture</h3>
              <p>Enjoy the flexibility of working remotely with a global team that values work-life balance.</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-chart-line"></i>
              <h3>Growth Opportunities</h3>
              <p>Continuous learning, professional development, and clear pathways for career advancement.</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-users"></i>
              <h3>Collaborative Environment</h3>
              <p>Work alongside talented professionals who are passionate about education and technology.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mentor-application">
        <div className="container">
          <div className="section-header">
            <h2>Join Us as a Mentor</h2>
            <p>Share your expertise and help shape the next generation of tech professionals. Apply to become a mentor in your area of expertise.</p>
          </div>
          
          <div className="application-form-container">
            <form className="mentor-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company Name *</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={errors.company ? 'error' : ''}
                  />
                  {errors.company && <span className="error-message">{errors.company}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="designation">Current Designation *</label>
                  <input 
                    type="text" 
                    id="designation" 
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className={errors.designation ? 'error' : ''}
                  />
                  {errors.designation && <span className="error-message">{errors.designation}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="experience">Years of Experience</label>
                  <input 
                    type="number" 
                    id="experience" 
                    name="experience"
                    min="0"
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group domains-group">
                <label>Select Domain(s) *</label>
                <p className="domains-hint">Select at least one domain where you'd like to mentor students</p>
                
                <div className="domains-grid">
                  {domainOptions.map(domain => (
                    <div className="domain-checkbox" key={domain.id}>
                      <input 
                        type="checkbox" 
                        id={domain.id} 
                        name="domains" 
                        value={domain.id}
                        checked={formData.domains.includes(domain.id)}
                        onChange={handleDomainChange}
                      />
                      <label htmlFor={domain.id}>{domain.label}</label>
                    </div>
                  ))}
                </div>
                {errors.domains && <span className="error-message domains-error">{errors.domains}</span>}
              </div>
              
              <button type="submit" className="apply-button">Apply Now</button>
            </form>
          </div>
        </div>
      </section>

      <section className="careers-cta">
        <div className="container">
          <h2>Don't See a Role That Fits?</h2>
          <p>We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute.</p>
          <button className="cta-button">Submit Your Resume</button>
        </div>
      </section>
      
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3><i className="fas fa-check-circle"></i> Application Submitted</h3>
              <button className="close-popup" onClick={closePopup}><i className="fas fa-times"></i></button>
            </div>
            <div className="popup-content">
              <p>Thank you for your interest in becoming a mentor! Your application has been submitted to our HR department. We will review your information and get back to you soon.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Careers; 