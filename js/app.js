/* ==========================================================================
   NOAH SCAILLIEREZ PORTFOLIO - JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initLoader();
    // initCustomCursor(); // Disabled for performance
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

    // Hide loader after animation - reduced for faster experience
    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 600);
    });

    // Fallback: hide loader after max 1.2 seconds
    setTimeout(function () {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 1200);
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

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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

/* ==========================================================================
   PREMIUM FEATURES
   ========================================================================== */

/* Scroll Progress Bar */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* Theme Toggle - Dark/Light Mode */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');

        // Save preference
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');

        // Add rotation animation
        this.style.transform = 'scale(1.1) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 500);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('light-mode', !e.matches);
        }
    });
}

/* Particles Background */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Reduce particles on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    const opacity = Math.random() * 0.3 + 0.1;

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: -${delay}s;
        animation-duration: ${duration}s;
        opacity: ${opacity};
    `;

    container.appendChild(particle);
}

/* Social Share Sidebar */
function initSocialShare() {
    // Create social share sidebar if it doesn't exist
    if (document.querySelector('.social-share-sidebar')) return;

    const sidebar = document.createElement('div');
    sidebar.className = 'social-share-sidebar';
    sidebar.innerHTML = `
        <a href="https://linkedin.com/in/noahscan" target="_blank" rel="noopener noreferrer" class="social-share-btn linkedin" aria-label="LinkedIn" title="Voir mon LinkedIn">
            <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://twitter.com/intent/tweet?text=Découvrez le portfolio de Noah Scaillierez, alternant marketing digital !&url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener noreferrer" class="social-share-btn twitter" aria-label="Partager sur Twitter" title="Partager sur Twitter">
            <i class="fab fa-twitter"></i>
        </a>
        <a href="https://wa.me/?text=Découvrez le portfolio de Noah Scaillierez: ${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener noreferrer" class="social-share-btn whatsapp" aria-label="Partager sur WhatsApp" title="Partager sur WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
        <a href="mailto:?subject=Portfolio de Noah Scaillierez&body=Découvrez ce portfolio : ${encodeURIComponent(window.location.href)}" class="social-share-btn email" aria-label="Partager par email" title="Partager par email">
            <i class="fas fa-envelope"></i>
        </a>
    `;

    document.body.appendChild(sidebar);

    // Add animation on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.scrollY;
        const isScrollingDown = currentScroll > lastScroll;

        if (currentScroll > 300) {
            sidebar.style.opacity = isScrollingDown ? '0.5' : '1';
        } else {
            sidebar.style.opacity = '1';
        }

        lastScroll = currentScroll;
    });
}

/* Enhanced Hover Effects for Cards */
function init3DCardEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-category');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });
}

/* Easter Egg - Konami Code */
function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function (e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;

            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s ease';

                // Create confetti effect
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => createConfetti(), i * 30);
                }

                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#10b981', '#f59e0b'];

    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -20px;
        z-index: 10002;
        border-radius: 2px;
        pointer-events: none;
        animation: confettiFall 3s forwards;
        transform: rotate(${Math.random() * 360}deg);
    `;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    @keyframes rainbow {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(confettiStyle);

/* Keyboard Navigation Enhancement */
function initKeyboardNav() {
    document.addEventListener('keydown', function (e) {
        // Press 'h' to go home
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
        }

        // Press 'c' to go to contact
        if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }

        // Press 't' to toggle theme
        if (e.key === 't' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
            document.querySelector('.theme-toggle')?.click();
        }
    });
}

function isInputFocused() {
    const activeElement = document.activeElement;
    return activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable;
}

/* Print CV Function */
function initPrintCV() {
    // Add keyboard shortcut for printing
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            // The browser's native print will be triggered
            // Our print styles will handle the layout
        }
    });
}

/* Initialize all premium features */
document.addEventListener('DOMContentLoaded', function () {
    // Initialize after a short delay to ensure DOM is ready
    setTimeout(function () {
        initScrollProgress();
        // initThemeToggle(); // Disabled - dark mode only for clean pro look
        // initParticles(); // Disabled for performance
        initSocialShare();
        // init3DCardEffects(); // Disabled for performance
        initEasterEgg();
        initKeyboardNav();
        initPrintCV();
    }, 100);
});
