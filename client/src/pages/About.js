import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Empowering learners worldwide with cutting-edge educational technology</p>
      </section>
      
      <section className="about-content">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>We're a next-generation edtech platform built for learners who are serious about their careers. In a digital-first world, knowledge alone isn't enough—practical skills, real-world experience, and the right mentorship make all the difference. That's exactly what we provide.</p>
          <p>Our mission is to bridge the gap between traditional education and the evolving needs of the job market. Whether you're breaking into tech, switching fields, or leveling up in your current role, our programs are designed to accelerate your growth with hands-on training, industry-recognized certifications, and one-on-one mentorship from seasoned professionals.</p>
        </div>
        
        <div className="values">
          <h2>What We Believe In</h2>
          <p className="values-intro">We believe in learning that's actionable, accessible, and aligned with real outcomes.</p>
          <div className="values-grid">
            <div className="value-card">
              <h3>👨‍🏫 Mentor-Guided Learning</h3>
              <p>You're never alone—our mentors guide you through every step.</p>
            </div>
            <div className="value-card">
              <h3>💼 Career Support</h3>
              <p>Resume building, mock interviews, and exclusive placement opportunities.</p>
            </div>
            <div className="value-card">
              <h3>📚 Industry-Relevant Curriculum</h3>
              <p>Stay ahead with skills and tools companies actually use.</p>
            </div>
          </div>
        </div>
        
        <div className="partners-section">
          <h2>Our Prestigious Partners</h2>
          <div className="partners-grid">
            <div className="partner-card">
              <div className="partner-logo">Google</div>
            </div>
            <div className="partner-card">
              <div className="partner-logo">Microsoft</div>
            </div>
            <div className="partner-card">
              <div className="partner-logo">Amazon</div>
            </div>
          </div>
        </div>
        
        <div className="join-us">
          <h2>Join Our Community</h2>
          <p>Join us and be part of a community that's reshaping the future of work—one skill at a time.</p>
          <button className="cta-button">Start Your Journey</button>
        </div>
      </section>
    </div>
  );
}

export default About; 