import React from 'react';
import './CancellationRefund.css';

function CancellationRefund() {
  return (
    <div className="cancellation-refund-page">
      <section className="cancellation-refund-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <h1>Cancellation & Refund Policy</h1>
          </div>
          <div className="last-updated">
            Last updated on 26-04-2025
          </div>
        </div>
      </section>
      
      <section className="cancellation-refund-content">
        <div className="container">
          <div className="policy-wrapper">
            <div className="policy-introduction">
              <div className="section-icon">
                <i className="fas fa-file-contract"></i>
              </div>
              <p>
                This Cancellation and Refund Policy ("Policy") outlines the terms and conditions regarding 
                cancellations and refunds for services provided by ACMYX Private Limited ("we," "us," or "our"). 
                By enrolling in our programs or services, you acknowledge that you have read, understood, 
                and agree to be bound by this Policy.
              </p>
            </div>
            
            <div className="policy-section">
              <h2><i className="fas fa-ban"></i> Cancellation Policy</h2>
              <div className="policy-content">
                <h3>No Cancellation Policy</h3>
                <p>
                  We maintain a strict no-cancellation policy for all our educational programs and services. 
                  Once you have enrolled in our programs or services, cancellations are not permitted under 
                  any circumstances.
                </p>
                
                <h3>Enrollment Commitment</h3>
                <p>
                  By enrolling in our programs, you acknowledge that you have carefully considered your decision 
                  and understand that the enrollment is final. We encourage all potential students to thoroughly 
                  review program details, requirements, and commitments before making the decision to enroll.
                </p>
                
                <h3>Program Transfers</h3>
                <p>
                  We do not offer program transfers or substitutions. Each enrollment is specific to the 
                  program selected at the time of registration.
                </p>
              </div>
            </div>
            
            <div className="policy-section">
              <h2><i className="fas fa-times-circle"></i> Refund Policy</h2>
              <div className="policy-content">
                <h3>No Refund Policy</h3>
                <p>
                  We do not have a refund policy. All payments made for our programs and services are 
                  non-refundable. Once payment is processed and enrollment is confirmed, no refunds will 
                  be provided under any circumstances.
                </p>
                
                <h3>Payment Terms</h3>
                <p>
                  All fees paid for our educational programs, courses, workshops, and any other services 
                  are considered final and non-refundable. This includes but is not limited to:
                </p>
                <ul>
                  <li>Program enrollment fees</li>
                  <li>Course materials and resources</li>
                  <li>Workshop participation fees</li>
                  <li>Certification program fees</li>
                  <li>Any additional service charges</li>
                </ul>
                
                <h3>Exceptional Circumstances</h3>
                <p>
                  We understand that exceptional circumstances may arise. However, our no-refund policy 
                  applies even in cases of:
                </p>
                <ul>
                  <li>Personal emergencies or health issues</li>
                  <li>Schedule conflicts or time constraints</li>
                  <li>Dissatisfaction with program content or delivery</li>
                  <li>Technical difficulties or platform issues</li>
                  <li>Any other unforeseen circumstances</li>
                </ul>
              </div>
            </div>
            
            <div className="policy-section">
              <h2><i className="fas fa-info-circle"></i> Before You Enroll</h2>
              <div className="policy-content">
                <h3>Important Considerations</h3>
                <p>
                  Before enrolling in any of our programs, please ensure that you:
                </p>
                <ul>
                  <li>Have thoroughly reviewed the program details and requirements</li>
                  <li>Understand the time commitment involved</li>
                  <li>Have the necessary technical requirements and resources</li>
                  <li>Are committed to completing the entire program</li>
                  <li>Have read and understood this Cancellation and Refund Policy</li>
                </ul>
                
                <h3>Questions and Clarifications</h3>
                <p>
                  If you have any questions about our programs, requirements, or this Policy, please 
                  contact our support team before making payment. We are happy to address any concerns 
                  or provide additional information to help you make an informed decision.
                </p>
              </div>
            </div>
            
            <div className="policy-section">
              <h2><i className="fas fa-headset"></i> Contact Information</h2>
              <div className="policy-content">
                <p>
                  For any questions regarding this Cancellation and Refund Policy, please contact us:
                </p>
                <div className="contact-info-block">
                  <div className="contact-detail-item">
                    <div className="icon-wrapper">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="detail-content">
                      <h4>Email</h4>
                      <p><a href="mailto:acmyxteams@gmail.com">acmyxteams@gmail.com</a></p>
                    </div>
                  </div>
                  
                  <div className="contact-detail-item">
                    <div className="icon-wrapper">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="detail-content">
                      <h4>Address</h4>
                      <p>15th Cross, 15th Main Road, HSR Layout, Bangalore, Karnataka, PIN: 560102</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="policy-section">
              <h2><i className="fas fa-gavel"></i> Policy Updates</h2>
              <div className="policy-content">
                <p>
                  We reserve the right to modify this Cancellation and Refund Policy at any time. 
                  Any changes will be effective immediately upon posting on our website. It is your 
                  responsibility to review this Policy periodically for any updates.
                </p>
                <p>
                  Your continued use of our services after any modifications to this Policy constitutes 
                  your acceptance of the updated terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CancellationRefund; 