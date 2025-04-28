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
          <p className="hero-subtitle">Empowering tech professionals through expert-led education</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="about-overview section-spacing">
        <div className="responsive-container">
          <div className="overview-content">
            <div className="overview-text">
              <h2>Our Story</h2>
              <p>ACMYX is dedicated to providing high-quality tech education that bridges the gap between academic knowledge and industry requirements. Our programs are designed to be practical, career-focused, and accessible to professionals at all levels.</p>
            </div>
            <div className="overview-stats">
              <div className="stat-card">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Students Enrolled</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">50+</span>
                <span className="stat-label">Industry Experts</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">90%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission section-spacing">
        <div className="responsive-container">
          <h2>Our Mission</h2>
          <div className="mission-cards">
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Quality Education</h3>
              <p>Deliver practical, industry-relevant education that prepares students for real-world challenges</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Industry Alignment</h3>
              <p>Bridge the gap between academic learning and industry requirements through expert mentorship</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Career Growth</h3>
              <p>Empower professionals to accelerate their careers with practical skills and industry insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values section-spacing">
        <div className="responsive-container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Excellence</h3>
              <p>We maintain high standards in education quality and student support</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We continuously evolve our programs to meet industry demands</p>
            </div>
            <div className="value-card">
              <h3>Integrity</h3>
              <p>We are committed to transparency and ethical practices</p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>We foster a supportive learning environment for all students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team section-spacing">
        <div className="responsive-container">
          <h2>Meet Our Leadership</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="Team member" />
              </div>
              <h3>John Smith</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">With over 15 years of experience in tech education, John leads our vision for transforming professional learning.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="Team member" />
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Head of Education</p>
              <p className="member-bio">Sarah brings her expertise in curriculum development and industry partnerships to our programs.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="Team member" />
              </div>
              <h3>Michael Chen</h3>
              <p className="member-role">Technical Director</p>
              <p className="member-bio">Michael ensures our programs stay at the cutting edge of technology and industry trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta section-spacing">
        <div className="responsive-container">
          <div className="cta-content">
            <h2>Ready to Transform Your Career?</h2>
            <p>Join our community of tech professionals and take your career to the next level</p>
            <Link to="/programs" className="cta-button primary">Explore Programs</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About; 