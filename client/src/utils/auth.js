import { account, databases, databaseId, usersCollectionId, ID } from './appwrite';

// Authentication service using Appwrite
const AuthService = {
  // Register a new user
  register: async (userData) => {
    try {
      // Create account in Appwrite
      const newAccount = await account.create(
        ID.unique(),
        userData.email,
        userData.password,
        `${userData.firstName} ${userData.lastName}`
      );
      
      // Create user record in database
      await databases.createDocument(
        databaseId,
        usersCollectionId,
        newAccount.$id,
        {
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: 'student',
          createdAt: new Date().toISOString()
        }
      );
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Login user
  login: async (email, password) => {
    try {
      // Create email session in Appwrite
      await account.createEmailSession(email, password);
      
      // Get account
      const user = await account.get();
      
      // Get user details from database
      const userDetails = await databases.getDocument(
        databaseId,
        usersCollectionId,
        user.$id
      );
      
      return { success: true, user: userDetails };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      await account.deleteSession('current');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  
  // Get current user
  getCurrentUser: async () => {
    try {
      const user = await account.get();
      
      // Get user details from database
      const userDetails = await databases.getDocument(
        databaseId,
        usersCollectionId,
        user.$id
      );
      
      return userDetails;
    } catch (error) {
      return null;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      await account.get();
      return true;
    } catch (error) {
      return false;
    }
  }
};

export default AuthService; 