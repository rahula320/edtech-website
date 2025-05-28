import React from 'react';
import { Link } from 'react-router-dom';
import './Internships.css';

function Internships() {
  return (
    <div className="internships-page">
      {/* Hero Section */}
      <section className="internships-hero">
        <div className="container">
          <h1>Course + Internship Program</h1>
          <p className="hero-subtitle">2-month weekend training + 4-week industry project internship with WIPRO DICE ID certified credentials</p>
        </div>
      </section>
      
      {/* Internship Overview */}
      <section className="internship-overview section-spacing">
        <div className="container">
          <div className="overview-content">
            <div className="overview-text">
              <h2>Two-Phase Learning Journey</h2>
              <p>At ACMYX, we've designed a unique approach that combines structured learning with real-world application. Our programs consist of two integrated phases:</p>
              <p><strong>Phase 1: Skill Acquisition</strong> - Learn industry-relevant technical skills through structured courses with practical exercises.</p>
              <p><strong>Phase 2: Industry Application</strong> - Apply your skills directly on real industry-grade projects with guidance from mentors working at leading MNCs.</p>
            </div>
            <div className="overview-stats">
              <div className="stat-card">
                <span className="stat-number">30+</span>
                <span className="stat-label">MNC Mentors</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">Bi-weekly</span>
                <span className="stat-label">Progress Reviews</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">Real Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works section-spacing">
        <div className="container">
          <h2>How Our Program Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-icon"><i className="fas fa-laptop-code"></i></div>
              <h3>Course Learning</h3>
              <p>Master the fundamentals and advanced concepts through our structured weekend courses</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-icon"><i className="fas fa-project-diagram"></i></div>
              <h3>Project Assignment</h3>
              <p>Get assigned to real industry-grade projects based on your skills and interests</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-icon"><i className="fas fa-user-tie"></i></div>
              <h3>Mentor Matching</h3>
              <p>Work with experienced mentors from leading MNCs who guide your project development</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-icon"><i className="fas fa-tasks"></i></div>
              <h3>Regular Reviews</h3>
              <p>Receive bi-weekly feedback and guidance to ensure your project meets industry standards</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Internships Included */}
      <section className="internships-included section-spacing" style={{
        background: 'linear-gradient(135deg, #f4f9ff 0%, #d8e9ff 100%)',
        padding: '5rem 0'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto 3rem'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: '#3182ce',
              color: 'white',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              IMPORTANT
            </div>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              color: '#1a2b49'
            }}>
              Every Course Includes Internship
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              lineHeight: '1.7'
            }}>
              At ACMYX, <strong>all our technical courses</strong> automatically include the internship program. 
              When you enroll in any course, you're guaranteed to receive both expert-led training and the 
              opportunity to work on real industry projects with professional mentorship.
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            margin: '3rem 0'
          }}>
            <div style={{
              flex: '1',
              minWidth: '280px',
              maxWidth: '350px',
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3182ce, #4f46e5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2.7rem',
                boxShadow: '0 4px 16px rgba(44, 62, 80, 0.08)',
                flexShrink: 0
              }}>
                <i className="fas fa-graduation-cap" style={{ fontSize: '2rem', color: 'white' }}></i>
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a2b49' }}>One Single Enrollment</h3>
              <p style={{ color: '#4a5568' }}>
                No need for separate registrations. When you enroll in any course, the internship component is automatically included.
              </p>
            </div>
            
            <div style={{
              flex: '1',
              minWidth: '280px',
              maxWidth: '350px',
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3182ce, #4f46e5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2.7rem',
                boxShadow: '0 4px 16px rgba(44, 62, 80, 0.08)',
                flexShrink: 0
              }}>
                <i className="fas fa-project-diagram" style={{ fontSize: '2rem', color: 'white' }}></i>
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a2b49' }}>Seamless Transition</h3>
              <p style={{ color: '#4a5568' }}>
                Smoothly move from learning to applying your skills in real industry projects without any additional steps.
              </p>
            </div>
            
            <div style={{
              flex: '1',
              minWidth: '280px',
              maxWidth: '350px',
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3182ce, #4f46e5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2.7rem',
                boxShadow: '0 4px 16px rgba(44, 62, 80, 0.08)',
                flexShrink: 0
              }}>
                <i className="fas fa-certificate" style={{ fontSize: '2rem', color: 'white' }}></i>
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a2b49' }}>Complete Package</h3>
              <p style={{ color: '#4a5568' }}>
                Get both training and internship for the price of one, maximizing the value of your educational investment.
              </p>
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <Link to="/programs" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2rem',
              background: '#3182ce',
              color: 'white',
              borderRadius: '5px',
              fontWeight: 'bold',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}>
              Browse Our Courses <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Eligibility & Application */}
      <section className="eligibility-section section-spacing" id="eligibility">
        <div className="container">
          <h2>Program Structure & Requirements</h2>
          <div className="eligibility-content">
            <div className="eligibility-criteria">
              <h3>Program Requirements</h3>
              <ul>
                <li><i className="fas fa-check-circle"></i> Commitment to attend weekend sessions for 2 months during training phase</li>
                <li><i className="fas fa-check-circle"></i> 4-week internship period working on real industry-grade projects</li>
                <li><i className="fas fa-check-circle"></i> Completion of minor and major projects during internship phase</li>
                <li><i className="fas fa-check-circle"></i> Regular participation in mentor review meetings</li>
                <li><i className="fas fa-check-circle"></i> Willingness to collaborate with industry mentors and implement feedback</li>
              </ul>
            </div>
            <div className="application-process">
              <h3>Program Timeline</h3>
              <ol>
                <li>
                  <span className="step-number">01</span>
                  <div className="step-content">
                    <h4>Training Phase (2 months)</h4>
                    <p>Weekend sessions focused on skill development with practice exercises</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">02</span>
                  <div className="step-content">
                    <h4>Minor Project</h4>
                    <p>First industry project to apply your skills with mentor guidance</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">03</span>
                  <div className="step-content">
                    <h4>Major Project</h4>
                    <p>Comprehensive project tackling complex industry challenges</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">04</span>
                  <div className="step-content">
                    <h4>Internship Phase (4 weeks)</h4>
                    <p>Focused period working on both projects with bi-weekly mentor reviews</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">05</span>
                  <div className="step-content">
                    <h4>Final Evaluation</h4>
                    <p>Present your completed projects to mentors for certification</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="internship-faq section-spacing">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What is the Course + Internship Program structure?</h3>
              <p>Our program has two phases: a 2-month weekend training phase followed by a 4-week internship where you'll work on real industry projects (one minor and one major) with mentor guidance.</p>
            </div>
            <div className="faq-item">
              <h3>What certificates will I receive?</h3>
              <p>You'll receive three certificates: Training Completion, Internship Completion, and potentially an Outstanding Performance Certificate if you excel in your projects. All certificates are certified with WIPRO DICE ID for industry recognition.</p>
            </div>
            <div className="faq-item">
              <h3>What is WIPRO DICE ID certification?</h3>
              <p>This is a recognized credential system from Wipro that validates the authenticity of your certificates, giving them greater recognition in the industry when applying for jobs.</p>
            </div>
            <div className="faq-item">
              <h3>How does the stipend system work?</h3>
              <p>Outstanding performers may receive stipends ranging from 18,000 to 25,000 INR based entirely on project quality, participation, and mentor feedback. These are not guaranteed and are awarded only to exceptional students.</p>
            </div>
            <div className="faq-item">
              <h3>What kinds of projects will I work on?</h3>
              <p>You'll work on two real industry-grade projects: a smaller scope minor project and a more comprehensive major project. Both are designed to be portfolio-worthy and demonstrate your skills to potential employers.</p>
            </div>
            <div className="faq-item">
              <h3>How often will I interact with my mentor?</h3>
              <p>During the internship phase, you'll have bi-weekly scheduled review meetings for both your minor and major projects, along with communication channels to get feedback and guidance throughout your journey.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="internship-cta section-spacing">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Learn and Build with Industry Experts?</h2>
            <p>Start your journey with our Course + Internship program and develop skills while creating industry-grade projects.</p>
            <div className="cta-buttons">
              <Link to="/programs" className="cta-button primary">Browse Programs</Link>
              <Link to="/contact" className="cta-button secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Internships; 