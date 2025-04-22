import { databases, databaseId, contactsCollectionId, ID } from './appwrite';

// Contact service using Appwrite
const ContactService = {
  // Send a contact message
  sendContactMessage: async (contactData) => {
    try {
      await databases.createDocument(
        databaseId,
        contactsCollectionId,
        ID.unique(),
        {
          name: contactData.name,
          email: contactData.email,
          message: contactData.message,
          createdAt: new Date().toISOString()
        }
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error sending contact message:', error);
      throw error;
    }
  }
};

export default ContactService; 