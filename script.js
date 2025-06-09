document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky navigation on scroll
    const nav = document.querySelector('.sticky-nav');
    window.addEventListener('scroll', function() {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        backToTopBtn.classList.toggle('active', window.scrollY > 300);
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const radialProgress = document.querySelectorAll('.radial-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = width;
        });
        
        radialProgress.forEach(item => {
            const progress = item.getAttribute('data-progress');
            item.style.setProperty('--progress', `${progress}%`);
        });
    }
    
    // Intersection Observer for skills animation
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Sample projects data - in a real scenario, you might fetch this from an API
    const projectsData = [
        {
            title: "E-commerce Website",
            category: "web",
            image: "https://via.placeholder.com/600x400?text=E-commerce+Website",
            links: {
                live: "#",
                code: "#"
            }
        },
        {
            title: "Mobile App Design",
            category: "design",
            image: "https://via.placeholder.com/600x400?text=Mobile+App+Design",
            links: {
                live: "#",
                code: "#"
            }
        },
        {
            title: "Task Management App",
            category: "app",
            image: "https://via.placeholder.com/600x400?text=Task+Management+App",
            links: {
                live: "#",
                code: "#"
            }
        },
        {
            title: "Portfolio Website",
            category: "web",
            image: "https://via.placeholder.com/600x400?text=Portfolio+Website",
            links: {
                live: "#",
                code: "#"
            }
        },
        {
            title: "Social Media Dashboard",
            category: "web",
            image: "https://via.placeholder.com/600x400?text=Social+Media+Dashboard",
            links: {
                live: "#",
                code: "#"
            }
        },
        {
            title: "Weather App",
            category: "app",
            image: "https://via.placeholder.com/600x400?text=Weather+App",
            links: {
                live: "#",
                code: "#"
            }
        }
    ];

    // Dynamically load projects
    const projectContainer = document.querySelector('.project-container');
    
    if (projectContainer) {
        projectContainer.innerHTML = ''; // Clear any placeholder content
        
        projectsData.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.setAttribute('data-category', project.category);
            
            projectItem.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="project-overlay">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-category">${project.category}</span>
                    <div class="project-links">
                        <a href="${project.links.live}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                        <a href="${project.links.code}" class="project-link" target="_blank"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            `;
            
            projectContainer.appendChild(projectItem);
        });
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real scenario, you would send the form data to a server
            // For this example, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Animate circles in about section
    const statCircles = document.querySelectorAll('.stat-circle');
    statCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const progressCircle = circle.querySelector('.circle-progress');
        
        // Calculate the stroke-dashoffset based on the percentage
        const circumference = 2 * Math.PI * 70;
        const offset = circumference - (percent / 100) * circumference;
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
        progressCircle.style.animation = `circleFill 1.5s ease-in-out forwards`;
        
        // Set CSS variable for the animation
        circle.style.setProperty('--percent', percent);
    });
});