// JavaScript for The Dublin Plate restaurant website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation item 
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add animation to menu items on scroll
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const menuObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Add initial style and observe each menu item
        menuItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            menuObserver.observe(item);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        menuItems.forEach(item => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        });
    }
    
    // Add search functionality
    const searchButton = document.createElement('button');
    searchButton.className = 'btn btn-outline-secondary ms-2';
    searchButton.innerHTML = '<i class="fas fa-search"></i>';
    searchButton.id = 'searchToggle';
    
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.appendChild(searchButton);
    
    // Create search form
    const searchForm = document.createElement('div');
    searchForm.id = 'searchForm';
    searchForm.className = 'mt-3 d-none w-100';
    searchForm.innerHTML = `
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search our menu...">
            <button class="btn btn-outline-secondary" type="button">Search</button>
        </div>
    `;
    
    navbarCollapse.appendChild(searchForm);
    
    // Toggle search form
    document.getElementById('searchToggle').addEventListener('click', function() {
        const form = document.getElementById('searchForm');
        form.classList.toggle('d-none');
    });
});