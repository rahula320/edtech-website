import React, { useState, useRef, useEffect } from 'react';
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
  
  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  
  // Form errors
  const [errors, setErrors] = useState({});

  // Domain options - updated to match all programs
  const domainOptions = [
    { id: 'data-science', label: 'Data Science & Analytics' },
    { id: 'artificial-intelligence', label: 'Artificial Intelligence' },
    { id: 'machine-learning', label: 'Machine Learning with Python' },
    { id: 'cloud-computing', label: 'Cloud Computing' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'cyber-security', label: 'Cyber Security' },
    { id: 'devops', label: 'DevOps' },
    { id: 'android-development', label: 'Android Development' },
    { id: 'ios-development', label: 'iOS Development' },
    { id: 'embedded-systems', label: 'Embedded Systems' },
    { id: 'iot', label: 'Internet of Things (IoT)' },
    { id: 'autocad', label: 'AutoCAD Designing' }
  ];

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Toggle domain selection
  const toggleDomain = (domainId) => {
    if (formData.domains.includes(domainId)) {
      setFormData({
        ...formData,
        domains: formData.domains.filter(d => d !== domainId)
      });
    } else {
      setFormData({
        ...formData,
        domains: [...formData.domains, domainId]
      });
      
      // Clear domain error if at least one is selected
      if (errors.domains) {
        setErrors({
          ...errors,
          domains: undefined
        });
      }
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Get selected domains text
  const getSelectedDomainsText = () => {
    if (formData.domains.length === 0) {
      return 'Select domains (at least one)';
    } else if (formData.domains.length === 1) {
      return domainOptions.find(d => d.id === formData.domains[0]).label;
    } else {
      return `${formData.domains.length} domains selected`;
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
    
    // Reset form after 3 seconds
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
                    placeholder="Enter your full name"
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
                    placeholder="Enter your email address"
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
                    placeholder="Enter your phone number"
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
                    placeholder="Enter your company name"
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
                    placeholder="Enter your current job title"
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
                    placeholder="Optional"
                  />
                </div>
              </div>
              
              <div className="form-group domains-group">
                <label>Select Domain(s) *</label>
                <p className="domains-hint">Select at least one domain where you'd like to mentor students</p>
                
                <div className="domains-dropdown-container" ref={dropdownRef}>
                  <div 
                    className={`domains-dropdown-header ${errors.domains ? 'error' : ''}`}
                    onClick={toggleDropdown}
                  >
                    <span>{getSelectedDomainsText()}</span>
                    <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="domains-dropdown-list">
                      {domainOptions.map(domain => (
                        <div 
                          key={domain.id} 
                          className={`domain-option ${formData.domains.includes(domain.id) ? 'selected' : ''}`}
                          onClick={() => toggleDomain(domain.id)}
                        >
                          {formData.domains.includes(domain.id) ? (
                            <i className="fas fa-check-square"></i>
                          ) : (
                            <i className="far fa-square"></i>
                          )}
                          <span>{domain.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
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