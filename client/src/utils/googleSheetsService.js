// Google Sheets API endpoint (will be created using Google Apps Script)
const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbwO0ijNvAe-e4zH29DuCyRvGM-KvouKXH0BSDOXUDjJ9i8zYEM5pUJ44m9lFio_sTWJKw/exec';

export const submitToGoogleSheets = async (formData) => {
  try {
    console.log('Submitting form data:', formData);
    
    const response = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors', // Add this to handle CORS
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        domain: formData.domain,
        message: formData.message,
        timestamp: new Date().toISOString()
      })
    });

    // Since we're using no-cors, we can't read the response
    // We'll assume success if the request completes
    console.log('Form submission completed');
    return { success: true };

  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw new Error('Failed to submit form data');
  }
}; 