import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Program ID mapping function
const getProgramId = (title) => {
  const titleMap = {
    'Data Science & Analytics': 'data-science',
    'Artificial Intelligence': 'artificial-intelligence',
    'Web Development': 'web-development',
    'Machine Learning with Python': 'machine-learning',
    'Cyber Security': 'cyber-security',
    'Cloud Computing': 'cloud-computing',
    'DevOps': 'devops',
    'Android Development': 'android-development',
    'iOS Development': 'ios-development',
    'Internet of Things (IoT)': 'iot',
    'Embedded Systems': 'embedded-systems',
    'AutoCAD Designing': 'autocad'
  };
  
  return titleMap[title] || title.toLowerCase().replace(/\s+/g, '-');
};

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

  // Apply mobile-specific fixes
  useEffect(() => {
    // Fix for iOS Safari viewport height issues
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Fix for horizontal scrolling issues
    const preventHorizontalScroll = (e) => {
      if (e.target.classList.contains('scrolling-program-track') || 
          e.target.classList.contains('domain-filters')) {
        return; // Allow horizontal scrolling in these elements
      }
      
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };
    
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();
    
    // Disable pull-to-refresh on mobile
    document.body.style.overscrollBehavior = 'none';
    
    // Add event listeners to prevent horizontal scrolling
    window.addEventListener('wheel', preventHorizontalScroll, { passive: false });
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('wheel', preventHorizontalScroll);
      document.body.style.overscrollBehavior = '';
    };
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

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Touch interaction for program carousel
  const carouselRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Handle touch start
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
    
    // For manual scroll
    if (carouselRef.current) {
      setStartX(e.targetTouches[0].clientX);
      setScrollLeft(carouselRef.current.scrollLeft);
      setIsDragging(true);
    }
  };

  // Handle card hover
  const handleCardHover = (index) => {
    setIsPaused(true);
    setHoveredCard(index);
  };

  // Handle card hover end
  const handleCardLeave = () => {
    setIsPaused(false);
    setHoveredCard(null);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    
    // For manual scroll
    if (!isDragging || !carouselRef.current) return;
    const x = e.targetTouches[0].clientX;
    const distance = startX - x;
    carouselRef.current.scrollLeft = scrollLeft + distance;
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    // Resume animation after touch interaction
    setTimeout(() => {
      setIsPaused(false);
    }, 1500);
    
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  // All programs data organized by categories
  const programCategories = {
    featured: [
      {
        tag: 'Top Rated',
        title: 'Data Science & Analytics',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Turn data into decisions that drive success',
        description: 'Master data visualization and statistical analysis with hands-on projects that shape strategic business decisions',
        category: 'computer-science'
      },
      {
        tag: 'Bestseller',
        title: 'Artificial Intelligence',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Build intelligent solutions that transform industries',
        description: 'Blend theory with hands-on projects to create intelligent solutions that drive real-world impact and innovation',
        category: 'computer-science'
      },
      {
        tag: 'High Demand',
        title: 'Web Development',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Code the websites that shape the digital future',
        description: 'Learn everything from basics to advanced techniques, crafting engaging, user-friendly websites with real impact',
        category: 'computer-science'
      },
      {
        tag: 'New',
        title: 'Internet of Things (IoT)',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Connect devices that revolutionize everyday life',
        description: 'Discover how interconnected devices transform lives through enhanced efficiency and connectivity in applications',
        category: 'electronics'
      },
      {
        tag: 'Career Booster',
        title: 'Machine Learning with Python',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Algorithms that learn, adapt, and transform reality',
        description: 'Engage with theory and practical coding to tackle exciting projects that push technology boundaries',
        category: 'computer-science'
      },
      {
        tag: 'Industry Partner',
        title: 'Cyber Security',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Protect digital assets from evolving threats',
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
        tagline: 'Turn data into decisions that drive success',
        description: 'Master data visualization and statistical analysis with hands-on projects that shape strategic business decisions'
      },
      {
        tag: 'Bestseller',
        title: 'Artificial Intelligence',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Build intelligent solutions that transform industries',
        description: 'Blend theory with hands-on projects to create intelligent solutions that drive real-world impact and innovation'
      },
      {
        tag: 'High Demand',
        title: 'Web Development',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Code the websites that shape the digital future',
        description: 'Learn everything from basics to advanced techniques, crafting engaging, user-friendly websites with real impact'
      },
      {
        tag: 'Career Booster',
        title: 'Machine Learning with Python',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Algorithms that learn, adapt, and transform reality',
        description: 'Engage with theory and practical coding to tackle exciting projects that push technology boundaries'
      },
      {
        tag: 'Industry Partner',
        title: 'Cyber Security',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Protect digital assets from evolving threats',
        description: 'Navigate the complex world of digital security with hands-on labs and current threat analysis techniques'
      },
      {
        tag: 'Technical',
        title: 'Cloud Computing',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Harness the power of scalable cloud infrastructure',
        description: 'Build expertise in cloud platforms with practical labs on AWS, Azure, and Google Cloud for enterprise solutions'
      },
      {
        tag: 'DevOps',
        title: 'DevOps',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Bridge development and operations for seamless delivery',
        description: 'Master tools and practices for continuous integration, delivery, and deployment with emphasis on automation'
      },
      {
        tag: 'Mobile',
        title: 'Android Development',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Build Android apps that millions will use',
        description: 'Learn to develop powerful Android applications using Kotlin and Java with modern architecture patterns'
      },
      {
        tag: 'Apple',
        title: 'iOS Development',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Create elegant iOS applications with Swift',
        description: 'Design and develop iOS apps using Swift, UIKit, and the latest Apple frameworks and technologies'
      }
    ],
    'electronics': [
      {
        tag: 'New',
        title: 'Internet of Things (IoT)',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Connect devices that revolutionize everyday life',
        description: 'Discover how interconnected devices transform lives through enhanced efficiency and connectivity in applications'
      },
      {
        tag: 'Engineering',
        title: 'Embedded Systems',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Build smart systems that power modern devices',
        description: 'Develop microcontroller-based electronic systems for industrial applications with hands-on prototype building'
      }
    ],
    'civil-mechanical': [
      {
        tag: 'Design',
        title: 'AutoCAD Designing',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Draft the blueprints that engineers build from',
        description: 'Master 2D and 3D modeling, drafting, and rendering for architectural, mechanical and engineering designs'
      }
    ]
  };

  // Carousel slides data
  const slides = [
    {
      title: "Elevate Your Expertise with Expert-Led Programs",
      description: "Build industry-relevant skills with renowned educators and transform your career trajectory with specialized programs designed for tomorrow's professionals.",
      primaryButton: "Explore Programs",
      secondaryButton: "View Success Stories",
      stats: [
        { number: "12", label: "Courses" },
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
        { number: "12", label: "Programs" }
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
      imageAlt: "Flexible learning",
      className: "slide-4"
    }
  ];

  return (
    <div className="home">
      {/* Mobile Menu Toggle Button */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <h2>EdTech</h2>
          <button className="close-menu" onClick={toggleMobileMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav>
          <a href="#" onClick={toggleMobileMenu}>Home</a>
          <a href="#" onClick={toggleMobileMenu}>Programs</a>
          <a href="#" onClick={toggleMobileMenu}>About Us</a>
          <a href="#" onClick={toggleMobileMenu}>Testimonials</a>
          <a href="#" onClick={toggleMobileMenu}>Contact</a>
        </nav>
      </div>

      <section className="hero-carousel">
        <div className="carousel-container">
          <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className={`carousel-slide ${slide.className}`}>
                <div className="hero-content flex-row flex-row-to-column">
                  <div className="hero-text">
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <div className="hero-buttons button-container">
                      {(slide.primaryButton === "View Programs" || 
                        slide.secondaryButton === "View Programs" ||
                        slide.primaryButton === "Explore Programs") ? (
                        <>
                          {slide.primaryButton === "View Programs" || slide.primaryButton === "Explore Programs" ? 
                            <Link to="/courses" className="cta-button primary">{slide.primaryButton}</Link> : 
                            <button className="cta-button primary">{slide.primaryButton}</button>
                          }
                          {slide.secondaryButton === "View Programs" ? 
                            <Link to="/courses" className="cta-button secondary">{slide.secondaryButton}</Link> : 
                            <button className="cta-button secondary">{slide.secondaryButton}</button>
                          }
                        </>
                      ) : (
                        <>
                          <button className="cta-button primary">{slide.primaryButton}</button>
                          <button className="cta-button secondary">{slide.secondaryButton}</button>
                        </>
                      )}
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
                    <img 
                      src={slide.image} 
                      alt={slide.imageAlt}
                      loading="lazy"
                      width="400"
                      height="300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Previous slide">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-arrow next" onClick={nextSlide} aria-label="Next slide">
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button 
                key={index} 
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      <section className="browse-programs animate-on-scroll section-spacing">
        <div className="background-graphics">
          <div className="graphic-circle circle-1"></div>
          <div className="graphic-circle circle-2"></div>
          <div className="graphic-circle circle-3"></div>
          <div className="graphic-dots"></div>
        </div>
        <div className="responsive-container">
          <h2>Featured Programs</h2>
        </div>
        
        <div className="scrolling-program-carousel">
          <div 
            className="scrolling-program-track" 
            style={{ 
              animationPlayState: isPaused ? 'paused' : 'running' 
            }}
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* First set of programs - combine all programs into one array */}
            {Object.values(programCategories).flat().map((program, index) => (
              <div 
                className={`featured-program-card ${hoveredCard === `original-${index}` ? 'highlighted' : ''}`} 
                key={`original-${index}`}
                onMouseEnter={() => handleCardHover(`original-${index}`)}
                onMouseLeave={handleCardLeave}
              >
                <div className="program-logo"><span>{program.tag || 'Featured'}</span></div>
                <h3>{program.title}</h3>
                <div className="program-meta">
                  <span><i className="fas fa-clock"></i> {program.duration}</span>
                  <span><i className="fas fa-laptop-house"></i> {program.format}</span>
                  <span className="program-category">
                    <i className="fas fa-folder"></i> {program.category ? program.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'General'}
                  </span>
                </div>
                <p>{program.tagline}</p>
                <Link 
                  to={`/programs/${getProgramId(program.title)}`} 
                  className="program-button full-width-mobile"
                >
                  View Program
                </Link>
              </div>
            ))}
            {/* Duplicate set for continuous scrolling */}
            {Object.values(programCategories).flat().map((program, index) => (
              <div 
                className={`featured-program-card ${hoveredCard === `duplicate-${index}` ? 'highlighted' : ''}`}
                key={`duplicate-${index}`}
                onMouseEnter={() => handleCardHover(`duplicate-${index}`)}
                onMouseLeave={handleCardLeave}
              >
                <div className="program-logo"><span>{program.tag || 'Featured'}</span></div>
                <h3>{program.title}</h3>
                <div className="program-meta">
                  <span><i className="fas fa-clock"></i> {program.duration}</span>
                  <span><i className="fas fa-laptop-house"></i> {program.format}</span>
                  <span className="program-category">
                    <i className="fas fa-folder"></i> {program.category ? program.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'General'}
                  </span>
                </div>
                <p>{program.tagline}</p>
                <Link 
                  to={`/programs/${getProgramId(program.title)}`} 
                  className="program-button full-width-mobile"
                >
                  View Program
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="university-partners animate-on-scroll section-spacing">
        <div className="responsive-container">
          <h2>Learn from Industry Experts at Leading Technology Companies</h2>
          <p className="text-center-mobile">Our programs are led by experienced mentors from top technology and business companies</p>
          <div className="partner-logos">
            {/* First row - 7 logos */}
            <div className="company-logo">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png" 
                alt="Accenture"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://1000logos.net/wp-content/uploads/2021/09/Cognizant-Logo.jpg" 
                alt="Cognizant"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png" 
                alt="Infosys"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://marvel-b1-cdn.bc0a.com/f00000000004333/www.zuora.com/wp-content/uploads/2024/03/tcs-p-c.png" 
                alt="TCS"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://www.netapp.com/media/TASK49193-PartnerConnect-HCLTech-1024x512_tcm19-79546.jpg" 
                alt="HCL Technologies"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://wiproconsumercare.com/wp-content/uploads/2020/09/Wipro-Logo-01-small.png" 
                alt="Wipro"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
                alt="Microsoft"
                loading="lazy"
              />
            </div>
            
            {/* Second row - 7 logos */}
            <div className="company-logo">
              <img 
                src="https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo.png" 
                alt="Oracle"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" 
                alt="PhonePe"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmde8-MsxZCjyRY_ZEa9X0bAgCSViAmjLFuQ&s" 
                alt="Ola"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://logowik.com/content/uploads/images/epam-enterprise-software7038.logowik.com.webp" 
                alt="EPAM"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://1000logos.net/wp-content/uploads/2016/10/Bank-of-America-Logo.png" 
                alt="Bank of America"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://www.1011vc.com/wp-content/uploads/Cyware-Logo-Square-@2x.jpg" 
                alt="Cyware Labs"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://www.mygreatlearning.com/blog/wp-content/uploads/2022/03/Great_Learning_Logo.jpg" 
                alt="Great Learning"
                loading="lazy"
              />
            </div>
            
            {/* Third row - 5 logos (centered) */}
            <div className="company-logo">
              <img 
                src="https://introbot.co/images/ExtendedLogoLightTheme.png" 
                alt="IntroBot"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://download.logo.wine/logo/Barclays/Barclays-Logo.wine.png" 
                alt="Barclays"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://pacdc.org/2017/wp-content/uploads/2022/03/JP-Morgan-Chase-Logo.png" 
                alt="JP Morgan Chase"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/KPMG_logo.svg/1200px-KPMG_logo.svg.png" 
                alt="KPMG"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAI5b0dd2gKoQBBt9dkWH42lhrKJPRW0VsUQ&s" 
                alt="Deloitte"
                loading="lazy"
              />
            </div>
            <div className="company-logo">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/PricewaterhouseCoopers_Logo.svg" 
                alt="PwC"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="features animate-on-scroll section-spacing">
        <div className="responsive-container">
          <h2>Why Choose Our Programs?</h2>
          <p className="features-intro">Our industry-aligned learning approach is designed to maximize your success with a perfect balance of theory and practical application</p>
          <div className="features-grid grid-container">
            <div className="feature-card">
              <h3><i className="fas fa-chalkboard-teacher"></i> World-Class Instructors</h3>
              <p>Learn directly from industry veterans and academic experts with decades of experience who bring real-world insights to every lecture and workshop.</p>
            </div>
            <div className="feature-card">
              <h3><i className="fas fa-users"></i> Dedicated Mentorship</h3>
              <p>Receive personalized guidance from experienced professionals who provide targeted feedback on your progress and help navigate industry challenges.</p>
            </div>
            <div className="feature-card">
              <h3><i className="fas fa-laptop-code"></i> Industry-Relevant Projects</h3>
              <p>Build an impressive portfolio with challenging projects based on real business cases that showcase your skills to potential employers.</p>
            </div>
            <div className="feature-card">
              <h3><i className="fas fa-calendar-alt"></i> Flexible Learning Schedule</h3>
              <p>Balance your career and education with our weekend and evening programs designed specifically for working professionals and busy students.</p>
            </div>
            <div className="feature-card">
              <h3><i className="fas fa-briefcase"></i> Career Acceleration</h3>
              <p>Access exclusive job opportunities, resume enhancement workshops, interview preparation, and personalized career coaching from industry insiders.</p>
            </div>
            <div className="feature-card">
              <h3><i className="fas fa-globe-americas"></i> Vibrant Community</h3>
              <p>Connect with a diverse network of ambitious professionals, participate in live events, and build relationships that extend well beyond graduation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-plans animate-on-scroll section-spacing">
        <div className="responsive-container">
          <h2>Choose your pricing plan</h2>
          <p className="pricing-intro">Select the perfect learning path that fits your goals and budget with our flexible pricing options</p>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>🎓 Advanced Program</h3>
              <div className="price">
                <span className="original-price">₹12,999</span>
                <span className="current-price">₹8,999</span>
              </div>
              <div className="duration">Valid for 8 weeks</div>
              <button className="pricing-button">Select</button>
              <ul className="plan-features">
                <li>
                  <span className="feature-text">💡 Real-Time Projects (Industry Capstone Projects)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🕒 Live Sessions (Extended sessions + Guest Experts)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">❓ One-on-One Doubt Sessions (Priority access)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏆 Certifications (Co-branded with industry partners)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏅 Mentor Support (Dedicated mentor)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🚀 Placement Guidance (Exclusive referrals + 1:1 coaching)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🤝 Interview Assistance (Mock interviews with HR)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
              </ul>
            </div>
            
            <div className="pricing-card">
              <div className="plan-tag">Best Value</div>
              <h3>👨‍🏫 Mentor-Led Plan</h3>
              <div className="price">
                <span className="original-price">₹7,499</span>
                <span className="current-price">₹4,999</span>
              </div>
              <div className="duration">Valid for 8 weeks</div>
              <button className="pricing-button">Select</button>
              <ul className="plan-features">
                <li>
                  <span className="feature-text">💡 Real-Time Projects (Guided with mentor feedback)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🕒 Live Sessions - 24hrs+</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">❓ One-on-One Doubt Sessions</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏆 Certifications (Industry Certified)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏅 Mentor Support</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🚀 Placement Guidance (Resume & Mock Interviews)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🤝 Interview Assistance</span>
                  <span className="feature-status excluded"><i className="fas fa-times"></i></span>
                </li>
              </ul>
            </div>
            
            <div className="pricing-card">
              <h3>⏱️ Self-Paced Plan</h3>
              <div className="price">
                <span className="original-price">₹4,999</span>
                <span className="current-price">₹3,499</span>
              </div>
              <div className="duration">Valid for 8 weeks</div>
              <button className="pricing-button">Select</button>
              <ul className="plan-features">
                <li>
                  <span className="feature-text">💡 Real-Time Projects (Basic level)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🕒 Live Sessions - 16hrs+</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">❓ One-on-One Doubt Sessions</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏆 Certifications (Mentor Certified)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏅 Mentor Support</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🚀 Placement Guidance</span>
                  <span className="feature-status excluded"><i className="fas fa-times"></i></span>
                </li>
                <li>
                  <span className="feature-text">🤝 Interview Assistance</span>
                  <span className="feature-status excluded"><i className="fas fa-times"></i></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="success-stories animate-on-scroll section-spacing">
        <div className="responsive-container">
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
                  <span className="student-role">DevOps Engineer</span>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-image">
                <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="Student portrait" />
              </div>
              <div className="story-content">
                <h3><i className="fas fa-quote-left"></i> Accelerated my career transition</h3>
                <p>After years in a different field, the program helped me transition to tech. The hands-on projects gave me a portfolio that impressed recruiters.</p>
                <div className="student-info">
                  <span className="student-name">James Wilson</span>
                  <span className="student-role">iOS Developer</span>
                </div>
              </div>
            </div>
          </div>
          <button className="view-all-button">View All Success Stories</button>
        </div>
      </section>
      
      <section className="join-community">
        <div className="responsive-container">
          <div className="join-content">
            <h2>Start Your Learning Journey Today</h2>
            <p>Take the first step toward transforming your career with expert-led education</p>
            <form className="join-form">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="cta-button primary"><i className="fas fa-paper-plane"></i> Get Program Guide</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 