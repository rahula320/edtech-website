import React, { useState } from 'react';
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
    domains: [],
    resumeUrl: '',
    portfolioUrl: ''
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
  
  // Form state for campus ambassador application
  const [campusAmbassadorFormData, setCampusAmbassadorFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    yearOfStudy: '',
    branch: '',
    department: ''
  });
  
  // Form display states
  const [showMentorForm, setShowMentorForm] = useState(false);
  const [showBdaForm, setShowBdaForm] = useState(false);
  const [showCampusAmbassadorForm, setShowCampusAmbassadorForm] = useState(false);
  
  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [showBdaPopup, setShowBdaPopup] = useState(false);
  const [showCampusAmbassadorPopup, setShowCampusAmbassadorPopup] = useState(false);
  
  // Form errors
  const [errors, setErrors] = useState({});
  const [bdaErrors, setBdaErrors] = useState({});
  const [campusAmbassadorErrors, setCampusAmbassadorErrors] = useState({});

  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBdaSubmitting, setIsBdaSubmitting] = useState(false);
  const [isCampusAmbassadorSubmitting, setIsCampusAmbassadorSubmitting] = useState(false);

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

  // Handle input focus - simplified to remove unused state
  const handleFocus = () => {
    // Focus handling if needed in the future
  };

  // Handle input blur - simplified to remove unused state
  const handleBlur = () => {
    // Blur handling if needed in the future
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
  
  // Handle input changes for campus ambassador form
  const handleCampusAmbassadorInputChange = (e) => {
    const { name, value } = e.target;
    setCampusAmbassadorFormData({
      ...campusAmbassadorFormData,
      [name]: value
    });
    
    // Clear error for this field
    if (campusAmbassadorErrors[name]) {
      setCampusAmbassadorErrors({
        ...campusAmbassadorErrors,
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

  // Validate campus ambassador form
  const validateCampusAmbassadorForm = () => {
    const newErrors = {};
    
    if (!campusAmbassadorFormData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!campusAmbassadorFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(campusAmbassadorFormData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!campusAmbassadorFormData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(campusAmbassadorFormData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!campusAmbassadorFormData.collegeName.trim()) newErrors.collegeName = 'College name is required';
    if (!campusAmbassadorFormData.yearOfStudy.trim()) newErrors.yearOfStudy = 'Year of study is required';
    if (!campusAmbassadorFormData.branch.trim()) newErrors.branch = 'Branch is required';
    if (!campusAmbassadorFormData.department.trim()) newErrors.department = 'Department is required';
    
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
    
    // Create domain labels string or array as needed
    const domainLabels = formData.domains.map(domainId => {
      const domain = domainOptions.find(d => d.id === domainId);
      return domain ? domain.label : domainId;
    });
    
    // Create application object for API
    const applicationData = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      designation: formData.designation,
      experience: formData.experience || "0",
      domains: domainLabels.length > 0 ? domainLabels.join(',') : '',
      resumeUrl: formData.resumeUrl || '',
      portfolioUrl: formData.portfolioUrl || ''
    };
    
    console.log('Submitting mentor application:', applicationData);
    
    // Send to API
    fetch('/api/applications/mentor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(applicationData)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          console.error('Server error response:', data);
          throw new Error(data.error || 'Failed to submit application');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Mentor application submitted successfully:', data);
      // Show success popup
      setShowPopup(true);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        designation: '',
        experience: '',
        domains: [],
        resumeUrl: '',
        portfolioUrl: ''
      });
      
      // Hide the success popup after 5 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    })
    .catch(error => {
      console.error('Error submitting application:', error);
      setErrors({
        submit: 'Failed to submit application. Please try again later. Error: ' + error.message
      });
      setIsSubmitting(false);
    });
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
    
    // For now, we'll create a URL from the file since API doesn't support file upload
    let resumeUrl = '';
    if (bdaFormData.resume) {
      resumeUrl = bdaFormData.resume.name;
    }
    
    // Create application object for API
    const applicationData = {
      fullName: bdaFormData.fullName,
      email: bdaFormData.email,
      phone: bdaFormData.phone,
      education: bdaFormData.education,
      experience: bdaFormData.experience || '',
      portfolioUrl: bdaFormData.portfolio || '',
      resumeUrl: resumeUrl
    };
    
    console.log('Submitting BDA application:', applicationData);
    
    // Send to API
    fetch('/api/applications/bda', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(applicationData)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.error || 'Failed to submit application');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('BDA application submitted successfully:', data);
      // Show success popup
      setShowBdaPopup(true);
      setIsBdaSubmitting(false);
      
      // Reset form
      setBdaFormData({
        fullName: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        portfolio: '',
        resume: null
      });
      
      // Reset file input
      const fileInput = document.getElementById('resume');
      if (fileInput) {
        fileInput.value = '';
      }
      
      // Hide the success popup after 5 seconds
      setTimeout(() => {
        setShowBdaPopup(false);
      }, 5000);
    })
    .catch(error => {
      console.error('Error submitting application:', error);
      setBdaErrors({
        submit: 'Failed to submit application. Please try again later.'
      });
      setIsBdaSubmitting(false);
    });
  };

  // Handle campus ambassador form submission
  const handleCampusAmbassadorSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateCampusAmbassadorForm();
    
    if (Object.keys(formErrors).length > 0) {
      setCampusAmbassadorErrors(formErrors);
      return;
    }
    
    // Set submitting state
    setIsCampusAmbassadorSubmitting(true);
    
    // Create application object for API
    const applicationData = {
      fullName: campusAmbassadorFormData.fullName,
      email: campusAmbassadorFormData.email,
      phone: campusAmbassadorFormData.phone,
      collegeName: campusAmbassadorFormData.collegeName,
      yearOfStudy: campusAmbassadorFormData.yearOfStudy,
      branch: campusAmbassadorFormData.branch,
      department: campusAmbassadorFormData.department
    };
    
    console.log('Submitting campus ambassador application:', applicationData);
    
    // Send to API
    fetch('/api/applications/campus-ambassador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(applicationData)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.error || 'Failed to submit application');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Campus ambassador application submitted successfully:', data);
      // Show success popup
      setShowCampusAmbassadorPopup(true);
      setIsCampusAmbassadorSubmitting(false);
      
      // Reset form
      setCampusAmbassadorFormData({
        fullName: '',
        email: '',
        phone: '',
        collegeName: '',
        yearOfStudy: '',
        branch: '',
        department: ''
      });
      
      // Hide the success popup after 5 seconds
      setTimeout(() => {
        setShowCampusAmbassadorPopup(false);
      }, 5000);
    })
    .catch(error => {
      console.error('Error submitting application:', error);
      setCampusAmbassadorErrors({
        submit: 'Failed to submit application. Please try again later.'
      });
      setIsCampusAmbassadorSubmitting(false);
    });
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };
  
  // Close BDA popup
  const closeBdaPopup = () => {
    setShowBdaPopup(false);
  };
  
  // Close campus ambassador popup
  const closeCampusAmbassadorPopup = () => {
    setShowCampusAmbassadorPopup(false);
  };
  
  // Close form popup
  const closeMentorForm = () => {
    setShowMentorForm(false);
    setShowPopup(false);
  };
  
  // Close BDA form popup
  const closeBdaForm = () => {
    setShowBdaForm(false);
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

      <section className="careers-options">
        <div className="container">
          <div className="section-header">
            <h2>Join Our Team</h2>
            <p>We're looking for talented individuals to join our mission. Select an option below to apply.</p>
          </div>
          
          <div className="career-options-container">
            <div className="career-option-card">
              <div className="option-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Become a Mentor</h3>
              <p>Share your expertise and help shape the next generation of tech professionals.</p>
              <a href="/careers/mentor" className="option-apply-button">Apply Now</a>
            </div>
            
            <div className="career-option-card">
              <div className="option-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Business Development</h3>
              <p>Join our business development team and help us grow by connecting with potential clients and partners.</p>
              <a href="/careers/business-development" className="option-apply-button">Apply Now</a>
            </div>
            
            <div className="career-option-card">
              <div className="option-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Campus Ambassador</h3>
              <p>Help us spread the word about our programs and services on your campus.</p>
              <a href="/careers/campus-ambassador" className="option-apply-button">Apply Now</a>
            </div>
          </div>
        </div>
      </section>

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
      
      <section className="careers-cta">
        <div className="container">
          <h2>Don't See a Role That Fits?</h2>
          <p>We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute.</p>
          <button className="cta-button">Submit Your Resume</button>
        </div>
      </section>
      
      {/* Mentor Form Modal */}
      {showMentorForm && (
        <div className="form-modal-overlay">
          <div className="form-modal">
            <div className="form-modal-header">
              <h3>Apply to Become a Mentor</h3>
              <button className="close-modal" onClick={closeMentorForm}><i className="fas fa-times"></i></button>
            </div>
            <div className="form-modal-content">
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* BDA Form Modal */}
      {showBdaForm && (
        <div className="form-modal-overlay">
          <div className="form-modal">
            <div className="form-modal-header">
              <h3>Apply for Business Development Associate</h3>
              <button className="close-modal" onClick={closeBdaForm}><i className="fas fa-times"></i></button>
            </div>
            <div className="form-modal-content">
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
                      onFocus={() => handleFocus()}
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
        </div>
      )}
      
      {/* Campus Ambassador Form Modal */}
      {showCampusAmbassadorForm && (
        <div className="form-modal-overlay">
          <div className="form-modal">
            <div className="form-modal-header">
              <h3>Apply to Become a Campus Ambassador</h3>
              <button className="close-modal" onClick={closeCampusAmbassadorPopup}><i className="fas fa-times"></i></button>
            </div>
            <div className="form-modal-content">
              <div className="role-description">
                <h4>About the Role</h4>
                <p>Represent our organization on your campus and help us connect with potential students.</p>
                <h4>The Students will receive:</h4>
                <ul>
                  <li>➡ Stipend of Up to Rs 10,000.</li>
                  <li>➡ Opportunity for Real-Time Industrial Experience</li>
                  <li>➡ Letter of Recommendation</li>
                  <li>➡ Internship and Placement Support</li>
                  <li>➡ Guidance and Certifications</li>
                  <li>➡ Work from Home (You can work in your own time)</li>
                </ul>
              </div>
              <form className="campus-ambassador-form" onSubmit={handleCampusAmbassadorSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      value={campusAmbassadorFormData.fullName}
                      onChange={handleCampusAmbassadorInputChange}
                      onFocus={() => handleFocus()}
                      onBlur={handleBlur}
                      className={campusAmbassadorErrors.fullName ? 'error' : ''}
                      placeholder="Enter your full name"
                    />
                    {campusAmbassadorErrors.fullName && <span className="error-message">{campusAmbassadorErrors.fullName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={campusAmbassadorFormData.email}
                      onChange={handleCampusAmbassadorInputChange}
                      onFocus={() => handleFocus()}
                      onBlur={handleBlur}
                      className={campusAmbassadorErrors.email ? 'error' : ''}
                      placeholder="Enter your email address"
                    />
                    {campusAmbassadorErrors.email && <span className="error-message">{campusAmbassadorErrors.email}</span>}
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
                      value={campusAmbassadorFormData.phone}
                      onChange={handleCampusAmbassadorInputChange}
                      onFocus={() => handleFocus()}
                      onBlur={handleBlur}
                      className={campusAmbassadorErrors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {campusAmbassadorErrors.phone && <span className="error-message">{campusAmbassadorErrors.phone}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="collegeName">
                      College Name <span className="required-star">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="collegeName" 
                      name="collegeName"
                      value={campusAmbassadorFormData.collegeName}
                      onChange={handleCampusAmbassadorInputChange}
                      onFocus={() => handleFocus()}
                      onBlur={handleBlur}
                      className={campusAmbassadorErrors.collegeName ? 'error' : ''}
                      placeholder="Enter your college name"
                    />
                    {campusAmbassadorErrors.collegeName && <span className="error-message">{campusAmbassadorErrors.collegeName}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="yearOfStudy">
                      Year of Study <span className="required-star">*</span>
                    </label>
                    <select 
                      id="yearOfStudy" 
                      name="yearOfStudy"
                      value={campusAmbassadorFormData.yearOfStudy}
                      onChange={handleCampusAmbassadorInputChange}
                      onFocus={() => handleFocus()}
                      onBlur={handleBlur}
                      className={campusAmbassadorErrors.yearOfStudy ? 'error' : ''}
                    >
                      <option value="">Select Year of Study</option>
                      <option value="1st year">1st Year</option>
                      <option value="2nd year">2nd Year</option>
                      <option value="3rd year">3rd Year</option>
                      <option value="4th year">4th Year</option>
                      <option value="graduate">Graduate</option>
                    </select>
                    {campusAmbassadorErrors.yearOfStudy && <span className="error-message">{campusAmbassadorErrors.yearOfStudy}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="branch">
                      Branch <span className="required-star">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="branch" 
                      name="branch"
                      value={campusAmbassadorFormData.branch}
                      onChange={handleCampusAmbassadorInputChange}
                      onFocus={() => handleFocus()}
                      onBlur={handleBlur}
                      className={campusAmbassadorErrors.branch ? 'error' : ''}
                      placeholder="Enter your branch"
                    />
                    {campusAmbassadorErrors.branch && <span className="error-message">{campusAmbassadorErrors.branch}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="department">
                    Department <span className="required-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="department" 
                    name="department"
                    value={campusAmbassadorFormData.department}
                    onChange={handleCampusAmbassadorInputChange}
                    onFocus={() => handleFocus()}
                    onBlur={handleBlur}
                    className={campusAmbassadorErrors.department ? 'error' : ''}
                    placeholder="Enter your department"
                  />
                  {campusAmbassadorErrors.department && <span className="error-message">{campusAmbassadorErrors.department}</span>}
                </div>
                
                <button 
                  type="submit" 
                  className="apply-button" 
                  disabled={isCampusAmbassadorSubmitting}
                >
                  {isCampusAmbassadorSubmitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Popups */}
      {showPopup && (
        <div className="confirmation-popup-overlay">
          <div className="confirmation-popup">
            <div className="popup-header">
              <h3><i className="fas fa-check-circle"></i> Application Submitted Successfully</h3>
              <button className="close-popup" onClick={closePopup}><i className="fas fa-times"></i></button>
            </div>
            <div className="popup-content">
              <p>Thank you for applying as a mentor! We've received your application and will carefully review your qualifications. A member of our team will contact you within 3-5 business days.</p>
            </div>
          </div>
        </div>
      )}
      
      {showBdaPopup && (
        <div className="confirmation-popup-overlay">
          <div className="confirmation-popup">
            <div className="popup-header">
              <h3><i className="fas fa-check-circle"></i> Application Submitted Successfully</h3>
              <button className="close-popup" onClick={closeBdaPopup}><i className="fas fa-times"></i></button>
            </div>
            <div className="popup-content">
              <p>Thank you for applying to the Business Development position! Your application has been successfully submitted. We'll review your qualifications and reach out to you within 3-5 business days to discuss next steps.</p>
            </div>
          </div>
        </div>
      )}
      
      {showCampusAmbassadorPopup && (
        <div className="confirmation-popup-overlay">
          <div className="confirmation-popup">
            <div className="popup-header">
              <h3><i className="fas fa-check-circle"></i> Application Submitted Successfully</h3>
              <button className="close-popup" onClick={closeCampusAmbassadorPopup}><i className="fas fa-times"></i></button>
            </div>
            <div className="popup-content">
              <p>Thank you for applying to the Campus Ambassador position! Your application has been successfully submitted. We'll review your qualifications and reach out to you within 3-5 business days to discuss next steps.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Careers; 