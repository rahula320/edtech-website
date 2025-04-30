import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ContactService from '../utils/contactService';

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
    'AutoCAD Designing': 'autocad',
    'UI/UX Design & Development': 'ui-ux-design'
  };
  
  return titleMap[title] || title.toLowerCase().replace(/\s+/g, '-');
};

function Home() {
  // Add window size tracking state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;
  
  // Contact form state
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    domain: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' });
  
  // Program domains for dropdown - actual programs offered
  const programDomains = [
    "Data Science & Analytics",
    "Artificial Intelligence",
    "Machine Learning with Python",
    "Cloud Computing",
    "Web Development",
    "UI/UX Design & Development",
    "Embedded Systems",
    "Internet of Things (IoT)",
    "AutoCAD",
    "Cyber Security",
    "DevOps",
    "Android Development",
    "iOS Development"
  ];
  
  const handleContactFormChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ type: 'loading', message: 'Sending message...' });

    // Check for network connectivity first
    if (!navigator.onLine) {
      setContactStatus({ 
        type: 'error', 
        message: 'You appear to be offline. Please check your internet connection and try again.' 
      });
      return;
    }

    try {
      console.log('Submitting contact form data:', contactFormData);
      const response = await ContactService.submitContactForm(contactFormData);
      console.log('Contact form submission response:', response);

      if (response.success) {
        setContactStatus({ type: 'success', message: 'Message sent successfully!' });
        setContactFormData({ name: '', email: '', phone: '', college: '', domain: '', message: '' });
      } else {
        setContactStatus({ 
          type: 'error', 
          message: response.message || 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Determine if it's a network error
      const isNetworkError = error.message && (
        error.message.includes('Network Error') || 
        error.message.includes('timeout') ||
        error.message.includes('abort')
      );
      
      if (isNetworkError) {
        setContactStatus({ 
          type: 'error', 
          message: 'Network error. Please check your connection and try again.'
        });
      } else {
        setContactStatus({ 
          type: 'error', 
          message: 'Failed to send message. Please try again later.'
        });
      }
    }
  };
  
  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  const totalSlides = 5;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(current => (current === totalSlides - 1 ? 0 : current + 1));
    setTimeout(() => setIsTransitioning(false), 500); // Match this with transition duration
  }, [isTransitioning, totalSlides]);
  
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(current => (current === 0 ? totalSlides - 1 : current - 1));
    setTimeout(() => setIsTransitioning(false), 500); // Match this with transition duration
  }, [isTransitioning, totalSlides]);
  
  const goToSlide = useCallback((slideIndex) => {
    if (isTransitioning || slideIndex === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(slideIndex);
    setTimeout(() => setIsTransitioning(false), 500); // Match this with transition duration
  }, [currentSlide, isTransitioning]);
  
  // Autoplay effect with pause on interaction
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Touch interaction for carousel
  const carouselRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50; // Minimum distance for a swipe
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        nextSlide(); // Swipe left -> next slide
      } else {
        prevSlide(); // Swipe right -> previous slide
      }
    }
    
    // Resume autoplay after interaction
    setTimeout(() => {
      setIsPaused(false);
    }, 2000);
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);
  
  // Handle pause on hover
  const handleCarouselHover = () => {
    setIsPaused(true);
  };
  
  const handleCarouselLeave = () => {
    setIsPaused(false);
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
      },
      {
        tag: 'New',
        title: 'UI/UX Design & Development',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Create beautiful, intuitive digital experiences',
        description: 'Master user interface design and user experience principles to create intuitive, engaging, and impactful digital products',
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
        tag: 'New',
        title: 'UI/UX Design & Development',
        duration: '8 weeks',
        format: 'Online Weekends',
        tagline: 'Create beautiful, intuitive digital experiences',
        description: 'Master user interface design and user experience principles to create intuitive, engaging, and impactful digital products'
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
      title: "Learn the Skills What Industry Demands",
      description: "Master cutting-edge technologies and practical skills that employers are actively seeking in today's competitive job market.",
      primaryButton: "Explore Programs",
      secondaryButton: "View Success Stories",
      stats: [
        { number: "95%", label: "Job Relevant" },
        { number: "50+", label: "Industry Skills" },
        { number: "100%", label: "Career Focused" }
      ],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      imageAlt: "Industry demanded skills",
      className: "slide-5"
    },
    {
      title: "Direct Industry Mentors",
      description: "Learn directly from industry experts who bring real-world experience and insights to your learning journey.",
      primaryButton: "Explore Programs",
      secondaryButton: "View Success Stories",
      stats: [
        { number: "25+", label: "Industry Mentors" },
        { number: "10", label: "Years Experience" },
        { number: "1:1", label: "Mentorship" }
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
      imageAlt: "Industry mentors",
      className: "slide-1"
    },
    {
      title: "Industrial Experience",
      description: "Gain practical experience through real-world projects and industry-relevant case studies.",
      primaryButton: "View Projects",
      secondaryButton: "Learn More",
      stats: [
        { number: "100+", label: "Real Projects" },
        { number: "20", label: "Case Studies" },
        { number: "10", label: "Industries" }
      ],
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      imageAlt: "Industrial experience",
      className: "slide-2"
    },
    {
      title: "Hands-on Projects",
      description: "Build your portfolio with practical projects that demonstrate your skills to potential employers.",
      primaryButton: "View Project Gallery",
      secondaryButton: "Student Showcases",
      stats: [
        { number: "200+", label: "Projects" },
        { number: "15", label: "Tech Stacks" },
        { number: "50", label: "Live Projects" }
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      imageAlt: "Hands-on projects",
      className: "slide-3"
    },
    {
      title: "Placement Ready Skills",
      description: "Master in-demand skills and technologies that employers are actively seeking in the industry.",
      primaryButton: "View Skills",
      secondaryButton: "Career Paths",
      stats: [
        { number: "10", label: "Core Skills" },
        { number: "5", label: "Industry Tools" },
        { number: "3", label: "Certifications" }
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
      imageAlt: "Placement ready skills",
      className: "slide-4"
    }
  ];

  const handleEnrollNow = (planType) => {
    switch (planType) {
      case 'self-paced':
        window.location.href = 'https://payments.cashfree.com/forms/selfpacedcomplete';
        break;
      case 'mentor-led':
        window.location.href = 'https://payments.cashfree.com/forms/mentorledcomplete';
        break;
      case 'advanced':
        window.location.href = 'https://payments.cashfree.com/forms/advancecomplete';
        break;
      default:
        break;
    }
  };

  // New state for FAQ section
  const [activeFaq, setActiveFaq] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <div className="home">
      {/* Background geometric shapes */}
      <div className="geometric-shape-1"></div>
      <div className="geometric-shape-2"></div>
      <div className="geometric-shape-3"></div>
      <div className="geometric-shape-4"></div>
      <div className="geometric-shape-5"></div>

      {/* Internship Delegate Badge */}
      <Link to="/careers#internship-delegate" className="internship-badge">
        <i className="fas fa-user-graduate"></i> Internship Delegate Openings
      </Link>

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
          <h2>ACMYX</h2>
          <button className="close-menu" onClick={toggleMobileMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav>
          <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/programs" onClick={toggleMobileMenu}>Programs</Link>
          <Link to="/about" onClick={toggleMobileMenu}>About Us</Link>
          <Link to="/testimonials" onClick={toggleMobileMenu}>Testimonials</Link>
          <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
        </nav>
      </div>

      <section className="hero-carousel">
        <div 
          className={`carousel-container desktop-carousel-override ${isMobile ? 'force-mobile' : ''}`}
          onMouseEnter={handleCarouselHover}
          onMouseLeave={handleCarouselLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className={`carousel-slide ${slide.className}`} aria-hidden={currentSlide !== index}>
                <div className="hero-content flex-row flex-row-to-column">
                  <div className="hero-text">
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <div className="hero-buttons button-container">
                      <Link to="/programs" className="cta-button primary">Explore Programs</Link>
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
                      loading={index === 0 ? "eager" : "lazy"}
                      width="400"
                      height="300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="carousel-arrow prev" 
            onClick={prevSlide} 
            aria-label="Previous slide"
            disabled={isTransitioning}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="carousel-arrow next" 
            onClick={nextSlide} 
            aria-label="Next slide"
            disabled={isTransitioning}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button 
                key={index} 
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? "true" : "false"}
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
              <p>Access weekend live sessions and recorded content to learn at your own pace, perfect for working professionals and busy students.</p>
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
              <h3>⏱️ Self-Paced Plan</h3>
              <div className="price">
                <span className="original-price">₹4,999</span>
                <span className="current-price">₹3,499</span>
              </div>
              <div className="duration">Valid for 8 weeks</div>
              <button 
                className="pricing-button"
                onClick={() => handleEnrollNow('self-paced')}
              >
                Enroll Now
              </button>
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
                  <span className="feature-text">🏆 Certifications (Industry Certified)</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🏅 Mentor Support</span>
                  <span className="feature-status included"><i className="fas fa-check"></i></span>
                </li>
                <li>
                  <span className="feature-text">🤝 Interview Assistance</span>
                  <span className="feature-status excluded"><i className="fas fa-times"></i></span>
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
              <button 
                className="pricing-button"
                onClick={() => handleEnrollNow('mentor-led')}
              >
                Enroll Now
              </button>
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
              <h3>🎓 Advanced Program</h3>
              <div className="price">
                <span className="original-price">₹12,999</span>
                <span className="current-price">₹8,999</span>
              </div>
              <div className="duration">Valid for 8 weeks</div>
              <button 
                className="pricing-button"
                onClick={() => handleEnrollNow('advanced')}
              >
                Enroll Now
              </button>
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
          </div>
        </div>
      </section>

      <section className="faq-section animate-on-scroll section-spacing">
        <div className="responsive-container">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-intro">Find answers to common questions about our programs and enrollment process</p>
          
          <div className="faq-accordion">
            <div className="faq-columns">
              {/* First Column */}
              <div className="faq-column">
                <div className="faq-item">
                  <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
                    <h3>What is included in the programs?</h3>
                    <span className={`toggle-icon ${activeFaq === 1 ? 'active' : ''}`}>
                      <i className={`fas ${activeFaq === 1 ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </div>
                  <div className={`faq-answer ${activeFaq === 1 ? 'active' : ''}`}>
                    <p>You get access to beginner-friendly lessons, hands-on projects, mentor support, and a certificate upon completion.</p>
                  </div>
                </div>
                
                <div className="faq-item">
                  <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
                    <h3>Do I get a certificate?</h3>
                    <span className={`toggle-icon ${activeFaq === 2 ? 'active' : ''}`}>
                      <i className={`fas ${activeFaq === 2 ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </div>
                  <div className={`faq-answer ${activeFaq === 2 ? 'active' : ''}`}>
                    <p>Yes, you will receive a certificate after successfully completing the program.</p>
                  </div>
                </div>
                
                <div className="faq-item">
                  <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
                    <h3>Are there real projects?</h3>
                    <span className={`toggle-icon ${activeFaq === 3 ? 'active' : ''}`}>
                      <i className={`fas ${activeFaq === 3 ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </div>
                  <div className={`faq-answer ${activeFaq === 3 ? 'active' : ''}`}>
                    <p>Yes, you will work on simple, real-world projects to build your practical skills.</p>
                  </div>
                </div>
              </div>
              
              {/* Second Column */}
              <div className="faq-column">
                <div className="faq-item">
                  <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}>
                    <h3>Is there mentor support?</h3>
                    <span className={`toggle-icon ${activeFaq === 4 ? 'active' : ''}`}>
                      <i className={`fas ${activeFaq === 4 ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </div>
                  <div className={`faq-answer ${activeFaq === 4 ? 'active' : ''}`}>
                    <p>Yes, you will have access to mentors for guidance and support throughout the program.</p>
                  </div>
                </div>
                
                <div className="faq-item">
                  <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}>
                    <h3>Is there career or placement support?</h3>
                    <span className={`toggle-icon ${activeFaq === 5 ? 'active' : ''}`}>
                      <i className={`fas ${activeFaq === 5 ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </div>
                  <div className={`faq-answer ${activeFaq === 5 ? 'active' : ''}`}>
                    <p>Yes, we provide basic career guidance and tips for job readiness.</p>
                  </div>
                </div>
                
                <div className="faq-item">
                  <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 6 ? null : 6)}>
                    <h3>Is the program hands-on?</h3>
                    <span className={`toggle-icon ${activeFaq === 6 ? 'active' : ''}`}>
                      <i className={`fas ${activeFaq === 6 ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </div>
                  <div className={`faq-answer ${activeFaq === 6 ? 'active' : ''}`}>
                    <p>Absolutely! The program is designed to be practical and project-based.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hidden FAQs (visible when Show More is clicked) */}
            {showAllFaqs && (
              <div className="faq-columns">
                {/* Additional FAQs First Column */}
                <div className="faq-column">
                  <div className="faq-item">
                    <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 7 ? null : 7)}>
                      <h3>How much time should I dedicate each week?</h3>
                      <span className={`toggle-icon ${activeFaq === 7 ? 'active' : ''}`}>
                        <i className={`fas ${activeFaq === 7 ? 'fa-minus' : 'fa-plus'}`}></i>
                      </span>
                    </div>
                    <div className={`faq-answer ${activeFaq === 7 ? 'active' : ''}`}>
                      <p>You should plan to spend 2-3 hours per week on the program, including lessons and projects.</p>
                    </div>
                  </div>
                  
                  <div className="faq-item">
                    <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 8 ? null : 8)}>
                      <h3>Do I need prior experience?</h3>
                      <span className={`toggle-icon ${activeFaq === 8 ? 'active' : ''}`}>
                        <i className={`fas ${activeFaq === 8 ? 'fa-minus' : 'fa-plus'}`}></i>
                      </span>
                    </div>
                    <div className={`faq-answer ${activeFaq === 8 ? 'active' : ''}`}>
                      <p>No prior experience is required. This program is designed for beginners.</p>
                    </div>
                  </div>
                </div>
                
                {/* Additional FAQs Second Column */}
                <div className="faq-column">
                  <div className="faq-item">
                    <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 9 ? null : 9)}>
                      <h3>How do I enroll?</h3>
                      <span className={`toggle-icon ${activeFaq === 9 ? 'active' : ''}`}>
                        <i className={`fas ${activeFaq === 9 ? 'fa-minus' : 'fa-plus'}`}></i>
                      </span>
                    </div>
                    <div className={`faq-answer ${activeFaq === 9 ? 'active' : ''}`}>
                      <p>Click the 'Enroll Now' button and follow the instructions to register.</p>
                    </div>
                  </div>
                  
                  <div className="faq-item">
                    <div className="faq-question" onClick={() => setActiveFaq(activeFaq === 10 ? null : 10)}>
                      <h3>Is there a refund policy?</h3>
                      <span className={`toggle-icon ${activeFaq === 10 ? 'active' : ''}`}>
                        <i className={`fas ${activeFaq === 10 ? 'fa-minus' : 'fa-plus'}`}></i>
                      </span>
                    </div>
                    <div className={`faq-answer ${activeFaq === 10 ? 'active' : ''}`}>
                      <p>If you have concerns, please contact our support team for assistance with refunds or other issues.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Show More / Show Less Button */}
            <div className="faq-show-more">
              <button 
                className="show-more-button"
                onClick={() => setShowAllFaqs(!showAllFaqs)}
              >
                {showAllFaqs ? 'Show Less' : 'Show More'} <i className={`fas ${showAllFaqs ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-contact-section">
        <div className="responsive-container">
          <div className="home-contact-wrapper">
            <div className="home-contact-info">
              <h2>Contact Us</h2>
              <p>Have questions? We're here to help!</p>
              
              <div className="home-contact-details">
                <div className="home-contact-item">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:acmyxteams@gmail.com">acmyxteams@gmail.com</a>
                </div>
                <div className="home-contact-item">
                  <i className="fas fa-clock"></i>
                  <span>Monday - Sunday: 12:00 PM - 9:00 PM</span>
                </div>
                <div className="home-contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>HSR Layout, Bangalore, Karnataka</span>
                </div>
              </div>
              
              <div className="home-social-icons">
                <button className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></button>
                <button className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></button>
                <button className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></button>
                <button className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></button>
              </div>
            </div>
            
            <div className="home-contact-form">
              <h3>Send Us a Message</h3>
              <form className="home-form" onSubmit={handleContactSubmit}>
                <div className="home-form-row">
                  <div className="home-form-group">
                    <input
                      type="text"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactFormChange}
                      required
                      placeholder="Your Name *"
                    />
                  </div>
                  <div className="home-form-group">
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactFormChange}
                      required
                      placeholder="Email Address *"
                    />
                  </div>
                </div>
                
                <div className="home-form-row">
                  <div className="home-form-group">
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleContactFormChange}
                      required
                      placeholder="Phone Number *"
                    />
                  </div>
                  <div className="home-form-group">
                    <input
                      type="text"
                      name="college"
                      value={contactFormData.college}
                      onChange={handleContactFormChange}
                      required
                      placeholder="College Name *"
                    />
                  </div>
                </div>
                
                <div className="home-form-group">
                  <select
                    name="domain"
                    value={contactFormData.domain}
                    onChange={handleContactFormChange}
                    required
                    className="home-domain-select"
                  >
                    <option value="" disabled>Select Domain of Interest *</option>
                    {programDomains.map((domain, index) => (
                      <option key={index} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>
                
                <div className="home-form-group">
                  <textarea
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactFormChange}
                    required
                    rows="3"
                    placeholder="Your Message *"
                  ></textarea>
                </div>
                
                <button type="submit" className="home-submit-btn">
                  {contactStatus.type === 'loading' ? (
                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Send Message</>
                  )}
                </button>
                
                {contactStatus.message && (
                  <div className={`home-status-message ${contactStatus.type}`}>
                    {contactStatus.type === 'success' && <i className="fas fa-check-circle"></i>}
                    {contactStatus.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
                    <span>{contactStatus.message}</span>
                  </div>
                )}
            </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 