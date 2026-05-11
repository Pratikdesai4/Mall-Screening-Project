document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initStatsCounter();
    initNavigation();
    initModules();
    initVideoFallback();
});

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
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
        }, { threshold: 0.05 });

        animatables.forEach(el => innerObserver.observe(el));
    });

    // Scroll-Triggered Video Observer
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (!iframe.getAttribute('src') && iframe.getAttribute('data-src')) {
                    iframe.setAttribute('src', iframe.getAttribute('data-src'));
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
        const duration = 2500; // slightly slower for premium feel
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
                // Delay slightly to ensure visibility
                setTimeout(() => {
                    countUp(entry.target);
                }, 200);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    statValues.forEach(val => {
        val.innerText = '0';
        observer.observe(val);
    });
}

/**
 * Navigation Logic
 */
function initNavigation() {
    const dots = document.querySelectorAll('.nav-dot');
    const transitionOverlay = document.getElementById('section-transition');

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                transitionOverlay.classList.add('active');

                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'auto', block: 'start' });
                    
                    // Force update nav just in case observer misses it during jump
                    updateNav(targetId.substring(1));

                    setTimeout(() => {
                        transitionOverlay.classList.remove('active');
                    }, 300);
                }, 500);
            }
        });
    });

    const exploreBtn = document.getElementById('btn-explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#why').scrollIntoView({ behavior: 'smooth' });
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
 * Phase 2: Modules Logic (Events, Sponsorship, Leasing)
 */
function initModules() {
    const eventsOverlay = document.getElementById('events-module');
    const sponsorshipOverlay = document.getElementById('sponsorship-module');
    const leasingOverlay = document.getElementById('leasing-module');

    const openModule = (overlay) => {
        if (!overlay) return;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModule = (overlay) => {
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Generic triggers
    document.querySelectorAll('.btn-events-trigger').forEach(btn => {
        btn.addEventListener('click', () => openModule(eventsOverlay));
    });

    document.querySelectorAll('.btn-leasing-trigger').forEach(btn => {
        btn.addEventListener('click', () => openModule(leasingOverlay));
    });

    // Special handling for old classes if any
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.innerText.toLowerCase().includes('sponsorship')) {
            btn.addEventListener('click', () => openModule(sponsorshipOverlay));
        }
    });

    document.querySelectorAll('.close-module').forEach(btn => {
        btn.addEventListener('click', (e) => closeModule(e.target.closest('.module-overlay')));
    });

    document.querySelectorAll('.module-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModule(overlay);
        });
    });

    // Form Submissions
    document.querySelectorAll('.lead-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            setTimeout(() => {
                submitBtn.innerText = 'Request Received ✓';
                submitBtn.style.backgroundColor = '#10B981';
                submitBtn.style.borderColor = '#10B981';
                submitBtn.style.color = 'white';

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                    form.reset();
                    closeModule(form.closest('.module-overlay'));
                }, 2000);
            }, 1000);
        });
    });
}

/**
 * Handle YouTube Blocking
 */
function initVideoFallback() {
    // If user has network issues with YouTube, we ensure fallbacks are visible
    // CSS already handles the layering, but we can add logic to hide iframes that fail
    window.addEventListener('message', (event) => {
        // YouTube postMessage API can be used to detect errors, but usually 
        // a simple timeout or network check is more reliable for "blocked" status.
    });
}
