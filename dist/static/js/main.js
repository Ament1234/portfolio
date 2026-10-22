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

    // 3. Projects Toggle
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
                if (toggleText) toggleText.textContent = 'Show Less';
                if (toggleIcon) { toggleIcon.classList.remove('fa-plus'); toggleIcon.classList.add('fa-minus'); }
            } else {
                additionalProjectsWrap.classList.remove('is-expanded');
                additionalProjectsWrap.classList.add('is-collapsed');
                toggleProjectsBtn.setAttribute('aria-expanded', 'false');
                additionalProjectsWrap.setAttribute('aria-hidden', 'true');
                if (toggleText) toggleText.textContent = 'View More Projects';
                if (toggleIcon) { toggleIcon.classList.remove('fa-minus'); toggleIcon.classList.add('fa-plus'); }
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    const offset = projectsSection.getBoundingClientRect().top + window.pageYOffset - 76;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    }

    // 4. Header scroll transparency (dark hero → scrolled state)
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
});
