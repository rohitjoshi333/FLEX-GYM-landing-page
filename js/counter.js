// Animated Counter Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize advanced counter animation with intersection observer
  initAdvancedCounterAnimation();
});

function initAdvancedCounterAnimation() {
  const counters = document.querySelectorAll('.count');
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5 // trigger when 50% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCounter(counter);
          observer.unobserve(counter); // Only animate once
        }
      });
    }, options);
    
    // Observe all counter elements
    counters.forEach(counter => {
      observer.observe(counter);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    window.addEventListener('scroll', function() {
      counters.forEach(counter => {
        if (isElementInViewport(counter) && !counter.classList.contains('animated')) {
          counter.classList.add('animated');
          animateCounter(counter);
        }
      });
    });
    
    // Check on page load as well
    counters.forEach(counter => {
      if (isElementInViewport(counter) && !counter.classList.contains('animated')) {
        counter.classList.add('animated');
        animateCounter(counter);
      }
    });
  }
}

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  
  // Calculate animation duration based on target value
  // Larger numbers animate slightly slower for a better effect
  const baseDuration = 1500; // base duration in milliseconds
  const durationModifier = Math.min(target / 100, 10); // cap at 10x
  const duration = baseDuration + (durationModifier * 500);
  
  // Calculate increment step based on target and duration
  // Aim for approximately 60 steps per second
  const steps = duration / 16; // 60fps -> ~16ms per frame
  const increment = target / steps;
  
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      counter.textContent = target;
      clearInterval(timer);
      
      // Add a small bounce effect when counter reaches target
      counter.classList.add('bounce');
      setTimeout(() => {
        counter.classList.remove('bounce');
      }, 300);
    } else {
      counter.textContent = Math.round(current);
    }
  }, 16);
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}