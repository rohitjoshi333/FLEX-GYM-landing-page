// Classes and Filters Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Enhanced class filtering with animations
  initEnhancedClassFilters();
  
  // Class hover effects
  initClassHoverEffects();
  
  // Class details modal (can be expanded upon in the future)
  initClassDetailsModal();
});

function initEnhancedClassFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const classCards = document.querySelectorAll('.class-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Animate filtering
      classCards.forEach(card => {
        // Start fade out animation
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          // Hide/show cards based on filter
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
            
            // Stagger animations slightly
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50 + Math.random() * 150); // Random delay for natural effect
          } else {
            card.style.display = 'none';
          }
        }, 300); // Match duration of fade-out
      });
    });
  });
  
  // Initialize all cards with transitions
  classCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

function initClassHoverEffects() {
  const classCards = document.querySelectorAll('.class-card');
  
  classCards.forEach(card => {
    // Create enhanced hover effect
    card.addEventListener('mouseenter', function() {
      const overlay = this.querySelector('.overlay');
      overlay.style.opacity = '1';
      
      // Slight card lift effect
      this.style.transform = 'translateY(-10px)';
      
      // Zoom image slightly
      const image = this.querySelector('img');
      image.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      const overlay = this.querySelector('.overlay');
      overlay.style.opacity = '0';
      
      // Reset card position
      this.style.transform = 'translateY(0)';
      
      // Reset image zoom
      const image = this.querySelector('img');
      image.style.transform = 'scale(1)';
    });
  });
}

function initClassDetailsModal() {
  // This is a stub function for future development
  // In a full implementation, clicking "Learn More" would open a modal with class details
  
  const learnMoreButtons = document.querySelectorAll('.class-image .btn');
  
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // For now, just alert a message
      // In a real implementation, this would open a modal with class details
      const className = this.closest('.class-card').querySelector('h3').textContent;
      alert(`Details for ${className} class would be shown in a modal in a complete implementation.`);
    });
  });
}