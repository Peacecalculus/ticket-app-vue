// Authentication JavaScript for Static UI
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const showSignupLink = document.getElementById('show-signup-link');
    const showLoginLink = document.getElementById('show-login-link');
    const toastNotification = document.getElementById('toast-notification');

    // Toggle between login and signup forms
    showSignupLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginSection.classList.remove('active-form');
        loginSection.classList.add('hidden-form');
        signupSection.classList.remove('hidden-form');
        signupSection.classList.add('active-form');
    });

    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        signupSection.classList.remove('active-form');
        signupSection.classList.add('hidden-form');
        loginSection.classList.remove('hidden-form');
        loginSection.classList.add('active-form');
    });

    // Show toast notification
    function showToast(message, isError = false) {
        toastNotification.textContent = message;
        toastNotification.classList.remove('error');
        if (isError) {
            toastNotification.classList.add('error');
        }
        toastNotification.classList.add('show');
        
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }

    // Clear error messages
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    // Validate email
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Handle login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        let hasError = false;

        if (!email) {
            document.getElementById('login-email-error').textContent = 'Email is required';
            hasError = true;
        } else if (!validateEmail(email)) {
            document.getElementById('login-email-error').textContent = 'Invalid email format';
            hasError = true;
        }

        if (!password) {
            document.getElementById('login-password-error').textContent = 'Password is required';
            hasError = true;
        } else if (password.length < 6) {
            document.getElementById('login-password-error').textContent = 'Password must be at least 6 characters';
            hasError = true;
        }

        if (hasError) return;

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('ticketapp_users')) || [
            { email: 'admin@ticketapp.com', password: 'admin123', name: 'Admin User' },
            { email: 'user@test.com', password: 'password123', name: 'Test User' }
        ];

        // Check if user exists
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Save session
            const session = {
                email: user.email,
                name: user.name,
                token: btoa(email + Date.now()),
                timestamp: Date.now()
            };
            localStorage.setItem('ticketapp_session', JSON.stringify(session));
            
            showToast('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showToast('Invalid email or password', true);
        }
    });

    // Handle signup
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        let hasError = false;

        if (!name) {
            document.getElementById('signup-name-error').textContent = 'Name is required';
            hasError = true;
        }

        if (!email) {
            document.getElementById('signup-email-error').textContent = 'Email is required';
            hasError = true;
        } else if (!validateEmail(email)) {
            document.getElementById('signup-email-error').textContent = 'Invalid email format';
            hasError = true;
        }

        if (!password) {
            document.getElementById('signup-password-error').textContent = 'Password is required';
            hasError = true;
        } else if (password.length < 6) {
            document.getElementById('signup-password-error').textContent = 'Password must be at least 6 characters';
            hasError = true;
        }

        if (!confirmPassword) {
            document.getElementById('signup-confirm-password-error').textContent = 'Please confirm your password';
            hasError = true;
        } else if (password !== confirmPassword) {
            document.getElementById('signup-confirm-password-error').textContent = 'Passwords do not match';
            hasError = true;
        }

        if (hasError) return;

        // Get existing users
        const users = JSON.parse(localStorage.getItem('ticketapp_users')) || [
            { email: 'admin@ticketapp.com', password: 'admin123', name: 'Admin User' },
            { email: 'user@test.com', password: 'password123', name: 'Test User' }
        ];

        // Check if email already exists
        if (users.find(u => u.email === email)) {
            showToast('Email already exists', true);
            return;
        }

        // Add new user
        users.push({ email, password, name });
        localStorage.setItem('ticketapp_users', JSON.stringify(users));

        // Auto login after signup
        const session = {
            email: email,
            name: name,
            token: btoa(email + Date.now()),
            timestamp: Date.now()
        };
        localStorage.setItem('ticketapp_session', JSON.stringify(session));

        showToast('Account created successfully! Redirecting...');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    });

    // Initialize default users if not exists
    if (!localStorage.getItem('ticketapp_users')) {
        const defaultUsers = [
            { email: 'admin@ticketapp.com', password: 'admin123', name: 'Admin User' },
            { email: 'user@test.com', password: 'password123', name: 'Test User' }
        ];
        localStorage.setItem('ticketapp_users', JSON.stringify(defaultUsers));
    }
});
