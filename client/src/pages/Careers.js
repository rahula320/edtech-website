import React, { useState, useRef, useEffect } from 'react';
import './Careers.css';

function Careers() {
  // Form state for mentor application
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    experience: '',
    domains: []
  });
  
  // Form state for business development associate application
  const [bdaFormData, setBdaFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: [],
    portfolio: '',
    coverletter: '',
    resume: null
  });
  
  // Input focus states
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [showBdaPopup, setShowBdaPopup] = useState(false);
  
  // Form errors
  const [errors, setErrors] = useState({});
  const [bdaErrors, setBdaErrors] = useState({});

  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBdaSubmitting, setIsBdaSubmitting] = useState(false);

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

  // Handle input focus
  const handleFocus = (name) => {
    setFocusedInput(name);
  };

  // Handle input blur
  const handleBlur = () => {
    setFocusedInput(null);
  };

  // Handle input changes for mentor form
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
  
  // Handle input changes for BDA form
  const handleBdaInputChange = (e) => {
    const { name, value } = e.target;
    setBdaFormData({
      ...bdaFormData,
      [name]: value
    });
    
    // Clear error for this field
    if (bdaErrors[name]) {
      setBdaErrors({
        ...bdaErrors,
        [name]: undefined
      });
    }
  };
  
  // Handle file input change for BDA form
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (files && files[0]) {
      // Validate file type (PDF only)
      const fileType = files[0].type;
      if (fileType !== 'application/pdf') {
        setBdaErrors({
          ...bdaErrors,
          resume: 'Only PDF files are accepted'
        });
        return;
      }
      
      setBdaFormData({
        ...bdaFormData,
        [name]: files[0]
      });
      
      // Clear error for this field
      if (bdaErrors[name]) {
        setBdaErrors({
          ...bdaErrors,
          [name]: undefined
        });
      }
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

  // Check if input has value
  const hasValue = (name) => {
    return formData[name] && formData[name].trim() !== '';
  };

  // Validate mentor form
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
  
  // Validate BDA form
  const validateBdaForm = () => {
    const newErrors = {};
    
    if (!bdaFormData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!bdaFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bdaFormData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!bdaFormData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(bdaFormData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!bdaFormData.education.trim()) newErrors.education = 'Education details are required';
    if (!bdaFormData.resume) newErrors.resume = 'Resume is required';
    
    return newErrors;
  };

  // Handle mentor form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Set submitting state
    setIsSubmitting(true);
    
    // Create application object with timestamp
    const application = {
      ...formData,
      timestamp: new Date().getTime()
    };
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Save to localStorage (in a real app, this would be an API call)
      const existingApplications = JSON.parse(localStorage.getItem('mentorApplications') || '[]');
      existingApplications.push(application);
      localStorage.setItem('mentorApplications', JSON.stringify(existingApplications));
      
      // Show success popup
      setShowPopup(true);
      setIsSubmitting(false);
      
      // Reset form after popup is closed
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
    }, 800);
  };
  
  // Handle BDA form submission
  const handleBdaSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateBdaForm();
    
    if (Object.keys(formErrors).length > 0) {
      setBdaErrors(formErrors);
      return;
    }
    
    // Set submitting state
    setIsBdaSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would be a FormData object to handle file uploads
      // and an actual API call to the backend
      
      // Show success popup
      setShowBdaPopup(true);
      setIsBdaSubmitting(false);
      
      // Reset form after popup is closed
      setTimeout(() => {
        setShowBdaPopup(false);
        setBdaFormData({
          fullName: '',
          email: '',
          phone: '',
          education: '',
          experience: '',
          portfolio: '',
          resume: null
        });
      }, 3000);
    }, 800);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };
  
  // Close BDA popup
  const closeBdaPopup = () => {
    setShowBdaPopup(false);
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
                  <label htmlFor="name">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number <span className="required-star">*</span>
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">
                    Company Name <span className="required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('company')}
                    onBlur={handleBlur}
                    className={errors.company ? 'error' : ''}
                    placeholder="Enter your company name"
                  />
                  {errors.company && <span className="error-message">{errors.company}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="designation">
                    Current Designation <span className="required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="designation" 
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('designation')}
                    onBlur={handleBlur}
                    className={errors.designation ? 'error' : ''}
                    placeholder="Enter your current job title"
                  />
                  {errors.designation && <span className="error-message">{errors.designation}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="experience">
                    Years of Experience
                  </label>
                  <input 
                    type="number" 
                    id="experience" 
                    name="experience"
                    min="0"
                    value={formData.experience}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('experience')}
                    onBlur={handleBlur}
                    placeholder="Optional"
                  />
                </div>
              </div>
              
              <div className="form-group domains-group">
                <label>
                  Select Domain(s) <span className="required-star">*</span>
                </label>
                <p className="domains-hint">Select at least one domain where you'd like to mentor students</p>
                
                <div className={`domains-grid ${errors.domains ? 'error' : ''}`}>
                  {domainOptions.map(domain => (
                    <div 
                      key={domain.id} 
                      className={`domain-option ${formData.domains.includes(domain.id) ? 'selected' : ''}`}
                      onClick={() => toggleDomain(domain.id)}
                    >
                      <div className="checkbox-container">
                        {formData.domains.includes(domain.id) ? (
                          <i className="fas fa-check-square"></i>
                        ) : (
                          <i className="far fa-square"></i>
                        )}
                      </div>
                      <span>{domain.label}</span>
                    </div>
                  ))}
                </div>
                {errors.domains && <span className="error-message domains-error">{errors.domains}</span>}
                
                {formData.domains.length > 0 && (
                  <div className="selected-domains-count">
                    <span>{formData.domains.length} domain{formData.domains.length !== 1 ? 's' : ''} selected</span>
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                className="apply-button" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                ) : (
                  'Apply Now'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Business Development Associate Application */}
      <section className="bda-application">
        <div className="container">
          <div className="section-header">
            <h2>Apply for Business Development Associate</h2>
            <p>Join our business development team and help us grow by connecting with potential clients, partners, and industry stakeholders. We're looking for motivated individuals with excellent communication skills.</p>
          </div>
          
          <div className="application-form-container">
            <form className="bda-form" onSubmit={handleBdaSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    value={bdaFormData.fullName}
                    onChange={handleBdaInputChange}
                    onFocus={() => handleFocus('fullName')}
                    onBlur={handleBlur}
                    className={bdaErrors.fullName ? 'error' : ''}
                    placeholder="Enter your full name"
                  />
                  {bdaErrors.fullName && <span className="error-message">{bdaErrors.fullName}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="bdaEmail">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="bdaEmail" 
                    name="email"
                    value={bdaFormData.email}
                    onChange={handleBdaInputChange}
                    onFocus={() => handleFocus('bdaEmail')}
                    onBlur={handleBlur}
                    className={bdaErrors.email ? 'error' : ''}
                    placeholder="Enter your email address"
                  />
                  {bdaErrors.email && <span className="error-message">{bdaErrors.email}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bdaPhone">
                    Phone Number <span className="required-star">*</span>
                  </label>
                  <input 
                    type="tel" 
                    id="bdaPhone" 
                    name="phone"
                    value={bdaFormData.phone}
                    onChange={handleBdaInputChange}
                    onFocus={() => handleFocus('bdaPhone')}
                    onBlur={handleBlur}
                    className={bdaErrors.phone ? 'error' : ''}
                    placeholder="Enter your phone number"
                  />
                  {bdaErrors.phone && <span className="error-message">{bdaErrors.phone}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="education">
                    Education <span className="required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="education" 
                    name="education"
                    value={bdaFormData.education}
                    onChange={handleBdaInputChange}
                    onFocus={() => handleFocus('education')}
                    onBlur={handleBlur}
                    className={bdaErrors.education ? 'error' : ''}
                    placeholder="E.g., MBA in Marketing from XYZ University"
                  />
                  {bdaErrors.education && <span className="error-message">{bdaErrors.education}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bdaExperience">
                    Years of Experience in Business Development
                  </label>
                  <input 
                    type="number" 
                    id="bdaExperience" 
                    name="experience"
                    min="0"
                    value={bdaFormData.experience}
                    onChange={handleBdaInputChange}
                    onFocus={() => handleFocus('bdaExperience')}
                    onBlur={handleBlur}
                    placeholder="Optional"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="portfolio">
                    LinkedIn Profile
                  </label>
                  <input 
                    type="url" 
                    id="portfolio" 
                    name="portfolio"
                    value={bdaFormData.portfolio}
                    onChange={handleBdaInputChange}
                    onFocus={() => handleFocus('portfolio')}
                    onBlur={handleBlur}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
              
              <div className="form-group resume-upload">
                <label htmlFor="resume">
                  Upload Resume <span className="required-star">*</span>
                </label>
                <p className="file-format-note">Please upload your resume in PDF format only. Maximum file size: 5MB</p>
                
                <div className="resume-upload-container">
                  <input 
                    type="file" 
                    id="resume" 
                    name="resume"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className={`file-input ${bdaErrors.resume ? 'error' : ''}`}
                  />
                  <div className="resume-upload-icon">
                    <i className="fas fa-file-pdf"></i>
                    <span>Upload PDF</span>
                  </div>
                </div>
                
                {bdaErrors.resume && <span className="error-message">{bdaErrors.resume}</span>}
                
                {bdaFormData.resume && (
                  <div className="file-selected">
                    <i className="fas fa-file-pdf"></i> 
                    <span className="filename">{bdaFormData.resume.name}</span>
                    <span className="filesize">({(bdaFormData.resume.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                className="apply-button" 
                disabled={isBdaSubmitting}
              >
                {isBdaSubmitting ? (
                  <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                ) : (
                  'Submit Application'
                )}
              </button>
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
      
      {showBdaPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3><i className="fas fa-check-circle"></i> Application Submitted</h3>
              <button className="close-popup" onClick={closeBdaPopup}><i className="fas fa-times"></i></button>
            </div>
            <div className="popup-content">
              <p>Thank you for applying to the Business Development Associate position! We've received your application and will review it shortly. Our recruitment team will contact you regarding the next steps.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Careers; 