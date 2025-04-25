const { sql } = require('./server/config/db');

async function checkApplications() {
  try {
    console.log('Checking applications in database...');
    const applications = await sql`SELECT * FROM applications`;
    
    console.log(`Found ${applications.length} application(s) in database`);
    
    if (applications.length > 0) {
      applications.forEach((app, index) => {
        console.log(`\nApplication #${index + 1}:`);
        console.log(`Type: ${app.type}`);
        console.log(`Name: ${app.full_name}`);
        console.log(`Email: ${app.email}`);
        console.log(`Timestamp: ${app.timestamp}`);
        console.log(`Fields: ${Object.keys(app).join(', ')}`);
      });
    } else {
      console.log('No applications found in the database.');
    }
  } catch (error) {
    console.error('Error checking applications:', error);
  }
}

checkApplications(); 