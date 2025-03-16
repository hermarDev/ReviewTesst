// Authentication script for login/register page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in - this is the critical part
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        alert("Please log out first!");
        window.location.replace('frontpage.html');
        return;
    }
    
    // Get elements
    const container = document.getElementById('auth-container');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    
    // Login form elements
    const loginForm = document.getElementById('login-form');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const loginEmailError = document.getElementById('login-email-error');
    const loginPasswordError = document.getElementById('login-password-error');
    const loginSuccess = document.getElementById('login-success');
    const loginGeneralError = document.getElementById('login-general-error');
    
    // Register form elements
    const registerForm = document.getElementById('register-form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const confirmPassword = document.getElementById('confirm-password');
    const firstNameError = document.getElementById('first-name-error');
    const lastNameError = document.getElementById('last-name-error');
    const registerEmailError = document.getElementById('register-email-error');
    const registerPasswordError = document.getElementById('register-password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const registerSuccess = document.getElementById('register-success');
    const registerGeneralError = document.getElementById('register-general-error');

    // Add event listeners for form flipping
    if (showRegisterBtn && showLoginBtn && container) {
        showRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            container.classList.add('flip');
        });

        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            container.classList.remove('flip');
        });
    }
    
    // Login form validation and submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Reset error messages
            loginEmailError.style.display = 'none';
            loginPasswordError.style.display = 'none';
            loginGeneralError.style.display = 'none';
            
            // Validate email
            if (!loginEmail.value || !isValidEmail(loginEmail.value)) {
                loginEmailError.style.display = 'block';
                isValid = false;
            }
            
            // Validate password
            if (!loginPassword.value || loginPassword.value.length < 6) {
                loginPasswordError.style.display = 'block';
                isValid = false;
            }
            
            // If form is valid, check if user exists
            if (isValid) {
                // Get registered users from localStorage
                const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                
                // Find user with matching email and password
                const user = users.find(u => 
                    u.email === loginEmail.value && 
                    u.password === loginPassword.value
                );
                
                if (user) {
                    // Show success message
                    loginSuccess.style.display = 'block';
                    
                    // Store user data in session storage
                    const userData = {
                        email: user.email,
                        name: user.firstName + ' ' + user.lastName
                    };
                    
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userData', JSON.stringify(userData));
                    
                    // Redirect to dashboard after a short delay
                    setTimeout(function() {
                        window.location.href = 'frontpage.html';
                    }, 1500);
                } else {
                    // Show error message for invalid credentials
                    loginGeneralError.style.display = 'block';
                }
            }
        });
    }
    
    // Register form validation and submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Reset error messages
            firstNameError.style.display = 'none';
            lastNameError.style.display = 'none';
            registerEmailError.style.display = 'none';
            registerPasswordError.style.display = 'none';
            confirmPasswordError.style.display = 'none';
            registerGeneralError.style.display = 'none';
            
            // Validate first name
            if (!firstName.value.trim()) {
                firstNameError.style.display = 'block';
                isValid = false;
            }
            
            // Validate last name
            if (!lastName.value.trim()) {
                lastNameError.style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            if (!registerEmail.value || !isValidEmail(registerEmail.value)) {
                registerEmailError.style.display = 'block';
                isValid = false;
            }
            
            // Validate password
            if (!registerPassword.value || registerPassword.value.length < 6) {
                registerPasswordError.style.display = 'block';
                isValid = false;
            }
            
            // Validate password confirmation
            if (registerPassword.value !== confirmPassword.value) {
                confirmPasswordError.style.display = 'block';
                isValid = false;
            }
            
            // If form is valid, process registration
            if (isValid) {
                // Get existing users from localStorage
                const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                
                // Check if email is already registered
                const emailExists = users.some(user => user.email === registerEmail.value);
                
                if (emailExists) {
                    // Show error message for duplicate email
                    registerGeneralError.style.display = 'block';
                    return;
                }
                // Create new user object
                const newUser = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: registerEmail.value,
                    password: registerPassword.value
                };
                
                // Add new user to array
                users.push(newUser);
                
                // Save updated users array to localStorage
                localStorage.setItem('registeredUsers', JSON.stringify(users));
                
                // Show success message
                registerSuccess.style.display = 'block';
                
                // Store user data in session storage
                const userData = {
                    email: registerEmail.value,
                    name: firstName.value + ' ' + lastName.value
                };
                
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userData', JSON.stringify(userData));
                
                // Redirect to dashboard after a short delay
                setTimeout(function() {
                    window.location.href = 'frontpage.html';
                }, 1500);
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});