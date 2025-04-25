const { sql } = require('./server/config/db');

async function testSubmission() {
  try {
    console.log('Testing mentor application submission...');
    
    // Create a test application
    const result = await sql`
      INSERT INTO applications (
        type, full_name, email, phone, company, designation, 
        experience, education, domains, resume_url, portfolio_url
      ) VALUES (
        'mentor', 'Test User', 'test@example.com', '1234567890', 
        'Test Company', 'Senior Developer', 
        5, 'Bachelor in Computer Science', 'Web Development,Data Science', 
        'test-resume.pdf', 'https://example.com/portfolio'
      ) RETURNING id
    `;
    
    console.log(`Test application saved with ID: ${result[0].id}`);
    
    // Verify it was saved
    const applications = await sql`SELECT * FROM applications`;
    console.log(`Database now has ${applications.length} application(s)`);
    
    return true;
  } catch (error) {
    console.error('Error submitting test application:', error);
    
    // Let's try a simpler version without the domains field
    try {
      console.log('Trying simplified application submission...');
      
      const result = await sql`
        INSERT INTO applications (
          type, full_name, email, phone
        ) VALUES (
          'mentor', 'Test User', 'test@example.com', '1234567890'
        ) RETURNING id
      `;
      
      console.log(`Simplified test application saved with ID: ${result[0].id}`);
      
      // Verify it was saved
      const applications = await sql`SELECT * FROM applications`;
      console.log(`Database now has ${applications.length} application(s)`);
      
      return true;
    } catch (error2) {
      console.error('Error submitting simplified application:', error2);
      return false;
    }
  }
}

testSubmission(); 