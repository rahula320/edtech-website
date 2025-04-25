const { sql } = require('./server/config/db');

async function checkApplications() {
  try {
    console.log('Checking mentor applications in database...');
    const mentorApplications = await sql`SELECT * FROM mentor_applications`;
    
    console.log(`Found ${mentorApplications.length} mentor application(s) in database`);
    
    if (mentorApplications.length > 0) {
      mentorApplications.forEach((app, index) => {
        console.log(`\nMentor Application #${index + 1}:`);
        console.log(`Name: ${app.full_name}`);
        console.log(`Email: ${app.email}`);
        console.log(`Company: ${app.company}`);
        console.log(`Domains: ${app.domains ? app.domains.join(', ') : 'None'}`);
        console.log(`Timestamp: ${app.timestamp}`);
        console.log(`Status: ${app.status}`);
      });
    } else {
      console.log('No mentor applications found in the database.');
    }
    
    console.log('\n-------------------------------------\n');
    
    console.log('Checking BDA applications in database...');
    const bdaApplications = await sql`SELECT * FROM bda_applications`;
    
    console.log(`Found ${bdaApplications.length} BDA application(s) in database`);
    
    if (bdaApplications.length > 0) {
      bdaApplications.forEach((app, index) => {
        console.log(`\nBDA Application #${index + 1}:`);
        console.log(`Name: ${app.full_name}`);
        console.log(`Email: ${app.email}`);
        console.log(`Education: ${app.education}`);
        console.log(`Experience: ${app.experience}`);
        console.log(`Timestamp: ${app.timestamp}`);
        console.log(`Status: ${app.status}`);
      });
    } else {
      console.log('No BDA applications found in the database.');
    }
  } catch (error) {
    console.error('Error checking applications:', error);
  }
}

checkApplications(); 