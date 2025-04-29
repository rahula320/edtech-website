# ACMYX API Server

Backend API for the ACMYX education platform.

## Deployment Instructions

### Deploy on Vercel

1. Create a new project on Vercel
2. Import from GitHub repository
3. Configure the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A secure random string for session management
   - `NODE_ENV`: Set to "production"

### Required Domain Setup

This API should be deployed with one of the following domains:
- `api-edtech-website.vercel.app` (for the main site at edtech-website.vercel.app)
- `api.acmyx.com` (for the main site at acmyx.com)

### API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Check server health
- `POST /api/applications/mentor` - Submit mentor application
- `POST /api/applications/bda` - Submit BDA application
- `POST /api/applications/campus-ambassador` - Submit campus ambassador application

## Development

```bash
# Install dependencies
npm install

# Run in development with environment variables
DATABASE_URL=your-database-url SESSION_SECRET=your-secret node server.js
```

## Database

The API uses PostgreSQL with Sequelize ORM. Make sure your database connection string is correctly set in the environment variables.

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

The server can be deployed using Docker with the included Dockerfile and docker-compose.yml.

```
docker-compose up -d
```

## License

ISC 