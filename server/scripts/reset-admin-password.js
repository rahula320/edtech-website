/**
 * Admin Password Reset Script
 * 
 * This script resets the admin password to match the client-side hardcoded value
 * Run with: node server/scripts/reset-admin-password.js
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { neon } = require('@neondatabase/serverless');

// Replace with your actual database URL or use environment variable
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://user:password@hostname:port/database?sslmode=require";

// Create a SQL client
const sql = neon(DATABASE_URL);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@acmyx.com';
const NEW_PASSWORD = 'admin123'; // Matches the client-side hardcoded password

async function resetPassword() {
  console.log(`Attempting to reset password for admin: ${ADMIN_EMAIL}`);
  
  try {
    // Test connection first
    try {
      const result = await sql`SELECT NOW()`;
      console.log(`Database connected! Server time: ${result[0].now}`);
    } catch (error) {
      console.error('Database connection error:', error);
      return;
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10);
    
    // Update the admin user password
    const result = await sql`
      UPDATE users 
      SET password = ${hashedPassword} 
      WHERE email = ${ADMIN_EMAIL} AND role = 'admin'
      RETURNING id
    `;
    
    if (result.length > 0) {
      console.log('✅ Admin password reset successful!');
      console.log(`Email: ${ADMIN_EMAIL}`);
      console.log(`Password: ${NEW_PASSWORD}`);
    } else {
      console.log('⚠️ No admin user found with that email. Creating one now...');
      
      // Create a new admin user
      try {
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
        
        const insertResult = await sql`
          INSERT INTO users (email, password, role, username, first_name, last_name, created_at)
          VALUES (${ADMIN_EMAIL}, ${hashedPassword}, 'admin', 'admin', 'Admin', 'User', ${new Date().toISOString()})
          ON CONFLICT (email) DO UPDATE
          SET password = ${hashedPassword}
          RETURNING id
        `;
        
        if (insertResult.length > 0) {
          console.log('✅ Admin user created successfully!');
          console.log(`Email: ${ADMIN_EMAIL}`);
          console.log(`Password: ${NEW_PASSWORD}`);
        }
      } catch (createError) {
        console.error('Error creating admin user:', createError);
      }
    }
  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    process.exit();
  }
}

// Run the script
resetPassword(); 