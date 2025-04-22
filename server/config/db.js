require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');

// Get the database URL from environment variables with fallback for local development
const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_OSsZKqm1iTV3@ep-floral-silence-a18kxybn-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

// Create a SQL client
const sql = neon(databaseUrl);

// Test database connection
async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log(`Database connected! Server time: ${result[0].now}`);
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

// Initialize database - create tables if they don't exist
async function initDatabase() {
  try {
    // Create users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log("Users table initialized");
    
    // Check if admin user exists, if not create default admin using environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.error('ADMIN_EMAIL environment variable is not set. Admin user cannot be created.');
      return;
    }
    
    // Check if admin exists
    const adminUsers = await sql`SELECT * FROM users WHERE email = ${adminEmail} AND role = 'admin'`;
    
    if (adminUsers.length === 0) {
      // Only create if admin doesn't exist
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (!adminPassword) {
        console.error('ADMIN_PASSWORD environment variable is not set. Admin user cannot be created.');
        return;
      }
      
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      await sql`
        INSERT INTO users (email, password, role, username, first_name, last_name, created_at)
        VALUES (${adminEmail}, ${hashedPassword}, 'admin', 'admin', 'Admin', 'User', ${new Date().toISOString()})
      `;
      console.log(`Admin user created with email: ${adminEmail}`);
    } else {
      console.log(`Admin user already exists with email: ${adminEmail}`);
    }
    
    // Create applications table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(255),
        designation VARCHAR(255),
        experience INTEGER,
        education TEXT,
        domains TEXT,
        resume_url TEXT,
        portfolio_url TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Applications table initialized');
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Function to update admin password
async function updateAdminPassword(email, newPassword) {
  try {
    // Hash the new password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the password for the admin user
    const result = await sql`
      UPDATE users 
      SET password = ${hashedPassword} 
      WHERE email = ${email} AND role = 'admin'
      RETURNING id
    `;
    
    if (result.length > 0) {
      console.log(`Admin password updated successfully for: ${email}`);
      return true;
    } else {
      console.log(`Admin user not found with email: ${email}`);
      return false;
    }
  } catch (error) {
    console.error('Error updating admin password:', error);
    return false;
  }
}

module.exports = {
  sql,
  testConnection,
  initDatabase,
  updateAdminPassword
}; 