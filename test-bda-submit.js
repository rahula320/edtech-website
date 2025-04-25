const { sql } = require('./server/config/db');

async function testBdaSubmission() {
  try {
    console.log('Testing BDA application submission...');
    
    // Create test data matching the client form structure
    const applicationData = {
      fullName: 'Test BDA Applicant',
      email: 'testbda@example.com',
      phone: '9876543210',
      education: 'MBA in Marketing',
      experience: '3',
      resumeUrl: 'test-bda-resume.pdf',
      portfolioUrl: 'https://example.com/bda-portfolio'
    };
    
    console.log('Input data:', applicationData);
    
    // Extract data for insertion
    const {
      fullName,
      email,
      phone,
      education,
      experience,
      resumeUrl,
      portfolioUrl
    } = applicationData;
    
    // Parse experience to integer
    const experienceValue = parseInt(experience) || 0;
    
    // Insert the application into bda_applications table
    const result = await sql`
      INSERT INTO bda_applications (
        full_name, email, phone, education, 
        experience, resume_url, portfolio_url
      ) VALUES (
        ${fullName}, 
        ${email}, 
        ${phone}, 
        ${education},
        ${experienceValue}, 
        ${resumeUrl}, 
        ${portfolioUrl}
      ) RETURNING *
    `;
    
    console.log(`Test BDA application saved with:`, result[0]);
    
    return true;
  } catch (error) {
    console.error('Error submitting test BDA application:', error);
    return false;
  }
}

testBdaSubmission()
  .then(() => console.log('Test completed'))
  .catch(err => console.error('Test failed:', err)); 