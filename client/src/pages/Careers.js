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
        {/* No open positions currently available */}
        <div className="no-positions">
          <h3>No Open Positions Currently</h3>
          <p>We don't have any open positions at the moment, but we're always looking for talented individuals to join our team. Please check back later or reach out to us directly if you're interested in working with us.</p>
          <div className="contact-info">
            <p>For general inquiries about career opportunities, please contact us at:</p>
            <a href="mailto:acmyxteams@gmail.com" className="contact-email">
              <i className="fas fa-envelope"></i> acmyxteams@gmail.com
            </a>
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