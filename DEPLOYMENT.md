# Deploying ACMYX to Vercel with Appwrite

This guide will walk you through deploying the ACMYX website using Vercel for hosting and Appwrite for the backend database.

## Prerequisites

- [Vercel account](https://vercel.com/)
- [Appwrite account](https://appwrite.io/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v14+ recommended)

## Step 1: Setting up Appwrite

1. Create a new account on [Appwrite](https://appwrite.io/) or login to your existing account.

2. Create a new project:
   - Go to the Appwrite console
   - Click "Create Project"
   - Give your project a name (e.g., "ACMYX")
   - Click "Create"

3. Create a new database:
   - In your project, go to "Databases"
   - Click "Create Database"
   - Name it "acmyx" or whatever you prefer
   - Click "Create"

4. Create the following collections:

   **Users Collection:**
   - Name: "users"
   - Attributes:
     - username (string, required)
     - email (string, required)
     - firstName (string, required)
     - lastName (string, required)
     - role (string, required, default "student")
     - createdAt (string, required)

   **Courses Collection:**
   - Name: "courses"
   - Attributes:
     - title (string, required)
     - description (string, required)
     - instructor (string, required)
     - price (number, required)
     - duration (string, required)
     - level (string, required)
     - topics (string array)
     - status (string, required, default "published")
     - enrolledStudents (string array)
     - createdAt (string, required)

   **Contacts Collection:**
   - Name: "contacts"
   - Attributes:
     - name (string, required)
     - email (string, required)
     - message (string, required)
     - createdAt (string, required)

5. Set up permissions for each collection:
   - Go to the collection → Settings → Permissions
   - For each collection, set appropriate read/write permissions

6. Create an API key:
   - Go to Project Settings → API Keys
   - Create a new API key with permissions to:
     - Read/Write to Database
     - Read/Write to Users
   - Copy the API key for later use

## Step 2: Setting up Environment Variables

1. Create the following .env files:

   **For the server (.env in server directory):**
   ```
   # Server Configuration
   PORT=5001
   NODE_ENV=production
   SESSION_SECRET=your_session_secret

   # Email Configuration (optional for production)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ADMIN_EMAIL=admin@acmyx.com

   # Appwrite Configuration
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_appwrite_project_id
   APPWRITE_API_KEY=your_appwrite_api_key
   APPWRITE_DATABASE_ID=your_appwrite_database_id
   ```

   **For the client (.env in client directory):**
   ```
   # API Configuration
   REACT_APP_API_URL=http://localhost:5001

   # Appwrite Configuration
   REACT_APP_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   REACT_APP_APPWRITE_PROJECT_ID=your_appwrite_project_id
   REACT_APP_APPWRITE_DATABASE_ID=your_appwrite_database_id
   ```

2. Replace the placeholder values with your actual Appwrite credentials.

## Step 3: Deploy to Vercel

1. Create a new repository for your project (if not already done).

2. Push your code to the repository:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

3. Connect your repository to Vercel:
   - Go to [Vercel](https://vercel.com/)
   - Click "New Project"
   - Import your repository
   - Configure the project:
     - Framework: Other
     - Root Directory: ./
     - Build Command: npm run install-all && npm run client:build
     - Output Directory: client/build
     - Install Command: npm run install-all

4. Add environment variables:
   - In the Vercel project settings, add all the environment variables from both .env files
   - Make sure to prefix the client-side variables with REACT_APP_

5. Deploy the project:
   - Click "Deploy"
   - Wait for the deployment to complete

## Step 4: Verify the Deployment

1. Once the deployment is complete, Vercel will provide you with a URL.

2. Visit the URL to verify that the website is working correctly.

3. Test the following functionality:
   - Registration
   - Login
   - Viewing courses
   - Contact form

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Vercel build logs for errors.

2. Verify that all environment variables are correctly set.

3. Make sure your Appwrite collections have the correct permissions.

4. Check the browser console for any client-side errors.

5. Check the server logs on Vercel for any server-side errors.

## Additional Notes

- For production, consider using a real email service like SendGrid instead of Gmail.
- Make sure to secure your API keys and never commit them to the repository.
- Consider adding more security measures like rate limiting and CORS restrictions for production.
- Regularly back up your Appwrite database. 