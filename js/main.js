
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobMenu = document.getElementById('mob');
    
    if (hamburger && mobMenu) {
        hamburger.addEventListener('click', () => {
            mobMenu.classList.toggle('open');
        });
        
        // Close menu on link click
        mobMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobMenu.classList.remove('open');
            });
        });
    }

    // Scroll Animations (Fade In)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
});
