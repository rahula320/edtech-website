import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  headers: {
    'Content-Type': 'application/json'
  }
});

// API functions
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/api/register', { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.get('/api/logout');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/user');
    return response.data;
  } catch (error) {
    // Don't log 401s as they're expected when not logged in
    if (error.response && error.response.status !== 401) {
      console.error('Get current user failed:', error);
    }
    return { user: null };
  }
};

export const submitContactForm = async (name, email, message) => {
  try {
    const response = await api.post('/api/contact', { name, email, message });
    return response.data;
  } catch (error) {
    console.error('Contact form submission failed:', error);
    throw error;
  }
};

// Add request interceptor to handle tokens if needed
api.interceptors.request.use(
  (config) => {
    // You can add auth token to requests here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors
      console.log('User is not authenticated');
      // You could redirect to login page here
    }
    return Promise.reject(error);
  }
);

export default api; 