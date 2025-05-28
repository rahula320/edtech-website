import React, { useState, useEffect } from 'react';
import './OfferPopup.css';

const OfferPopup = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Wait for animation to complete
  };

  const handleGetOffer = () => {
    // Scroll to pricing section
    const pricingSection = document.querySelector('.pricing-plans');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`offer-popup-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="offer-popup">
        <button className="popup-close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="popup-content">
          <div className="popup-icon">🚀</div>
          <h2 className="popup-title">ACMYX LAUNCH OFFER!</h2>
          <div className="popup-discount">GET ₹300 OFF</div>
          <p className="popup-description">
            Limited time launch offer! Use coupon code at checkout and save big on all our premium courses.
          </p>
          
          <div className="popup-coupon">
            <div className="coupon-container">
              <span className="coupon-label">Coupon Code:</span>
              <div className="coupon-code-popup">ACMYX300</div>
            </div>
          </div>
          
          <div className="popup-validity">
            <i className="fas fa-clock"></i>
            <span>Valid till 30th June 2025</span>
          </div>
          
          <button className="popup-cta" onClick={handleGetOffer}>
            View Pricing Plans
            <i className="fas fa-arrow-right"></i>
          </button>
          
          <div className="popup-features">
            <div className="feature">✓ Industry Expert Mentors</div>
            <div className="feature">✓ Real-World Projects</div>
            <div className="feature">✓ Certificate & Career Support</div>
          </div>
        </div>
        
        <div className="popup-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup; 