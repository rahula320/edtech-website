import { Client, Databases, Account, ID } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID || '');

// Initialize Appwrite services
const databases = new Databases(client);
const account = new Account(client);

// Database and collection IDs
const databaseId = process.env.REACT_APP_APPWRITE_DATABASE_ID || '';

// Collection IDs
const usersCollectionId = 'users';
const coursesCollectionId = 'courses';
const contactsCollectionId = 'contacts';

export {
    client,
    databases,
    account,
    databaseId,
    usersCollectionId,
    coursesCollectionId,
    contactsCollectionId,
    ID
}; 