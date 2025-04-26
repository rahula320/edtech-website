import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import './PaymentConfirmation.css';

// Get base API URL from environment or use current hostname
const getApiBaseUrl = () => {
  // In production, use the same hostname
  if (window.location.hostname.includes('vercel.app') || window.location.hostname === 'acmyx.vercel.app') {
    return `${window.location.origin}`;
  }
  // In development
  return 'http://localhost:5001';
};

function PaymentConfirmation() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const paymentStatus = searchParams.get('status');
    const paymentId = searchParams.get('payment_id');
    
    const verifyPayment = async () => {
      try {
        setLoading(true);
        
        // Verify payment status with server
        const response = await fetch(`${getApiBaseUrl()}/api/payment/verify`, {
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
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to verify payment');
        }
        
        // Get order details
        const orderResponse = await fetch(`${getApiBaseUrl()}/api/orders/${orderId}`);
        const orderData = await orderResponse.json();
        
        if (!orderResponse.ok) {
          throw new Error(orderData.message || 'Failed to fetch order details');
        }
        
        setOrderDetails(orderData.order);
        setSuccess(data.success);
        setLoading(false);
      } catch (error) {
        console.error('Verification error:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    if (orderId && paymentStatus && paymentId) {
      verifyPayment();
    } else {
      setError('Invalid payment confirmation URL');
      setLoading(false);
    }
  }, [orderId, searchParams]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate a PDF receipt
    window.print();
  };

  if (loading) {
    return (
      <div className="payment-confirmation loading">
        <div className="confirmation-container">
          <div className="loader"></div>
          <h2>Verifying Payment...</h2>
          <p>Please wait while we confirm your payment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-confirmation error">
        <div className="confirmation-container">
          <div className="error-icon">❌</div>
          <h2>Payment Verification Failed</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/programs')}>Browse Programs</button>
        </div>
      </div>
    );
  }

  const paymentStatus = searchParams.get('status');
  if (paymentStatus !== 'SUCCESS') {
    return (
      <div className="payment-confirmation failed">
        <div className="confirmation-container">
          <div className="failed-icon">⚠️</div>
          <h2>Payment Was Not Successful</h2>
          <p>Your payment could not be processed. Please try again or contact support if the issue persists.</p>
          <div className="action-buttons">
            <button onClick={() => navigate(-1)}>Try Again</button>
            <button onClick={() => navigate('/contact')}>Contact Support</button>
          </div>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="payment-confirmation error">
        <div className="confirmation-container">
          <div className="error-icon">❓</div>
          <h2>Order Details Not Found</h2>
          <p>We couldn't retrieve your order details. Please contact support.</p>
          <button onClick={() => navigate('/contact')}>Contact Support</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-confirmation success">
      <div className="confirmation-container receipt">
        <div className="success-icon">✅</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for enrolling. Your payment has been confirmed and your course access is now active.</p>

        <div className="receipt-content">
          <div className="receipt-header">
            <h2>Payment Receipt</h2>
            <div className="receipt-actions">
              <button onClick={handleDownloadReceipt} className="download-button">
                <i className="fas fa-download"></i> Download
              </button>
            </div>
          </div>

          <div className="receipt-details">
            <div className="detail-row">
              <span className="detail-label">Order ID:</span>
              <span className="detail-value">{orderDetails.order_id}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Transaction ID:</span>
              <span className="detail-value">{searchParams.get('payment_id')}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{formatDate(orderDetails.payment_date)}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Program:</span>
              <span className="detail-value">{orderDetails.program_id}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Plan:</span>
              <span className="detail-value">
                {orderDetails.plan_type === 'self' ? 'Self-Paced' : 
                 orderDetails.plan_type === 'mentor' ? 'Mentor-Led' : 'Advanced'}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Payment Option:</span>
              <span className="detail-value">
                {orderDetails.payment_type === 'full' ? 'Full Payment' : 'Partial Payment'}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Customer:</span>
              <span className="detail-value">{orderDetails.user_name}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{orderDetails.user_email}</span>
            </div>
          </div>

          <div className="receipt-divider"></div>

          <div className="payment-breakdown">
            <h3>Payment Details</h3>
            
            <div className="breakdown-row">
              <span className="breakdown-label">Amount Paid:</span>
              <span className="breakdown-value">₹{orderDetails.amount}</span>
            </div>

            {orderDetails.payment_type === 'partial' && (
              <>
                <div className="breakdown-row">
                  <span className="breakdown-label">Remaining Amount:</span>
                  <span className="breakdown-value">₹{orderDetails.remaining_amount}</span>
                </div>
                
                <div className="breakdown-row">
                  <span className="breakdown-label">Due Date:</span>
                  <span className="breakdown-value">{formatDate(orderDetails.remaining_payment_due_date)}</span>
                </div>
              </>
            )}
            
            <div className="breakdown-row total">
              <span className="breakdown-label">Total Course Fee:</span>
              <span className="breakdown-value">
                ₹{parseFloat(orderDetails.amount) + parseFloat(orderDetails.remaining_amount || 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>Check your email for course access details</li>
            <li>Access your course from the student portal</li>
            <li>Set up your profile and get started with your learning journey</li>
          </ul>
          <div className="action-buttons">
            <button onClick={() => navigate('/portal')} className="primary-button">Go to Student Portal</button>
            <button onClick={() => navigate('/programs')} className="secondary-button">Browse More Programs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmation; 