const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://ai-virual-backend5.onrender.com';

fetch(`${BACKEND_URL}/api/user/current`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
    // Remove Authorization header if using cookies
  },
  credentials: 'include' // If backend uses cookies
})
.then(async response => {
  if (!response.ok) {
    // Try to parse error message from backend
    let errorMsg = 'Network response was not ok ' + response.statusText;
    try {
      const errData = await response.json();
      errorMsg += ': ' + (errData.message || JSON.stringify(errData));
    } catch {}
    throw new Error(errorMsg);
  }
  return response.json();
})
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});