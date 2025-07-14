// Pricing Toggle Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize pricing toggle
  initPricingToggle();
});

function initPricingToggle() {
  const pricingToggle = document.getElementById('pricing-toggle');
  
  if (pricingToggle) {
    pricingToggle.addEventListener('change', function() {
      if (this.checked) {
        // Switch to annual pricing
        document.body.classList.add('annual');
        showPricingFeedback('Annual billing selected - save 20%!');
      } else {
        // Switch to monthly pricing
        document.body.classList.remove('annual');
        showPricingFeedback('Monthly billing selected');
      }
      
      // Animate price change
      animatePriceChange();
    });
  }
}

function showPricingFeedback(message) {
  // Check if feedback element already exists, remove it if it does
  const existingFeedback = document.querySelector('.pricing-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }
  
  // Create feedback element
  const feedback = document.createElement('div');
  feedback.classList.add('pricing-feedback');
  feedback.innerHTML = message;
  feedback.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 0.9rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
  `;
  
  // Add to document
  document.body.appendChild(feedback);
  
  // Show feedback
  setTimeout(() => {
    feedback.style.opacity = '1';
  }, 10);
  
  // Hide feedback after 3 seconds
  setTimeout(() => {
    feedback.style.opacity = '0';
    
    // Remove feedback element after fade-out
    setTimeout(() => {
      feedback.remove();
    }, 300);
  }, 3000);
}

function animatePriceChange() {
  const prices = document.querySelectorAll('.amount');
  
  prices.forEach(price => {
    // Add animation class
    price.classList.add('price-change');
    
    // Remove animation class after animation completes
    setTimeout(() => {
      price.classList.remove('price-change');
    }, 600);
  });
}

// Pricing Cards Hover Effects
document.addEventListener('DOMContentLoaded', function() {
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseover', function() {
      // Remove featured scale effect temporarily when hovering other cards
      if (!this.classList.contains('featured')) {
        const featuredCard = document.querySelector('.pricing-card.featured');
        if (featuredCard) {
          featuredCard.style.transform = 'scale(1)';
        }
      }
    });
    
    card.addEventListener('mouseout', function() {
      // Restore featured scale effect
      const featuredCard = document.querySelector('.pricing-card.featured');
      if (featuredCard && !this.classList.contains('featured')) {
        featuredCard.style.transform = 'scale(1.05)';
      }
    });
  });
});