import axios from 'axios';

// Authentication service using the server API
const AuthService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await axios.post('/api/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error during registration');
    }
  },

  // Login user with email and password
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/login', credentials);
      if (response.data.success) {
        // Store user session info
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      }
      throw new Error('Login failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Logout current user
  logout: async () => {
    try {
      await axios.get('/api/logout');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      throw new Error('Logout failed');
    }
  },

  // Get current user
  getCurrentUser: () => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    return JSON.parse(userJson);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },

  // Check if user is admin
  isAdmin: () => {
    const user = AuthService.getCurrentUser();
    return user && user.role === 'admin';
  }
};

export default AuthService; 