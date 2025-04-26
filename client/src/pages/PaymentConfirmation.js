import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './PaymentConfirmation.css';

function PaymentConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [downloadReady, setDownloadReady] = useState(false);

  // Get query parameters
  const searchParams = new URLSearchParams(location.search);
  const paymentStatus = searchParams.get('status');
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setLoading(true);
        
        // Verify payment status with server
        const response = await fetch(`/api/payment/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId,
            paymentId,
            status: paymentStatus
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to verify payment');
        }

        const data = await response.json();
        setOrderDetails(data.orderDetails);
        
        // Simulate receipt generation delay
        setTimeout(() => {
          setDownloadReady(true);
        }, 2000);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId && paymentStatus && paymentId) {
      verifyPayment();
    } else {
      setError('Invalid payment confirmation URL');
      setLoading(false);
    }
  }, [orderId, paymentStatus, paymentId]);

  const handleDownloadReceipt = () => {
    // In a real application, this would generate and download a PDF receipt
    // For now, we'll just show an alert
    alert('Receipt downloaded!');
  };

  const goToDashboard = () => {
    navigate('/student-portal');
  };

  if (loading) {
    return (
      <div className="confirmation-loading">
        <div className="loading-spinner"></div>
        <h2>Verifying Payment...</h2>
        <p>Please wait while we confirm your payment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="confirmation-error">
        <div className="error-icon">❌</div>
        <h2>Payment Verification Failed</h2>
        <p>{error}</p>
        <div className="confirmation-actions">
          <button onClick={() => navigate(-1)}>Go Back</button>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      </div>
    );
  }

  if (paymentStatus !== 'SUCCESS') {
    return (
      <div className="confirmation-error">
        <div className="error-icon">⚠️</div>
        <h2>Payment Was Not Successful</h2>
        <p>Your payment could not be processed. Please try again or contact support if the issue persists.</p>
        <div className="confirmation-actions">
          <button onClick={() => navigate(-1)}>Try Again</button>
          <button onClick={() => navigate('/contact')}>Contact Support</button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Payment Successful!</h1>
          <p>Your enrollment is now complete</p>
        </div>

        <div className="confirmation-content">
          <div className="order-info">
            <h2>Order Details</h2>
            <div className="order-details-grid">
              <div className="detail-item">
                <span className="detail-label">Order ID:</span>
                <span className="detail-value">{orderDetails?.orderId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Transaction ID:</span>
                <span className="detail-value">{paymentId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Program:</span>
                <span className="detail-value">{orderDetails?.program?.title}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Plan:</span>
                <span className="detail-value">
                  {orderDetails?.planType === 'self' ? 'Self-Paced' : 
                   orderDetails?.planType === 'mentor' ? 'Mentor-Led' : 'Advanced'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Payment Option:</span>
                <span className="detail-value">
                  {orderDetails?.paymentType === 'full' ? 'Full Payment' : 'Partial Payment'}
                </span>
              </div>
              <div className="detail-item highlight">
                <span className="detail-label">Amount Paid:</span>
                <span className="detail-value">₹{orderDetails?.amount}</span>
              </div>
              {orderDetails?.paymentType === 'partial' && (
                <div className="detail-item highlight remaining">
                  <span className="detail-label">Remaining Amount:</span>
                  <span className="detail-value">₹{orderDetails?.remainingAmount}</span>
                </div>
              )}
            </div>
          </div>

          <div className="next-steps">
            <h2>Next Steps</h2>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-icon">📧</div>
                <div className="step-content">
                  <h3>Check Your Email</h3>
                  <p>We've sent a confirmation email to {orderDetails?.user?.email} with all the details of your enrollment.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-icon">🎓</div>
                <div className="step-content">
                  <h3>Access Your Course</h3>
                  <p>You can now access your course materials from your student dashboard.</p>
                </div>
              </div>
              {orderDetails?.paymentType === 'partial' && (
                <div className="step-item">
                  <div className="step-icon">💰</div>
                  <div className="step-content">
                    <h3>Remaining Payment</h3>
                    <p>Your remaining payment of ₹{orderDetails?.remainingAmount} will be due within 30 days.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="confirmation-actions">
            <button 
              className="receipt-button"
              onClick={handleDownloadReceipt}
              disabled={!downloadReady}
            >
              {downloadReady ? (
                <>
                  <i className="fas fa-download"></i> Download Receipt
                </>
              ) : (
                <>
                  <div className="button-spinner"></div> Preparing Receipt...
                </>
              )}
            </button>
            <button 
              className="dashboard-button"
              onClick={goToDashboard}
            >
              <i className="fas fa-graduation-cap"></i> Go to Student Dashboard
            </button>
          </div>
        </div>

        <div className="confirmation-footer">
          <div className="support-info">
            <h3>Need Help?</h3>
            <p>If you have any questions or need assistance, please contact our support team.</p>
            <button onClick={() => navigate('/contact')}>Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmation; 