// Initialize after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize particles.js
    particlesJS.load('particles-container', 'particles.json', function () {
        console.log('particles.js loaded');
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            // Change icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });
    }

    // Scroll animations
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initialize scroll animations
    handleScrollAnimation();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }

                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Prevent zooming on the webpage
    window.addEventListener('wheel', (e) => {
        const isPinching = e.ctrlKey;
        if (isPinching) e.preventDefault();
    }, { passive: false });

    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-zinc-400');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.remove('text-zinc-400');
                link.classList.add('text-white');
            }
        });
    });

    // Contact form validation
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (!name.value || !email.value || !message.value) {
                alert('请填写所有必填字段');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                alert('请输入有效的电子邮箱地址');
                return;
            }

            // Form submission (simulated)
            alert('消息已发送，我们将尽快回复您！');
            contactForm.reset();
        });
    }

    // Animate numbers
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Create data stream effect
    function createDataStream() {
        const container = document.createElement('div');
        container.classList.add('data-stream');
        document.body.appendChild(container);

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const bit = document.createElement('div');
                bit.classList.add('data-bit');
                bit.style.top = `${Math.random() * 100}%`;
                bit.style.animationDuration = `${15 + Math.random() * 10}s`;
                bit.textContent = Math.random() > 0.5 ? '1' : '0';
                container.appendChild(bit);

                // Remove after animation completes
                setTimeout(() => {
                    bit.remove();
                }, 25000);

            }, i * 400);
        }
    }
});
