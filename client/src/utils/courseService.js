import { databases, databaseId, coursesCollectionId, ID, Query } from './appwrite';

// Course service using Appwrite
const CourseService = {
  // Get all published courses
  getAllCourses: async () => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        coursesCollectionId,
        [Query.equal('status', 'published')]
      );
      
      return response.documents;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },
  
  // Get course by ID
  getCourseById: async (courseId) => {
    try {
      const course = await databases.getDocument(
        databaseId,
        coursesCollectionId,
        courseId
      );
      
      return course;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },
  
  // Create new course (for instructors)
  createCourse: async (courseData) => {
    try {
      const course = await databases.createDocument(
        databaseId,
        coursesCollectionId,
        ID.unique(),
        {
          ...courseData,
          status: 'published',
          enrolledStudents: [],
          createdAt: new Date().toISOString()
        }
      );
      
      return course;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },
  
  // Enroll in a course
  enrollInCourse: async (courseId, userId) => {
    try {
      // Get current course
      const course = await databases.getDocument(
        databaseId,
        coursesCollectionId,
        courseId
      );
      
      // Add user to enrolled students
      const enrolledStudents = course.enrolledStudents || [];
      
      if (!enrolledStudents.includes(userId)) {
        enrolledStudents.push(userId);
        
        // Update course
        await databases.updateDocument(
          databaseId,
          coursesCollectionId,
          courseId,
          {
            enrolledStudents
          }
        );
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error;
    }
  },
  
  // Get enrolled courses for a user
  getEnrolledCourses: async (userId) => {
    try {
      const courses = await databases.listDocuments(
        databaseId,
        coursesCollectionId,
        [Query.search('enrolledStudents', userId)]
      );
      
      return courses.documents;
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      throw error;
    }
  }
};

export default CourseService; 