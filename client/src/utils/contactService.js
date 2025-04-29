import axios from 'axios';

// Set base URL for API calls based on environment
const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL || 'https://edtech-website.vercel.app'
  : '';

// Contact service using the server API
const ContactService = {
  // Submit a contact form
  submitContactForm: async (contactData) => {
    try {
      // Send all form fields directly to match the database structure
      const response = await axios.post(`${API_URL}/api/contact`, contactData);
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