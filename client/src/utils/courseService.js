import axios from 'axios';

// Course service using the server API
const CourseService = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await axios.get('/api/courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await axios.get(`/api/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      throw error;
    }
  },

  // Create a new course
  createCourse: async (courseData) => {
    try {
      const response = await axios.post('/api/courses', courseData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  // Update a course
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await axios.put(`/api/courses/${courseId}`, courseData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating course ${courseId}:`, error);
      throw error;
    }
  },

  // Delete a course
  deleteCourse: async (courseId) => {
    try {
      const response = await axios.delete(`/api/courses/${courseId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting course ${courseId}:`, error);
      throw error;
    }
  },

  // Enroll in a course
  enrollInCourse: async (courseId) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/enroll`, {}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error enrolling in course ${courseId}:`, error);
      throw error;
    }
  },

  // Get enrolled courses for current user
  getEnrolledCourses: async () => {
    try {
      const response = await axios.get('/api/user/courses', {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      throw error;
    }
  }
};

export default CourseService; 