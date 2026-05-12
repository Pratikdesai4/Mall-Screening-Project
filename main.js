/**
 * American Dream — Interactive Sales Deck
 * main.js — Deck Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initIntroSequence();
    initDeck();
    initStatsCounter();
    initModules();
    initVideoFallback();
});

// ============================================================
// INTRO SEQUENCE — Cinematic Video & Splash
// ============================================================
function initIntroSequence() {
    const splashScreen = document.getElementById('splash-screen');
    const startBtn = document.getElementById('start-presentation');
    const appContainer = document.getElementById('app');

    if (startBtn) {
        startBtn.onclick = () => {
            if (!splashScreen) return;
            
            // Premium fade out transition
            splashScreen.classList.add('fade-out');
            
            setTimeout(() => {
                splashScreen.style.display = 'none';
                
                if (appContainer) {
                    appContainer.classList.remove('presentation-hidden');
                    appContainer.classList.add('presentation-reveal');
                }
                
                // Small delay to ensure the deck initializes visibility correctly
                setTimeout(() => {
                    const firstSlide = document.querySelector('.full-page');
                    if (firstSlide) firstSlide.classList.add('visible');
                }, 100);
            }, 1000);
        };
    }
}

// ============================================================
// DECK ENGINE — Core scroll-snap deck with keyboard + dots
// ============================================================
function initDeck() {
    const container = document.querySelector('.content-container');
    const sections = Array.from(document.querySelectorAll('.full-page, .comprehensive-footer'));
    const dots = document.querySelectorAll('.nav-dot');
    const transitionOverlay = document.getElementById('section-transition');
    const progressBar = document.getElementById('slide-progress');
    const counterEl = document.getElementById('slide-counter');
    const keyboardHint = document.getElementById('keyboard-hint');
    const headerChapter = document.getElementById('header-chapter');
    const bottomChapter = document.getElementById('slide-chapter-name');
    const totalSlides = sections.length;
    let currentIndex = 0;
    let isTransitioning = false;

    const chapterNames = [
        'Introduction', 'Scale of Opportunity', 'The Retail Revolution',
        'Curated Luxury', 'Unrivaled Attractions', 'Global Flavors',
        'Exposition Center', 'Your Global Platform', 'Contact'
    ];

    // ── Slide counter display ──
    function updateCounter(index) {
        if (!counterEl) return;
        const numSpan = counterEl.querySelector('.current');
        if (numSpan) numSpan.textContent = String(index + 1).padStart(2, '0');
        const chapter = chapterNames[index] || '';
        if (headerChapter) headerChapter.textContent = chapter;
        if (bottomChapter) bottomChapter.textContent = chapter;
    }

    // ── Progress bar ──
    function updateProgress(index) {
        if (!progressBar) return;
        const pct = ((index + 1) / totalSlides) * 100;
        progressBar.style.width = pct + '%';
    }

    // ── Nav dots ──
    function updateDots(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // ── Section visibility (fade-in on enter) ──
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger child animations
                const animatables = entry.target.querySelectorAll('[data-animate]');
                animatables.forEach((el, i) => {
                    setTimeout(() => el.classList.add('visible'), i * 80);
                });
            }
        });
    }, { threshold: 0.15, root: container });

    sections.forEach(section => {
        visibilityObserver.observe(section);

        // Prepare animatable children (exclude footer elements so they are always visible)
        if (!section.classList.contains('comprehensive-footer')) {
            section.querySelectorAll('h2, p, .stat-card, .btn, .logo-item, .demo-card, .cap-item, .attraction-tags span, .cat-tag, .spec-mini-item').forEach(el => {
                el.setAttribute('data-animate', '');
            });
        }
    });

    // ── Go to slide ──
    function goToSlide(index, useTransition = true) {
        if (isTransitioning || index < 0 || index >= totalSlides) return;
        isTransitioning = true;

        const target = sections[index];

        if (useTransition && transitionOverlay) {
            transitionOverlay.classList.add('active');
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'auto', block: 'start' });
                currentIndex = index;
                updateDots(currentIndex);
                updateProgress(currentIndex);
                updateCounter(currentIndex);

                setTimeout(() => {
                    transitionOverlay.classList.remove('active');
                    isTransitioning = false;
                }, 300);
            }, 350);
        } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            currentIndex = index;
            updateDots(currentIndex);
            updateProgress(currentIndex);
            updateCounter(currentIndex);
            setTimeout(() => { isTransitioning = false; }, 800);
        }
    }

    // ── Detect current slide on scroll ──
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = sections.indexOf(entry.target);
                if (idx !== -1 && idx !== currentIndex) {
                    currentIndex = idx;
                    updateDots(currentIndex);
                    updateProgress(currentIndex);
                    updateCounter(currentIndex);
                }
            }
        });
    }, { threshold: 0.5, root: container });

    sections.forEach(s => scrollObserver.observe(s));

    // ── Dot nav clicks ──
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(index);
            if (keyboardHint) keyboardHint.classList.add('hidden');
        });
    });

    // ── Keyboard navigation ──
    document.addEventListener('keydown', (e) => {
        // Don't hijack keyboard when a module is open or user is typing
        if (document.querySelector('.module-overlay.active')) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            goToSlide(currentIndex + 1, false);
            if (keyboardHint) keyboardHint.classList.add('hidden');
        }

        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            goToSlide(currentIndex - 1, false);
            if (keyboardHint) keyboardHint.classList.add('hidden');
        }

        // Number keys 1-9 for direct jump
        const num = parseInt(e.key);
        if (!isNaN(num) && num >= 1 && num <= totalSlides) {
            goToSlide(num - 1);
        }
    });

    // ── Mouse wheel — one section per scroll ──
    let wheelTimeout;
    container.addEventListener('wheel', (e) => {
        // If a module is open, don't intercept
        if (document.querySelector('.module-overlay.active')) return;

        e.preventDefault();
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                goToSlide(currentIndex + 1, false);
            } else {
                goToSlide(currentIndex - 1, false);
            }
            if (keyboardHint) keyboardHint.classList.add('hidden');
        }, 50);
    }, { passive: false });

    // ── Touch swipe support ──
    let touchStartY = 0;
    container.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        if (document.querySelector('.module-overlay.active')) return;
        const delta = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(delta) > 50) {
            if (delta > 0) goToSlide(currentIndex + 1, false);
            else goToSlide(currentIndex - 1, false);
        }
    }, { passive: true });

    // ── Explore button ──
    const exploreBtn = document.getElementById('btn-explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(1, false);
        });
    }

    // ── Scroll-triggered video lazy load ──
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (!iframe.getAttribute('src') && iframe.getAttribute('data-src')) {
                    iframe.setAttribute('src', iframe.getAttribute('data-src'));
                }
            }
        });
    }, { threshold: 0.1, root: container });

    // ── Overlay Arrows ──
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    if (prevBtn) prevBtn.onclick = () => goToSlide(currentIndex - 1, false);
    if (nextBtn) nextBtn.onclick = () => goToSlide(currentIndex + 1, false);

    document.querySelectorAll('.scroll-triggered-video').forEach(v => videoObserver.observe(v));

    // Initialize
    updateDots(0);
    updateProgress(0);
    updateCounter(0);

    // Fade out keyboard hint after 4 seconds
    if (keyboardHint) {
        setTimeout(() => keyboardHint.classList.add('hidden'), 5000);
    }
}

// ============================================================
// STATS COUNTER ANIMATION
// ============================================================
function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value');
    const container = document.querySelector('.content-container');

    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        if (!target) return;
        const duration = 2200;
        const frameRate = 16;
        const totalFrames = duration / frameRate;
        const increment = target / totalFrames;
        let current = 0;

        const animate = () => {
            current += increment;
            if (current < target) {
                el.innerText = Math.ceil(current).toLocaleString();
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
                setTimeout(() => countUp(entry.target), 300);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, root: container });

    statValues.forEach(val => {
        val.innerText = '0';
        observer.observe(val);
    });
}

// ============================================================
// PHASE 2 MODULE OVERLAYS
// ============================================================
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

    // Triggers
    document.querySelectorAll('.btn-events-trigger').forEach(btn =>
        btn.addEventListener('click', () => openModule(eventsOverlay))
    );
    document.querySelectorAll('.btn-leasing-trigger').forEach(btn =>
        btn.addEventListener('click', () => openModule(leasingOverlay))
    );

    // Top INQUIRE NOW button → events module
    document.querySelector('.cta-top')?.addEventListener('click', () => openModule(eventsOverlay));

    // Sponsorship Deck button
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.innerText.toLowerCase().includes('sponsorship')) {
            btn.addEventListener('click', () => openModule(sponsorshipOverlay));
        }
    });

    // Close buttons
    document.querySelectorAll('.close-module').forEach(btn => {
        btn.addEventListener('click', (e) => closeModule(e.target.closest('.module-overlay')));
    });

    // Click backdrop to close
    document.querySelectorAll('.module-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModule(overlay);
        });
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.module-overlay.active').forEach(o => closeModule(o));
        }
    });

    // Form submissions
    document.querySelectorAll('.lead-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            setTimeout(() => {
                submitBtn.innerText = '✓ Request Received';
                submitBtn.style.background = '#10B981';
                submitBtn.style.borderColor = '#10B981';
                submitBtn.style.color = 'white';

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                    form.reset();
                    closeModule(form.closest('.module-overlay'));
                }, 2200);
            }, 900);
        });
    });
}

// ============================================================
// VIDEO FALLBACK — handle YouTube blocked scenarios
// ============================================================
function initVideoFallback() {
    // Check if iframes load; if not, ensure fallback images are visible
    document.querySelectorAll('.bg-video').forEach(iframe => {
        // If YouTube is blocked, the fallback img behind it is shown via CSS z-index
        iframe.addEventListener('error', () => {
            iframe.style.display = 'none';
        });
    });
}