import axios from 'axios';

// In development, React will proxy requests to the URL in package.json's "proxy" field
// In production, use the environment variable or fallback to relative path
const isDevelopment = process.env.NODE_ENV === 'development';
// For production, try environment variable first, then specific URLs, and finally relative path
const baseURL = isDevelopment 
  ? '' 
  : (process.env.REACT_APP_API_URL || 
     (window.location.hostname === 'edtech-website.vercel.app' 
       ? 'https://edtech-website.vercel.app/api' 
       : window.location.hostname === 'acmyx.com' || window.location.hostname === 'www.acmyx.com'
         ? 'https://acmyx.com/api'
         : '/api'));

console.log('API baseURL:', baseURL, 'Environment:', process.env.NODE_ENV, 'Hostname:', window.location.hostname);

const api = axios.create({
  baseURL,
  withCredentials: true,
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