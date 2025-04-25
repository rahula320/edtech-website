const { sql } = require('./server/config/db');

async function testMentorSubmission() {
  try {
    console.log('Testing mentor application submission...');
    
    // Create test data matching the client form structure
    const applicationData = {
      fullName: 'Test Mentor',
      email: 'testmentor@example.com',
      phone: '9876543210',
      company: 'Test Company Inc',
      designation: 'Senior Developer',
      experience: '5',
      education: 'Bachelor in Computer Science',
      domains: 'Web Development,Data Science',
      resumeUrl: 'test-mentor-resume.pdf',
      portfolioUrl: 'https://example.com/mentor-portfolio'
    };
    
    console.log('Input data:', applicationData);
    
    // Extract data for insertion
    const {
      fullName,
      email,
      phone,
      company,
      designation,
      experience,
      education,
      domains,
      resumeUrl,
      portfolioUrl
    } = applicationData;
    
    // Parse experience to integer
    const experienceValue = parseInt(experience) || 0;
    
    // Process domains into a proper PostgreSQL array format
    const domainsArray = domains.split(',').map(domain => `"${domain.trim()}"`).join(',');
    const domainsArrayStr = `{${domainsArray}}`;
    
    // Insert the application into mentor_applications table
    const result = await sql`
      INSERT INTO mentor_applications (
        full_name, email, phone, company, designation, 
        experience, education, domains, resume_url, portfolio_url
      ) VALUES (
        ${fullName}, 
        ${email}, 
        ${phone}, 
        ${company}, 
        ${designation}, 
        ${experienceValue},
        ${education},
        ${domainsArrayStr}::text[], 
        ${resumeUrl}, 
        ${portfolioUrl}
      ) RETURNING *
    `;
    
    console.log(`Test mentor application saved with:`, result[0]);
    
    return true;
  } catch (error) {
    console.error('Error submitting test mentor application:', error);
    return false;
  }
}

testMentorSubmission()
  .then(() => console.log('Test completed'))
  .catch(err => console.error('Test failed:', err)); 