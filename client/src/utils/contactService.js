import axios from 'axios';

// Contact service using the server API
const ContactService = {
  // Submit a contact form
  submitContactForm: async (contactData) => {
    try {
      // Map form data to match our database model
      const formattedData = {
        name: contactData.name,
        email: contactData.email,
        message: `
Phone: ${contactData.phone || 'N/A'}
College: ${contactData.college || 'N/A'}
Domain: ${contactData.domain || 'N/A'}
Message: ${contactData.message || 'N/A'}
        `.trim()
      };
      
      const response = await axios.post('/api/contact', formattedData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
  
  // Get all contact submissions
  getContacts: async () => {
    try {
      const response = await axios.get('/api/contacts');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  
  // Get contact by ID
  getContactById: async (id) => {
    try {
      const response = await axios.get(`/api/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  },
  
  // Update contact status
  updateContactStatus: async (id, status) => {
    try {
      const response = await axios.put(`/api/contacts/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }
};

export default ContactService; 