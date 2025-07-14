// Testimonials Slider Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize testimonials slider
  initTestimonialsSlider();
});

function initTestimonialsSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  let interval;
  
  // Function to show testimonial at specified index
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    // Deactivate all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current testimonial and activate its dot
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update current index
    currentIndex = index;
  }
  
  // Previous button functionality
  prevBtn.addEventListener('click', function() {
    let index = currentIndex - 1;
    if (index < 0) {
      index = testimonials.length - 1;
    }
    showTestimonial(index);
    resetInterval();
  });
  
  // Next button functionality
  nextBtn.addEventListener('click', function() {
    let index = currentIndex + 1;
    if (index >= testimonials.length) {
      index = 0;
    }
    showTestimonial(index);
    resetInterval();
  });
  
  // Dot navigation functionality
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showTestimonial(index);
      resetInterval();
    });
  });
  
  // Auto-play functionality
  function startInterval() {
    interval = setInterval(function() {
      let index = currentIndex + 1;
      if (index >= testimonials.length) {
        index = 0;
      }
      showTestimonial(index);
    }, 5000); // Change testimonial every 5 seconds
  }
  
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }
  
  // Start auto-play
  startInterval();
  
  // Pause auto-play when hovering over testimonials
  const testimonialContainer = document.querySelector('.testimonial-container');
  
  testimonialContainer.addEventListener('mouseenter', function() {
    clearInterval(interval);
  });
  
  testimonialContainer.addEventListener('mouseleave', function() {
    startInterval();
  });
  
  // Swipe functionality for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  testimonialContainer.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  testimonialContainer.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    // Minimum swipe distance
    const minSwipeDistance = 50;
    
    if (touchEndX < touchStartX - minSwipeDistance) {
      // Swipe left - next testimonial
      nextBtn.click();
    } else if (touchEndX > touchStartX + minSwipeDistance) {
      // Swipe right - previous testimonial
      prevBtn.click();
    }
  }
}