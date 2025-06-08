import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateCourseBrochure } from '../utils/pdfGenerator';
import './ProgramDetail.css';

function ProgramDetail({ programsData }) {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const pricingRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the programId to find the matching program
    if (programsData && programsData[programId]) {
      const currentProgram = { ...programsData[programId] };
      
      // Remove the automatic creation of weeks structure from modules
      // We'll only use modules directly
      
      // Create standardized FAQs for all programs
      const standardFaqs = [
        {
          question: `What is included in the ${currentProgram.title} program?`,
          answer: "This program includes beginner-friendly lessons, hands-on projects, mentor support, comprehensive learning materials, and an industry-recognized certificate upon completion."
        },
        {
          question: "Do I get a certificate after completing this program?",
          answer: "Yes, you will receive an industry-recognized certificate after successfully completing the program, which you can add to your resume and LinkedIn profile."
        },
        {
          question: `What kind of projects will I work on in the ${currentProgram.title} program?`,
          answer: "You'll work on real-world, industry-relevant projects that will help you build a strong portfolio to showcase your skills to potential employers."
        },
        {
          question: "Is there mentor support available?",
          answer: "Yes, you will have access to experienced industry mentors who will provide guidance, feedback, and support throughout your learning journey."
        },
        {
          question: "Do you provide career or placement support?",
          answer: "Yes, we provide career guidance, resume review, interview preparation, and networking opportunities to help you transition into your desired role."
        },
        {
          question: "Is the program completely hands-on?",
          answer: "Absolutely! The program is designed to be highly practical with at least 60% of the time dedicated to hands-on projects and real-world applications."
        },
        {
          question: "How much time should I dedicate each week?",
          answer: "We recommend dedicating 2-3 hours during weekends to get the most out of the program. This gives you enough time to complete the lessons, work on projects, and practice your skills."
        },
        {
          question: `Do I need prior experience for the ${currentProgram.title} program?`,
          answer: `No prior experience is required for our ${currentProgram.title} program. We've designed it to take you from basics to advanced concepts in a structured way.`
        },
        {
          question: "What is the enrollment process?",
          answer: "Simply click the 'Enroll Now' button, select your preferred plan, complete the payment process, and you'll receive immediate access to start your learning journey."
        },
        {
          question: "Do you provide regular updates to the course content?",
          answer: "Yes, we constantly update our curriculum to ensure it aligns with industry trends and the latest technologies. As a student, you'll always have access to the most current content."
        }
      ];
      
      // Replace or add standard FAQs
      currentProgram.faqs = standardFaqs;
      
      setProgram(currentProgram);
    }
    
    // Scroll to top when program changes
    window.scrollTo(0, 0);
  }, [programId, programsData]);

  useEffect(() => {
    // Configure tab animation
    const tabElements = document.querySelectorAll('.tab-fade-in');
    tabElements.forEach(el => {
      // Reset animation when tab is shown
      el.style.animation = 'none';
      void el.offsetHeight; // Trigger reflow
      el.style.animation = null;
    });
    
    // Configure section animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.section-animate');
    animatedElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, [selectedTab]); // Re-run when selected tab changes

  const handleEnrollNow = (planType) => {
    if (planType) {
      // Redirect to appropriate Cashfree payment link based on plan type
      switch (planType) {
        case 'self-paced':
          window.location.href = 'https://payments.cashfree.com/forms/selfpacedcomplete';
          break;
        case 'mentor-led':
          window.location.href = 'https://payments.cashfree.com/forms/mentorledcomplete';
          break;
        case 'advanced':
          window.location.href = 'https://payments.cashfree.com/forms/advancecomplete';
          break;
        default:
          pricingRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If no plan type specified, just scroll to pricing section
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadBrochure = async () => {
    setIsDownloading(true);
    try {
      await generateCourseBrochure(program);
    } catch (error) {
      console.error('Error downloading brochure:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!program) {
    return (
      <div className="program-not-found">
        <h2>Program Not Found</h2>
        <p>The program you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="back-home">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="program-detail-page">
      {isDownloading && (
        <div className="download-overlay">
          <div className="download-content">
            <div className="download-spinner"></div>
            <h3>Preparing Your Brochure</h3>
            <p>Please wait while we generate your course brochure...</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="program-hero">
        <div className="program-hero-content container">
          <div className="program-hero-text">
            <span className="program-tag">{program.tag}</span>
            <h1>{program.title}</h1>
            <p>{program.description}</p>
            <div className="program-meta-info">
              <div className="meta-item">
                <i className={program.durationIcon || "fas fa-clock"}></i>
                <div className="meta-content">
                  <span className="meta-label">Duration</span>
                  <span className="meta-value">{program.duration}</span>
                </div>
              </div>
              <div className="meta-item">
                <i className={program.formatIcon || "fas fa-laptop-house"}></i>
                <div className="meta-content">
                  <span className="meta-label">Format</span>
                  <span className="meta-value">{program.format}</span>
                </div>
              </div>
              <div className="meta-item">
                <i className={program.levelIcon || "fas fa-signal"}></i>
                <div className="meta-content">
                  <span className="meta-label">Level</span>
                  <span className="meta-value">{program.level}</span>
                </div>
              </div>
            </div>
            <div className="program-hero-cta">
              <button 
                className="cta-button primary"
                onClick={() => handleEnrollNow()}
              >
                Enroll Now
              </button>
              <button 
                className="cta-button secondary"
                onClick={handleDownloadBrochure}
              >
                <i className="fas fa-download"></i> Download Brochure
              </button>
            </div>
          </div>
          <div className="program-hero-image">
            <img src={program.heroImage} alt={program.title} />
          </div>
        </div>
      </section>

      {/* Program Navigation */}
      <section className="program-nav">
        <div className="container">
          <div className="program-nav-container">
            <div className="program-tabs">
              <button 
                className={`tab-button ${selectedTab === 'overview' ? 'active' : ''}`}
                onClick={() => setSelectedTab('overview')}
              >
                <i className="fas fa-info-circle"></i> Overview
              </button>
              <button 
                className={`tab-button ${selectedTab === 'curriculum' ? 'active' : ''}`}
                onClick={() => setSelectedTab('curriculum')}
              >
                <i className="fas fa-book"></i> Curriculum
              </button>
              <button 
                className={`tab-button ${selectedTab === 'faq' ? 'active' : ''}`}
                onClick={() => setSelectedTab('faq')}
              >
                <i className="fas fa-question-circle"></i> FAQs
              </button>
            </div>
            <div className="nav-buttons">
              <button 
                className="nav-enroll-button"
                onClick={() => handleEnrollNow()}
              >
                <i className="fas fa-graduation-cap"></i> Enroll Now
              </button>
              <button 
                className="nav-curriculum-button"
                onClick={handleDownloadBrochure}
              >
                <i className="fas fa-download"></i> Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="program-content container">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="tab-fade-in">
            <h3>Program Overview</h3>
            <p>{program.overview || program.description}</p>
            
            {program.keyHighlights && (
              <div className="content-section">
                <h3>Key Highlights</h3>
                <div className="highlights-grid">
                  {program.keyHighlights.map((highlight, index) => (
                    <div className="highlight-card" key={index}>
                      <div className="highlight-icon">
                        <i className={highlight.icon}></i>
                      </div>
                      <h4>{highlight.title}</h4>
                      <p>{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {program.learningOutcomes && (
              <div className="content-section">
                <h3>Learning Outcomes</h3>
                <ul className="outcomes-list">
                  {program.learningOutcomes.map((outcome, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {program.projects && (
              <div className="content-section">
                <h3>Industry Projects</h3>
                <div className="projects-grid">
                  {program.projects.map((project, index) => (
                    <div className="project-card" key={index}>
                      <div className="project-icon">
                        <i className={project.icon}></i>
                      </div>
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Curriculum Tab */}
        {selectedTab === 'curriculum' && (
          <div className="tab-fade-in">
            <h3>{program.curriculum?.title || 'Curriculum'}</h3>
            {program.curriculum?.description && <p className="curriculum-intro">{program.curriculum.description}</p>}
            {program.curriculumIntro && <p className="curriculum-intro">{program.curriculumIntro}</p>}
            
            <div className="modules-container">
              {program.modules && Array.isArray(program.modules) && program.modules.map((module, index) => (
                <div key={index} className="module-card">
                  <div className="module-header">
                    {module.icon && (
                      <div className="module-icon">
                        <i className={module.icon}></i>
                      </div>
                    )}
                    <div className="module-title-section">
                      <h3>
                        <span className="module-number">Module {index + 1}</span>
                        {module.title}
                      </h3>
                      {module.duration && (
                        <span className="module-duration">
                          <i className="fas fa-clock"></i>
                          {module.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="module-content">
                    {module.description && (
                      <p className="module-description">{module.description}</p>
                    )}
                    {module.topics && module.topics.length > 0 && (
                      <ul className="module-topics">
                        {module.topics.map((topic, i) => (
                          <li key={i}>
                            <i className="fas fa-angle-right"></i>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
              
              {(!program.modules || !Array.isArray(program.modules)) && (
                <div className="no-curriculum-message">
                  <p>Curriculum details will be available soon.</p>
                </div>
              )}
            </div>
            
            {program.projects && (
              <div className="content-section">
                <h3>Hands-on Projects</h3>
                <p>Apply your skills to real-world challenges with these guided projects:</p>
                <div className="projects-grid">
                  {program.projects.map((project, index) => (
                    <div className="project-card" key={index}>
                      <div className="project-icon">
                        <i className={project.icon}></i>
                      </div>
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FAQ Tab */}
        {selectedTab === 'faq' && (
          <div className="tab-fade-in">
            <h3>Frequently Asked Questions</h3>
            <p className="faq-intro">Find answers to common questions about our {program.title} program</p>
            
            <div className="faq-accordion">
              <div className="faq-columns">
                {/* First Column - First 3 FAQs */}
                <div className="faq-column">
                  {program.faqs && program.faqs.slice(0, 3).map((faq, index) => (
                    <div className="faq-item" key={index}>
                      <div className="faq-question" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                        <h3>{faq.question}</h3>
                        <span className={`toggle-icon ${activeFaq === index ? 'active' : ''}`}>
                          <i className={`fas ${activeFaq === index ? 'fa-minus' : 'fa-plus'}`}></i>
                        </span>
                      </div>
                      <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Second Column - Next 3 FAQs */}
                <div className="faq-column">
                  {program.faqs && program.faqs.slice(3, 6).map((faq, index) => (
                    <div className="faq-item" key={index + 3}>
                      <div className="faq-question" onClick={() => setActiveFaq(activeFaq === index + 3 ? null : index + 3)}>
                        <h3>{faq.question}</h3>
                        <span className={`toggle-icon ${activeFaq === index + 3 ? 'active' : ''}`}>
                          <i className={`fas ${activeFaq === index + 3 ? 'fa-minus' : 'fa-plus'}`}></i>
                        </span>
                      </div>
                      <div className={`faq-answer ${activeFaq === index + 3 ? 'active' : ''}`}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Hidden FAQs (visible when Show More is clicked) */}
              {showAllFaqs && program.faqs && program.faqs.length > 6 && (
                <div className="faq-columns">
                  {/* Additional FAQs First Column */}
                  <div className="faq-column">
                    {program.faqs.slice(6, 8).map((faq, index) => (
                      <div className="faq-item" key={index + 6}>
                        <div className="faq-question" onClick={() => setActiveFaq(activeFaq === index + 6 ? null : index + 6)}>
                          <h3>{faq.question}</h3>
                          <span className={`toggle-icon ${activeFaq === index + 6 ? 'active' : ''}`}>
                            <i className={`fas ${activeFaq === index + 6 ? 'fa-minus' : 'fa-plus'}`}></i>
                          </span>
                        </div>
                        <div className={`faq-answer ${activeFaq === index + 6 ? 'active' : ''}`}>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Additional FAQs Second Column */}
                  <div className="faq-column">
                    {program.faqs.slice(8, 10).map((faq, index) => (
                      <div className="faq-item" key={index + 8}>
                        <div className="faq-question" onClick={() => setActiveFaq(activeFaq === index + 8 ? null : index + 8)}>
                          <h3>{faq.question}</h3>
                          <span className={`toggle-icon ${activeFaq === index + 8 ? 'active' : ''}`}>
                            <i className={`fas ${activeFaq === index + 8 ? 'fa-minus' : 'fa-plus'}`}></i>
                          </span>
                        </div>
                        <div className={`faq-answer ${activeFaq === index + 8 ? 'active' : ''}`}>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Show More / Show Less Button - Only show if there are more than 6 FAQs */}
              {program.faqs && program.faqs.length > 6 && (
                <div className="faq-show-more">
                  <button 
                    className="show-more-button"
                    onClick={() => setShowAllFaqs(!showAllFaqs)}
                  >
                    {showAllFaqs ? 'Show Less' : 'Show More'} <i className={`fas ${showAllFaqs ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                  </button>
                </div>
              )}
            </div>
            
            <div className="contact-support">
              <h4>Still have questions?</h4>
              <p>Our support team is happy to help you with any questions about this program.</p>
              <Link to="/contact" className="support-button">
                <i className="fas fa-headset"></i> Contact Support
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Pricing Plans */}
      <section className="pricing-plans" ref={pricingRef}>
        <div className="container">
          <h2>Choose Your Pricing Plan</h2>
          <p className="pricing-intro">Choose from our flexible plans to suit your learning needs and budget</p>
          
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>⏱️ Self-Paced Plan</h3>
              <div className="price">
                <span className="original-price">₹4,999</span>
                <span className="current-price">₹3,499</span>
              </div>
              <div className="duration">Valid for {program.duration}</div>
              <button 
                className="pricing-button"
                onClick={() => handleEnrollNow('self-paced')}
              >
                Enroll Now
              </button>
              <ul className="plan-features">
                <li>
                  <span className="feature-text">💡 Real-Time Projects (Basic level)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🕒 Live Sessions - 16hrs+</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">❓ One-on-One Doubt Sessions</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏆 Certifications (Industry Certified)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏅 Mentor Support</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🤝 Interview Assistance</span>
                  <span className="feature-status excluded"><i className="fas fa-times"></i></span>
                </li>
              </ul>
            </div>
            
            <div className="pricing-card">
              <h3>👨‍🏫 Mentor-Led Plan</h3>
              <div className="price">
                <span className="original-price">₹7,499</span>
                <span className="current-price">₹4,999</span>
              </div>
              <div className="duration">Valid for {program.duration}</div>
              <button 
                className="pricing-button"
                onClick={() => handleEnrollNow('mentor-led')}
              >
                Enroll Now
              </button>
              <ul className="plan-features">
                <li>
                  <span className="feature-text">💡 Real-Time Projects (Guided with mentor feedback)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🕒 Live Sessions - 24hrs+</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">❓ One-on-One Doubt Sessions</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏆 Certifications (Industry Certified)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏅 Mentor Support</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🚀 Placement Guidance (Resume & Mock Interviews)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🤝 Interview Assistance</span>
                  <span className="feature-status excluded"><i className="fas fa-times"></i></span>
                </li>
              </ul>
            </div>
            
            <div className="pricing-card">
              <h3>🎓 Advanced Program</h3>
              <div className="price">
                <span className="original-price">₹12,999</span>
                <span className="current-price">₹8,999</span>
              </div>
              <div className="duration">Valid for {program.duration}</div>
              <button 
                className="pricing-button"
                onClick={() => handleEnrollNow('advanced')}
              >
                Enroll Now
              </button>
              <ul className="plan-features">
                <li>
                  <span className="feature-text">�� Real-Time Projects (Industry Capstone Projects)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🕒 Live Sessions (Extended sessions + Guest Experts)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">❓ One-on-One Doubt Sessions (Priority access)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏆 Certifications (Co-branded with industry partners)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏅 Mentor Support (Dedicated mentor)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🚀 Placement Guidance (Exclusive referrals + 1:1 coaching)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🤝 Interview Assistance (Mock interviews with HR)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="related-programs">
        <div className="container">
          <h2>Related Programs</h2>
          <div className="programs-grid">
            {program.relatedPrograms && program.relatedPrograms
              .filter(relProgram => {
                // Extract program ID from the path
                const programPath = relProgram.path;
                const programId = programPath.split('/').pop();
                // Check if this program exists in programsData
                return programsData && programsData[programId];
              })
              .map((relProgram, index) => (
                <div className="program-card" key={index}>
                  <div className="program-tag">{relProgram.tag}</div>
                  <h3>{relProgram.title}</h3>
                  <div className="program-meta">
                    <span><i className={relProgram.durationIcon || "fas fa-clock"}></i> {relProgram.duration}</span>
                    <span><i className={relProgram.formatIcon || "fas fa-laptop-house"}></i> {relProgram.format}</span>
                  </div>
                  <p>{relProgram.description}</p>
                  <Link to={relProgram.path} className="program-button">View Program</Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgramDetail;