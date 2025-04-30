import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            <i className="fas fa-home"></i> Back to Home
          </Link>
          <Link to="/contact" className="contact-button">
            <i className="fas fa-envelope"></i> Contact Us
          </Link>
        </div>
        <div className="suggested-links">
          <h3>You might be looking for:</h3>
          <ul>
            <li><Link to="/programs">Our Programs</Link></li>
            <li><Link to="/internships">Internship Opportunities</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFound; 