import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Programs.css';
import { allPrograms } from '../data/programsData';
import OfferAd from '../components/OfferAd';

// Make sure we have properly formatted objects in the array
const formattedPrograms = Object.entries(allPrograms).map(([key, program]) => {
  // Determine the category based on program title
  let category = "Computer Science"; // Default category
  
  if (/embedded|iot|electronics|microcontroller|circuit/i.test(program.title)) {
    category = "Electronics";
  } else if (/civil|mechanical|autocad|design|drafting|structure/i.test(program.title)) {
    category = "Civil/Mechanical";
  }
  
  return {
    id: key,
    title: program.title || "Program",
    category: category,
    description: program.description || "No description available",
    duration: program.duration || "Varies",
    level: program.level || "All levels",
    format: program.format || "Online",
    image: program.heroImage || "https://via.placeholder.com/300",
    slug: program.id || key
  };
});

// Create a grouped structure of programs by category
const programsByCategory = formattedPrograms.reduce((acc, program) => {
  const category = program.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(program);
  return acc;
}, {});

// Add any missing categories with empty arrays
const navCategories = ["Computer Science", "Electronics", "Civil/Mechanical"];
navCategories.forEach(category => {
  if (!programsByCategory[category]) {
    programsByCategory[category] = [];
  }
});

// Get unique categories (using the nav categories order)
const categories = navCategories.filter(category => programsByCategory[category].length > 0);

const Programs = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePrograms, setVisiblePrograms] = useState(formattedPrograms);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const filtered = formattedPrograms.filter(program => 
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setVisiblePrograms(filtered);
    } else {
      setIsSearching(false);
      if (activeCategory === 'all') {
        setVisiblePrograms(formattedPrograms);
      } else {
        setVisiblePrograms(programsByCategory[activeCategory] || []);
      }
    }
  }, [searchTerm, activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the useEffect
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchTerm('');
  };

  return (
    <div className="programs-page">
      {/* Floating Offer Strip */}
      <div className="floating-offer-badge">
        <OfferAd className="strip" scrollToPricing={false} />
      </div>

      {/* Main Programs Section */}
      <section className="programs-main">
        <div className="container">
          <div className="section-header">
            <h2>Browse Our Programs</h2>
            <p>Explore our diverse range of programs across different tech domains.</p>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="enhanced-search-container">
            <form onSubmit={handleSearch} className="enhanced-search-form">
              <div className="search-icon">
                <i className="fas fa-search"></i>
              </div>
              <input 
                type="text" 
                placeholder="Search for programs by name or keywords..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="enhanced-search-input"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  className="clear-search-button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
              <button type="submit" className="enhanced-search-button">
                Search
              </button>
            </form>
            {isSearching && visiblePrograms.length > 0 && (
              <div className="search-results-info">
                Found {visiblePrograms.length} program{visiblePrograms.length !== 1 ? 's' : ''} matching "{searchTerm}"
              </div>
            )}
          </div>

          {/* Category Tabs */}
          <div className="category-tabs">
            <button 
              className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              <i className="fas fa-th-large"></i> All Programs
            </button>
            {categories.map((category, index) => {
              // Determine icon based on category
              let icon = "fas fa-laptop-code"; // Default for Computer Science
              if (category === "Electronics") {
                icon = "fas fa-microchip";
              } else if (category === "Civil/Mechanical") {
                icon = "fas fa-drafting-compass";
              }
              
              return (
                <button
                  key={index}
                  className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <i className={icon}></i> {category}
                </button>
              );
            })}
          </div>

          {/* Programs Grid */}
          <div className="programs-grid">
            {visiblePrograms.length > 0 ? (
              visiblePrograms.map((program, index) => (
                <div key={index} className="program-card">
                  <div className="program-image">
                    <img src={program.image} alt={program.title} loading="lazy" />
                    <div className="program-tag">{program.category}</div>
                  </div>
                  <div className="program-content">
                    <h3>{program.title}</h3>
                    <div className="program-description">
                      {program.description}
                    </div>
                    <Link to={`/programs/${program.slug}`} className="program-cta">
                      Explore Program <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No programs found</h3>
                <p>Try adjusting your search criteria or browse all programs.</p>
                <button 
                  className="reset-search-button"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                >
                  <i className="fas fa-sync-alt"></i> Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Programs</h2>
            <p>We offer a unique educational experience that sets our students up for success.</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3>Industry-Led Curriculum</h3>
              <p>Our programs are designed with input from industry leaders to ensure you learn relevant skills that employers are looking for.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Expert Instructors</h3>
              <p>Learn from experienced professionals who bring real-world expertise and practical insights to every class.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3>Hands-On Projects</h3>
              <p>Build a portfolio of real projects that demonstrate your skills and make you stand out to employers.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Career Support</h3>
              <p>Get access to career coaching, resume reviews, interview preparation, and networking opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Successful Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Professional Programs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Industry Experts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">92%</div>
              <div className="stat-label">Employment Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>Join thousands of students who have already taken the step toward a brighter future.</p>
            <Link to="/register" className="cta-button">
              Get Started Today <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs; 