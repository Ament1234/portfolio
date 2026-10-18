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

    // 3. Additional Projects Toggle (View More Projects / Show Less)
    const toggleProjectsBtn = document.getElementById('toggle-more-projects');
    const additionalProjectsWrap = document.getElementById('additional-projects-wrap');

    if (toggleProjectsBtn && additionalProjectsWrap) {
        toggleProjectsBtn.addEventListener('click', () => {
            const isCurrentlyExpanded = toggleProjectsBtn.getAttribute('aria-expanded') === 'true';
            const toggleText = toggleProjectsBtn.querySelector('.toggle-text');

            if (!isCurrentlyExpanded) {
                // Smoothly reveal additional projects
                additionalProjectsWrap.classList.remove('is-collapsed');
                additionalProjectsWrap.classList.add('is-expanded');
                toggleProjectsBtn.classList.add('is-expanded');
                toggleProjectsBtn.setAttribute('aria-expanded', 'true');
                additionalProjectsWrap.setAttribute('aria-hidden', 'false');
                if (toggleText) {
                    toggleText.textContent = 'Show Less';
                }
            } else {
                // Hide additional projects
                additionalProjectsWrap.classList.remove('is-expanded');
                additionalProjectsWrap.classList.add('is-collapsed');
                toggleProjectsBtn.classList.remove('is-expanded');
                toggleProjectsBtn.setAttribute('aria-expanded', 'false');
                additionalProjectsWrap.setAttribute('aria-hidden', 'true');
                if (toggleText) {
                    toggleText.textContent = 'View More Projects';
                }

                // Smoothly return visitor to the featured projects view
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    const headerOffset = 76;
                    const elementPosition = projectsSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});
