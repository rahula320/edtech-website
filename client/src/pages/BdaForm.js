import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/Careers.css';

function BdaForm() {
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
  
  // Form errors
  const [bdaErrors, setBdaErrors] = useState({});

  // Form submission status
  const [isBdaSubmitting, setIsBdaSubmitting] = useState(false);
  
  // Success state
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  // Skills options
  const skillsOptions = [
    { id: 'sales', label: 'Sales' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'negotiation', label: 'Negotiation' },
    { id: 'client-relations', label: 'Client Relations' },
    { id: 'lead-generation', label: 'Lead Generation' },
    { id: 'communication', label: 'Communication' },
    { id: 'market-analysis', label: 'Market Analysis' },
    { id: 'presentation', label: 'Presentation Skills' }
  ];

  // Handle input focus
  const handleFocus = () => {
    // Focus handling if needed in the future
  };

  // Handle input blur
  const handleBlur = () => {
    // Blur handling if needed in the future
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

  // Toggle skill selection
  const toggleSkill = (skillId) => {
    if (bdaFormData.skills.includes(skillId)) {
      setBdaFormData({
        ...bdaFormData,
        skills: bdaFormData.skills.filter(s => s !== skillId)
      });
    } else {
      setBdaFormData({
        ...bdaFormData,
        skills: [...bdaFormData.skills, skillId]
      });
    }
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

  // Handle form submission
  const handleBdaSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    const newErrors = validateBdaForm();
    if (Object.keys(newErrors).length > 0) {
      setBdaErrors(newErrors);
      return;
    }
    
    // Proceed with submission
    setIsBdaSubmitting(true);
    
    // Create resume URL from file name
    let resumeUrl = '';
    if (bdaFormData.resume) {
      resumeUrl = bdaFormData.resume.name;
    }
    
    // Prepare skills array as string
    const skillsString = bdaFormData.skills.length > 0 ? bdaFormData.skills.join(',') : '';
    
    // Create application object for API
    const applicationData = {
      fullName: bdaFormData.fullName,
      email: bdaFormData.email,
      phone: bdaFormData.phone,
      education: bdaFormData.education,
      experience: bdaFormData.experience || '',
      skills: skillsString,
      portfolioUrl: bdaFormData.portfolio || '',
      coverLetter: bdaFormData.coverletter || '',
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
          console.error('Server error response:', data);
          throw new Error(data.error || 'Failed to submit application');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('BDA application submitted successfully:', data);
      
      // Show success popup
      setIsSubmissionSuccessful(true);
      setIsBdaSubmitting(false);
      
      // Reset form
      setBdaFormData({
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
    })
    .catch(error => {
      console.error('Error submitting application:', error);
      setBdaErrors({
        submit: 'Failed to submit application. Please try again later. Error: ' + error.message
      });
      setIsBdaSubmitting(false);
    });
  };

  return (
    <div className="bda-form-page">
      <div className="form-page-graphics">
        <div className="graphic-element graphic-element-1">
          <i className="fas fa-handshake"></i>
        </div>
        <div className="graphic-element graphic-element-2">
          <i className="fas fa-chart-line"></i>
        </div>
        <div className="graphic-element graphic-element-3">
          <i className="fas fa-bullseye"></i>
        </div>
        <div className="graphic-element graphic-element-4">
          <i className="fas fa-comments-dollar"></i>
        </div>
      </div>
      
      <div className="container">
        <div className="page-header">
          <div className="header-graphics">
            <div className="header-graphic-icon">
              <i className="fas fa-handshake"></i>
            </div>
          </div>
          <h1>Apply for Business Development Associate</h1>
          <p>Join our business development team and help us grow by connecting with potential clients and partners</p>
          <div className="breadcrumbs">
            <Link to="/">Home</Link> &gt; <Link to="/careers">Careers</Link> &gt; Business Development Application
          </div>
        </div>
        
        <div className="form-container">
          <div className="form-graphics">
            <div className="form-graphic-banner">
              <div className="graphic-icon"><i className="fas fa-briefcase"></i></div>
              <div className="graphic-text">Drive our business growth and partnerships</div>
            </div>
          </div>
          
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
                <label htmlFor="email">
                  Email Address <span className="required-star">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
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
                <label htmlFor="phone">
                  Phone Number <span className="required-star">*</span>
                </label>
                <input 
                  type="tel" 
                  id="phone" 
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
                  placeholder="Enter your highest education"
                />
                {bdaErrors.education && <span className="error-message">{bdaErrors.education}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experience">
                  Years of Experience
                </label>
                <input 
                  type="number" 
                  id="experience" 
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
                  Portfolio URL
                </label>
                <input 
                  type="url" 
                  id="portfolio" 
                  name="portfolio"
                  value={bdaFormData.portfolio}
                  onChange={handleBdaInputChange}
                  onFocus={() => handleFocus()}
                  onBlur={handleBlur}
                  placeholder="Optional - https://yourportfolio.com"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>
                Skills
              </label>
              <div className="skills-section-graphic">
                <i className="fas fa-cogs"></i>
                <span>Select your key competencies</span>
              </div>
              <div className="skills-grid">
                {skillsOptions.map(skill => (
                  <div 
                    key={skill.id} 
                    className={`skill-option ${bdaFormData.skills.includes(skill.id) ? 'selected' : ''}`}
                    onClick={() => toggleSkill(skill.id)}
                  >
                    <div className="checkbox-container">
                      {bdaFormData.skills.includes(skill.id) ? (
                        <i className="fas fa-check-square"></i>
                      ) : (
                        <i className="far fa-square"></i>
                      )}
                    </div>
                    <span>{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="coverletter">
                Cover Letter
              </label>
              <textarea 
                id="coverletter" 
                name="coverletter"
                value={bdaFormData.coverletter}
                onChange={handleBdaInputChange}
                onFocus={() => handleFocus()}
                onBlur={handleBlur}
                placeholder="Tell us why you're interested in this position (optional)"
                rows={4}
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="resume">
                Resume (PDF only) <span className="required-star">*</span>
              </label>
              <div className="file-upload-graphic">
                <i className="fas fa-file-upload"></i>
                <span>Upload your Resume</span>
              </div>
              <input 
                type="file" 
                id="resume" 
                name="resume"
                onChange={handleFileChange}
                accept=".pdf"
                className={bdaErrors.resume ? 'error' : ''}
              />
              {bdaErrors.resume && <span className="error-message">{bdaErrors.resume}</span>}
              <p className="file-hint">Please upload your resume in PDF format (max 5MB)</p>
            </div>
            
            <div className="form-action-area">
              <div className="form-graphic-icon">
                <i className="fas fa-paper-plane"></i>
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
            </div>
            {bdaErrors.submit && (
              <div className="form-error-message">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{bdaErrors.submit}</span>
              </div>
            )}
          </form>
        </div>
        
        <div className="bda-benefits-graphics">
          <div className="benefit-graphic">
            <div className="benefit-icon">
              <i className="fas fa-hand-holding-usd"></i>
            </div>
            <div className="benefit-text">Competitive compensation package</div>
          </div>
          <div className="benefit-graphic">
            <div className="benefit-icon">
              <i className="fas fa-laptop-house"></i>
            </div>
            <div className="benefit-text">Remote work flexibility</div>
          </div>
          <div className="benefit-graphic">
            <div className="benefit-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="benefit-text">Career growth opportunities</div>
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
              Thank you for your application for the Business Development Associate role. We've received your information and will reach out to you soon.
            </p>
            <button 
              className="popup-close" 
              onClick={() => setIsSubmissionSuccessful(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BdaForm; 