import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

// Get base API URL from environment or use current hostname
const getApiBaseUrl = () => {
  // In production, use the same hostname
  if (window.location.hostname.includes('vercel.app') || window.location.hostname === 'acmyx.vercel.app') {
    return `${window.location.origin}`;
  }
  // In development
  return 'http://localhost:5001';
};

function PaymentPage() {
  const { programId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [program, setProgram] = useState(location.state?.program || null);
  const [selectedPlan, setSelectedPlan] = useState(location.state?.plan || 'self');
  const [paymentOption, setPaymentOption] = useState('full');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prices, setPrices] = useState({
    self: { full: 3499, partial: 1000 },
    mentor: { full: 4999, partial: 1000 },
    advanced: { full: 8999, partial: 1000 }
  });
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // If we don't have program data from location state, fetch it from API
    if (!program) {
      const fetchProgram = async () => {
        try {
          // Try to get data from programsData in localStorage or another source
          // This is a fallback if navigation state is lost (e.g. on page refresh)
          setError('Program data not available. Please go back and try again.');
        } catch (error) {
          setError(error.message);
        }
      };

      fetchProgram();
    }
  }, [program, programId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePrice = () => {
    if (!selectedPlan) return 0;
    return prices[selectedPlan][paymentOption];
  };

  const calculateRemainingAmount = () => {
    if (paymentOption === 'full') return 0;
    return prices[selectedPlan].full - prices[selectedPlan].partial;
  };

  const initiatePayment = async (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email || !userData.phone) {
      setError('Please fill all the required fields');
      return;
    }

    setLoading(true);
    setError(null);

    // Log the data we're sending for debugging
    console.log('Sending order data:', {
      programId,
      planType: selectedPlan,
      paymentType: paymentOption,
      amount: calculatePrice(),
      remainingAmount: calculateRemainingAmount(),
      userData
    });

    try {
      // Create order in our system
      const orderResponse = await fetch(`${getApiBaseUrl()}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programId,
          planType: selectedPlan,
          paymentType: paymentOption,
          amount: calculatePrice(),
          remainingAmount: calculateRemainingAmount(),
          userData
        }),
      });

      // Log response status for debugging
      console.log('Order creation response status:', orderResponse.status);
      
      // Get the full error message from the response
      const responseText = await orderResponse.text();
      console.log('Order creation response text:', responseText);
      
      // Parse the response if it's valid JSON
      let orderData;
      try {
        orderData = JSON.parse(responseText);
        console.log('Parsed order data:', orderData);
      } catch (parseError) {
        console.error('Error parsing order response:', parseError);
        throw new Error('Failed to create order: Invalid server response');
      }

      if (!orderResponse.ok) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      // Initiate Cashfree payment
      const paymentResponse = await fetch(`${getApiBaseUrl()}/api/payment/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
          amount: calculatePrice(),
          customerDetails: {
            name: userData.name,
            email: userData.email,
            phone: userData.phone
          }
        }),
      });

      if (!paymentResponse.ok) {
        const paymentErrorData = await paymentResponse.json();
        throw new Error(paymentErrorData.message || 'Failed to initiate payment');
      }

      const paymentData = await paymentResponse.json();
      
      // Redirect to Cashfree payment page
      window.location.href = paymentData.paymentLink;
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="payment-error">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  if (!program) {
    return <div className="payment-loading">Loading...</div>;
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1>Complete Your Enrollment</h1>
          <p>You're just a few steps away from starting your journey with {program.title}</p>
        </div>

        <div className="payment-steps">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-text">Select Plan</div>
          </div>
          <div className="step-connector"></div>
          <div className="step active">
            <div className="step-number">2</div>
            <div className="step-text">Payment</div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">Confirmation</div>
          </div>
        </div>

        <div className="payment-content">
          <div className="plan-selection">
            <h2>Choose Your Plan</h2>
            <div className="plan-options">
              <div 
                className={`plan-option ${selectedPlan === 'self' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('self')}
              >
                <div className="plan-icon">⏱️</div>
                <div className="plan-name">Self-Paced</div>
                <div className="plan-price">₹{prices.self.full}</div>
              </div>
              <div 
                className={`plan-option ${selectedPlan === 'mentor' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('mentor')}
              >
                <div className="plan-icon">👨‍🏫</div>
                <div className="plan-name">Mentor-Led</div>
                <div className="plan-price">₹{prices.mentor.full}</div>
              </div>
              <div 
                className={`plan-option ${selectedPlan === 'advanced' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('advanced')}
              >
                <div className="plan-icon">🎓</div>
                <div className="plan-name">Advanced</div>
                <div className="plan-price">₹{prices.advanced.full}</div>
              </div>
            </div>
          </div>

          <div className="payment-options">
            <h2>Choose Payment Option</h2>
            <div className="payment-toggles">
              <div 
                className={`payment-toggle ${paymentOption === 'full' ? 'selected' : ''}`}
                onClick={() => setPaymentOption('full')}
              >
                <div className="toggle-icon">💰</div>
                <div className="toggle-content">
                  <div className="toggle-title">One-Time Payment</div>
                  <div className="toggle-desc">Pay full amount now</div>
                </div>
                <div className="toggle-price">₹{prices[selectedPlan].full}</div>
              </div>
              <div 
                className={`payment-toggle ${paymentOption === 'partial' ? 'selected' : ''}`}
                onClick={() => setPaymentOption('partial')}
              >
                <div className="toggle-icon">💸</div>
                <div className="toggle-content">
                  <div className="toggle-title">Partial Payment</div>
                  <div className="toggle-desc">Pay ₹1000 now, rest later</div>
                </div>
                <div className="toggle-price">₹1000 + ₹{prices[selectedPlan].full - 1000} later</div>
              </div>
            </div>
          </div>

          <div className="user-details">
            <h2>Your Details</h2>
            <form onSubmit={initiatePayment}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Enter your full name"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email address"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="Enter your phone number"
                  value={userData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="payment-summary">
                <h3>Payment Summary</h3>
                <div className="summary-item">
                  <span className="item-name">Plan</span>
                  <span className="item-value">{selectedPlan === 'self' ? 'Self-Paced' : selectedPlan === 'mentor' ? 'Mentor-Led' : 'Advanced'}</span>
                </div>
                <div className="summary-item">
                  <span className="item-name">Payment Option</span>
                  <span className="item-value">{paymentOption === 'full' ? 'Full Payment' : 'Partial Payment'}</span>
                </div>
                <div className="summary-item total">
                  <span className="item-name">Amount to Pay Now</span>
                  <span className="item-value">₹{calculatePrice()}</span>
                </div>
                {paymentOption === 'partial' && (
                  <div className="summary-item remaining">
                    <span className="item-name">Remaining Payment (due in 30 days)</span>
                    <span className="item-value">₹{calculateRemainingAmount()}</span>
                  </div>
                )}
              </div>

              <div className="payment-actions">
                <button 
                  type="button" 
                  className="back-button"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="proceed-button"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage; 