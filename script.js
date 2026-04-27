document.addEventListener('DOMContentLoaded', () => {
    
    // Glassmorphism Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggles
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links li a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Close menu when clicking a link on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Advanced Scroll Reveal Animation using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab elements we want to animate dynamically and add the hidden class immediately
    const animateTargets = [
        '.service-card', 
        '.about-img', 
        '.section-title', 
        '.gallery-item', 
        '.contact-info-large li', 
        '.input-group',
        '.project-details li'
    ];

    animateTargets.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('reveal-hidden');
            
            // Allow for staggered delays dynamically within grids/lists
            if (index % 3 === 1) el.classList.add('delay-1');
            if (index % 3 === 2) el.classList.add('delay-2');
            
            scrollObserver.observe(el);
        });
    });

    // Hero Background Slideshow
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds per slide

        function nextSlide() {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }
});
