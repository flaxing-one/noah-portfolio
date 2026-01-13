/* ==========================================================================
   NOAH SCAILLIEREZ PORTFOLIO - JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initLoader();
    initCustomCursor();
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initTypingEffect();
    initCounters();
    initSkillBars();
    initExperienceTabs();
    initProjectFilters();
    initContactForm();
    initAOSAnimations();
});

/* ==========================================================================
   Loader
   ========================================================================== */

function initLoader() {
    const loader = document.querySelector('.loader');

    if (!loader) return;

    // Add loading class to body
    document.body.classList.add('loading');

    // Hide loader after animation
    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 2200);
    });

    // Fallback: hide loader after max 3 seconds
    setTimeout(function () {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 3000);
}

/* ==========================================================================
   Custom Cursor
   ========================================================================== */

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    // Check if device supports hover (not touch)
    if (window.matchMedia('(hover: none)').matches) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows mouse directly
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower has more delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, input, textarea, .project-card, .skill-category, .timeline-content');

    hoverElements.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });

        el.addEventListener('mouseleave', function () {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ==========================================================================
   Navigation
   ========================================================================== */

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTop = document.querySelector('.back-to-top');

    // Scroll effect for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top visibility
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Active section highlight
        let current = '';

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

/* ==========================================================================
   Mobile Menu
   ========================================================================== */

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!navToggle || !mobileMenu) return;

    navToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

/* ==========================================================================
   Scroll Effects & Animations
   ========================================================================== */

function initScrollEffects() {
    // Parallax for hero background shapes
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        shapes.forEach(function (shape, index) {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/* ==========================================================================
   Typing Effect
   ========================================================================== */

function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');

    if (!typingElement) return;

    const texts = [
        'Expert Marketing Digital & Communication',
        'Community Manager créatif',
        'Créateur de contenu passionné',
        'Stratège digital innovant'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start after loader
    setTimeout(type, 2500);
}

/* ==========================================================================
   Counters Animation
   ========================================================================== */

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(function (counter) {
        observer.observe(counter);
    });
}

/* ==========================================================================
   Skill Bars Animation
   ========================================================================== */

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    if (skillBars.length === 0) return;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');

                setTimeout(function () {
                    bar.style.width = progress + '%';
                }, 200);

                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(function (bar) {
        observer.observe(bar);
    });
}

/* ==========================================================================
   Experience Tabs
   ========================================================================== */

function initExperienceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.timeline-container');

    if (tabButtons.length === 0) return;

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Remove active from all buttons and contents
            tabButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            tabContents.forEach(function (content) {
                content.classList.remove('active');
            });

            // Add active to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/* ==========================================================================
   Project Filters
   ========================================================================== */

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(function (card) {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(function () {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(function () {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   Contact Form
   ========================================================================== */

function initContactForm() {
    const form = document.querySelector('.contact-form');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const message = document.getElementById('message').value;

        // Create mailto link
        const subject = encodeURIComponent(`Contact depuis le portfolio - ${name}`);
        const body = encodeURIComponent(
            `Nom: ${name}\n` +
            `Email: ${email}\n` +
            `Entreprise: ${company || 'Non spécifié'}\n\n` +
            `Message:\n${message}`
        );

        window.location.href = `mailto:noah.scaillierez@gmail.com?subject=${subject}&body=${body}`;

        // Show success feedback
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Message préparé !</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(function () {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            form.reset();
        }, 3000);
    });
}

/* ==========================================================================
   AOS-like Scroll Animations
   ========================================================================== */

function initAOSAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;

                setTimeout(function () {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing after loader
    setTimeout(function () {
        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    }, 2200);
}

/* ==========================================================================
   Utility Functions
   ========================================================================== */

// Debounce function for performance
function debounce(func, wait = 20) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
