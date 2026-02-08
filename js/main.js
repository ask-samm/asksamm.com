// ==========================================================================
// Scroll reveal using IntersectionObserver
// ==========================================================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ==========================================================================
// Rotating word — simple text swap with fade animation
// ==========================================================================

const rotatingEl = document.querySelector('.rotating-word');

if (rotatingEl) {
    const words = ['Onboarding', 'Support', 'Go to Market'];
    let currentIndex = 0;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        setInterval(() => {
            // Fade out + slide up
            rotatingEl.style.opacity = '0';
            rotatingEl.style.transform = 'translateY(-10px)';

            // After fade-out completes, swap text and fade back in
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                rotatingEl.textContent = words[currentIndex];
                rotatingEl.style.transform = 'translateY(10px)';

                // Force browser to register the new position before animating
                rotatingEl.offsetHeight;

                rotatingEl.style.opacity = '1';
                rotatingEl.style.transform = 'translateY(0)';
            }, 300);
        }, 3000);
    }
}

// ==========================================================================
// Smooth scroll for anchor links
// ==========================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================================================
// Form submission feedback
// ==========================================================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const action = this.getAttribute('action');
        if (action.includes('YOUR_FORM_ID')) {
            e.preventDefault();
            alert('Contact form is not yet configured. Please set up your Formspree endpoint.');
        }
    });
}
