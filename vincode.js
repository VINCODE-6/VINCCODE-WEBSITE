const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;
let autoSlideInterval = null;
const slideDuration = 5000; // 5 seconds per slide

// Function to show a specific slide
function showSlide(i) {
  // Ensure index is within bounds
  index = i < 0 ? slides.length - 1 : i % slides.length;

  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
    slide.setAttribute('aria-hidden', idx !== index); // Accessibility
    dots[idx].classList.toggle('active', idx === index);
    dots[idx].setAttribute('aria-selected', idx === index); // Accessibility
  });
}

// Start auto-sliding
function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval); // Prevent multiple intervals
  autoSlideInterval = setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, slideDuration);
}

// Stop auto-sliding
function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

// Initialize the first slide
function initializeCarousel() {
  if (slides.length === 0 || dots.length === 0) {
    console.error('Carousel initialization failed: No slides or dots found.');
    return;
  }

  // Set initial slide
  showSlide(index);

  // Add click event listeners to dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      showSlide(index);
      stopAutoSlide(); // Pause auto-slide on user interaction
      startAutoSlide(); // Resume after interaction
    });
  });

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      index = (index + 1) % slides.length;
      showSlide(index);
      stopAutoSlide();
      startAutoSlide();
    } else if (e.key === 'ArrowLeft') {
      index = index - 1 < 0 ? slides.length - 1 : index - 1;
      showSlide(index);
      stopAutoSlide();
      startAutoSlide();
    }
  });

  // Pause on hover
  const carousel = document.querySelector('.services-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
  }

  // Start auto-sliding
  startAutoSlide();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Ensure carousel remains functional on window resize
window.addEventListener('resize', () => {
  showSlide(index); // Re-render current slide to adjust layout
});
