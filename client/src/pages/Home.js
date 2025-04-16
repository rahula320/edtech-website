import React, { useEffect, useState, useCallback } from 'react';
import './Home.css';

function Home() {
  // Add scroll reveal effect
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  // Custom carousel state and logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;
  
  const nextSlide = useCallback(() => {
    setCurrentSlide(current => (current === totalSlides - 1 ? 0 : current + 1));
  }, [totalSlides]);
  
  const prevSlide = useCallback(() => {
    setCurrentSlide(current => (current === 0 ? totalSlides - 1 : current - 1));
  }, [totalSlides]);
  
  const goToSlide = useCallback((slideIndex) => {
    setCurrentSlide(slideIndex);
  }, []);
  
  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  // State for active category filter
  const [activeCategory, setActiveCategory] = useState('featured');

  // All programs data organized by categories
  const programCategories = {
    featured: [
      {
        tag: 'Top Rated',
        title: 'Data Science & Analytics',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Master data visualization and statistical analysis with hands-on projects that shape strategic business decisions',
        category: 'computer-science'
      },
      {
        tag: 'Bestseller',
        title: 'Artificial Intelligence',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Blend theory with hands-on projects to create intelligent solutions that drive real-world impact and innovation',
        category: 'computer-science'
      },
      {
        tag: 'High Demand',
        title: 'Web Development',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Learn everything from basics to advanced techniques, crafting engaging, user-friendly websites with real impact',
        category: 'computer-science'
      },
      {
        tag: 'New',
        title: 'Internet of Things (IoT)',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Discover how interconnected devices transform lives through enhanced efficiency and connectivity in applications',
        category: 'electronics'
      },
      {
        tag: 'Career Booster',
        title: 'Machine Learning with Python',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Engage with theory and practical coding to tackle exciting projects that push technology boundaries',
        category: 'computer-science'
      },
      {
        tag: 'Industry Partner',
        title: 'Cyber Security',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Navigate the complex world of digital security with hands-on labs and current threat analysis techniques',
        category: 'computer-science'
      }
    ],
    'computer-science': [
      {
        tag: 'Top Rated',
        title: 'Data Science & Analytics',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Master data visualization and statistical analysis with hands-on projects that shape strategic business decisions'
      },
      {
        tag: 'Bestseller',
        title: 'Artificial Intelligence',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Blend theory with hands-on projects to create intelligent solutions that drive real-world impact and innovation'
      },
      {
        tag: 'High Demand',
        title: 'Web Development',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Learn everything from basics to advanced techniques, crafting engaging, user-friendly websites with real impact'
      },
      {
        tag: 'Career Booster',
        title: 'Machine Learning with Python',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Engage with theory and practical coding to tackle exciting projects that push technology boundaries'
      },
      {
        tag: 'Industry Partner',
        title: 'Cyber Security',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Navigate the complex world of digital security with hands-on labs and current threat analysis techniques'
      },
      {
        tag: 'Technical',
        title: 'Cloud Computing',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Build expertise in cloud platforms with practical labs on AWS, Azure, and Google Cloud for enterprise solutions'
      }
    ],
    'electronics': [
      {
        tag: 'New',
        title: 'Internet of Things (IoT)',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Discover how interconnected devices transform lives through enhanced efficiency and connectivity in applications'
      },
      {
        tag: 'Engineering',
        title: 'Embedded Systems',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Develop microcontroller-based electronic systems for industrial applications with hands-on prototype building'
      },
      {
        tag: 'Practical',
        title: 'PCB Design',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Create professional circuit board layouts using industry-standard tools and manufacturing techniques'
      },
      {
        tag: 'Advanced',
        title: 'VLSI Design',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Master integrated circuit design with emphasis on optimization, verification and implementation'
      }
    ],
    'mechanical': [
      {
        tag: 'Design',
        title: 'AutoCAD Designing',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Master 2D and 3D modeling, drafting, and rendering for architectural, mechanical and engineering designs'
      },
      {
        tag: 'Specialized',
        title: 'Mechanical CAD',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Learn parametric design, assembly modeling, and simulation for mechanical components and systems'
      },
      {
        tag: 'Industry',
        title: 'Industrial Automation',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Implement programmable logic controllers, robotics, and intelligent systems for manufacturing processes'
      }
    ],
    'civil': [
      {
        tag: 'Industry',
        title: 'Construction Planning',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Learn project scheduling, resource allocation, cost estimation and quality control for construction projects'
      },
      {
        tag: 'Essential',
        title: 'Structural Design',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Master analysis and design of reinforced concrete, steel, and composite structures with code compliance'
      },
      {
        tag: 'Technical',
        title: 'Environmental Engineering',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Develop solutions for water treatment, air pollution control, and sustainable infrastructure development'
      }
    ],
    'management': [
      {
        tag: 'Business',
        title: 'International Business Management',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Gain insights into global commerce, cross-cultural management, and international trade regulations'
      },
      {
        tag: 'Finance',
        title: 'Stock Market & Cryptocurrency',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Master trading strategies, technical analysis and risk management for stocks, forex and digital assets'
      },
      {
        tag: 'Leadership',
        title: 'Project Management',
        duration: '8 weeks',
        format: 'Online Weekends',
        description: 'Learn methodologies, tools and best practices for successfully leading teams and delivering complex projects'
      }
    ]
  };

  // Get programs to display based on active category
  const displayPrograms = programCategories[activeCategory] || [];

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Carousel slides data
  const slides = [
    {
      title: "Elevate Your Expertise with Expert-Led Programs",
      description: "Build industry-relevant skills with renowned educators and transform your career trajectory with specialized programs designed for tomorrow's professionals.",
      primaryButton: "Explore Programs",
      secondaryButton: "View Success Stories",
      stats: [
        { number: "9M+", label: "Students" },
        { number: "96%", label: "Satisfaction" },
        { number: "91%", label: "Completion" }
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
      imageAlt: "Students learning",
      className: "slide-1"
    },
    {
      title: "Learn from Industry Experts & Top Educators",
      description: "Gain insights from professionals with real-world experience who understand the practical applications of theoretical knowledge in today's competitive market.",
      primaryButton: "Meet Our Mentors",
      secondaryButton: "View Programs",
      stats: [
        { number: "200+", label: "Expert Mentors" },
        { number: "15+", label: "Years Experience" },
        { number: "24/7", label: "Support" }
      ],
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      imageAlt: "Expert mentors",
      className: "slide-2"
    },
    {
      title: "Practical Learning with Real-World Projects",
      description: "Build an impressive portfolio through hands-on projects that demonstrate your skills to potential employers and solve actual industry challenges.",
      primaryButton: "View Project Gallery",
      secondaryButton: "Student Showcases",
      stats: [
        { number: "500+", label: "Projects" },
        { number: "85%", label: "Placement" },
        { number: "40+", label: "Partners" }
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      imageAlt: "Project work",
      className: "slide-3"
    },
    {
      title: "Flexible Learning Designed for Busy Professionals",
      description: "Balance your career and education with our flexible weekend and evening programs that adapt to your schedule without compromising on quality or results.",
      primaryButton: "Explore Schedules",
      secondaryButton: "Start Learning",
      stats: [
        { number: "24/7", label: "Access" },
        { number: "4.8/5", label: "Rating" },
        { number: "30+", label: "Programs" }
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
      imageAlt: "Flexible learning",
      className: "slide-4"
    }
  ];

  return (
    <div className="home">
      <section className="hero-carousel">
        <div className="carousel-container">
          <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className={`carousel-slide ${slide.className}`}>
                <div className="hero-content">
                  <div className="hero-text">
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <div className="hero-buttons">
                      <button className="cta-button primary">{slide.primaryButton}</button>
                      <button className="cta-button secondary">{slide.secondaryButton}</button>
                    </div>
                    <div className="hero-stats">
                      {slide.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="stat">
                          <span className="stat-number">{stat.number}</span>
                          <span className="stat-label">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hero-image">
                    <img src={slide.image} alt={slide.imageAlt} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-arrow prev" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-arrow next" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button 
                key={index} 
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      <section className="browse-programs animate-on-scroll">
        <h2>Browse by Domain</h2>
        <div className="domain-filters">
          <button 
            className={`domain-filter ${activeCategory === 'featured' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('featured')}
          >
            <i className="fas fa-star"></i> Featured Programs
          </button>
          <button 
            className={`domain-filter ${activeCategory === 'computer-science' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('computer-science')}
          >
            <i className="fas fa-laptop-code"></i> Computer Science
          </button>
          <button 
            className={`domain-filter ${activeCategory === 'electronics' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('electronics')}
          >
            <i className="fas fa-microchip"></i> Electronics
          </button>
          <button 
            className={`domain-filter ${activeCategory === 'mechanical' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('mechanical')}
          >
            <i className="fas fa-cogs"></i> Mechanical
          </button>
          <button 
            className={`domain-filter ${activeCategory === 'civil' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('civil')}
          >
            <i className="fas fa-hard-hat"></i> Civil
          </button>
          <button 
            className={`domain-filter ${activeCategory === 'management' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('management')}
          >
            <i className="fas fa-briefcase"></i> Management
          </button>
        </div>

        <div className="domain-category-title">
          {activeCategory === 'featured' ? (
            <h3>Featured Programs</h3>
          ) : (
            <h3>
              {activeCategory === 'computer-science' && 'Computer Science Programs'}
              {activeCategory === 'electronics' && 'Electronics Programs'}
              {activeCategory === 'mechanical' && 'Mechanical Engineering Programs'}
              {activeCategory === 'civil' && 'Civil Engineering Programs'}
              {activeCategory === 'management' && 'Management Programs'}
            </h3>
          )}
        </div>
        
        <div className="program-cards">
          {displayPrograms.slice(0, 3).map((program, index) => (
            <div className="program-card" key={index}>
              <div className="program-logo"><span>{program.tag}</span></div>
              <h3>{program.title}</h3>
              <div className="program-meta">
                <span><i className="fas fa-clock"></i> {program.duration}</span>
                <span><i className="fas fa-laptop-house"></i> {program.format}</span>
              </div>
              <p>{program.description}</p>
              <button className="program-button">View Program</button>
            </div>
          ))}
        </div>

        {displayPrograms.length > 3 && (
          <div className="program-cards" style={{ marginTop: '2rem' }}>
            {displayPrograms.slice(3, 6).map((program, index) => (
              <div className="program-card" key={index + 3}>
                <div className="program-logo"><span>{program.tag}</span></div>
                <h3>{program.title}</h3>
                <div className="program-meta">
                  <span><i className="fas fa-clock"></i> {program.duration}</span>
                  <span><i className="fas fa-laptop-house"></i> {program.format}</span>
                </div>
                <p>{program.description}</p>
                <button className="program-button">View Program</button>
              </div>
            ))}
          </div>
        )}
        
        <button className="view-all-button">View All Programs</button>
      </section>

      <section className="university-partners animate-on-scroll">
        <h2>Learn from Top-Tier Institutions</h2>
        <p>Our programs are developed in collaboration with world-renowned universities and tech leaders</p>
        <div className="partner-logos">
          <div className="university-logo">Stanford</div>
          <div className="university-logo">MIT</div>
          <div className="university-logo">Northwestern</div>
          <div className="university-logo">Berkeley</div>
          <div className="university-logo">Columbia</div>
          <div className="university-logo">Oxford</div>
        </div>
      </section>
      
      <section className="features animate-on-scroll">
        <h2>Why Choose Our Programs?</h2>
        <p className="features-intro">Our learning approach combines multiple formats designed to keep you engaged and ensure your success</p>
        <div className="features-grid">
          <div className="feature-card">
            <h3><i className="fas fa-chalkboard-teacher"></i> World-Class Instructors</h3>
            <p>Learn from distinguished professors and industry leaders with proven expertise in their fields.</p>
          </div>
          <div className="feature-card">
            <h3><i className="fas fa-users"></i> Industry Mentors</h3>
            <p>Get guidance from professionals currently working in your desired field with personalized feedback.</p>
          </div>
          <div className="feature-card">
            <h3><i className="fas fa-laptop-code"></i> Hands-on Projects</h3>
            <p>Build a professional portfolio with projects that demonstrate your practical skills to employers.</p>
          </div>
          <div className="feature-card">
            <h3><i className="fas fa-calendar-alt"></i> Flexible Learning</h3>
            <p>Balance your professional and personal life with programs designed for working professionals.</p>
          </div>
          <div className="feature-card">
            <h3><i className="fas fa-briefcase"></i> Career Support</h3>
            <p>Access resume reviews, interview preparation, and exclusive job opportunities with partner companies.</p>
          </div>
          <div className="feature-card">
            <h3><i className="fas fa-globe-americas"></i> Global Community</h3>
            <p>Join a network of ambitious professionals and build connections that last beyond the program.</p>
          </div>
        </div>
      </section>

      <section className="pricing-plans animate-on-scroll">
        <h2>Choose your pricing plan</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="plan-tag">Best Value</div>
            <h3>🚀 Advanced Program</h3>
            <div className="price">
              <span className="original-price">₹8,999</span>
              <span className="current-price">₹8,999</span>
            </div>
            <div className="duration">Valid for 8 weeks</div>
            <button className="pricing-button">Select</button>
            <ul className="plan-features">
              <li>
                <span className="feature-text">🎥 Recorded Lectures (Core + Bonus Advanced Modules)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">💡 Real-Time Projects (Industry Capstone Projects)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">🕒 Live Sessions (Extended sessions + Guest Experts)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">❓ One-on-One Doubt Sessions (Priority access)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">📜 Certifications (Co-branded with industry partners)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">👨‍💼 Mentor Support (Dedicated mentor)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">🎯 Placement Guidance (Exclusive referrals + 1:1 coaching)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">🧪 Interview Assistance (Mock interviews with HR)</span>
                <span className="feature-check">✅</span>
              </li>
            </ul>
          </div>
          
          <div className="pricing-card">
            <h3>👨‍🏫 Mentor-Led Plan</h3>
            <div className="price">
              <span className="original-price">₹4,999</span>
              <span className="current-price">₹4,999</span>
            </div>
            <div className="duration">Valid for 8 weeks</div>
            <button className="pricing-button">Select</button>
            <ul className="plan-features">
              <li>
                <span className="feature-text">🎥 Recorded Lectures</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">💡 Real-Time Projects (Guided with mentor feedback)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">🕒 Live Sessions - 24hrs+</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">❓ One-on-One Doubt Sessions</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">📜 Certifications (Industry Certified)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">👨‍💼 Mentor Support</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">🎯 Placement Guidance (Resume & Mock Interviews)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">🧪 Interview Assistance</span>
                <span className="feature-check">❌</span>
              </li>
            </ul>
          </div>
          
          <div className="pricing-card">
            <h3>🧭 Self-Paced Plan</h3>
            <div className="price">
              <span className="original-price">₹3,499</span>
              <span className="current-price">₹3,499</span>
            </div>
            <div className="duration">Valid for 8 weeks</div>
            <button className="pricing-button">Select</button>
            <ul className="plan-features">
              <li>
                <span className="feature-text">🎥 Recorded Lectures</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">💡 Real-Time Projects (Basic level)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">🕒 Live Sessions - 16hrs+</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">❓ One-on-One Doubt Sessions</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">📜 Certifications (Mentor Certified)</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">👨‍💼 Mentor Support</span>
                <span className="feature-check">✅</span>
              </li>
              <li>
                <span className="feature-text">🎯 Placement Guidance</span>
                <span className="feature-check">❌</span>
              </li>
              <li>
                <span className="feature-text">🧪 Interview Assistance</span>
                <span className="feature-check">❌</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="success-stories animate-on-scroll">
        <h2>Student Transformations</h2>
        <p className="stories-intro">Real stories from professionals who accelerated their careers with our programs</p>
        <div className="story-cards">
          <div className="story-card">
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="Student portrait" />
            </div>
            <div className="story-content">
              <h3><i className="fas fa-quote-left"></i> The perfect bridge between theory and application</h3>
              <p>The program gave me practical skills I could immediately apply at work. The mentorship was invaluable in helping me transition to a senior role.</p>
              <div className="student-info">
                <span className="student-name">Alexandra Chen</span>
                <span className="student-role">Data Science Lead</span>
              </div>
            </div>
          </div>
          <div className="story-card">
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="Student portrait" />
            </div>
            <div className="story-content">
              <h3><i className="fas fa-quote-left"></i> Changed my perspective on problem-solving</h3>
              <p>Going beyond just coding, the program taught me how to approach problems systematically. The network I built has opened doors I never thought possible.</p>
              <div className="student-info">
                <span className="student-name">Michael Roberts</span>
                <span className="student-role">AI Engineer</span>
              </div>
            </div>
          </div>
        </div>
        <button className="view-all-button">View All Success Stories</button>
      </section>
      
      <section className="join-community">
        <div className="join-content">
          <h2>Start Your Learning Journey Today</h2>
          <p>Take the first step toward transforming your career with expert-led education</p>
          <form className="join-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="cta-button primary"><i className="fas fa-paper-plane"></i> Get Program Guide</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home; 