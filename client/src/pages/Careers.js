import React from 'react';
import { Link } from 'react-router-dom';
import unstopLogo from '../assets/unstop-logo.svg';
import './Careers.css';

function Careers() {
  return (
    <div className="careers-page">
      <div className="careers-hero">
        <div className="careers-hero-content">
          <h1>Join Our Mission to Transform Education</h1>
          <p>We're looking for passionate individuals who want to make a difference in the lives of students around the world. Explore our open positions and become part of our team.</p>
        </div>
      </div>

      <div className="career-options">
        <div className="career-option">
          <div className="option-content">
            <div className="role-badge">Open Position</div>
            <h3>Business Development Associate / Intern</h3>
            <p>
              Join our dynamic team as a Business Development Associate/Intern and help drive our growth initiatives. 
              This role offers an exciting opportunity to work on strategic business development projects and gain hands-on 
              experience in the tech industry.
            </p>
            <div className="option-details">
              <div className="detail-item">
                <span className="detail-value">3-6 months</span>
                <span className="detail-label">Duration</span>
              </div>
              <div className="detail-item">
                <span className="detail-value">Remote</span>
                <span className="detail-label">Location</span>
              </div>
              <div className="detail-item">
                <span className="detail-value">Students & Graduates</span>
                <span className="detail-label">Open to</span>
              </div>
            </div>
            <div className="text-center">
              <div className="unstop-logo">
                <img src={unstopLogo} alt="Unstop" />
              </div>
              <a 
                href="https://unstop.com/jobs/business-development-associate-acmyx-1496971" 
                target="_blank" 
                rel="noopener noreferrer"
                className="option-apply-button"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="why-work-with-us">
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
    </div>
  );
}

export default Careers; 