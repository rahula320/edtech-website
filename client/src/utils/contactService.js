import axios from 'axios';

// Set base URL for API calls based on environment and hostname
const getApiUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // Production environment - determine the API URL based on hostname
  const hostname = window.location.hostname;
  console.log('Current hostname:', hostname);
  
  if (hostname === 'edtech-website.vercel.app') {
    return 'https://server-eta-weld.vercel.app'; // Your primary deployment URL
  } else if (hostname === 'acmyx.com' || hostname === 'www.acmyx.com') {
    return 'https://api.acmyx.com';
  } else {
    // Fallback to same-origin API
    return '';
  }
};

const API_URL = getApiUrl();
console.log('Using API URL:', API_URL);

// Contact service using the server API
const ContactService = {
  // Submit a contact form
  submitContactForm: async (contactData) => {
    try {
      console.log('Submitting contact form to:', `${API_URL}/api/contact`, contactData);
      // Use timeout to handle network issues
      const response = await axios.post(`${API_URL}/api/contact`, contactData, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log('Contact form submission response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // Provide more detailed error message based on the type of error
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.log('Server error status:', error.response.status);
        console.log('Server error data:', error.response.data);
        return {
          success: false,
          message: error.response.data?.message || 'Server error. Please try again later.'
        };
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received - request details:', error.request);
        return {
          success: false,
          message: 'No response from server. Please check your network connection and try again.'
        };
      } else {
        // Something happened in setting up the request
        console.log('Request setup error:', error.message);
        return {
          success: false,
          message: 'Error preparing your request. Please try again.'
        };
      }
    }
  }
};

export default ContactService; 