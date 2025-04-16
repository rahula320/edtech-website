// Authentication Functions
async function register(username, email, password) {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Registration error:', err);
        return { success: false, message: 'Error during registration' };
    }
}

async function login(username, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Login error:', err);
        return { success: false, message: 'Error during login' };
    }
}

async function logout() {
    try {
        const response = await fetch('/api/logout');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Logout error:', err);
        return { success: false, message: 'Error during logout' };
    }
}

async function checkAuth() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        return data;
    } catch (err) {
        return { user: null };
    }
}

// Form Submission Handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>${result.message}</p>
                `;
                this.reset();
                this.appendChild(successMessage);
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${result.message}</p>
                `;
                this.appendChild(errorMessage);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            }
        } catch (err) {
            console.error('Form submission error:', err);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Authentication UI
function updateAuthUI(user) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        if (user) {
            authButtons.innerHTML = `
                <span class="welcome">Welcome, ${user.username}!</span>
                <button class="btn btn-outline" onclick="handleLogout()">Logout</button>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="btn btn-primary" onclick="showLoginModal()">Login</button>
                <button class="btn btn-outline" onclick="showRegisterModal()">Register</button>
            `;
        }
    }
}

// Modal Functions
function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Login</h2>
            <form id="loginForm">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('#loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const result = await login(formData.get('username'), formData.get('password'));
        
        if (result.success) {
            modal.remove();
            updateAuthUI(result.user);
        } else {
            alert(result.message);
        }
    });
}

function showRegisterModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Register</h2>
            <form id="registerForm">
                <input type="text" name="username" placeholder="Username" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('#registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const result = await register(
            formData.get('username'),
            formData.get('email'),
            formData.get('password')
        );
        
        if (result.success) {
            modal.remove();
            alert('Registration successful! Please login.');
            showLoginModal();
        } else {
            alert(result.message);
        }
    });
}

async function handleLogout() {
    const result = await logout();
    if (result.success) {
        updateAuthUI(null);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const authResult = await checkAuth();
    updateAuthUI(authResult.user);
    
    // Rest of your existing initialization code...
    animateOnScroll();
    setupMobileMenu();
});

// Keep your existing animation and UI code...
// ... (previous code for animations, mobile menu, etc.) 