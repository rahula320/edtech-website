# EdTech Website Server

Backend server for the EdTech website with MongoDB integration.

## Features

- Express.js backend
- MongoDB database for data storage
- User authentication with Passport.js
- Session management
- RESTful API endpoints

## Database Models

The following models are defined:

1. **User**
   - Authentication and user management
   - Roles: student, instructor, admin

2. **Course**
   - Educational content
   - Supports different levels and topics

3. **Contact**
   - Contact form submissions
   - Status tracking (new, read, replied, closed)
   - Stored in MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- MongoDB Atlas account or local MongoDB installation

### Environment Setup

1. Copy the example environment file:
   ```
   cp .env.example .env
   ```

2. Update the `.env` file with your own values:
   ```
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   SESSION_SECRET=your-secret-key-change-this-in-production
   ```

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Test the database connection:
   ```
   node scripts/test-db.js
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Database Connection

The server connects to MongoDB using Mongoose. The connection is established in `config/db.js` with automatic retry logic for better reliability.

### MongoDB Atlas

This project uses MongoDB Atlas for the database. The connection string is stored in the .env file.

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login
- `GET /api/logout` - Logout
- `GET /api/user` - Get current user

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create a new course (instructors only)

### Contact
- `POST /api/contact` - Submit contact form (stores in MongoDB)
- `GET /api/admin/contacts` - Get all contacts (admin only)
- `PUT /api/admin/contacts/:id` - Update contact status (admin only)

## Docker Deployment

The server can be deployed using Docker with the included Dockerfile and docker-compose.yml.

```
docker-compose up -d
```

## License

ISC 