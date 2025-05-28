import React from 'react';
import './OfferAd.css';

const OfferAd = ({ 
  tagIcon = "🚀", 
  headline = "ACMYX LAUNCH OFFER - GET ₹300 OFF",
  description = "Use code ACMYX300 at checkout. Limited time offer!",
  couponCode = "ACMYX300",
  validTill = "30/06/25",
  className = "",
  onClick = null,
  scrollToPricing = false
}) => {

  const handleClick = () => {
    if (scrollToPricing) {
      // Scroll to pricing section
      const pricingSection = document.querySelector('.pricing-plans');
      if (pricingSection) {
        pricingSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`offer-ad ${className}`} onClick={handleClick}>
      <div className="offer-ad-content">
        <div className="offer-ad-header">
          <span className="offer-ad-icon">{tagIcon}</span>
          <h3 className="offer-ad-headline">{headline}</h3>
        </div>
        
        <p className="offer-ad-description">{description}</p>
        
        <div className="offer-ad-details">
          <div className="coupon-code-container">
            <span className="coupon-label">Use code:</span>
            <span className="coupon-code">{couponCode}</span>
          </div>
          
          <div className="validity-container">
            <span className="calendar-icon">📅</span>
            <span className="validity-text">Valid till {validTill}</span>
          </div>
        </div>

        <div className="offer-ad-footer">
          <span className="coupon-code">{couponCode}</span>
          <span className="valid-till">Till {validTill}</span>
        </div>
      </div>
    </div>
  );
};

export default OfferAd; 