// Session management for front page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!sessionStorage.getItem('isLoggedIn')) {
        // Redirect to login page if not logged in
        alert("Please Log In first!");
        window.location.href = 'login.html';
        return;
    }
    
    // Prevent going back to login page
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
    });
    
    // Get user data from session storage
    const userData = JSON.parse(sessionStorage.getItem('userData')) || { name: 'User' };
    
    // Update user display
    const username = document.getElementById('username');
    const userInitial = document.getElementById('user-initial');
    
    if (username && userInitial) {
        username.textContent = userData.name.split(' ')[0];
        userInitial.textContent = userData.name.charAt(0);
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear session storage
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userData');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Add a special flag to detect direct navigation attempts
    sessionStorage.setItem('preventLoginAccess', 'true');
    
    // Intercept all link clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (target && target.href && target.href.includes('login.html')) {
            e.preventDefault();
            alert("Please log out first!");
        }
    });
});