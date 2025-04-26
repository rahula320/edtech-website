import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/Careers.css';

function MentorForm() {
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
  
  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  
  // Form errors
  const [errors, setErrors] = useState({});

  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Domain options
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
  const handleFocus = () => {
    // Focus handling if needed in the future
  };

  // Handle input blur
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Proceed with submission
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
    
    // Send data to API endpoint
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
    })
    .catch(error => {
      console.error('Error submitting application:', error);
      setErrors({
        submit: 'Failed to submit application. Please try again later. Error: ' + error.message
      });
      setIsSubmitting(false);
    });
  };

  // Close success popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="mentor-form-page">
      <div className="form-page-graphics">
        <div className="graphic-element graphic-element-1">
          <i className="fas fa-chalkboard-teacher"></i>
        </div>
        <div className="graphic-element graphic-element-2">
          <i className="fas fa-lightbulb"></i>
        </div>
        <div className="graphic-element graphic-element-3">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <div className="graphic-element graphic-element-4">
          <i className="fas fa-laptop-code"></i>
        </div>
      </div>
      
      <div className="container">
        <div className="page-header">
          <div className="header-graphics">
            <div className="header-graphic-icon">
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
          </div>
          <h1>Apply to Become a Mentor</h1>
          <p>Share your expertise and help shape the next generation of tech professionals</p>
          <div className="breadcrumbs">
            <Link to="/">Home</Link> &gt; <Link to="/careers">Careers</Link> &gt; Mentor Application
          </div>
        </div>
        
        <div className="form-container">
          <div className="form-graphics">
            <div className="form-graphic-banner">
              <div className="graphic-icon"><i className="fas fa-users"></i></div>
              <div className="graphic-text">Inspire the next generation of tech talent</div>
            </div>
          </div>
          
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
            
            <div className="form-action-area">
              <div className="form-graphic-icon">
                <i className="fas fa-rocket"></i>
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
            </div>
            {errors.submit && (
              <div className="form-error-message">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{errors.submit}</span>
              </div>
            )}
          </form>
        </div>
        
        <div className="mentor-benefits-graphics">
          <div className="benefit-graphic">
            <div className="benefit-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="benefit-text">Build your professional network</div>
          </div>
          <div className="benefit-graphic">
            <div className="benefit-icon">
              <i className="fas fa-medal"></i>
            </div>
            <div className="benefit-text">Enhance your leadership skills</div>
          </div>
          <div className="benefit-graphic">
            <div className="benefit-icon">
              <i className="fas fa-heart"></i>
            </div>
            <div className="benefit-text">Make a positive impact</div>
          </div>
        </div>
        
        <div className="back-link">
          <Link to="/careers">&larr; Back to Careers</Link>
        </div>
      </div>
      
      {/* Success Popup */}
      {showPopup && (
        <div className="form-submit-popup">
          <div className="popup-content">
            <div className="popup-header">
              <i className="fas fa-check-circle"></i>
              <h3>Application Submitted!</h3>
            </div>
            <p>
              Thank you for applying to be a mentor. We've received your application and will review it shortly.
              Our team will contact you within 3-5 business days.
            </p>
            <button className="popup-close" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MentorForm; 