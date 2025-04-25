const { sql } = require('./server/config/db');

async function dropOldTable() {
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
    
    // Check how many records are in the old table
    const oldCount = await sql`SELECT COUNT(*) FROM applications`;
    console.log(`Found ${oldCount[0].count} records in old applications table.`);
    
    // Count records in new tables
    const mentorCount = await sql`SELECT COUNT(*) FROM mentor_applications`;
    const bdaCount = await sql`SELECT COUNT(*) FROM bda_applications`;
    const totalNewCount = mentorCount[0].count + bdaCount[0].count;
    
    console.log(`Found ${mentorCount[0].count} mentor applications and ${bdaCount[0].count} BDA applications in new tables.`);
    console.log(`Total applications in new tables: ${totalNewCount}`);
    
    // Display a warning if counts don't match
    if (totalNewCount < oldCount[0].count) {
      console.warn(`WARNING: The new tables contain fewer records (${totalNewCount}) than the old table (${oldCount[0].count}).`);
      console.warn('This suggests that not all data has been properly migrated.');
      console.warn('Please verify the data before dropping the old table.');
      return;
    }
    
    console.log('All data appears to be properly migrated.');
    console.log('Dropping old applications table...');
    
    await sql`DROP TABLE applications`;
    
    console.log('Old applications table has been successfully dropped.');
  } catch (error) {
    console.error('Error during table drop operation:', error);
  }
}

// Execute the function
dropOldTable(); 