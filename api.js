fetch('https://ai-virual-backend5.onrender.com/api/user/current', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
    // Remove Authorization header if using cookies
  },
  credentials: 'include' // If backend uses cookies
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
})
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});