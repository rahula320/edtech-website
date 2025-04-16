# EdTech Website - Full Stack Application

This is a full-stack application for an educational technology platform, split into client and server components for easier development and deployment.

## Features

- Modern and responsive design
- Interactive UI elements
- Smooth animations and transitions
- Mobile-friendly layout
- Contact form with validation
- Parallax effects

## Project Structure

The project is organized into two main directories:

- **`/client`**: React frontend application
- **`/server`**: Express backend API server

This separation makes it easier to deploy the application to various hosting platforms that might have different requirements for frontend and backend hosting.

## Development Setup

1. **Setup the server:**
   ```
   cd server
   npm install
   cp .env.example .env  # Create and configure your .env file
   npm run dev
   ```

2. **Setup the client:**
   ```
   cd client
   npm install
   npm start
   ```

During development:
- The backend server runs on port 5001
- The frontend development server runs on port 3000
- The client proxies API requests to the backend

## Production Deployment Options

### Option 1: Unified Deployment

Deploy both frontend and backend to a single server:

1. Build the client:
   ```
   cd client
   npm run build
   ```

2. Start the server in production mode:
   ```
   cd server
   NODE_ENV=production npm start
   ```

The server will serve the static client files and handle API requests.

### Option 2: Separate Deployments

Deploy the client and server independently:

1. **Client:** Deploy the built React app to a static hosting service like Netlify, Vercel, or GitHub Pages.
   ```
   cd client
   npm run build
   # Deploy the build folder to your chosen provider
   ```

2. **Server:** Deploy the Node.js server to a service like Heroku, Railway, or Digital Ocean.
   ```
   cd server
   # Deploy to your chosen provider
   ```

   Make sure to update the client's API endpoints to point to your deployed server URL.

## Environment Variables

### Server Environment Variables

Create a `.env` file in the server directory:

```
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/edtech
SESSION_SECRET=your-secret-key-change-this-in-production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
ADMIN_EMAIL=admin@example.com
```

### Client Environment Variables (if needed for separate deployment)

Create a `.env` file in the client directory for production build configuration:

```
REACT_APP_API_URL=https://your-api-server-url.com
```

## Technologies Used

- **Frontend:** React, React Router, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Passport.js
- **Icons:** Font Awesome

## License

ISC 