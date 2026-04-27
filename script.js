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
        link.addEventListener('click', (e) => {
            // If it's a dropdown link and we are on mobile, handle differently
            if (window.innerWidth <= 992 && link.parentElement.classList.contains('dropdown')) {
                // Check if we clicked the chevron or the link itself
                // For better UX, we'll let the link work but allow toggling
                // However, usually on mobile you want the dropdown to open
                const dropdownMenu = link.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    // Only prevent default if we want to toggle the menu instead of navigating
                    // Let's make it so clicking the arrow/text toggles on mobile
                    // But if it's already open, it navigates? 
                    // Simpler: just toggle it and let user click again to navigate if they want
                    // Or better: clicking once opens, clicking again navigates.
                }
            }
            
            if (!link.parentElement.classList.contains('dropdown')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Mobile Dropdown Toggle Logic
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.position = 'static';
                    menu.style.transform = 'none';
                    menu.style.boxShadow = 'none';
                    menu.style.padding = '10px 20px';
                }
            }
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

});
