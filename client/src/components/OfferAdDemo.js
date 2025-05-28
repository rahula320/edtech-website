import React from 'react';
import OfferAd from './OfferAd';
import './OfferAd.css';

const OfferAdDemo = () => {
  const handleOfferClick = () => {
    alert('Offer clicked! This would typically redirect to enrollment or apply the discount.');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
        Offer Ad Component Demo
      </h1>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#555', marginBottom: '20px' }}>Default Offer Ad</h2>
          <OfferAd onClick={handleOfferClick} />
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#555', marginBottom: '20px' }}>Banner Style (Full Width)</h2>
          <OfferAd 
            className="banner"
            onClick={handleOfferClick}
          />
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#555', marginBottom: '20px' }}>Compact Style</h2>
          <OfferAd 
            className="compact"
            onClick={handleOfferClick}
          />
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#555', marginBottom: '20px' }}>Custom Content</h2>
          <OfferAd 
            tagIcon="🎉"
            headline="Flash Sale: Limited Time Only!"
            description="Get 40% off on all premium courses. Hurry up, only 24 hours left!"
            couponCode="FLASH40"
            validTill="31/12/24"
            onClick={handleOfferClick}
          />
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#555', marginBottom: '20px' }}>Different Offer Example</h2>
          <OfferAd 
            tagIcon="🔥"
            headline="Early Bird Special: Save Big!"
            description="Register now for our upcoming batch and save ₹500. Perfect for students and professionals."
            couponCode="EARLY500"
            validTill="15/01/25"
            className="compact"
            onClick={handleOfferClick}
          />
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#555', marginBottom: '20px' }}>Multiple Ads in Grid</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <OfferAd 
              tagIcon="💡"
              headline="Skill Up Saturday"
              description="Weekend learning special offer"
              couponCode="WEEKEND20"
              validTill="29/02/25"
              className="compact"
              onClick={handleOfferClick}
            />
            <OfferAd 
              tagIcon="🎯"
              headline="Career Boost Program"
              description="Get job-ready with our intensive course"
              couponCode="CAREER25"
              validTill="29/02/25"
              className="compact"
              onClick={handleOfferClick}
            />
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#555', marginBottom: '20px' }}>Usage Instructions</h2>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid #ddd',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <h3>Basic Usage:</h3>
            <pre>{`import OfferAd from '../components/OfferAd';

// Default usage
<OfferAd />

// With custom props
<OfferAd 
  tagIcon="🎉"
  headline="Your Custom Headline"
  description="Your custom description"
  couponCode="CUSTOM100"
  validTill="31/12/24"
  className="banner"
  onClick={handleOfferClick}
/>`}</pre>
            
            <h3 style={{ marginTop: '20px' }}>Available Classes:</h3>
            <ul>
              <li><code>banner</code> - Full width horizontal layout</li>
              <li><code>compact</code> - Smaller size for sidebars</li>
              <li>Default - Standard card layout</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OfferAdDemo; 