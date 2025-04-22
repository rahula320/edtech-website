const { Client, Databases, Users, ID, Query } = require('node-appwrite');

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '6807acd800061e46f305')
    .setKey(process.env.APPWRITE_API_KEY || 'standard_4379bcaf1514fc33d478d772903a03a1a9e90ff7f19e2229f5719dc611c880798739315f4c159a90ec2957e7ea4206ad43c02b7936aa0f7c14dacf7ccf04bec6051ade6911abbaad57a14a56fbd28b5395413bfbc269ae45906766398d11114176b47e149892c85c3e629c9d352bafa5cb7ca64494c56f235b717a2a7702ee78');

// Initialize Appwrite services
const databases = new Databases(client);
const users = new Users(client);

// Database and collection IDs
const databaseId = process.env.APPWRITE_DATABASE_ID || '6807b03b001c93ebc92a';

// Collection IDs
const usersCollectionId = 'users';
const coursesCollectionId = 'courses';
const contactsCollectionId = 'contacts';
const adminsCollectionId = 'admins';

module.exports = {
    client,
    databases,
    users,
    databaseId,
    usersCollectionId,
    coursesCollectionId,
    contactsCollectionId,
    adminsCollectionId,
    ID,
    Query
}; 