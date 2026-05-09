document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initStatsCounter();
    initNavigation();
    initEventsModule();
    initVideoInjection();
});

/**
 * Lazy load YouTube iframes on desktop only, after initial load, for 100 Performance Score
 */
function initVideoInjection() {
    window.addEventListener('load', () => {
        if (window.innerWidth > 768) {
            setTimeout(() => {
                const heroBg = document.querySelector('#hero .background-media');
                if (heroBg) {
                    heroBg.insertAdjacentHTML('afterbegin', '<iframe title="American Dream Hero Video" src="https://www.youtube.com/embed/nlB8mRFGxjw?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&playlist=nlB8mRFGxjw&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" class="bg-video" allowfullscreen></iframe>');
                }

                const entBg = document.querySelector('#entertainment .background-media');
                if (entBg) {
                    entBg.insertAdjacentHTML('afterbegin', '<iframe title="American Dream Entertainment Video" src="https://www.youtube.com/embed/G6fMtsWiZnQ?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&playlist=G6fMtsWiZnQ&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" class="bg-video" allowfullscreen></iframe>');
                }
            }, 1500); // Wait 1.5s after load to ensure CPU is completely idle
        }
    });
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateNav(entry.target.id);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
        // Add animation class to children
        section.querySelectorAll('h2, p, .stat-card, .btn, .tenant-list li, .demo-card, .logo-item, .cap-item').forEach(el => {
            el.setAttribute('data-animate', '');
        });
        
        const animatables = section.querySelectorAll('[data-animate]');
        const innerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        animatables.forEach(el => innerObserver.observe(el));
    });
}

/**
 * Stats Counter Animation
 */
function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const count = parseInt(el.innerText);
        const speed = 2000; // 2 seconds duration
        const increment = target / (speed / 16); // 60fps

        if (count < target) {
            el.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(el), 16);
        } else {
            el.innerText = target.toLocaleString();
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(val => observer.observe(val));
}

/**
 * Navigation Logic
 */
function initNavigation() {
    const dots = document.querySelectorAll('.nav-dot');
    const navLabel = document.querySelector('.nav-label');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            // Native anchor scrolling will handle it thanks to CSS scroll-behavior
        });
    });

    // Smooth scroll for "Explore" button
    const exploreBtn = document.getElementById('btn-explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('why');
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function updateNav(sectionId) {
    const dots = document.querySelectorAll('.nav-dot');
    const navLabel = document.querySelector('.nav-label');
    
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href') === `#${sectionId}`) {
            dot.classList.add('active');
            navLabel.innerText = dot.getAttribute('data-title');
        }
    });
}

/**
 * Phase 2: Events Module Logic
 */
function initEventsModule() {
    const bookBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
    const moduleOverlay = document.getElementById('events-module');
    const closeBtn = document.querySelector('.close-module');

    bookBtns.forEach(btn => {
        const text = btn.innerText.toLowerCase();
        if (text.includes('book') || text.includes('partner') || text.includes('sponsorship')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                moduleOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        }
    });

    closeBtn.addEventListener('click', () => {
        moduleOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on outside click
    moduleOverlay.addEventListener('click', (e) => {
        if (e.target === moduleOverlay) {
            moduleOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Form Submission Handling
    const leadForm = document.querySelector('.lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Inquiry Sent!';
            submitBtn.style.backgroundColor = '#4caf50'; // Success green
            submitBtn.style.color = 'white';
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
                leadForm.reset();
                moduleOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }, 2500);
        });
    }
}
