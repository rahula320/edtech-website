const http = require('http');

// Create mentor application data
const mentorData = {
  fullName: 'API Test Mentor',
  email: 'apitestmentor@example.com',
  phone: '9876543210',
  company: 'API Test Company',
  designation: 'Senior Developer',
  experience: 7,
  education: 'MS in Computer Science',
  domains: ['Web Development', 'AI/ML'],
  resumeUrl: 'api-test-resume.pdf',
  portfolioUrl: 'https://example.com/api-test-portfolio'
};

// Set up the HTTP request
const options = {
  hostname: 'localhost',
  port: 5003,
  path: '/api/applications/mentor',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

console.log('Sending test mentor application:', mentorData);

// Make the request
const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonResponse = JSON.parse(data);
      console.log('Response:', jsonResponse);
      console.log('Test completed successfully');
    } catch (e) {
      console.log('Error parsing response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error making request:', error);
});

// Send the request body
req.write(JSON.stringify(mentorData));
req.end(); 