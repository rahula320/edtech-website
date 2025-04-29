# ACMYX Education Platform

A comprehensive educational technology platform for providing online courses with industry mentorship, hands-on projects, and certifications.

![ACMYX Platform](https://edtech-website.vercel.app/screenshot.png)

## 🚀 Live Demo

- **Frontend**: [https://edtech-website.vercel.app](https://edtech-website.vercel.app)
- **API**: [https://api-edtech-website.vercel.app](https://api-edtech-website.vercel.app)

## ✨ Features

- **Modern Responsive Design**: Mobile-friendly layout with interactive UI elements
- **Course Portfolio**: Comprehensive courses in various tech domains
- **Authentication**: User and admin authentication system
- **Contact Forms**: Interactive forms for user inquiries
- **Database Integration**: PostgreSQL database for persistent storage
- **API Architecture**: RESTful API backend for client communication
- **Deployment Ready**: Configuration for Vercel deployment

## 📁 Project Structure

The project is organized into two main directories:

- **`/client`**: React frontend application
- **`/server`**: Express backend API server
- **`/api`**: Serverless entry point for Vercel deployment

## 🛠️ Development Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL database

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rahula320/edtech-website.git
   cd edtech-website
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment files:**
   
   Create a `.env` file in the server directory with:
   ```
   NODE_ENV=development
   PORT=3001
   SESSION_SECRET=your-secret-key
   DATABASE_URL=postgresql://username:password@localhost:5432/database
   ```

   Create a `.env` file in the client directory with:
   ```
   REACT_APP_API_URL=
   NODE_ENV=development
   ```

4. **Start the development servers:**
   ```bash
   # Terminal 1 - Start the backend server
   cd server
   npm run dev

   # Terminal 2 - Start the frontend development server
   cd client
   npm start
   ```

The development setup runs with:
- Backend server on port 3001
- Frontend development server on port 3000
- API requests automatically proxied to backend

## 🌐 Production Deployment

### Vercel Deployment

This project is configured for deployment on Vercel:

1. **Frontend Deployment**:
   - Connect your GitHub repository to Vercel
   - Configure build settings:
     - Build Command: `cd client && npm install && npm run build`
     - Output Directory: `client/build`

2. **API Deployment**:
   - Create a separate deployment for the API
   - Configure build settings:
     - Build Command: `cd server && npm install`
     - Output Directory: `server`
   - Add environment variables:
     - `NODE_ENV`: `production`
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `SESSION_SECRET`: A secure random string

### Environment Variables

Required environment variables for production:

- **Frontend**:
  - `REACT_APP_API_URL`: URL of your API endpoint (if separate from frontend)

- **Backend**:
  - `NODE_ENV`: Set to 'production'
  - `DATABASE_URL`: PostgreSQL connection string
  - `SESSION_SECRET`: Secret key for session encryption
  - `PORT`: Port for the server (usually set by Vercel)

## 💾 Database Configuration

The application uses PostgreSQL for data storage:

- **Development**: Local PostgreSQL or cloud-based PostgreSQL
- **Production**: Neon PostgreSQL or any other PostgreSQL provider

Database tables:
- `contacts`: Stores contact form submissions
- (More tables will be added as the application grows)

## 🔐 Admin Access

The application includes a simple admin panel with in-memory authentication:
- Username: `admin`
- Password: `admin123`

## 💻 Technologies Used

### Frontend
- React 18
- React Router 6
- Axios for API requests
- CSS3 with custom animations
- Responsive design with CSS Grid/Flexbox

### Backend
- Node.js
- Express
- PostgreSQL with Sequelize ORM
- Passport.js for authentication
- Express Session for session management
- CORS for cross-origin resource sharing

### Deployment
- Vercel for hosting
- GitHub for version control
- Environment variables for configuration

## 🧪 Testing

Run tests with:

```bash
# Client tests
cd client
npm test

# Server tests (when implemented)
cd server
npm test
```

## 📄 License

ISC

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/rahula320/edtech-website/issues).

## 📧 Contact

For questions or feedback, reach out to: acmyxteams@gmail.com 