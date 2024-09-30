document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript file is loaded!");
    console.log('Page loaded. Current URL:', window.location.href);

    // Prevent automatic scrolling to hash on page load
    if (window.location.hash) {
        window.scrollTo(0, 0);
        setTimeout(() => {
            window.history.replaceState(null, null, window.location.pathname);
        }, 1);
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const fullscreenMenu = document.getElementById('fullscreen-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fullscreen menu functionality
    if (hamburgerBtn && fullscreenMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            fullscreenMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close the menu when a link is clicked
        fullscreenMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                fullscreenMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Adjust scroll position for fixed header
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Reviews slider functionality
    let currentReviewIndex = 0;
    const reviews = document.querySelectorAll('.review');
    const totalReviews = reviews.length;

    function showReview(index) {
        reviews.forEach((review, i) => {
            review.classList.remove('active');
            if (i === index) {
                review.classList.add('active');
            }
        });
    }

    function autoSlideReviews() {
        currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
        showReview(currentReviewIndex);
    }

    showReview(currentReviewIndex);
    setInterval(autoSlideReviews, 4000); // Change review every 4 seconds

    // Services slider functionality
    let currentServiceIndex = 0;
    const services = document.querySelectorAll('.service');
    const totalServices = services.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showService(index) {
        services.forEach((service, i) => {
            service.classList.remove('active');
            if (i === index) {
                service.classList.add('active');
            }
        });
    }

    function autoSlideServices() {
        currentServiceIndex = (currentServiceIndex + 1) % totalServices;
        showService(currentServiceIndex);
    }

    showService(currentServiceIndex);
    setInterval(autoSlideServices, 4000); // Change service every 4 seconds

    // Button functionality for services slider
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentServiceIndex = (currentServiceIndex - 1 + totalServices) % totalServices;
            showService(currentServiceIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentServiceIndex = (currentServiceIndex + 1) % totalServices;
            showService(currentServiceIndex);
        });
    }

    // Fade in and slide up effect for elements on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

    function checkAnimation() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate');
            } else {
                element.classList.remove('animate');
            }
        });
    }

    // Initial check for elements in view
    checkAnimation();

    // Check for animation on scroll
    window.addEventListener('scroll', () => {
        checkAnimation();
        console.log('Page scrolled. Current scroll position:', window.pageYOffset);
    });

    // Add click animation to images and text
    const clickAnimatedElements = document.querySelectorAll('.animate-on-click');

    clickAnimatedElements.forEach(element => {
        element.addEventListener('click', () => {
            element.classList.add('clicked');
            setTimeout(() => {
                element.classList.remove('clicked');
            }, 650);
        });
    });

    // Cal.com integration
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", {origin:"https://app.cal.com"});
    
    Cal("inline", {
      elementOrSelector:"#my-cal-inline",
      calLink: "wellcare-clinic/booking"
    });
    
    Cal("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
});