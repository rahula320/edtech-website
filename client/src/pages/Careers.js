import React from 'react';
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

      <section className="careers-options">
        <div className="container">
          <div className="internship-feature">
            <div className="internship-image">
              <img 
                src="/images/internship-delegate-poster.png" 
                alt="ACMYX Internship Delegate Program" 
                className="poster-image"
              />
            </div>
            <div className="internship-details">
              <h3>Internship Delegate Program</h3>
              <p>Lead, learn, and level up with industry experts from Accenture, TCS, Barclays, and EPAM. Earn up to ₹10,000 based on performance, work with top mentors, and get certified.</p>
              <a 
                href="https://forms.gle/h7vX3fN54bFS9zfS8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="option-apply-button"
              >
                Apply Now
              </a>
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
    </div>
  );
}

export default Careers; 