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

  // Programs categorized by domains
  const programCategories = [
    {
      title: "Technology & Data",
      icon: "fas fa-laptop-code",
      programs: [
        { name: "Data Science", icon: "fas fa-chart-bar", path: "/programs/data-science" },
        { name: "Artificial Intelligence", icon: "fas fa-robot", path: "/programs/artificial-intelligence" },
        { name: "Machine Learning with Python", icon: "fas fa-brain", path: "/programs/machine-learning" }
      ]
    },
    {
      title: "Engineering & Computing",
      icon: "fas fa-microchip",
      programs: [
        { name: "Cloud Computing", icon: "fas fa-cloud", path: "/programs/cloud-computing" },
        { name: "Web Development", icon: "fas fa-code", path: "/programs/web-development" },
        { name: "Embedded Systems", icon: "fas fa-microchip", path: "/programs/embedded-systems" },
        { name: "Internet of Things", icon: "fas fa-network-wired", path: "/programs/iot" }
      ]
    },
    {
      title: "Design & Creativity",
      icon: "fas fa-pencil-ruler",
      programs: [
        { name: "AutoCAD Designing", icon: "fas fa-drafting-compass", path: "/programs/autocad" },
        { name: "Construction Planning", icon: "fas fa-hard-hat", path: "/programs/construction" }
      ]
    },
    {
      title: "Business & Finance",
      icon: "fas fa-briefcase",
      programs: [
        { name: "International Business Management", icon: "fas fa-globe", path: "/programs/business-management" },
        { name: "Stock Market & Cryptocurrency", icon: "fas fa-chart-line", path: "/programs/stock-market" }
      ]
    },
    {
      title: "Security & Protection",
      icon: "fas fa-shield-alt",
      programs: [
        { name: "Cyber Security", icon: "fas fa-shield-alt", path: "/programs/cyber-security" }
      ]
    }
  ];

  // Program featured item
  const featuredProgram = {
    title: "Internship Program",
    icon: "fas fa-user-graduate",
    path: "/programs/internship",
    description: "Gain hands-on experience with industry experts"
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
            <div className="mega-dropdown">
              <div className="mega-dropdown-content">
                <div className="mega-dropdown-grid">
                  {programCategories.map((category, idx) => (
                    <div className="dropdown-category" key={idx}>
                      <h4 className="category-title">
                        <i className={category.icon}></i> {category.title}
                      </h4>
                      <ul className="category-programs">
                        {category.programs.map((program, progIdx) => (
                          <li key={progIdx}>
                            <Link to={program.path} onClick={() => setProgramsDropdownOpen(false)}>
                              <i className={program.icon}></i> {program.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="featured-program">
                  <h4>Featured Program</h4>
                  <Link to={featuredProgram.path} onClick={() => setProgramsDropdownOpen(false)} className="featured-program-link">
                    <div className="featured-program-icon">
                      <i className={featuredProgram.icon}></i>
                    </div>
                    <div className="featured-program-info">
                      <h5>{featuredProgram.title}</h5>
                      <p>{featuredProgram.description}</p>
                    </div>
                  </Link>
                </div>
              </div>
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
                  {programCategories.map((category, idx) => (
                    <div className="mobile-category" key={idx}>
                      <h5 className="mobile-category-title">
                        <i className={category.icon}></i> {category.title}
                      </h5>
                      {category.programs.map((program, progIdx) => (
                        <Link 
                          key={progIdx} 
                          to={program.path} 
                          onClick={toggleMobileMenu}
                          className="mobile-program-link"
                        >
                          <i className={program.icon}></i> {program.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <div className="mobile-featured">
                    <h5 className="mobile-category-title">
                      <i className="fas fa-star"></i> Featured
                    </h5>
                    <Link 
                      to={featuredProgram.path} 
                      onClick={toggleMobileMenu}
                      className="mobile-program-link featured"
                    >
                      <i className={featuredProgram.icon}></i> {featuredProgram.title}
                    </Link>
                  </div>
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