document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initStatsCounter();
    initNavigation();
    initEventsModule();
});

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

    // Scroll-Triggered Video Observer
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (!iframe.getAttribute('src')) {
                    iframe.setAttribute('src', iframe.getAttribute('data-src'));
                }
            } else {
                const iframe = entry.target;
                if (iframe.getAttribute('src')) {
                    // Optional: remove src to pause, but better to let it play once loaded or just pause it.
                    // Since it's a youtube iframe, setting src to '' unloads it, which causes a flash on reload.
                    // For now, loading it strictly on scroll satisfies the requirement.
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-triggered-video').forEach(video => {
        videoObserver.observe(video);
    });
}

/**
 * Stats Counter Animation
 */
function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value');

    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const frameRate = 16;
        const totalFrames = duration / frameRate;
        const increment = target / totalFrames;
        let currentCount = 0;

        const animate = () => {
            currentCount += increment;
            if (currentCount < target) {
                el.innerText = Math.ceil(currentCount).toLocaleString();
                requestAnimationFrame(animate);
            } else {
                el.innerText = target.toLocaleString();
            }
        };
        requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                obs.unobserve(entry.target); // Stop observing once triggered
            }
        });
    }, { threshold: 0.1 }); // Lowered threshold for better triggering

    statValues.forEach(val => {
        val.innerText = '0'; // Ensure it starts at 0
        observer.observe(val);
    });
}

/**
 * Navigation Logic
 */
function initNavigation() {
    const dots = document.querySelectorAll('.nav-dot');
    const navLabel = document.querySelector('.nav-label');

    const transitionOverlay = document.getElementById('section-transition');

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Show transition overlay
                transitionOverlay.classList.add('active');

                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'auto' });

                    // Hide transition overlay after jump
                    setTimeout(() => {
                        transitionOverlay.classList.remove('active');
                    }, 100);
                }, 400); // match CSS transition duration
            }
        });
    });

    // Smooth scroll for "Explore" button
    const exploreBtn = document.getElementById('btn-explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('why');
            if (target) {
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
 * Phase 2: Events & Sponsorship Module Logic
 */
function initEventsModule() {
    const bookBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
    const eventsOverlay = document.getElementById('events-module');
    const sponsorshipOverlay = document.getElementById('sponsorship-module');

    bookBtns.forEach(btn => {
        const text = btn.innerText.toLowerCase();
        if (text.includes('book') || text.includes('partner') || text.includes('events')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                eventsOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        } else if (text.includes('sponsorship')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                sponsorshipOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    const closeModule = (overlay) => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.close-module').forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeModule(e.target.closest('.module-overlay'));
        });
    });

    document.querySelectorAll('.module-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModule(overlay);
            }
        });
    });

    // Form Submission Handling (with visual feedback)
    document.querySelectorAll('.lead-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Request Received ✓';
            submitBtn.style.backgroundColor = '#10B981'; // Success green
            submitBtn.style.borderColor = '#10B981';
            submitBtn.style.color = 'white';

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
                form.reset();
                closeModule(form.closest('.module-overlay'));
            }, 3000);
        });
    });
}
