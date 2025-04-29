import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    // Prevent body scroll when mobile menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

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

  // Check if current path matches link path
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-logo-links">
          <div className="navbar-brand">
            <Link to="/" className="logo-link">
              <i className="fas fa-graduation-cap"></i>
              <span className="logo-text">ACMYX</span>
            </Link>
          </div>
          
          <div className="navbar-links">
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              <i className="fas fa-home"></i> <span>Home</span>
            </Link>
            
            <div 
              className="dropdown-container" 
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`dropdown-toggle ${isActive('/programs') || programsDropdownOpen ? 'active' : ''}`}>
                <i className="fas fa-laptop-code"></i> <span>Programs</span> <i className={`fas fa-chevron-down arrow ${programsDropdownOpen ? 'rotated' : ''}`}></i>
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
            
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>
              <i className="fas fa-info-circle"></i> <span>About</span>
            </Link>
            <Link to="/careers" className={isActive('/careers') ? 'active' : ''}>
              <i className="fas fa-briefcase"></i> <span>Careers</span>
            </Link>
            <Link to="/faq" className={isActive('/faq') ? 'active' : ''}>
              <i className="fas fa-question-circle"></i> <span>FAQ</span>
            </Link>
          </div>
        </div>
        
        <div className="navbar-actions">
          <Link to="/internships" className={`action-button ${isActive('/internships') ? 'active' : ''}`}>
            <i className="fas fa-user-graduate"></i> <span>Internships</span>
          </Link>
          <Link to="/contact" className={`contact-button ${isActive('/contact') ? 'active' : ''}`}>
            <i className="fas fa-envelope"></i> <span>Contact</span>
          </Link>
          
          <button className="menu-button" onClick={toggleMobileMenu} aria-label="Open Menu">
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      
      <div className={`navbar-mobile ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="navbar-mobile-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            <i className="fas fa-home"></i> Home
          </Link>
          
          <div className="mobile-dropdown">
            <button className={`mobile-dropdown-toggle ${isActive('/programs') ? 'active' : ''}`} onClick={toggleProgramsDropdown}>
              <div className="toggle-content">
                <i className="fas fa-laptop-code"></i> Programs 
              </div>
              <i className={`fas ${programsDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            
            {programsDropdownOpen && (
              <div className="mobile-dropdown-menu">
                {programCategories.map((category, idx) => (
                  <div className="mobile-category" key={idx}>
                    <h5 className="mobile-category-title">
                      <i className={category.icon}></i> {category.title}
                    </h5>
                    <div className="mobile-category-programs">
                      {category.programs.map((program, progIdx) => (
                        <Link 
                          key={progIdx} 
                          to={program.path} 
                          className={`mobile-program-link ${location.pathname === program.path ? 'active' : ''}`}
                        >
                          <i className={program.icon}></i> {program.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mobile-featured">
                  <h5 className="mobile-category-title">
                    <i className="fas fa-star"></i> Featured
                  </h5>
                  <Link 
                    to={featuredProgram.path} 
                    className={`mobile-program-link featured ${location.pathname === featuredProgram.path ? 'active' : ''}`}
                  >
                    <i className={featuredProgram.icon}></i> {featuredProgram.title}
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>
            <i className="fas fa-info-circle"></i> About
          </Link>
          <Link to="/careers" className={isActive('/careers') ? 'active' : ''}>
            <i className="fas fa-briefcase"></i> Careers
          </Link>
          <Link to="/faq" className={isActive('/faq') ? 'active' : ''}>
            <i className="fas fa-question-circle"></i> FAQ
          </Link>
          <Link to="/internships" className={isActive('/internships') ? 'active' : ''}>
            <i className="fas fa-user-graduate"></i> Internships
          </Link>
          <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>
            <i className="fas fa-envelope"></i> Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 