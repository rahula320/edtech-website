# EdTech Website Server

Backend server for the EdTech website with MongoDB integration.

## Features

- Express.js backend
- MongoDB database with Mongoose ODM
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
   - Status tracking

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (local or Atlas)

### Environment Setup

1. Copy the example environment file:
   ```
   cp .env.example .env
   ```

2. Update the `.env` file with your own values:
   ```
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/edtech
   MONGODB_USER=
   MONGODB_PASSWORD=
   MONGODB_DATABASE=edtech
   SESSION_SECRET=your-secret-key-change-this-in-production
   ```

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Seed the database with initial data:
   ```
   npm run seed
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Database Connection

The server connects to MongoDB using Mongoose. The connection is established in `config/db.js` with automatic retry logic for better reliability.

### Local Development

For local development, MongoDB should be running on your machine or accessible via network. The default connection string is `mongodb://localhost:27017/edtech`.

### Production

In production, use the complete connection string with authentication in the `MONGODB_URI` environment variable. When using Docker, the MongoDB service is automatically configured.

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
- `POST /api/contact` - Submit contact form (logs message to console)

## Docker Deployment

The server can be deployed using Docker with the included Dockerfile and docker-compose.yml. The MongoDB service is included in the Docker Compose configuration.

```
docker-compose up -d
```

## License

ISC 