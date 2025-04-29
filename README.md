# EdTech Website - Local Development

A simple educational technology platform for local development and testing.

## 🚀 Features

- Modern and responsive design
- Interactive UI elements
- Mobile-friendly layout
- Simple admin authentication
- Local development setup

## 📁 Project Structure

The project is organized into two main directories:

- **`/client`**: React frontend application
- **`/server`**: Express backend API server

## 🛠️ Development Setup

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
   ```bash
   # Create server environment file
   cd ../server
   cp .env.example .env
   
   # Create client environment file
   cd ../client
   echo "REACT_APP_API_URL=http://localhost:5001/api" > .env
   echo "NODE_ENV=development" >> .env
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

During development:
- The backend server runs on port 5001
- The frontend development server runs on port 3000
- The client proxies API requests to the backend

## 🔐 Admin Access

The application uses simple in-memory authentication:
- Username: `admin`
- Password: `admin123`

## 💻 Technologies Used

- **Frontend:** React, React Router, CSS
- **Backend:** Node.js, Express
- **Authentication:** Passport.js, Express Session

## 📄 License

ISC

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 📧 Contact

For questions or feedback, reach out to the project maintainer. 