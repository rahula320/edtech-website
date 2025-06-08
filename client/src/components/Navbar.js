import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown when route changes (page loads)
  useEffect(() => {
    setProgramsDropdownOpen(false);
  }, [location.pathname]);

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
    }, 500); // Increased delay to 500ms for better user experience
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

  return (
    <nav className={`navbar ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="navbar-brand">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/images/WhiteLogo_TransparentBg.png" alt="ACMYX Logo" className="navbar-logo" />
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><i className="fas fa-home"></i> Home</Link>
        
        <div 
          className="dropdown-container" 
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to="/programs"
            className={`dropdown-toggle ${programsDropdownOpen ? 'active' : ''}`}
            onClick={(e) => {
              if (location.pathname.startsWith('/programs')) {
                e.preventDefault();
                setProgramsDropdownOpen((open) => !open);
              } else {
                setProgramsDropdownOpen(false);
              }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <i className="fas fa-laptop-code"></i> Programs <i className={`fas fa-chevron-down arrow ${programsDropdownOpen ? 'rotated' : ''}`}></i>
          </Link>
          
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
                          <Link 
                            to={program.path} 
                            className="program-link"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProgramsDropdownOpen(false);
                              if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current);
                              }
                            }}
                          >
                            <i className={program.icon}></i> {program.name}
                            <span className="hover-indicator"></span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Link to="/about"><i className="fas fa-info-circle"></i> About</Link>
        <Link to="/careers"><i className="fas fa-briefcase"></i> Careers</Link>
        <Link to="/faq"><i className="fas fa-question-circle"></i> FAQ</Link>
        <Link to="/internships"><i className="fas fa-user-graduate"></i> Internships</Link>
      </div>
      
      <button className="menu-button" onClick={toggleMobileMenu} aria-label="Open menu">
        <i className="fas fa-ellipsis-v"></i>
      </button>
      
      {mobileMenuOpen && (
        <div className={`navbar-mobile ${mobileMenuOpen ? 'active' : ''}`} style={{
          background: 'rgba(20, 30, 40, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'background 0.3s cubic-bezier(0.4,0,0.2,1)'
        }}>
          <button className="navbar-mobile-close" onClick={toggleMobileMenu} aria-label="Close menu">
            <i className="fas fa-times"></i>
          </button>
          
          <div className="navbar-mobile-links">
            <Link to="/" onClick={toggleMobileMenu} className="enhanced-mobile-main-link"><i className="fas fa-home"></i> Home</Link>
            
            <div className="mobile-dropdown">
              <button
                className={`mobile-dropdown-toggle enhanced-mobile-main-link`}
                onClick={() => setProgramsDropdownOpen(open => !open)}
                aria-expanded={programsDropdownOpen}
                aria-controls="programs-mobile-dropdown-menu"
                type="button"
              >
                <i className="fas fa-laptop-code"></i> Programs {programsDropdownOpen ? 
                  <i className="fas fa-chevron-up"></i> : 
                  <i className="fas fa-chevron-down"></i>}
              </button>
              
              {programsDropdownOpen && (
                <div className="mobile-dropdown-menu" id="programs-mobile-dropdown-menu">
                  {programCategories.map((category, idx) => (
                    <div className="mobile-category" key={idx}>
                      <h5 className="mobile-category-title">
                        <i className={category.icon}></i> {category.title}
                      </h5>
                      {category.programs.map((program, progIdx) => (
                        <button
                          key={progIdx}
                          className="mobile-program-link enhanced-mobile-program-link"
                          onClick={() => {
                            setProgramsDropdownOpen(false);
                            setMobileMenuOpen(false);
                            setTimeout(() => navigate(program.path), 0);
                          }}
                          tabIndex={0}
                          aria-label={`Go to ${program.name} course page`}
                          role="button"
                          type="button"
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setProgramsDropdownOpen(false);
                              setMobileMenuOpen(false);
                              setTimeout(() => navigate(program.path), 0);
                            }
                          }}
                        >
                          <i className={program.icon} style={{ marginRight: 10, color: '#fff', fontSize: '1.1rem' }}></i> {program.name}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/about" onClick={toggleMobileMenu} className="enhanced-mobile-main-link"><i className="fas fa-info-circle"></i> About</Link>
            <Link to="/careers" onClick={toggleMobileMenu} className="enhanced-mobile-main-link"><i className="fas fa-briefcase"></i> Careers</Link>
            <Link to="/faq" onClick={toggleMobileMenu} className="enhanced-mobile-main-link"><i className="fas fa-question-circle"></i> FAQ</Link>
            <Link to="/internships" onClick={toggleMobileMenu} className="enhanced-mobile-main-link"><i className="fas fa-user-graduate"></i> Internships</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;