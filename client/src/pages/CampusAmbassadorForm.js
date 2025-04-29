import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/Careers.css';

function CampusAmbassadorForm() {
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
  
  // Form errors
  const [campusAmbassadorErrors, setCampusAmbassadorErrors] = useState({});

  // Form submission status
  const [isCampusAmbassadorSubmitting, setIsCampusAmbassadorSubmitting] = useState(false);
  
  // Success state
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  // Study year options
  const yearOptions = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    '5th Year',
    'Postgraduate'
  ];

  // Handle input focus
  const handleFocus = () => {
    // Focus handling if needed in the future
  };

  // Handle input blur
  const handleBlur = () => {
    // Blur handling if needed in the future
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
    if (!campusAmbassadorFormData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required';
    if (!campusAmbassadorFormData.branch.trim()) newErrors.branch = 'Branch is required';
    
    return newErrors;
  };

  // Handle form submission
  const handleCampusAmbassadorSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    const newErrors = validateCampusAmbassadorForm();
    if (Object.keys(newErrors).length > 0) {
      setCampusAmbassadorErrors(newErrors);
      return;
    }
    
    // Proceed with submission
    setIsCampusAmbassadorSubmitting(true);
    
    // Create application object for API
    const applicationData = {
      fullName: campusAmbassadorFormData.fullName,
      email: campusAmbassadorFormData.email,
      phone: campusAmbassadorFormData.phone,
      collegeName: campusAmbassadorFormData.collegeName,
      yearOfStudy: campusAmbassadorFormData.yearOfStudy,
      branch: campusAmbassadorFormData.branch,
      department: campusAmbassadorFormData.department || ''
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
          console.error('Server error response:', data);
          throw new Error(data.error || 'Failed to submit application');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Campus ambassador application submitted successfully:', data);
      
      // Show success popup
      setIsSubmissionSuccessful(true);
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
    })
    .catch(error => {
      console.error('Error submitting application:', error);
      setCampusAmbassadorErrors({
        submit: 'Failed to submit application. Please try again later. Error: ' + error.message
      });
      setIsCampusAmbassadorSubmitting(false);
    });
  };

  return (
    <div className="campus-ambassador-form-page">
      <div className="form-page-graphics">
        <div className="graphic-element graphic-element-1">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <div className="graphic-element graphic-element-2">
          <i className="fas fa-university"></i>
        </div>
        <div className="graphic-element graphic-element-3">
          <i className="fas fa-award"></i>
        </div>
        <div className="graphic-element graphic-element-4">
          <i className="fas fa-users"></i>
        </div>
      </div>
      
      <div className="container">
        <div className="page-header">
          <div className="header-graphics">
            <div className="header-graphic-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
          </div>
          <h1>Apply to be a Campus Ambassador</h1>
          <p>Represent us on your campus and help fellow students access quality tech education</p>
          <div className="breadcrumbs">
            <Link to="/">Home</Link> &gt; <Link to="/careers">Careers</Link> &gt; Campus Ambassador Application
          </div>
        </div>
        
        <div className="form-container">
          <div className="form-graphics">
            <div className="form-graphic-banner">
              <div className="graphic-icon"><i className="fas fa-university"></i></div>
              <div className="graphic-text">Be our voice on your campus</div>
            </div>
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
                <div className="select-wrapper">
                  <div className="select-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={campusAmbassadorFormData.yearOfStudy}
                    onChange={handleCampusAmbassadorInputChange}
                    className={campusAmbassadorErrors.yearOfStudy ? 'error' : ''}
                  >
                    <option value="">Select your year of study</option>
                    {yearOptions.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
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
                  placeholder="e.g. Computer Science, Electrical Engineering, etc."
                />
                {campusAmbassadorErrors.branch && <span className="error-message">{campusAmbassadorErrors.branch}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department">
                  Department
                </label>
                <input 
                  type="text" 
                  id="department" 
                  name="department"
                  value={campusAmbassadorFormData.department}
                  onChange={handleCampusAmbassadorInputChange}
                  onFocus={() => handleFocus()}
                  onBlur={handleBlur}
                  placeholder="Optional"
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="ambassador-benefits">
                <div className="benefits-header">
                  <i className="fas fa-gift"></i>
                  <h4>As a Campus Ambassador, you'll get:</h4>
                </div>
                <ul>
                  <li><i className="fas fa-check-circle"></i> Exclusive internship opportunities</li>
                  <li><i className="fas fa-check-circle"></i> Leadership experience to add to your resume</li>
                  <li><i className="fas fa-check-circle"></i> Networking with industry professionals</li>
                  <li><i className="fas fa-check-circle"></i> Access to premium workshops and events</li>
                  <li><i className="fas fa-check-circle"></i> Performance-based incentives</li>
                </ul>
              </div>
            </div>
            
            <div className="form-action-area">
              <div className="form-graphic-icon">
                <i className="fas fa-paper-plane"></i>
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
            </div>
            {campusAmbassadorErrors.submit && (
              <div className="form-error-message">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{campusAmbassadorErrors.submit}</span>
              </div>
            )}
          </form>
        </div>
        
        <div className="campus-ambassador-highlights">
          <div className="highlight-graphic">
            <div className="highlight-icon">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="highlight-text">Earn stipends up to ₹10,000</div>
          </div>
          <div className="highlight-graphic">
            <div className="highlight-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <div className="highlight-text">Receive certification & recommendation</div>
          </div>
          <div className="highlight-graphic">
            <div className="highlight-icon">
              <i className="fas fa-laptop-house"></i>
            </div>
            <div className="highlight-text">Work from home flexibility</div>
          </div>
        </div>
        
        <div className="back-link">
          <Link to="/careers">&larr; Back to Careers</Link>
        </div>
      </div>
      
      {/* Success Popup */}
      {isSubmissionSuccessful && (
        <div className="form-submit-popup">
          <div className="popup-content">
            <div className="popup-header">
              <i className="fas fa-check-circle"></i>
              <h3>Application Submitted!</h3>
            </div>
            <p>
              Thank you for applying to be a Campus Ambassador. We've received your application and will review it shortly.
              Our team will contact you within 3-5 business days with next steps.
            </p>
            <button className="popup-close" onClick={() => setIsSubmissionSuccessful(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampusAmbassadorForm; 