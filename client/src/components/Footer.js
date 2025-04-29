import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <Link to="/">
                <i className="fas fa-graduation-cap"></i> ACMYX
              </Link>
            </div>
            <p className="footer-tagline">Empowering careers with industry-aligned tech education and mentorship</p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Programs</h3>
              <ul>
                <li><Link to="/programs">All Courses</Link></li>
                <li><Link to="/programs/data-science">Data Science</Link></li>
                <li><Link to="/programs/artificial-intelligence">Artificial Intelligence</Link></li>
                <li><Link to="/programs/web-development">Web Development</Link></li>
                <li><Link to="/programs/machine-learning">Machine Learning</Link></li>
                <li><Link to="/programs/cyber-security">Cyber Security</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/programs">Our Programs</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><Link to="/faq">FAQs</Link></li>
                <li><a href="mailto:acmyxteams@gmail.com">Contact Support</a></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/programs">Programs</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {new Date().getFullYear()} ACMYX. All rights reserved.</p>
            <div className="legal-links">
              <Link to="/terms" className="legal-link">
                <i className="fas fa-file-contract"></i> Terms & Conditions
              </Link>
              <Link to="/contact" className="legal-link">
                <i className="fas fa-phone-alt"></i> Contact Us
              </Link>
            </div>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-app-links">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="app-link">
                <i className="fab fa-apple"></i> App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="app-link">
                <i className="fab fa-google-play"></i> Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 