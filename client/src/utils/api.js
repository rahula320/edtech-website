import axios from 'axios';

// Get the base URL for API calls depending on environment and hostname
const getApiUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // Production environment - determine the API URL based on hostname
  const hostname = window.location.hostname;
  console.log('Current hostname:', hostname);
  
  if (hostname === 'edtech-website.vercel.app') {
    return 'https://api-edtech-website.vercel.app'; // Separate API deployment
  } else if (hostname === 'acmyx.com' || hostname === 'www.acmyx.com') {
    return 'https://api.acmyx.com';
  } else {
    // Fallback to same-origin API
    return '';
  }
};

const baseURL = getApiUrl();
console.log('API baseURL:', baseURL, 'Environment:', process.env.NODE_ENV);

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000, // 15 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    console.error('API Error:', errorMessage, error.response || error);
    return Promise.reject(error);
  }
);

// Authentication
export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const adminLogin = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.get('/logout');
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const isAdmin = async () => {
  try {
    // For now, rely on the localStorage value for simplicity
    return localStorage.getItem('adminAuth') === 'true';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Admin Dashboard API
export const getApplications = async () => {
  const response = await api.get('/admin/applications');
  return response.data;
};

export const getMentorApplications = async () => {
  const response = await api.get('/admin/applications/mentor');
  return response.data;
};

export const getBdaApplications = async () => {
  const response = await api.get('/admin/applications/bda');
  return response.data;
};

export const getDashboardMetrics = async () => {
  const response = await api.get('/admin/metrics');
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.put(`/admin/applications/${applicationId}`, { status });
  return response.data;
};

export const deleteApplication = async (applicationId) => {
  const response = await api.delete(`/admin/applications/${applicationId}`);
  return response.data;
};

// Contact Form
export const submitContactForm = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data;
};

// Applications
export const submitMentorApplication = async (formData) => {
  const response = await api.post('/applications/mentor', formData);
  return response.data;
};

export const submitBdaApplication = async (formData) => {
  const response = await api.post('/applications/bda', formData);
  return response.data;
};

export default api; 