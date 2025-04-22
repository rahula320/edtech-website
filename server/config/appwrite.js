const { Client, Databases, Users, ID, Query } = require('node-appwrite');

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

// Initialize Appwrite services
const databases = new Databases(client);
const users = new Users(client);

// Database and collection IDs
const databaseId = process.env.APPWRITE_DATABASE_ID || '';

// Collection IDs
const usersCollectionId = 'users';
const coursesCollectionId = 'courses';
const contactsCollectionId = 'contacts';

module.exports = {
    client,
    databases,
    users,
    databaseId,
    usersCollectionId,
    coursesCollectionId,
    contactsCollectionId,
    ID,
    Query
}; 