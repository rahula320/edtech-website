import axios from 'axios';

// Contact service using the server API
const ContactService = {
  // Submit a contact form
  submitContactForm: async (contactData) => {
    try {
      const response = await axios.post('/api/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
};

export default ContactService; 