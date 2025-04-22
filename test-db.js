const { neon } = require('@neondatabase/serverless');

// Database connection string
const databaseUrl = "postgresql://neondb_owner:npg_OSsZKqm1iTV3@ep-floral-silence-a18kxybn-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

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

// Run the test
testConnection(); 