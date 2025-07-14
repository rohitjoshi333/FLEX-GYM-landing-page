// Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Remove loading screen after content is loaded
  setTimeout(function() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('fade-out');
    // Enable scrolling after loading screen fades out
    document.body.style.overflow = 'visible';
  }, 1500);
  
  // Prevent default scrolling while loading screen is visible
  document.body.style.overflow = 'hidden';
  
  // Initialize all animations
  initAnimations();
  
  // Header scroll effect
  initHeaderScroll();
  
  // Mobile menu functionality
  initMobileMenu();
  
  // Back to top button
  initBackToTop();
  
  // Schedule tabs functionality
  initScheduleTabs();
  
  // Initialize class filters
  initClassFilters();
  
  // Initialize form submissions
  initForms();
});

// Initialize Animations
function initAnimations() {
  // Animate hero text elements when page loads
  setTimeout(function() {
    const animatedElements = document.querySelectorAll('.animate-text');
    animatedElements.forEach(element => {
      element.classList.add('active');
    });
  }, 1800); // Start after loading screen fades out
  
  // Scroll animation (AOS-like functionality)
  const scrollElements = document.querySelectorAll('[data-aos]');
  
  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('aos-animate');
  };
  
  const hideScrollElement = (element) => {
    element.classList.remove('aos-animate');
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 85)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };
  
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  
  // Trigger scroll handling on page load to animate elements already in view
  setTimeout(handleScrollAnimation, 1900);
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Trigger scroll event on page load to set correct header state
  window.dispatchEvent(new Event('scroll'));
}

// Mobile Menu Functionality
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav ul li a');
  
  hamburger.addEventListener('click', function() {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
  
  closeBtn.addEventListener('click', function() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'visible'; // Re-enable scrolling
  });
  
  // Close mobile menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      document.body.style.overflow = 'visible'; // Re-enable scrolling
    });
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Schedule Tabs Functionality
function initScheduleTabs() {
  const dayButtons = document.querySelectorAll('.schedule-day');
  const scheduleTables = document.querySelectorAll('.schedule-table');
  
  dayButtons.forEach(button => {
    button.addEventListener('click', function() {
      const day = this.dataset.day;
      
      // Remove active class from all buttons
      dayButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all schedule tables
      scheduleTables.forEach(table => table.classList.remove('active'));
      
      // Show selected schedule table
      document.querySelector(`.schedule-table[data-day="${day}"]`).classList.add('active');
    });
  });
}

// Class Filters Functionality
function initClassFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const classCards = document.querySelectorAll('.class-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show all cards if filter is 'all'
      if (filter === 'all') {
        classCards.forEach(card => {
          card.style.display = 'block';
        });
      } else {
        // Filter cards based on category
        classCards.forEach(card => {
          if (card.dataset.category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });
}

// Form Submissions
function initForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let valid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (valid) {
        // In a real application, you would send the form data to a server here
        // For demo purposes, just show a success message
        const formElements = form.elements;
        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].type !== 'submit') {
            formElements[i].value = '';
          }
        }
        
        alert('Thank you for your submission! We will contact you shortly.');
      }
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') !== '#') {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});