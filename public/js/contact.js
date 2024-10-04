document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(this);
  const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
  };

  fetch('/contact/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      document.getElementById('response-message').textContent = data.message;
      document.getElementById('contact-form').reset(); // Reset the form
  })
  .catch(error => {
      document.getElementById('response-message').textContent = 'Submission failed. Please try again.';
      console.error('There was a problem with the fetch operation:', error);
  });
});
