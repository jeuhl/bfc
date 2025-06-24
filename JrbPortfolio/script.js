// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        });
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Set initial state for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-container, .about-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.8;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Trigger animations on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            themeToggle.querySelector('i').classList.toggle('fa-moon');
            themeToggle.querySelector('i').classList.toggle('fa-sun');
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            if (!nameInput.value.trim()) {
                showAlert('Please enter your name', nameInput);
                return;
            }
            
            if (!validateEmail(emailInput.value)) {
                showAlert('Please enter a valid email address', emailInput);
                return;
            }
            
            if (!messageInput.value.trim()) {
                showAlert('Please enter your message', messageInput);
                return;
            }
            
            // Form submission would go here
            showAlert('Thank you for your message! I will get back to you soon.', null, 'success');
            this.reset();
        });
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showAlert(message, element, type = 'error') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) existingAlert.remove();
        
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.textContent = message;
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-10px)';
        alert.style.transition = 'all 0.3s ease';
        alert.style.padding = '10px 20px';
        alert.style.borderRadius = '8px';
        alert.style.marginBottom = '15px';
        alert.style.textAlign = 'center';
        
        if (type === 'error') {
            alert.style.backgroundColor = 'rgba(255, 77, 90, 0.1)';
            alert.style.border = '1px solid rgba(255, 77, 90, 0.3)';
            alert.style.color = '#ff4d5a';
        } else {
            alert.style.backgroundColor = 'rgba(176, 224, 230, 0.1)';
            alert.style.border = '1px solid rgba(176, 224, 230, 0.3)';
            alert.style.color = '#B0E0E6';
        }
        
        if (element) {
            element.parentNode.insertBefore(alert, element.nextSibling);
            element.focus();
        } else {
            contactForm.prepend(alert);
        }
        
        setTimeout(() => {
            alert.style.opacity = '1';
            alert.style.transform = 'translateY(0)';
        }, 10);
        
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    }
});