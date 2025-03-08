// Enhanced navigation functionality for all devices
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (navToggle && navMenu) {
        // Fix toggle button
        navToggle.style.cursor = 'pointer';
        navToggle.style.userSelect = 'none';
        navToggle.style.display = 'block';
        
        // Ensure toggle button works with both click and touch
        ['click', 'touchend'].forEach(eventType => {
            navToggle.addEventListener(eventType, function(e) {
                e.preventDefault();
                this.classList.toggle('active');
                navMenu.classList.toggle('show');
                
                // Prevent body scrolling when menu is open
                document.body.classList.toggle('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            ['click', 'touchend'].forEach(eventType => {
                link.addEventListener(eventType, function() {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('show');
                    document.body.classList.remove('menu-open');
                });
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Add hover animation to navigation links
        navMenu.querySelectorAll('a').forEach(link => {
            link.classList.add('hover-grow');
            
            // Highlight current page
            const currentPage = window.location.pathname.split('/').pop();
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
        
        // Add swipe to close menu functionality
        let touchStartX = 0;
        let touchEndX = 0;
        
        navMenu.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        navMenu.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                // Swipe left to close
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    } else {
        // Silent fail instead of console error
        // Navigation elements not found
    }
    
    // Fix for iOS 100vh issue
    function setVhProperty() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVhProperty();
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', setVhProperty);
}); 