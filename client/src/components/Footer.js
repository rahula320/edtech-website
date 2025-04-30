import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Custom Link component that scrolls to top on click
  const ScrollLink = ({ to, children, className }) => (
    <Link 
      to={to} 
      className={className} 
      onClick={scrollToTop}
    >
      {children}
    </Link>
  );

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <ScrollLink to="/">
                <img src="/images/logo.png" alt="ACMYX Logo" className="footer-logo-img" />
              </ScrollLink>
            </div>
            <p className="footer-tagline">Empowering careers with industry-aligned tech education and mentorship</p>
            <div className="footer-social">
              <a href="https://facebook.com" onClick={scrollToTop} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" onClick={scrollToTop} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com" onClick={scrollToTop} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://instagram.com" onClick={scrollToTop} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://youtube.com" onClick={scrollToTop} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <button onClick={scrollToTop} className="back-to-top" aria-label="Back to Top">
                <i className="fas fa-arrow-up"></i>
              </button>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Programs</h3>
              <ul>
                <li><ScrollLink to="/programs">All Courses</ScrollLink></li>
                <li><ScrollLink to="/programs/data-science">Data Science</ScrollLink></li>
                <li><ScrollLink to="/programs/artificial-intelligence">Artificial Intelligence</ScrollLink></li>
                <li><ScrollLink to="/programs/web-development">Web Development</ScrollLink></li>
                <li><ScrollLink to="/programs/machine-learning">Machine Learning</ScrollLink></li>
                <li><ScrollLink to="/programs/cyber-security">Cyber Security</ScrollLink></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><ScrollLink to="/about">About Us</ScrollLink></li>
                <li><ScrollLink to="/careers">Careers</ScrollLink></li>
                <li><ScrollLink to="/faq">FAQ</ScrollLink></li>
                <li><ScrollLink to="/programs">Our Programs</ScrollLink></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><ScrollLink to="/faq">FAQs</ScrollLink></li>
                <li><ScrollLink to="/contact">Contact Us</ScrollLink></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><ScrollLink to="/">Home</ScrollLink></li>
                <li><ScrollLink to="/programs">Programs</ScrollLink></li>
                <li><ScrollLink to="/about">About</ScrollLink></li>
                <li><ScrollLink to="/careers">Careers</ScrollLink></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {new Date().getFullYear()} ACMYX. All rights reserved.</p>
            <div className="legal-links">
              <ScrollLink to="/terms" className="legal-link">
                <i className="fas fa-file-contract"></i> Terms & Conditions
              </ScrollLink>
              <ScrollLink to="/contact" className="legal-link">
                <i className="fas fa-phone-alt"></i> Contact Us
              </ScrollLink>
            </div>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-app-links">
              <button onClick={scrollToTop} className="app-link back-to-top-btn">
                <i className="fas fa-arrow-up"></i> Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 