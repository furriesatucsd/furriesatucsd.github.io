/**
 * Main JavaScript file for Triton Tails website
 * Handles animations, Bootstrap component initialization, and interactive elements
 */

// Initialize components when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initGSAP();
    initBootstrapComponents();
    initAnimations();
    initGalleryModal();
    initCarouselThumbnails();
    initSmoothScrolling();
});

/**
 * Initialize GSAP animation library and plugins
 */
function initGSAP() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initialize Bootstrap components from CDN
 */
function initBootstrapComponents() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltipTriggerList.length > 0) {
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    // Initialize popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    if (popoverTriggerList.length > 0) {
        [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    }
}

/**
 * Initialize page animations including fade-in effects
 */
function initAnimations() {
    // Immediately show hero section content
    document.querySelectorAll('.banner .fade-in').forEach(element => {
        element.classList.add('content-visible');
    });

    // Add scroll-triggered fade-in animations for other sections
    const fadeElements = document.querySelectorAll('.fade-in:not(.content-visible)');
    fadeElements.forEach((element) => {
        gsap.to(element, {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
                trigger: element,
                start: 'top 95%', // Start animation when element is 95% from the top of viewport
                once: true        // Only trigger once
            }
        });
    });
}

/**
 * Initialize gallery modal functionality
 */
function initGalleryModal() {
    const galleryModal = document.getElementById('galleryModal');
    if (!galleryModal) return;
    
    galleryModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const imageUrl = button.getAttribute('data-bs-image');
        const title = button.getAttribute('data-bs-title');

        const modalTitle = this.querySelector('.modal-title');
        const modalImage = this.querySelector('#galleryModalImage');

        modalTitle.textContent = title;
        modalImage.src = imageUrl;
    });
}

/**
 * Initialize carousel thumbnail navigation
 */
function initCarouselThumbnails() {
    // Handle thumbnail clicks
    document.querySelectorAll('.thumbnail-nav').forEach(thumb => {
        thumb.addEventListener('click', function () {
            // Remove active class from all thumbnails
            document.querySelectorAll('.thumbnail-nav').forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
        });
    });

    // Update thumbnail active state when carousel slides
    const carousel = document.getElementById('photoCarousel');
    if (!carousel) return;
    
    carousel.addEventListener('slide.bs.carousel', function (event) {
        const slideIndex = event.to;
        document.querySelectorAll('.thumbnail-nav').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === slideIndex);
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
} 