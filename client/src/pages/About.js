import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="responsive-container">
          <h1>About ACMYX</h1>
          <p className="hero-subtitle">Bridging theory with practical tech skills for your career growth</p>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="about-overview section-spacing">
        <div className="responsive-container">
          <div className="overview-content">
            <div className="overview-text">
              <h2>Our Approach</h2>
              <p>At ACMYX, we focus on practical, hands-on learning that prepares you for real-world challenges. Our weekend-focused programs are designed to fit busy schedules, requiring just 2-3 hours of dedication during weekends.</p>
              <p>We believe in learning by doing, which is why our curriculum emphasizes practical projects that you can add to your portfolio. No prior experience needed—our programs are designed to take you from basics to advanced concepts in a structured way.</p>
            </div>
            <div className="overview-stats">
              <div className="stat-card">
                <span className="stat-number">12</span>
                <span className="stat-label">Technical Programs</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">8</span>
                <span className="stat-label">Weeks Per Program</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">Project-Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="about-mission section-spacing">
        <div className="responsive-container">
          <h2>What We Offer</h2>
          <div className="mission-cards">
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3>Practical Learning</h3>
              <p>Our programs are 60% hands-on with real-world projects that build your portfolio and showcase your skills to employers</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Industry Mentors</h3>
              <p>Learn from experienced mentors who provide guidance, feedback, and support throughout your learning journey</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h3>Certification</h3>
              <p>Receive an industry-recognized certificate upon completion that you can add to your resume and LinkedIn profile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="about-values section-spacing">
        <div className="responsive-container">
          <h2>Our Programs</h2>
          <p className="programs-intro">We offer weekend-focused programs in the most in-demand technical fields</p>
          <div className="values-grid programs-grid">
            <div className="value-card">
              <h3>Computer Science</h3>
              <ul>
                <li>Data Science & Analytics</li>
                <li>Artificial Intelligence</li>
                <li>Machine Learning with Python</li>
                <li>Web Development</li>
                <li>Cyber Security</li>
              </ul>
            </div>
            <div className="value-card">
              <h3>DevOps & Cloud</h3>
              <ul>
                <li>Cloud Computing</li>
                <li>DevOps Engineering</li>
              </ul>
            </div>
            <div className="value-card">
              <h3>Mobile Development</h3>
              <ul>
                <li>Android Development</li>
                <li>iOS Development</li>
              </ul>
            </div>
            <div className="value-card">
              <h3>Engineering</h3>
              <ul>
                <li>Embedded Systems</li>
                <li>Internet of Things (IoT)</li>
                <li>AutoCAD Designing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="support-section section-spacing">
        <div className="responsive-container">
          <h2>Learning Support</h2>
          <div className="support-grid">
            <div className="support-item">
              <div className="support-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <div className="support-content">
                <h3>Beginner-Friendly Curriculum</h3>
                <p>Our learning materials are designed to be accessible for beginners while covering advanced concepts as you progress. The content is regularly updated to align with industry trends and the latest technologies.</p>
              </div>
            </div>
            <div className="support-item">
              <div className="support-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <div className="support-content">
                <h3>Career Guidance</h3>
                <p>We provide career guidance, resume review, interview preparation, and networking opportunities to help you transition into your desired role after completing our programs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="about-pricing section-spacing">
        <div className="responsive-container">
          <h2>Flexible Learning Plans</h2>
          <div className="pricing-overview">
            <div className="pricing-item">
              <h3>Self-Paced</h3>
              <p>Learn at your own pace with access to all course materials and basic support</p>
            </div>
            <div className="pricing-item">
              <h3>Mentor-Led</h3>
              <p>Enhanced learning with dedicated mentor guidance and additional resources</p>
            </div>
            <div className="pricing-item">
              <h3>Advanced Program</h3>
              <p>Premium experience with personalized mentorship, career coaching, and industry projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta section-spacing">
        <div className="responsive-container">
          <div className="cta-content">
            <h2>Start Your Learning Journey</h2>
            <p>Explore our programs and find the right fit for your career goals</p>
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

export default About; 