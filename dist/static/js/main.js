/**
 * Ament Diljo — Professional Developer Portfolio
 * Clean, lightweight, accessible JavaScript functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        const toggleIcon = navToggle.querySelector('i');

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            if (toggleIcon) {
                toggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        // Close menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    if (toggleIcon) {
                        toggleIcon.className = 'fa-solid fa-bars';
                    }
                }
            });
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open')) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    if (toggleIcon) {
                        toggleIcon.className = 'fa-solid fa-bars';
                    }
                }
            }
        });
    }

    // 2. Active Navigation Scroll Spy
    const sections = document.querySelectorAll('section[id]');
    
    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${currentId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // 3. Header scroll transparency (dark hero → scrolled state)
    const siteHeader = document.getElementById('header');
    if (siteHeader) {
        const heroSection = document.getElementById('hero');
        const heroHeight = heroSection ? heroSection.offsetHeight * 0.7 : 300;

        const updateHeader = () => {
            if (window.scrollY > heroHeight) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader(); // run once on load
    }

    
    // 3.5. Projects Toggle (Showcase Orbit & FashionAI / Expand More Projects)
    const toggleProjectsBtn = document.getElementById('toggle-more-projects');
    const additionalProjectsWrap = document.getElementById('ed-additional-projects');

    if (toggleProjectsBtn && additionalProjectsWrap) {
        toggleProjectsBtn.addEventListener('click', () => {
            const isExpanded = toggleProjectsBtn.getAttribute('aria-expanded') === 'true';
            const toggleText = toggleProjectsBtn.querySelector('.ed-toggle-btn__text');
            const toggleIcon = toggleProjectsBtn.querySelector('.ed-toggle-btn__icon');

            if (!isExpanded) {
                additionalProjectsWrap.classList.remove('is-collapsed');
                additionalProjectsWrap.classList.add('is-expanded');
                toggleProjectsBtn.setAttribute('aria-expanded', 'true');
                additionalProjectsWrap.setAttribute('aria-hidden', 'false');
                if (toggleText) toggleText.textContent = 'Show Fewer Projects';
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-plus');
                    toggleIcon.classList.add('fa-minus');
                }
            } else {
                additionalProjectsWrap.classList.remove('is-expanded');
                additionalProjectsWrap.classList.add('is-collapsed');
                toggleProjectsBtn.setAttribute('aria-expanded', 'false');
                additionalProjectsWrap.setAttribute('aria-hidden', 'true');
                if (toggleText) toggleText.textContent = 'View More Projects';
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-minus');
                    toggleIcon.classList.add('fa-plus');
                }
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    const offset = projectsSection.getBoundingClientRect().top + window.pageYOffset - 76;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    }

    // 4. Subtle Viewport Scroll Reveal for Selected Projects & Skills
    const revealElements = document.querySelectorAll('.ed-reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Support optional staggered index delay
                    const cardIndex = el.getAttribute('data-card-index');
                    if (cardIndex !== null) {
                        el.style.transitionDelay = `${parseInt(cardIndex, 10) * 80}ms`;
                    }
                    el.classList.add('is-revealed');
                    obs.unobserve(el);
                }
            });
        }, {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback if IntersectionObserver is unavailable
        revealElements.forEach(el => el.classList.add('is-revealed'));
    }

    // 5. Section A: 3D Project Card Tilt Interaction (Desktop only, GPU accelerated)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    if (!prefersReducedMotion && !isTouchDevice) {
        const projectCards = document.querySelectorAll('[data-tilt-card]');

        projectCards.forEach(card => {
            let rafId = null;
            let currentX = 0;
            let currentY = 0;

            const onPointerMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to +0.5

                currentX = x;
                currentY = y;

                if (!rafId) {
                    rafId = requestAnimationFrame(() => {
                        const maxTilt = 4.2; // subtle 3-5 degrees
                        const tiltX = -currentY * maxTilt;
                        const tiltY = currentX * maxTilt;

                        card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
                        card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
                        card.style.setProperty('--pointer-x', `${((currentX + 0.5) * 100).toFixed(1)}%`);
                        card.style.setProperty('--pointer-y', `${((currentY + 0.5) * 100).toFixed(1)}%`);

                        rafId = null;
                    });
                }
            };

            const onPointerLeave = () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
                card.style.setProperty('--pointer-x', '50%');
                card.style.setProperty('--pointer-y', '50%');
            };

            card.addEventListener('pointermove', onPointerMove, { passive: true });
            card.addEventListener('pointerleave', onPointerLeave, { passive: true });
        });
    }

    // 6. Section B: Kinetic Typography Interaction & Subtle Parallax Drift
    const kineticStage = document.getElementById('kinetic-stage');
    const kineticLines = document.querySelectorAll('.ed-kinetic-line');
    const kineticWords = document.querySelectorAll('.kt-word');
    const taxonomyCards = document.querySelectorAll('.ed-taxonomy__card');
    const taxonomyTags = document.querySelectorAll('.ed-taxonomy__tag');

    // Subtle scroll parallax drift on kinetic lines (restrained to ±14px)
    if (!prefersReducedMotion && kineticStage && kineticLines.length > 0) {
        let isTicking = false;

        const updateKineticParallax = () => {
            const rect = kineticStage.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Only apply when stage is in or near viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                const stageCenter = rect.top + rect.height / 2;
                const offset = (stageCenter - windowHeight / 2) / (windowHeight / 2); // -1 to 1

                kineticLines.forEach(line => {
                    const speed = parseFloat(line.getAttribute('data-speed') || '1');
                    const maxDrift = 14; // pixels
                    const translateX = -(offset * speed * maxDrift);
                    line.style.transform = `translateX(${translateX.toFixed(1)}px)`;
                });
            }
            isTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (!isTicking) {
                requestAnimationFrame(updateKineticParallax);
                isTicking = true;
            }
        }, { passive: true });
    }

    // Interactive Cross-Highlighting between Taxonomy and Kinetic Typography
    if (taxonomyCards.length > 0 && kineticWords.length > 0) {
        // Hovering a taxonomy tag highlights matching kinetic word
        taxonomyTags.forEach(tag => {
            const techName = tag.getAttribute('data-tech-tag');
            if (!techName) return;

            tag.addEventListener('mouseenter', () => {
                kineticWords.forEach(word => {
                    const wordTech = word.getAttribute('data-tech');
                    if (wordTech && (wordTech.toLowerCase() === techName.toLowerCase() || techName.toLowerCase().includes(wordTech.toLowerCase()))) {
                        word.classList.add('is-highlighted');
                    }
                });
            });

            tag.addEventListener('mouseleave', () => {
                kineticWords.forEach(word => word.classList.remove('is-highlighted'));
            });
        });

        // Hovering a kinetic word highlights matching taxonomy tag & card
        kineticWords.forEach(word => {
            const wordTech = word.getAttribute('data-tech');
            if (!wordTech) return;

            word.addEventListener('mouseenter', () => {
                taxonomyTags.forEach(tag => {
                    const tagTech = tag.getAttribute('data-tech-tag');
                    if (tagTech && (tagTech.toLowerCase() === wordTech.toLowerCase() || wordTech.toLowerCase().includes(tagTech.toLowerCase()))) {
                        tag.classList.add('is-active');
                        const parentCard = tag.closest('.ed-taxonomy__card');
                        if (parentCard) parentCard.classList.add('is-active');
                    }
                });
            });

            word.addEventListener('mouseleave', () => {
                taxonomyTags.forEach(tag => tag.classList.remove('is-active'));
                taxonomyCards.forEach(card => card.classList.remove('is-active'));
            });
        });
    }
});
