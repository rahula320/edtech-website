# EdTech Website Server

This is the backend server for the EdTech website. It provides API endpoints for authentication, user management, and contact form submission.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/edtech
   SESSION_SECRET=your-secret-key-change-this-in-production
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   ADMIN_EMAIL=admin@example.com
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. For production, use:
   ```
   npm start
   ```

## API Endpoints

- **POST /api/register**: Register a new user
- **POST /api/login**: Authenticate a user
- **GET /api/logout**: Log out a user
- **GET /api/user**: Get the current authenticated user
- **POST /api/contact**: Submit a contact form
- **GET /api/health**: Health check endpoint

## Deployment

For deployment to a production server:

1. Set the environment variables:
   - Set `NODE_ENV=production`
   - Update `MONGODB_URI` to your production MongoDB instance
   - Set a strong `SESSION_SECRET`
   - Configure proper email credentials

2. Build the client application:
   ```
   cd ../client
   npm run build
   ```

3. Start the server:
   ```
   cd ../server
   npm start
   ```

The server will serve the built client files in production mode. 