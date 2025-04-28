import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProgramDetail.css';

function ProgramDetail({ programsData }) {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPricingPlan, setSelectedPricingPlan] = useState('advanced');
  const pricingRef = useRef(null);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the programId to find the matching program
    if (programsData && programsData[programId]) {
      setProgram(programsData[programId]);
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

  const handleEnrollNow = () => {
    // Scroll to pricing plans section
    pricingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePaymentRedirect = (plan) => {
    // Direct links to Cashfree payment pages
    const paymentLinks = {
      'self': 'https://payments.cashfree.com/forms/selfpacedcomplete',
      'mentor': 'https://payments.cashfree.com/forms/mentorledcomplete',
      'advanced': 'https://payments.cashfree.com/forms/advancecomplete'
    };
    
    // Open payment link in new tab
    window.open(paymentLinks[plan], '_blank');
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
      {/* Hero Section */}
      <section className="program-hero">
        <div className="program-hero-content container">
          <div className="program-hero-text">
            <span className="program-tag">{program.tag}</span>
            <h1>{program.title}</h1>
            <p>{program.description}</p>
            <div className="program-meta-info">
              <div className="meta-item">
                <i className={program.durationIcon}></i>
                <span>{program.duration}</span>
              </div>
              <div className="meta-item">
                <i className={program.formatIcon}></i>
                <span>{program.format}</span>
              </div>
              <div className="meta-item">
                <i className={program.levelIcon}></i>
                <span>{program.level}</span>
              </div>
            </div>
            <div className="program-hero-cta">
              <button 
                className="cta-button primary"
                onClick={handleEnrollNow}
              >
                Enroll Now
              </button>
              <button className="cta-button secondary">Download Brochure</button>
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
                className={`tab-button ${selectedTab === 'instructors' ? 'active' : ''}`}
                onClick={() => setSelectedTab('instructors')}
              >
                <i className="fas fa-chalkboard-teacher"></i> Instructors
              </button>
              <button 
                className={`tab-button ${selectedTab === 'faq' ? 'active' : ''}`}
                onClick={() => setSelectedTab('faq')}
              >
                <i className="fas fa-question-circle"></i> FAQs
              </button>
            </div>
            <button 
              className="nav-enroll-button"
              onClick={handleEnrollNow}
            >
              <i className="fas fa-graduation-cap"></i> Enroll Now
            </button>
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
            
            {program.whoShouldAttend && (
              <div className="content-section">
                <h3>Who Should Attend</h3>
                <div className="attendees-grid">
                  {program.whoShouldAttend.map((attendee, index) => (
                    <div className="attendee-card" key={index}>
                      <div className="attendee-icon">
                        <i className={attendee.icon}></i>
                      </div>
                      <h4>{attendee.title}</h4>
                      <p>{attendee.description}</p>
                    </div>
                  ))}
                </div>
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
            <h3>Curriculum</h3>
            {program.curriculumIntro && <p className="curriculum-intro">{program.curriculumIntro}</p>}
            
            <div className="modules-container">
              {program.curriculum && program.curriculum.map((module, index) => (
                <div key={index} className="module-card">
                  <div className="module-header">
                    <h3>
                      <span className="module-number">{index + 1}</span>
                      {module.title}
                    </h3>
                    {module.duration && (
                      <div className="module-duration">
                        <i className="fas fa-clock"></i>
                        <span>{module.duration}</span>
                      </div>
                    )}
                  </div>
                  <div className="module-content">
                    <p>{module.description}</p>
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

        {/* Instructors Tab */}
        {selectedTab === 'instructors' && (
          <div className="tab-fade-in">
            <h3>Instructors</h3>
            {program.instructorsIntro && <p className="instructors-intro">{program.instructorsIntro}</p>}
            
            <div className="instructors-grid">
              {program.instructors && program.instructors.map((instructor, index) => (
                <div key={index} className="instructor-card">
                  <div className="instructor-image">
                    <img src={instructor.image} alt={instructor.name} />
                  </div>
                  <div className="instructor-info">
                    <h3>{instructor.name}</h3>
                    <span className="instructor-title">{instructor.title}</span>
                    <p>{instructor.bio}</p>
                    
                    {instructor.specialties && (
                      <div className="instructor-specialties">
                        <h4>Areas of Expertise</h4>
                        <div className="specialty-tags">
                          {instructor.specialties.map((specialty, i) => (
                            <span className="specialty-tag" key={i}>{specialty}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {program.mentors && (
              <div className="content-section">
                <h3>Industry Mentors</h3>
                <p>Get guidance from professionals currently working in the industry:</p>
                <div className="mentors-grid">
                  {program.mentors.map((mentor, index) => (
                    <div className="mentor-card" key={index}>
                      <div className="mentor-image">
                        <img src={mentor.image} alt={mentor.name} />
                      </div>
                      <h4>{mentor.name}</h4>
                      <span className="mentor-company">{mentor.company}</span>
                      <p>{mentor.bio}</p>
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
            <div className="faq-container">
              {program.faqs && program.faqs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <h4 className="faq-question">
                    <i className="fas fa-question-circle"></i>
                    {faq.question}
                  </h4>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
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
            <div className={`pricing-card ${selectedPricingPlan === 'advanced' ? 'selected' : ''}`}>
              <div className="plan-tag">Best Value</div>
              <h3>🎓 Advanced Program</h3>
              <div className="price">
                <span className="original-price">₹12,999</span>
                <span className="current-price">₹8,999</span>
              </div>
              <div className="duration">Valid for {program.duration}</div>
              <button 
                className="pricing-button"
                onClick={() => setSelectedPricingPlan('advanced')}
              >
                {selectedPricingPlan === 'advanced' ? 'Selected' : 'Select'}
              </button>
              <ul className="plan-features">
                <li>
                  <span className="feature-text">💡 Real-Time Projects (Industry Capstone Projects)</span>
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
            
            <div className={`pricing-card ${selectedPricingPlan === 'mentor' ? 'selected' : ''}`}>
              <h3>👨‍🏫 Mentor-Led Plan</h3>
              <div className="price">
                <span className="original-price">₹7,499</span>
                <span className="current-price">₹4,999</span>
              </div>
              <div className="duration">Valid for {program.duration}</div>
              <button 
                className="pricing-button"
                onClick={() => setSelectedPricingPlan('mentor')}
              >
                {selectedPricingPlan === 'mentor' ? 'Selected' : 'Select'}
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
            
            <div className={`pricing-card ${selectedPricingPlan === 'self' ? 'selected' : ''}`}>
              <h3>⏱️ Self-Paced Plan</h3>
              <div className="price">
                <span className="original-price">₹4,999</span>
                <span className="current-price">₹3,499</span>
              </div>
              <div className="duration">Valid for {program.duration}</div>
              <button 
                className="pricing-button"
                onClick={() => setSelectedPricingPlan('self')}
              >
                {selectedPricingPlan === 'self' ? 'Selected' : 'Select'}
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
                  <span className="feature-text">🏆 Certifications (Mentor Certified)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏅 Mentor Support</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🚀 Placement Guidance</span>
                  <span className="feature-status excluded"><i className="fas fa-times"></i></span>
                </li>
                <li>
                  <span className="feature-text">🤝 Interview Assistance</span>
                  <span className="feature-status excluded"><i className="fas fa-times"></i></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pricing-cta">
            <button 
              className="proceed-button"
              onClick={() => handlePaymentRedirect(selectedPricingPlan)}
            >
              Proceed with Selected Plan
            </button>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="related-programs">
        <div className="container">
          <h2>Related Programs</h2>
          <div className="programs-grid">
            {program.relatedPrograms && program.relatedPrograms.map((relProgram, index) => (
              <div className="program-card" key={index}>
                <div className="program-tag">{relProgram.tag}</div>
                <h3>{relProgram.title}</h3>
                <div className="program-meta">
                  <span><i className={relProgram.durationIcon}></i> {relProgram.duration}</span>
                  <span><i className={relProgram.formatIcon}></i> {relProgram.format}</span>
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