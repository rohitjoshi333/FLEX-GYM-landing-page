// Gallery JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery functionality
  initGalleryFilters();
  initGalleryModal();
  initLoadMore();
  initGalleryAnimations();
});

function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter gallery items with animation
      galleryItems.forEach(item => {
        // Start fade out animation
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          // Hide/show items based on filter
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
            
            // Stagger animations slightly
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50 + Math.random() * 150);
          } else {
            item.style.display = 'none';
          }
        }, 300);
      });
    });
  });
  
  // Initialize all items with transitions
  galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

function initGalleryModal() {
  const modal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.querySelector('.modal-title');
  const modalDescription = document.querySelector('.modal-description');
  const closeBtn = document.querySelector('.modal-close');
  const prevBtn = document.querySelector('.modal-prev');
  const nextBtn = document.querySelector('.modal-next');
  const expandButtons = document.querySelectorAll('.gallery-expand');
  
  let currentImageIndex = 0;
  let currentImages = [];
  
  // Open modal when expand button is clicked
  expandButtons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const galleryItem = this.closest('.gallery-item');
      const img = galleryItem.querySelector('img');
      const title = galleryItem.querySelector('.gallery-info h3').textContent;
      const description = galleryItem.querySelector('.gallery-info p').textContent;
      
      // Get all visible images for navigation
      currentImages = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]) img'));
      currentImageIndex = currentImages.indexOf(img);
      
      showModalImage(img.src, title, description);
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  closeBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
  
  // Previous image
  prevBtn.addEventListener('click', function() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentImages.length - 1;
    const img = currentImages[currentImageIndex];
    const galleryItem = img.closest('.gallery-item');
    const title = galleryItem.querySelector('.gallery-info h3').textContent;
    const description = galleryItem.querySelector('.gallery-info p').textContent;
    
    showModalImage(img.src, title, description);
  });
  
  // Next image
  nextBtn.addEventListener('click', function() {
    currentImageIndex = currentImageIndex < currentImages.length - 1 ? currentImageIndex + 1 : 0;
    const img = currentImages[currentImageIndex];
    const galleryItem = img.closest('.gallery-item');
    const title = galleryItem.querySelector('.gallery-info h3').textContent;
    const description = galleryItem.querySelector('.gallery-info p').textContent;
    
    showModalImage(img.src, title, description);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'block') {
      if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn.click();
      }
    }
  });
  
  function showModalImage(src, title, description) {
    modalImage.src = src;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Add loading animation
    modalImage.style.opacity = '0';
    modalImage.onload = function() {
      modalImage.style.opacity = '1';
    };
  }
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'visible';
  }
}

function initLoadMore() {
  const loadMoreBtn = document.querySelector('.load-more-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const itemsPerLoad = 6;
  let currentlyVisible = itemsPerLoad;
  
  // Initially hide items beyond the first set
  galleryItems.forEach((item, index) => {
    if (index >= itemsPerLoad) {
      item.classList.add('hidden');
    }
  });
  
  // Check if load more button should be shown
  if (galleryItems.length <= itemsPerLoad) {
    loadMoreBtn.style.display = 'none';
  }
  
  loadMoreBtn.addEventListener('click', function() {
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    const itemsToShow = Array.from(hiddenItems).slice(0, itemsPerLoad);
    
    itemsToShow.forEach((item, index) => {
      setTimeout(() => {
        item.classList.remove('hidden');
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50);
      }, index * 100);
    });
    
    currentlyVisible += itemsToShow.length;
    
    // Hide load more button if all items are visible
    if (currentlyVisible >= galleryItems.length) {
      loadMoreBtn.style.display = 'none';
    }
  });
}

function initGalleryAnimations() {
  // Animate gallery items on scroll
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  galleryItems.forEach(item => {
    // Set initial state
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    observer.observe(item);
  });
  
  // Add hover effects to gallery items
  galleryItems.forEach(item => {
    const image = item.querySelector('img');
    
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Touch/swipe support for mobile modal navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
  if (document.getElementById('galleryModal').style.display === 'block') {
    touchStartX = e.changedTouches[0].screenX;
  }
});

document.addEventListener('touchend', function(e) {
  if (document.getElementById('galleryModal').style.display === 'block') {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }
});

function handleSwipe() {
  const minSwipeDistance = 50;
  
  if (touchEndX < touchStartX - minSwipeDistance) {
    // Swipe left - next image
    document.querySelector('.modal-next').click();
  } else if (touchEndX > touchStartX + minSwipeDistance) {
    // Swipe right - previous image
    document.querySelector('.modal-prev').click();
  }
}