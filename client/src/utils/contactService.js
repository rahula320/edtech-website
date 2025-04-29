import axios from 'axios';

// Determine base URL - use relative path for development, absolute path for production
const getApiUrl = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  // If we're in production, use the deployed API URL
  if (isProduction) {
    return process.env.REACT_APP_API_URL || '';
  }
  // In development, proxy will handle routing to localhost:3001
  return '';
};

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Contact service using the server API
const ContactService = {
  // Submit a contact form
  submitContactForm: async (contactData) => {
    try {
      // Send all form fields directly to match the database structure
      const response = await apiClient.post('/api/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // Provide more detailed error message based on the type of error
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.log('Server error data:', error.response.data);
        return {
          success: false,
          message: error.response.data.message || 'Server error. Please try again later.'
        };
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
        return {
          success: false,
          message: 'No response from server. Check your network connection and try again.'
        };
      } else {
        // Something happened in setting up the request
        return {
          success: false,
          message: 'Error preparing your request. Please try again.'
        };
      }
    }
  }
};

export default ContactService; 