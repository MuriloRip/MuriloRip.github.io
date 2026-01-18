// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-item, .skill-group, .detail-block, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== COUNTER ANIMATION FOR STATS =====
const animateCounters = () => {
    const stats = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseFloat(entry.target.textContent);
                const isDecimal = entry.target.textContent.includes('.');
                const increment = target / 30;
                let current = 0;
                
                const updateCount = () => {
                    if (current < target) {
                        current += increment;
                        entry.target.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.textContent = entry.target.textContent.replace(/\d+/, target);
                        entry.target.classList.add('animated');
                    }
                };
                
                updateCount();
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
};

document.addEventListener('DOMContentLoaded', animateCounters);

// ===== ACTIVE NAV LINK STYLING =====
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--color-accent);
        font-weight: 600;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===== ACCESSIBILITY: Keyboard navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Placeholder for future modal functionality
    }
});

// ===== PERFORMANCE: Lazy load images if added =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== SUBTLE MOUSE EFFECTS =====
document.addEventListener('mousemove', (e) => {
    // Optional: Add subtle parallax or other effects
    // Kept minimal to avoid "AI-generated" feel
});

console.log('Portfolio loaded ✓');
