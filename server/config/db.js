import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

// Use hardcoded connection string for development
const databaseUrl = "postgresql://neondb_owner:npg_OSsZKqm1iTV3@ep-floral-silence-a18kxybn-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

// Log database connection
console.log(`Connecting to database with URL: ${databaseUrl.split('@')[1]}`);

// Create a SQL client
const sql = neon(databaseUrl);

// Add query wrapper with better error handling
const safeQuery = async (query, params = []) => {
  try {
    console.log(`Executing query: ${query.toString().slice(0, 100)}...`);
    const result = await query;
    console.log(`Query successful with ${result?.length || 0} results`);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
};

// Test database connection
async function testConnection() {
  try {
    console.log('Testing database connection...');
    const result = await safeQuery(sql`SELECT NOW()`);
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
    await safeQuery(sql`
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
    `);
    
    console.log("Users table initialized");
    
    // Use hardcoded admin credentials instead of environment variables
    const adminEmail = "admin@acmyx.com";
    
    // Check if admin exists
    const adminUsers = await safeQuery(sql`SELECT * FROM users WHERE email = ${adminEmail} AND role = 'admin'`);
    
    if (adminUsers.length === 0) {
      // Only create if admin doesn't exist
      const adminPassword = "admin123";
      
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      await safeQuery(sql`
        INSERT INTO users (email, password, role, username, first_name, last_name, created_at)
        VALUES (${adminEmail}, ${hashedPassword}, 'admin', 'admin', 'Admin', 'User', ${new Date().toISOString()})
      `);
      console.log(`Admin user created with email: ${adminEmail}`);
    } else {
      console.log(`Admin user already exists with email: ${adminEmail}`);
    }
    
    // Create mentor_applications table if it doesn't exist
    await safeQuery(sql`
      CREATE TABLE IF NOT EXISTS mentor_applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(255),
        designation VARCHAR(255),
        experience INTEGER,
        education TEXT,
        domains TEXT[],
        resume_url TEXT,
        portfolio_url TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      )
    `);
    
    console.log('Mentor applications table initialized');
    
    // Create bda_applications table if it doesn't exist
    await safeQuery(sql`
      CREATE TABLE IF NOT EXISTS bda_applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        education TEXT,
        experience INTEGER,
        resume_url TEXT,
        portfolio_url TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      )
    `);
    
    console.log('BDA applications table initialized');
    
    // Create campus_ambassador_applications table if it doesn't exist
    await safeQuery(sql`
      CREATE TABLE IF NOT EXISTS campus_ambassador_applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        college_name VARCHAR(255) NOT NULL,
        year_of_study VARCHAR(50) NOT NULL,
        branch VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      )
    `);
    
    console.log('Campus Ambassador applications table initialized');
    
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
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the password for the admin user
    const result = await safeQuery(sql`
      UPDATE users 
      SET password = ${hashedPassword} 
      WHERE email = ${email} AND role = 'admin'
      RETURNING id
    `);
    
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

// Export as ES modules
export default {
  sql,
  testConnection,
  initDatabase,
  updateAdminPassword
};

export { sql, safeQuery, testConnection, initDatabase, updateAdminPassword }; 