document.getElementById('reviewForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const review = document.getElementById('review').value;

  fetch('/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, review })
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      loadReviews();
      document.getElementById('reviewForm').reset(); // Reset form after submission
  })
  .catch(error => console.error('Error:', error));
});

function loadReviews() {
  fetch('/reviews')
  .then(response => response.json())
  .then(reviews => {
      const reviewsList = document.getElementById('reviewsList');
      reviewsList.innerHTML = '';
      reviews.forEach(review => {
          const reviewItem = document.createElement('div');
          reviewItem.className = 'review-item';
          reviewItem.innerHTML = `<strong>${review.name}</strong>: ${review.review}`;
          reviewsList.appendChild(reviewItem);
      });
  });
}

loadReviews();
