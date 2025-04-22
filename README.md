# EdTech Website - Full Stack Application

![EdTech Platform](https://img.shields.io/badge/EdTech-Platform-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248)

This is a full-stack application for an educational technology platform, split into client and server components for easier development and deployment.

## 🚀 Features

- Modern and responsive design
- Interactive UI elements
- Smooth animations and transitions
- Mobile-friendly layout
- Contact form with validation
- Parallax effects
- User authentication system
- Course browsing and management
- RESTful API architecture

## 📁 Project Structure

The project is organized into two main directories:

- **`/client`**: React frontend application
- **`/server`**: Express backend API server

This separation makes it easier to deploy the application to various hosting platforms that might have different requirements for frontend and backend hosting.

## 🛠️ Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rk2319/edtech-website.git
   cd edtech-website
   ```

2. **Run the clean installation script:**
   ```bash
   ./clean-install.sh
   ```

3. **Setup the server:**
   ```bash
   cd server
   cp .env.example .env  # Create and configure your .env file
   npm run dev
   ```

4. **Setup the client:**
   ```bash
   cd client
   npm start
   ```

During development:
- The backend server runs on port 5001
- The frontend development server runs on port 3000
- The client proxies API requests to the backend

## 🚀 Production Deployment Options

### Option 1: Unified Deployment

Deploy both frontend and backend to a single server:

1. Build the client:
   ```bash
   cd client
   npm run build
   ```

2. Start the server in production mode:
   ```bash
   cd server
   NODE_ENV=production npm start
   ```

The server will serve the static client files and handle API requests.

### Option 2: Separate Deployments

Deploy the client and server independently:

1. **Client:** Deploy the built React app to a static hosting service like Netlify, Vercel, or GitHub Pages.
   ```bash
   cd client
   npm run build
   # Deploy the build folder to your chosen provider
   ```

2. **Server:** Deploy the Node.js server to a service like Heroku, Railway, or Digital Ocean.
   ```bash
   cd server
   # Deploy to your chosen provider
   ```

   Make sure to update the client's API endpoints to point to your deployed server URL.

### Option 3: Docker Deployment

For containerized deployment:
```bash
docker-compose up -d
```

## ⚙️ Environment Variables

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

## 💻 Technologies Used

- **Frontend:** React, React Router, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Passport.js
- **Icons:** Font Awesome
- **Containerization:** Docker, Docker Compose
- **Deployment:** Shell scripts for automation

## 📄 License

ISC

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 📧 Contact

For questions or feedback, reach out to the project maintainer.

## Deployment to Vercel

### Prerequisites
- A Vercel account
- Vercel CLI installed (`npm install -g vercel`)
- Appwrite account with project setup

### Automatic Deployment
1. Run the deployment script:
   ```
   npm run deploy
   ```
   
2. Follow the prompts from the Vercel CLI.

3. When deployment is complete, your application will be available at the provided Vercel URL.

### Manual Deployment
If you prefer to deploy manually:

1. Login to Vercel:
   ```
   vercel login
   ```

2. Deploy the application:
   ```
   vercel --prod
   ```

3. Configure environment variables in the Vercel dashboard:
   - `APPWRITE_ENDPOINT`: https://fra.cloud.appwrite.io/v1
   - `APPWRITE_PROJECT_ID`: Your Appwrite project ID
   - `APPWRITE_DATABASE_ID`: Your Appwrite database ID
   - `APPWRITE_API_KEY`: Your Appwrite API key
   - `SESSION_SECRET`: A secure random string

### Admin Access
Once deployed, you can access the admin panel at:
```
https://[your-vercel-domain]/admin
```

Login with:
- Email: admin@acmyx.com
- Password: admin123

## Development

### Setup
1. Install dependencies:
   ```
   npm run install-all
   ```

2. Start development servers:
   ```
   npm run dev
   ```

### Project Structure
- `/client` - React frontend
- `/server` - Express backend
- `vercel.json` - Vercel deployment configuration 