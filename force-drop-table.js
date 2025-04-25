const { sql } = require('./server/config/db');

async function forceDropOldTable() {
  try {
    console.log('Checking if old applications table exists...');
    
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'applications'
      )
    `;
    
    if (!tableExists[0].exists) {
      console.log('Old applications table does not exist. No action needed.');
      return;
    }
    
    console.log('Forcibly dropping applications table...');
    
    await sql`DROP TABLE IF EXISTS applications`;
    
    console.log('Old applications table has been successfully dropped.');
    
    // Verify it's gone
    const tableStillExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'applications'
      )
    `;
    
    if (!tableStillExists[0].exists) {
      console.log('Verified: applications table no longer exists in the database.');
    } else {
      console.log('WARNING: Failed to drop the applications table.');
    }
  } catch (error) {
    console.error('Error dropping applications table:', error);
  }
}

// Execute the function
forceDropOldTable(); 