# EdTech Website Server

Backend server for the EdTech website.

## Features

- Express.js backend
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

### Environment Setup

1. Copy the example environment file:
   ```
   cp .env.example .env
   ```

2. Update the `.env` file with your own values:
   ```
   PORT=5001
   NODE_ENV=development
   SESSION_SECRET=your-secret-key-change-this-in-production
   ```

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify user token

### Programs
- `GET /api/programs` - Get all programs
- `GET /api/programs/:id` - Get program by ID

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create a new course (instructors only)

## Docker Deployment

The server can be deployed using Docker with the included Dockerfile and docker-compose.yml.

```
docker-compose up -d
```

## License

ISC 