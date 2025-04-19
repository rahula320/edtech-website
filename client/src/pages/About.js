import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-container">
        <div className="under-development">
          <div className="development-illustration">
            <img 
              src="https://cdni.iconscout.com/illustration/premium/thumb/website-under-construction-3327050-2809197.png" 
              alt="Under development illustration"
            />
          </div>
          
          <div className="development-content">
            <h1>Our Story Is Being Written</h1>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <span className="progress-text">65% Complete</span>
            </div>
            
            <p className="development-message">
              We're currently crafting our About page to better tell our story. 
              Check back soon to learn about our mission, values, and the team behind our platform.
            </p>
            
            <div className="development-cta">
              <p>In the meantime, you can:</p>
              <ul>
                <li>Explore our <a href="/programs">available courses</a></li>
                <li>Read our <a href="/blog">latest articles</a></li>
                <li>Contact us at <a href="mailto:info@techedu.com">info@techedu.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 