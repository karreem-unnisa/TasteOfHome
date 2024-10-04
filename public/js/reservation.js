// Handle form submission
document.getElementById('reservation-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const reservation = {
        name: document.getElementById('name').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      people: document.getElementById('people').value,
      contact: document.getElementById('contact').value
    };
  
    fetch('/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservation)
    }).then(response => response.json())
      .then(data => alert('Reservation successful'))
      .catch(error => alert('Error making reservation'));
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    // Clone first and last slides for infinite scrolling effect
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);

    sliderWrapper.appendChild(firstSlideClone); // Append clone of the first slide
    sliderWrapper.insertBefore(lastSlideClone, slides[0]); // Insert clone of the last slide before the first slide

    const slideWidth = slides[0].offsetWidth; // Get the width of a single slide
    sliderWrapper.style.width = `${(totalSlides + 2) * slideWidth}px`; // Set wrapper width to accommodate all slides including clones
    sliderWrapper.style.transform = `translateX(-${slideWidth}px)`; // Initial transform to show the first slide

    function goToSlide(index) {
        sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
        sliderWrapper.style.transform = `translateX(-${(index + 1) * slideWidth}px)`; // Move to the slide

        currentSlide = index;

        // Reset position for infinite scroll effect
        if (currentSlide === totalSlides) { // After last slide
            setTimeout(() => {
                sliderWrapper.style.transition = 'none';
                sliderWrapper.style.transform = `translateX(-${slideWidth}px)`; // Jump back to the first slide
                currentSlide = 0;
            }, 500); // Match this with the transition time
        } else if (currentSlide === -1) { // Before first slide
            setTimeout(() => {
                sliderWrapper.style.transition = 'none';
                sliderWrapper.style.transform = `translateX(-${totalSlides * slideWidth}px)`; // Jump to the last actual slide
                currentSlide = totalSlides - 1;
            }, 500); // Match this with the transition time
        }
    }

    function nextSlide() {
        const nextIndex = currentSlide + 1;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = currentSlide - 1;
        goToSlide(prevIndex);
    }

    setInterval(nextSlide, 3000); // Change slide every 3 seconds

    // Initial call to adjust slider
    goToSlide(currentSlide);
});
