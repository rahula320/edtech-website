import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  useEffect(() => {
    // Set proper HTTP status code for 404
    document.title = '404 - Page Not Found | ACMYX';
    
    // Add meta tags for better SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Page not found. The page you are looking for doesn\'t exist or has been moved. Explore ACMYX programs, internships, and educational opportunities.');
    }
    
    // Add structured data for 404 page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "404 - Page Not Found",
      "description": "Page not found. The page you are looking for doesn't exist or has been moved.",
      "url": window.location.href,
      "mainEntity": {
        "@type": "Organization",
        "name": "ACMYX",
        "url": "https://acmyx.com"
      }
    });
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
        <p>Don't worry, you can still explore our amazing programs and opportunities below.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            <i className="fas fa-home"></i> Back to Home
          </Link>
          <Link to="/contact" className="contact-button">
            <i className="fas fa-envelope"></i> Contact Us
          </Link>
        </div>
        
        <div className="suggested-links">
          <h3>You might be looking for:</h3>
          <ul>
            <li><Link to="/programs">Our Programs</Link></li>
            <li><Link to="/internships">Internship Opportunities</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/careers">Career Opportunities</Link></li>
          </ul>
        </div>
        
        <div className="popular-programs">
          <h3>Popular Programs:</h3>
          <ul>
            <li><Link to="/programs/data-science">Data Science & Analytics</Link></li>
            <li><Link to="/programs/artificial-intelligence">Artificial Intelligence</Link></li>
            <li><Link to="/programs/web-development">Web Development</Link></li>
            <li><Link to="/programs/cloud-computing">Cloud Computing</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFound; 