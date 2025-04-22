# Environment Variables Setup

This application requires several environment variables to be set up for proper functioning, especially after removing hardcoded admin credentials.

## Required Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```
# Database configuration
DATABASE_URL="postgresql://user:password@hostname:port/database?sslmode=require"

# Admin user configuration
ADMIN_EMAIL="your_admin_email@example.com"
ADMIN_PASSWORD="your_secure_password"

# Server configuration
PORT=5001
NODE_ENV=development
```

## Deploying to Vercel

When deploying to Vercel, make sure to add these environment variables in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add the following environment variables:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `ADMIN_EMAIL` - The email address for admin login
   - `ADMIN_PASSWORD` - The password for admin login
   - `NODE_ENV` - Set to "production" for production deployments

## Important Security Notes

1. **Never commit your `.env` file to version control**. It's already included in the `.gitignore` file.
2. Use strong, unique passwords for admin access.
3. In a production environment, consider implementing more secure authentication methods:
   - Implement password hashing using bcrypt
   - Use JWT tokens for authentication
   - Set up proper session management

## Local Development

For local development, you can copy these settings to your `.env` file and replace the values with your actual configuration.

## Testing

The application will create a default admin user with the credentials specified in your environment variables if no admin user exists in the database. 