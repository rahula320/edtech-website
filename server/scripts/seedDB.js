require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const Course = require('../models/Course');
const Contact = require('../models/Contact');

// Import database connection
const connectDB = require('../config/db');

// Sample data
const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User'
  },
  {
    username: 'instructor1',
    email: 'instructor1@example.com',
    password: 'password123',
    role: 'instructor',
    firstName: 'John',
    lastName: 'Doe'
  },
  {
    username: 'student1',
    email: 'student1@example.com',
    password: 'password123',
    role: 'student',
    firstName: 'Jane',
    lastName: 'Smith'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Contact.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Create users
    const createdUsers = [];
    for (const user of users) {
      const newUser = new User(user);
      const savedUser = await newUser.save();
      createdUsers.push(savedUser);
      console.log(`User created: ${savedUser.username}`);
    }
    
    // Get instructor ID
    const instructor = createdUsers.find(user => user.role === 'instructor');
    
    // Create courses
    const courses = [
      {
        title: 'Introduction to Web Development',
        description: 'Learn the basics of HTML, CSS, and JavaScript',
        instructor: instructor._id,
        price: 99.99,
        duration: 120,
        level: 'beginner',
        topics: ['HTML', 'CSS', 'JavaScript'],
        status: 'published'
      },
      {
        title: 'Advanced React',
        description: 'Master React hooks, context API, and Redux',
        instructor: instructor._id,
        price: 149.99,
        duration: 180,
        level: 'advanced',
        topics: ['React', 'Redux', 'JavaScript'],
        status: 'published'
      }
    ];
    
    for (const course of courses) {
      const newCourse = new Course(course);
      await newCourse.save();
      console.log(`Course created: ${newCourse.title}`);
    }
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 