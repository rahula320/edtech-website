import React from 'react';
import './Terms.css';

function Terms() {
  // Function to scroll to section when clicking on table of contents item
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="terms-page">
      <section className="terms-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Terms &amp; Conditions</h1>
          <p>Last updated on 26-04-2025 14:34:08</p>
        </div>
      </section>
      
      <section className="terms-content">
        <div className="container">
          <div className="terms-wrapper">
            <div className="terms-sidebar">
              <div className="toc-container">
                <h3>Table of Contents</h3>
                <ul className="toc-list">
                  <li><button onClick={() => scrollToSection('introduction')}>Introduction</button></li>
                  <li><button onClick={() => scrollToSection('acceptance')}>Acceptance of Terms</button></li>
                  <li><button onClick={() => scrollToSection('use-of-services')}>Use of Services</button></li>
                  <li><button onClick={() => scrollToSection('information-accuracy')}>Information Accuracy</button></li>
                  <li><button onClick={() => scrollToSection('risk-disclaimer')}>Risk Disclaimer</button></li>
                  <li><button onClick={() => scrollToSection('intellectual-property')}>Intellectual Property</button></li>
                  <li><button onClick={() => scrollToSection('unauthorized-use')}>Unauthorized Use</button></li>
                  <li><button onClick={() => scrollToSection('charges')}>Charges</button></li>
                  <li><button onClick={() => scrollToSection('unlawful-use')}>Unlawful Use</button></li>
                  <li><button onClick={() => scrollToSection('third-party-links')}>Third Party Links</button></li>
                  <li><button onClick={() => scrollToSection('cancellation')}>Cancellation</button></li>
                  <li><button onClick={() => scrollToSection('refunds')}>Refunds</button></li>
                  <li><button onClick={() => scrollToSection('force-majeure')}>Force Majeure</button></li>
                  <li><button onClick={() => scrollToSection('governing-law')}>Governing Law</button></li>
                  <li><button onClick={() => scrollToSection('contact-information')}>Contact Information</button></li>
                </ul>
              </div>
            </div>
            
            <div className="terms-main">
              <div className="terms-introduction" id="introduction">
                <div className="section-icon">
                  <i className="fas fa-file-contract"></i>
                </div>
                <p>
                  These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding
                  agreement by and between ACMYX ("Website Owner" or "we" or "us" or "our") and you
                  ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as applicable)
                  (collectively, "Services").
                </p>
                <p>
                  By using our website and availing the Services, you agree that you have read and accepted these Terms
                  (including the Privacy Policy). We reserve the right to modify these Terms at any time and without
                  assigning any reason. It is your responsibility to periodically review these Terms to stay informed of
                  updates.
                </p>
                <p>
                  The use of this website or availing of our Services is subject to the following terms of use:
                </p>
              </div>
              
              <div className="terms-section" id="acceptance">
                <h2>Acceptance of Terms</h2>
                <p>
                  To access and use the Services, you agree to provide true, accurate and complete information to us
                  during and after registration, and you shall be responsible for all acts done through the use of your
                  registered account.
                </p>
              </div>
              
              <div className="terms-section" id="information-accuracy">
                <h2>Information Accuracy</h2>
                <p>
                  Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness,
                  performance, completeness or suitability of the information and materials offered on this website
                  or through the Services, for any specific purpose. You acknowledge that such information and
                  materials may contain inaccuracies or errors and we expressly exclude liability for any such
                  inaccuracies or errors to the fullest extent permitted by law.
                </p>
              </div>
              
              <div className="terms-section" id="risk-disclaimer">
                <h2>Risk Disclaimer</h2>
                <p>
                  Your use of our Services and the website is solely at your own risk and discretion. You are
                  required to independently assess and ensure that the Services meet your requirements.
                </p>
              </div>
              
              <div className="terms-section" id="intellectual-property">
                <h2>Intellectual Property</h2>
                <p>
                  The contents of the Website and the Services are proprietary to Us and you will not have any
                  authority to claim any intellectual property rights, title, or interest in its contents.
                </p>
              </div>
              
              <div className="terms-section" id="unauthorized-use">
                <h2>Unauthorized Use</h2>
                <p>
                  You acknowledge that unauthorized use of the Website or the Services may lead to action against
                  you as per these Terms or applicable laws.
                </p>
              </div>
              
              <div className="terms-section" id="charges">
                <h2>Charges</h2>
                <p>
                  You agree to pay us the charges associated with availing the Services.
                </p>
              </div>
              
              <div className="terms-section" id="unlawful-use">
                <h2>Unlawful Use</h2>
                <p>
                  You agree not to use the website and/or Services for any purpose that is unlawful, illegal or
                  forbidden by these Terms, or Indian or local laws that might apply to you.
                </p>
              </div>
              
              <div className="terms-section" id="third-party-links">
                <h2>Third Party Links</h2>
                <p>
                  You agree and acknowledge that website and the Services may contain links to other third party
                  websites. On accessing these links, you will be governed by the terms of use, privacy policy and
                  such other policies of such third party websites.
                </p>
                <p>
                  You understand that upon initiating a transaction for availing the Services you are entering into a
                  legally binding and enforceable contract with the us for the Services.
                </p>
              </div>
              
              <div className="terms-section" id="cancellation">
                <h2>Cancellation</h2>
                <p>
                  Once you have enrolled in our programs or services, cancellations are not permitted. By enrolling in our programs, you acknowledge that you have carefully considered your decision and understand that the enrollment is final.
                </p>
                <p>
                  We do not provide any cancellation options after the enrollment process is completed. This policy applies to all our educational programs, courses, and services.
                </p>
              </div>
              
              <div className="terms-section" id="refunds">
                <h2>Refunds</h2>
                <p>
                  We do not have a refund policy. All payments made for our programs and services are non-refundable. Once payment is processed and enrollment is confirmed, no refunds will be provided under any circumstances.
                </p>
                <p>
                  This no-refund policy applies to all our educational programs, courses, workshops, and any other services we provide. We encourage all potential students to carefully review program details and ensure they are committed to completing the program before making payment.
                </p>
                <p>
                  If you have any concerns about our programs or services, please contact our support team before making payment. We are happy to address any questions or concerns you may have.
                </p>
              </div>
              
              <div className="terms-section" id="force-majeure">
                <h2>Force Majeure</h2>
                <p>
                  Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to
                  perform an obligation under these Terms if performance is prevented or delayed by a force majeure
                  event.
                </p>
              </div>
              
              <div className="terms-section" id="governing-law">
                <h2>Governing Law</h2>
                <p>
                  These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and
                  construed in accordance with the laws of India.
                </p>
                <p>
                  All disputes arising out of or in connection with these Terms shall be subject to the exclusive
                  jurisdiction of the courts in Bangalore, Karnataka.
                </p>
              </div>
              
              <div className="terms-section" id="contact-information">
                <h2>Contact Information</h2>
                <p>
                  All concerns or communications relating to these Terms must be communicated to us using the
                  contact information provided below.
                </p>
                <div className="contact-info-block">
                  <h3>Contact Us</h3>
                  <p className="last-updated">Last updated on 26-04-2025 14:34:54</p>
                  
                  <div className="contact-details-grid">                    
                    <div className="contact-detail-item">
                      <div className="icon-wrapper">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="detail-content">
                        <h4>Registered Address</h4>
                        <p>15th Cross, 15th Main Road, HSR Layout, Bangalore, Karnataka, PIN: 560102</p>
                      </div>
                    </div>
                    
                    <div className="contact-detail-item">
                      <div className="icon-wrapper">
                        <i className="fas fa-location-arrow"></i>
                      </div>
                      <div className="detail-content">
                        <h4>Operational Address</h4>
                        <p>15th Cross, 15th Main Road, HSR Layout, Bangalore, Karnataka, PIN: 560102</p>
                      </div>
                    </div>
                    
                    <div className="contact-detail-item">
                      <div className="icon-wrapper">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="detail-content">
                        <h4>Email</h4>
                        <p><a href="mailto:acmyxteams@gmail.com">acmyxteams@gmail.com</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Terms; 