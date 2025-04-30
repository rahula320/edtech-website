import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Handle hover events for desktop dropdown
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setProgramsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProgramsDropdownOpen(false);
    }, 300); // Small delay to prevent accidental closes
  };

  // Toggle for mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle for mobile dropdown (remains click-based)
  const toggleProgramsDropdown = () => {
    setProgramsDropdownOpen(!programsDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProgramsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Programs categorized by domains
  const programCategories = [
    {
      title: "Computer Science",
      icon: "fas fa-laptop-code",
      programs: [
        { name: "Data Science & Analytics", icon: "fas fa-chart-bar", path: "/programs/data-science" },
        { name: "Artificial Intelligence", icon: "fas fa-robot", path: "/programs/artificial-intelligence" },
        { name: "Machine Learning with Python", icon: "fas fa-brain", path: "/programs/machine-learning" },
        { name: "Cloud Computing", icon: "fas fa-cloud", path: "/programs/cloud-computing" },
        { name: "Web Development", icon: "fas fa-code", path: "/programs/web-development" },
        { name: "UI/UX Design & Development", icon: "fas fa-paint-brush", path: "/programs/ui-ux-design" },
        { name: "Cyber Security", icon: "fas fa-shield-alt", path: "/programs/cyber-security" },
        { name: "DevOps", icon: "fas fa-cogs", path: "/programs/devops" },
        { name: "Android Development", icon: "fas fa-mobile-alt", path: "/programs/android-development" },
        { name: "iOS Development", icon: "fab fa-apple", path: "/programs/ios-development" }
      ]
    },
    {
      title: "Electronics",
      icon: "fas fa-microchip",
      programs: [
        { name: "Embedded Systems", icon: "fas fa-microchip", path: "/programs/embedded-systems" },
        { name: "Internet of Things (IoT)", icon: "fas fa-network-wired", path: "/programs/iot" }
      ]
    },
    {
      title: "Civil/Mechanical",
      icon: "fas fa-drafting-compass",
      programs: [
        { name: "AutoCAD Designing", icon: "fas fa-drafting-compass", path: "/programs/autocad" }
      ]
    }
  ];

  // Program featured item
  const featuredProgram = {
    title: "Course + Internship Program",
    icon: "fas fa-user-graduate",
    path: "/internships",
    description: "Learn skills and build real projects with MNC mentors"
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/images/logo.png" alt="ACMYX Logo" className="navbar-logo" />
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/"><i className="fas fa-home"></i> Home</Link>
        
        <div 
          className="dropdown-container" 
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`dropdown-toggle ${programsDropdownOpen ? 'active' : ''}`}>
            <i className="fas fa-laptop-code"></i> Programs <i className={`fas fa-chevron-down arrow ${programsDropdownOpen ? 'rotated' : ''}`}></i>
          </div>
          
          <div className={`mega-dropdown ${programsDropdownOpen ? 'open' : ''}`}>
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
                          <Link to={program.path} className="program-link">
                            <i className={program.icon}></i> {program.name}
                            <span className="hover-indicator"></span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="featured-program">
                <h4>Featured Program</h4>
                <Link to={featuredProgram.path} className="featured-program-link">
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
        </div>
        
        <Link to="/about"><i className="fas fa-info-circle"></i> About</Link>
        <Link to="/careers"><i className="fas fa-briefcase"></i> Careers</Link>
        <Link to="/faq"><i className="fas fa-question-circle"></i> FAQ</Link>
        <Link to="/internships"><i className="fas fa-user-graduate"></i> Internships</Link>
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
            <Link to="/careers" onClick={toggleMobileMenu}><i className="fas fa-briefcase"></i> Careers</Link>
            <Link to="/faq" onClick={toggleMobileMenu}><i className="fas fa-question-circle"></i> FAQ</Link>
            <Link to="/internships" onClick={toggleMobileMenu}><i className="fas fa-user-graduate"></i> Internships</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 