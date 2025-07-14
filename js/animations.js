// Animations JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize counters animation when elements are in viewport
  initCounterAnimation();
  
  // Parallax scrolling effect
  initParallaxEffect();
  
  // Set active navigation based on scroll position
  initNavHighlight();
});

// Counter Animation
function initCounterAnimation() {
  const counters = document.querySelectorAll('.count');
  
  // Function to check if element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  // Function to animate counter
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    const step = target / (duration / 16); // 60fps -> ~16ms per frame
    
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.round(current);
      }
    }, 16);
  };
  
  // Check if counters are in viewport on scroll
  let animated = false;
  window.addEventListener('scroll', () => {
    if (!animated && counters.length > 0 && isInViewport(counters[0])) {
      animated = true;
      counters.forEach(counter => {
        animateCounter(counter);
      });
    }
  });
  
  // Check on page load as well
  setTimeout(() => {
    if (!animated && counters.length > 0 && isInViewport(counters[0])) {
      animated = true;
      counters.forEach(counter => {
        animateCounter(counter);
      });
    }
  }, 2000);
}

// Parallax Scrolling Effect
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.about-image, .join-image');
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const elementTop = element.getBoundingClientRect().top + scrollPosition;
      
      if (scrollPosition > elementTop - window.innerHeight && scrollPosition < elementTop + element.offsetHeight) {
        const speed = 0.3;
        const yPos = -((scrollPosition - elementTop) * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
      }
    });
  });
}

// Navigation Highlight based on scroll position
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav ul li a, .mobile-nav ul li a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = document.getElementById('header').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100; // Offset to trigger highlight earlier
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}` || (current === '' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      }
    });
  });
}

// Reveal elements on scroll
function revealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
}

// Button hover effects
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', function(e) {
    const x = e.clientX - button.getBoundingClientRect().left;
    const y = e.clientY - button.getBoundingClientRect().top;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});