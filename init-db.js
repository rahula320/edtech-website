/**
 * Database Initialization Script for Neon PostgreSQL
 * 
 * This script checks the connection to the Neon database and creates
 * the necessary tables if they don't exist.
 */

const { neon } = require('@neondatabase/serverless');

// Initialize Neon serverless client with hardcoded connection string
const databaseUrl = "postgresql://neondb_owner:npg_OSsZKqm1iTV3@ep-floral-silence-a18kxybn-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(databaseUrl);

async function initDatabase() {
  try {
    console.log('Testing database connection...');
    const result = await sql`SELECT NOW()`;
    console.log('Database connection successful:', result[0].now);
    
    console.log('Creating admin_users table if it does not exist...');
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Check if admin user exists, if not create default admin
    const adminUsers = await sql`SELECT * FROM admin_users WHERE email = 'admin@acmyx.com'`;
    
    if (adminUsers.length === 0) {
      console.log('Creating default admin user...');
      await sql`
        INSERT INTO admin_users (email, password, role)
        VALUES ('admin@acmyx.com', 'admin123', 'admin')
      `;
      console.log('Default admin user created');
    } else {
      console.log('Default admin user already exists.');
    }

    // Create applications table for storing form submissions
    console.log('Creating applications table if it does not exist...');
    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        designation VARCHAR(255),
        experience VARCHAR(50),
        education TEXT,
        domains TEXT[],
        resume_url TEXT,
        portfolio_url TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Database initialization completed successfully!');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    return false;
  }
}

// Run the initialization
initDatabase().then(success => {
  if (success) {
    console.log('Database setup completed. You can now start the application.');
  } else {
    console.error('Database setup failed. Please check your connection settings.');
    process.exit(1);
  }
}); 