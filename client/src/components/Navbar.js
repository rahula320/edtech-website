import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProgramsDropdown = () => {
    setProgramsDropdownOpen(!programsDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <i className="fas fa-graduation-cap"></i> EdTech
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/"><i className="fas fa-home"></i> Home</Link>
        
        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={toggleProgramsDropdown}>
            <i className="fas fa-laptop-code"></i> Programs <i className="fas fa-chevron-down"></i>
          </button>
          
          {programsDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/programs/data-science"><i className="fas fa-chart-bar"></i> Data Science</Link>
              <Link to="/programs/artificial-intelligence"><i className="fas fa-robot"></i> Artificial Intelligence</Link>
              <Link to="/programs/cloud-computing"><i className="fas fa-cloud"></i> Cloud Computing</Link>
              <Link to="/programs/web-development"><i className="fas fa-code"></i> Web Development</Link>
              <Link to="/programs/cyber-security"><i className="fas fa-shield-alt"></i> Cyber Security</Link>
              <Link to="/programs/iot"><i className="fas fa-network-wired"></i> Internet of Things</Link>
              <Link to="/programs/machine-learning"><i className="fas fa-brain"></i> Machine Learning with Python</Link>
              <Link to="/programs/autocad"><i className="fas fa-drafting-compass"></i> AutoCAD Designing</Link>
              <Link to="/programs/embedded-systems"><i className="fas fa-microchip"></i> Embedded Systems</Link>
              <Link to="/programs/business-management"><i className="fas fa-globe"></i> International Business Management</Link>
              <Link to="/programs/stock-market"><i className="fas fa-chart-line"></i> Stock Market & Cryptocurrency</Link>
              <Link to="/programs/construction"><i className="fas fa-hard-hat"></i> Construction Planning</Link>
              <Link to="/programs/internship"><i className="fas fa-user-graduate"></i> Internship Program</Link>
            </div>
          )}
        </div>
        
        <Link to="/about"><i className="fas fa-info-circle"></i> About</Link>
        <Link to="/support"><i className="fas fa-headset"></i> Support</Link>
        <Link to="/contact"><i className="fas fa-envelope"></i> Contact</Link>
      </div>
      
      <div className="navbar-auth">
        <Link to="/login" className="login-btn"><i className="fas fa-sign-in-alt"></i> Login</Link>
        <Link to="/register" className="register-btn"><i className="fas fa-user-plus"></i> Register</Link>
      </div>
      
      <button className="menu-button" onClick={toggleMobileMenu}>
        <i className="fas fa-bars"></i>
      </button>
      
      {mobileMenuOpen && (
        <div className={`navbar-mobile ${mobileMenuOpen ? 'active' : ''}`}>
          <button className="navbar-mobile-close" onClick={toggleMobileMenu}>
            <i className="fas fa-times"></i>
          </button>
          
          <div className="navbar-mobile-links">
            <Link to="/" onClick={toggleMobileMenu}><i className="fas fa-home"></i> Home</Link>
            
            <div className="mobile-dropdown">
              <button className="mobile-dropdown-toggle" onClick={toggleProgramsDropdown}>
                <i className="fas fa-laptop-code"></i> Programs {programsDropdownOpen ? 
                  <i className="fas fa-chevron-up"></i> : 
                  <i className="fas fa-chevron-down"></i>}
              </button>
              
              {programsDropdownOpen && (
                <div className="mobile-dropdown-menu">
                  <Link to="/programs/data-science" onClick={toggleMobileMenu}>
                    <i className="fas fa-chart-bar"></i> Data Science
                  </Link>
                  <Link to="/programs/artificial-intelligence" onClick={toggleMobileMenu}>
                    <i className="fas fa-robot"></i> Artificial Intelligence
                  </Link>
                  <Link to="/programs/cloud-computing" onClick={toggleMobileMenu}>
                    <i className="fas fa-cloud"></i> Cloud Computing
                  </Link>
                  <Link to="/programs/web-development" onClick={toggleMobileMenu}>
                    <i className="fas fa-code"></i> Web Development
                  </Link>
                  <Link to="/programs/cyber-security" onClick={toggleMobileMenu}>
                    <i className="fas fa-shield-alt"></i> Cyber Security
                  </Link>
                  <Link to="/programs/iot" onClick={toggleMobileMenu}>
                    <i className="fas fa-network-wired"></i> Internet of Things
                  </Link>
                  <Link to="/programs/machine-learning" onClick={toggleMobileMenu}>
                    <i className="fas fa-brain"></i> Machine Learning with Python
                  </Link>
                  <Link to="/programs/autocad" onClick={toggleMobileMenu}>
                    <i className="fas fa-drafting-compass"></i> AutoCAD Designing
                  </Link>
                  <Link to="/programs/embedded-systems" onClick={toggleMobileMenu}>
                    <i className="fas fa-microchip"></i> Embedded Systems
                  </Link>
                  <Link to="/programs/business-management" onClick={toggleMobileMenu}>
                    <i className="fas fa-globe"></i> International Business Management
                  </Link>
                  <Link to="/programs/stock-market" onClick={toggleMobileMenu}>
                    <i className="fas fa-chart-line"></i> Stock Market & Cryptocurrency
                  </Link>
                  <Link to="/programs/construction" onClick={toggleMobileMenu}>
                    <i className="fas fa-hard-hat"></i> Construction Planning
                  </Link>
                  <Link to="/programs/internship" onClick={toggleMobileMenu}>
                    <i className="fas fa-user-graduate"></i> Internship Program
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/about" onClick={toggleMobileMenu}><i className="fas fa-info-circle"></i> About</Link>
            <Link to="/support" onClick={toggleMobileMenu}><i className="fas fa-headset"></i> Support</Link>
            <Link to="/contact" onClick={toggleMobileMenu}><i className="fas fa-envelope"></i> Contact</Link>
          </div>
          
          <div className="navbar-mobile-auth">
            <Link to="/login" className="login-btn" onClick={toggleMobileMenu}>
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
            <Link to="/register" className="register-btn" onClick={toggleMobileMenu}>
              <i className="fas fa-user-plus"></i> Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 