# Deploying ACMYX to Vercel with Neon PostgreSQL

This guide will walk you through deploying the ACMYX website using Vercel for hosting and Neon PostgreSQL for the database.

## Prerequisites

- [Vercel account](https://vercel.com/signup)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Neon PostgreSQL account](https://neon.tech/)
- [Git](https://git-scm.com/)

## Step 1: Setting up Neon PostgreSQL

1. Create a new account on [Neon](https://neon.tech/) or login to your existing account.
2. Create a new project with the following steps:
   - Name your project (e.g., "ACMYX")
   - Select a region closest to your users
   - Complete the project creation

3. Create the necessary tables for the application:
   - Use the SQL editor to run the database initialization SQL (you can find this in the setup scripts)
   - Make note of your database connection string which should look like:
     ```
     postgresql://username:password@hostname:port/database?sslmode=require
     ```

## Step 2: Preparing Your Project for Deployment

1. Ensure your code is in a Git repository (GitHub, GitLab, or Bitbucket).

2. Make sure your project has a `vercel.json` file at the root level. You can copy and modify `vercel.json.example`.

3. Update environment variables:
   - Create a `.env` file (for local development) based on the `.env.example` template
   - Make sure to include your Neon PostgreSQL connection string

## Step 3: Deploying to Vercel

### Option 1: Using Vercel Dashboard

1. Login to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure your project:
   - Set the framework preset to "Other"
   - Set the root directory (if not the repository root)
   - Configure environment variables:

```
# Server Configuration
NODE_ENV=production
DATABASE_URL=your_neon_postgresql_connection_string
SESSION_SECRET=your_secure_session_secret

# Admin Configuration
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_secure_admin_password

# Email Configuration (optional)
EMAIL_USER=your_email_service_username
EMAIL_PASS=your_email_service_password
```

5. Click "Deploy"

### Option 2: Using Vercel CLI

1. Install the Vercel CLI globally:
   ```
   npm install -g vercel
   ```

2. Login to Vercel from the command line:
   ```
   vercel login
   ```

3. Navigate to your project directory and run:
   ```
   vercel
   ```

4. Follow the prompts to complete the deployment
   - When asked about environment variables, add them manually or use a `.env` file

## Step 4: Post-Deployment Configuration

1. Once deployed, your application will be available at a Vercel URL (e.g., `https://acmyx.vercel.app`)

2. Verify that your application can connect to the Neon PostgreSQL database:
   - Visit your application's dashboard or health endpoint
   - Ensure all features work correctly

3. Make sure your database tables were created properly:
   - The application should initialize the database on first run
   - If not, check the Vercel logs and ensure your connection string is correct

## Troubleshooting

- **Database Connection Issues:**
  - Check your `DATABASE_URL` environment variable
  - Ensure your IP is allowed in the Neon PostgreSQL security settings
  - Try connecting to the database from your local machine to verify credentials

- **Application Not Loading:**
  - Check the Vercel deployment logs
  - Verify that your `vercel.json` configuration is correct
  - Make sure all environment variables are set properly

- **Authentication Issues:**
  - Ensure your `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables are set
  - Check that the database tables were created correctly

## Production Best Practices

1. Set up a custom domain for your Vercel deployment.
2. Configure SSL for your domain.
3. Make sure your Neon PostgreSQL database has regular backups.
4. Consider implementing rate limiting for your APIs.
5. Regularly update your dependencies for security patches.
6. Implement proper logging and monitoring for your application.
7. Set up CI/CD for automated deployments on code changes.

## Maintenance

- Regularly back up your Neon PostgreSQL database.
- Update your application dependencies regularly.
- Monitor performance metrics in the Vercel dashboard.
- Keep an eye on database usage to ensure you stay within your plan limits. 