# EdTech Website Client

This is the frontend client for the EdTech website built with React.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

   This will start the React development server on port 3000. The client will proxy API requests to the backend server running on port 5001.

3. Build for production:
   ```
   npm run build
   ```

   This will create a production build in the `build` directory.

## Features

- User authentication (login/register)
- Course/program browsing
- Contact form
- Responsive design for mobile and desktop
- Interactive UI with Font Awesome icons

## Deployment

For deployment:

1. Build the production version:
   ```
   npm run build
   ```

2. The backend server will serve these static files when in production mode.

## Development Notes

- The client uses React Router for navigation
- API calls are made to the backend server using Axios
- The proxy setting in package.json handles redirecting API requests to the backend during development
- Font Awesome is used for icons throughout the application 