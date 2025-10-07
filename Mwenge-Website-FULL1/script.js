// Loading Animation
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1500);
});

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active states
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            // Smooth scroll to section
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Scroll to top functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll to section function (for hero buttons)
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active states
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            
            document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
            section.classList.add('active');
        }
    };
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inatumwa...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                showNotification('Ujumbe wako umetumwa kikamilifu! Tutakupigia simu hivi karibuni.', 'success');
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Donation form handling
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inaandalizia...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Asante kwa nia yako ya kuchangia! Tutawasiliana nawe kwa maelekezo zaidi.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Add show class after a delay
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Add notification styles dynamically
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            border-left: 4px solid #1a936f;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10000;
            max-width: 400px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: #1a936f;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-content i {
            color: #1a936f;
            font-size: 1.2rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .notification-close:hover {
            background: #f0f0f0;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // Add scroll to top button
    const scrollToTop = document.createElement('button');
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTop);
    
    // Initialize first section as active
    if (sections.length > 0 && !document.querySelector('.section.active')) {
        sections[0].classList.add('active');
    }
    
    // Add hover effects to all interactive elements
    document.querySelectorAll('.btn, .nav-link, .teacher-card, .about-card, .gallery-item').forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }
    
    // Initialize counters when they come into view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' && window.scrollY > 0) {
        e.preventDefault();
        window.scrollBy({ top: -100, behavior: 'smooth' });
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy({ top: 100, behavior: 'smooth' });
    } else if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Add page visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = 'Tumerudi - Mwenge Secondary School';
    } else {
        document.title = 'Mwenge Secondary School - Elimu Bora, Nidhamu';
    }
});

// Add beforeunload event for form protection
window.addEventListener('beforeunload', function(e) {
    const forms = document.querySelectorAll('form');
    let hasUnsavedChanges = false;
    
    forms.forEach(form => {
        const formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            if (value.trim() !== '') {
                hasUnsavedChanged = true;
                break;
            }
        }
    });
    
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});
