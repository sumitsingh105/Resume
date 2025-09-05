// Enhanced Portfolio JavaScript with Advanced Animations
// Author: Sumit Singh

class PortfolioAnimations {
    constructor() {
        this.roles = [
            "Senior Data Scientist @ Infosys",
            "M.Tech Graduate (IIT Goa)",
            "AI/ML Engineering Expert", 
            "Data Science Innovator",
            "Fortune 500 Consultant"
        ];
        this.currentRole = 0;
        this.currentChar = 0;
        this.typingElement = null;
        this.isTyping = false;
        this.particles = [];
        this.animationFrame = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupIntersectionObserver();
        this.createParticleSystem();
        this.initializeComponents();
        this.setupNavigation();
        this.hideLoadingScreen();
    }
    
    bindEvents() {
        window.addEventListener('load', () => this.hideLoadingScreen());
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1500);
        }
    }
    
    setupNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Hamburger menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                    
                    // Smooth scroll to target
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active nav link
                    this.updateActiveNavLink(targetId);
                }
            });
        });
        
        // Update active nav link on scroll
        this.updateNavOnScroll();
    }
    
    updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    updateNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            const current = this.getCurrentSection(sections);
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    getCurrentSection(sections) {
        const scrollY = window.pageYOffset;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY >= sectionTop) {
                return section.getAttribute('id');
            }
        }
        
        return sections[0]?.getAttribute('id') || 'home';
    }
    
    handleScroll() {
        const navbar = document.getElementById('navbar');
        const scrollY = window.pageYOffset;
        
        // Add scrolled class to navbar
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollY < hero.offsetHeight) {
            const speed = scrollY * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
        }
    }
    
    handleResize() {
        // Recreate particle system on resize
        this.createParticleSystem();
    }
    
    handleMouseMove(e) {
        const hero = document.querySelector('.hero');
        const particles = document.querySelector('.particles-container');
        
        if (hero && particles) {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Subtle mouse tracking effect
            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;
            
            particles.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    }
    
    handleKeyDown(e) {
        // Accessibility: Allow Enter key to activate buttons
        if (e.key === 'Enter' && e.target.classList.contains('btn')) {
            e.target.click();
        }
    }
    
    createParticleSystem() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        // Clear existing particles
        particlesContainer.innerHTML = '';
        this.particles = [];
        
        // Create new particles
        const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particlesContainer);
        }
        
        // Start animation loop
        this.animateParticles();
    }
    
    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 3 + 3;
        const delay = Math.random() * 2;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
        
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
    
    animateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = 100;
            if (particle.x > 100) particle.x = 0;
            if (particle.y < 0) particle.y = 100;
            if (particle.y > 100) particle.y = 0;
            
            particle.element.style.left = `${particle.x}%`;
            particle.element.style.top = `${particle.y}%`;
        });
        
        this.animationFrame = requestAnimationFrame(() => this.animateParticles());
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Trigger specific animations
                    this.handleSpecificAnimations(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all elements with reveal class
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }
    
    handleSpecificAnimations(target) {
        // Skills section animations
        if (target.id === 'skills') {
            this.animateSkillBars();
        }
        
        // Hero stats animation
        if (target.closest('.hero-stats')) {
            this.animateCounters();
        }
        
        // Projects stagger animation
        if (target.classList.contains('project-card')) {
            this.staggerProjectCards();
        }
    }
    
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const percentage = bar.getAttribute('data-percentage');
                if (percentage) {
                    bar.style.width = percentage + '%';
                }
            }, index * 200);
        });
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        });
    }
    
    staggerProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('active');
            }, index * 150);
        });
    }
    
    initializeComponents() {
        this.initTypingAnimation();
        this.initLazyLoading();
        this.initFormValidation();
        this.initTooltips();
    }
    
    initTypingAnimation() {
        this.typingElement = document.querySelector('.typing');
        if (this.typingElement) {
            this.startTyping();
        }
    }
    
    startTyping() {
        if (this.isTyping || !this.typingElement) return;
        this.isTyping = true;
        this.typeText();
    }
    
    typeText() {
        const currentText = this.roles[this.currentRole];
        
        if (this.currentChar < currentText.length) {
            this.typingElement.textContent += currentText.charAt(this.currentChar);
            this.currentChar++;
            setTimeout(() => this.typeText(), 100);
        } else {
            setTimeout(() => this.eraseText(), 2000);
        }
    }
    
    eraseText() {
        if (this.currentChar > 0) {
            const currentText = this.roles[this.currentRole];
            this.typingElement.textContent = currentText.substring(0, this.currentChar - 1);
            this.currentChar--;
            setTimeout(() => this.eraseText(), 50);
        } else {
            this.currentRole = (this.currentRole + 1) % this.roles.length;
            setTimeout(() => this.typeText(), 500);
        }
    }
    
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }
    
    handleFormSubmit(form) {
        // Add form submission logic here
        const formData = new FormData(form);
        
        // Show success message
        this.showNotification('Thank you! Your message has been sent.', 'success');
        
        // Reset form
        form.reset();
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }
    
    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        
        tooltip.classList.add('show');
    }
    
    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Performance monitoring
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${name} took ${end - start} milliseconds`);
        return result;
    }
    
    // Cleanup method
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mousemove', this.handleMouseMove);
    }
}

// Additional utility functions
const PortfolioUtils = {
    // Smooth scroll to element
    scrollToElement: (selector, offset = 0) => {
        const element = document.querySelector(selector);
        if (element) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Format number with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    },
    
    // Generate random ID
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Initialize portfolio animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Enhanced Portfolio Loading - Sumit Singh');
    console.log('🎯 Targeting FAANG Companies with Advanced Animations');
    
    // Initialize portfolio animations
    window.portfolioAnimations = new PortfolioAnimations();
    
    // Add custom styles for notifications and tooltips
    const customStyles = document.createElement('style');
    customStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification--success { background: #10b981; }
        .notification--error { background: #ef4444; }
        .notification--info { background: #3b82f6; }
        
        .tooltip {
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .tooltip.show {
            opacity: 1;
        }
        
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-top-color: rgba(0, 0, 0, 0.9);
        }
    `;
    document.head.appendChild(customStyles);
    
    // Add performance monitoring
    if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark('portfolio-init-start');
        
        window.addEventListener('load', () => {
            performance.mark('portfolio-init-end');
            performance.measure('portfolio-init', 'portfolio-init-start', 'portfolio-init-end');
            
            const measure = performance.getEntriesByName('portfolio-init')[0];
            console.log(`⚡ Portfolio initialized in ${measure.duration.toFixed(2)}ms`);
        });
    }
    
    // Add error handling
    window.addEventListener('error', (e) => {
        console.error('Portfolio Error:', e.error);
    });
    
    // Add visibility change handling
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is not visible
            if (window.portfolioAnimations && window.portfolioAnimations.animationFrame) {
                cancelAnimationFrame(window.portfolioAnimations.animationFrame);
            }
        } else {
            // Resume animations when tab becomes visible
            if (window.portfolioAnimations) {
                window.portfolioAnimations.animateParticles();
            }
        }
    });
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioAnimations, PortfolioUtils };
}
