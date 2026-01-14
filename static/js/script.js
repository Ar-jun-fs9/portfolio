// script.js

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe all elements with fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Floating sidebar with dynamic gradient color changes on scroll
function updateSidebarColors() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    sidebarLinks.forEach((link, index) => {
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);

        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const isActive = scrollTop >= sectionTop && scrollTop < sectionBottom;

            // Dynamic color gradients that change based on scroll position
            const scrollProgress = Math.min(scrollTop / (document.body.scrollHeight - window.innerHeight), 1);
            const hue = (scrollProgress * 360 + index * 60) % 360;

            if (isActive) {
                // Active section gets bright, glowing effect
                link.style.background = `linear-gradient(135deg, hsl(${hue}, 85%, 65%) 0%, hsl(${(hue + 60) % 360}, 85%, 65%) 100%)`;
                link.style.boxShadow = `0 0 25px hsla(${hue}, 85%, 65%, 0.6), 0 0 50px hsla(${hue}, 85%, 65%, 0.3)`;
                link.style.transform = 'scale(1.1)';
            } else {
                // Inactive sections get subtle gradients
                link.style.background = `linear-gradient(135deg, hsl(${hue}, 60%, 45%) 0%, hsl(${(hue + 30) % 360}, 60%, 45%) 100%)`;
                link.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                link.style.transform = 'scale(1)';
            }
        }
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add scroll event listener with throttling
window.addEventListener('scroll', throttle(updateSidebarColors, 16));

// Enhanced hover effects for skill cards
document.querySelectorAll('#skills .bg-white').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) rotate(1deg)';
        card.style.boxShadow = '0 20px 40px rgba(255, 105, 157, 0.3)';
        card.style.border = '2px solid #ff6b9d';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotate(0deg)';
        card.style.boxShadow = 'none';
        card.style.border = 'none';
    });
});

// Enhanced hover effects for project cards
document.querySelectorAll('#projects .group').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Mobile menu toggle with improved functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    if (mobileMenu && mobileMenuBtn) {
        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            // Show menu
            mobileMenu.classList.remove('hidden');
            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
        } else {
            // Hide menu
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
        }
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');

            if (mobileMenu && mobileMenuBtn) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                `;
            }
        });
    });
});

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    // Typing effect
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) typeWriter(heroTitle, 'Arjun Bhul', 150);

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Initialize sidebar colors
    updateSidebarColors();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Form submitted:', data);

            if (formMessage) {
                formMessage.classList.remove('hidden');
                formMessage.innerHTML = '<p class="text-green-400 font-medium">Message sent successfully! 🤖</p>';
                this.reset();
                setTimeout(() => formMessage.classList.add('hidden'), 5000);
            }
        });
    }
});
