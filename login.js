// ============================================
// LOGIN SYSTEM - Session Management
// ============================================

// User database (simulated - in real app, use backend)
const userDatabase = [
    {
        id: 1,
        email: "student@example.com",
        password: "123456",  // Never store plain passwords in real app!
        name: "Student User",
        phone: "9876543210"
    }
];

// Phone OTP storage (simulated)
let otpAttempts = {};
let userSession = null;

// ============================================
// CHECK IF USER IS ALREADY LOGGED IN
// ============================================
function checkSession() {
    const session = localStorage.getItem('userSession');
    if (session) {
        userSession = JSON.parse(session);
        // Redirect to home if already logged in
        window.location.href = 'index.html';
    }
}

// Run on page load
window.addEventListener('DOMContentLoaded', function() {
    checkSession();
    loadDarkMode();
});

// ============================================
// TAB SWITCHING
// ============================================
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.login-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.login-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Activate corresponding tab button
    if (tabName === 'emailTab') {
        document.querySelectorAll('.login-tab')[0].classList.add('active');
    } else if (tabName === 'phoneTab') {
        document.querySelectorAll('.login-tab')[1].classList.add('active');
    }

    // Clear errors
    clearAllErrors();
}

// ============================================
// EMAIL LOGIN
// ============================================
function loginWithEmail(event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    // Clear previous errors
    clearAllErrors();

    // Validation
    if (!email) {
        showError('emailError', 'Email is required');
        return;
    }

    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        return;
    }

    if (!password) {
        showError('passwordError', 'Password is required');
        return;
    }

    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters');
        return;
    }

    // Show loading
    showLoading('emailLoading', 'emailLoginBtn');

    // Simulate API call delay
    setTimeout(() => {
        // Check credentials
        const user = userDatabase.find(u => u.email === email && u.password === password);

        if (user) {
            // Login successful
            createSession(user);
            showSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Login failed
            hideLoading('emailLoading', 'emailLoginBtn');
            showError('emailError', 'Invalid email or password');
        }
    }, 1000);
}

// ============================================
// PHONE LOGIN
// ============================================
let phoneOtpSent = false;
let phoneOtpCode = null;

function loginWithPhone(event) {
    event.preventDefault();

    const phone = document.getElementById('phoneInput').value.trim();
    const otpInput = document.getElementById('otpInput');
    const otpGroup = document.getElementById('otpGroup');

    clearAllErrors();

    if (!phone) {
        showError('phoneError', 'Phone number is required');
        return;
    }

    if (phone.length !== 10) {
        showError('phoneError', 'Phone number must be 10 digits');
        return;
    }

    // If OTP not sent, send it
    if (!phoneOtpSent) {
        sendOTP(phone);
        return;
    }

    // If OTP sent, verify it
    const otp = otpInput.value.trim();

    if (!otp) {
        showError('otpError', 'OTP is required');
        return;
    }

    if (otp.length !== 6) {
        showError('otpError', 'OTP must be 6 digits');
        return;
    }

    // Verify OTP
    if (otp === phoneOtpCode) {
        // Find or create user by phone
        let user = userDatabase.find(u => u.phone === phone);

        if (!user) {
            // Create new user
            user = {
                id: userDatabase.length + 1,
                email: `user${phone}@example.com`,
                password: Math.random().toString(36),
                name: `User ${phone.substring(0, 4)}`,
                phone: phone
            };
            userDatabase.push(user);
        }

        createSession(user);
        showSuccess('Phone login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showError('otpError', 'Invalid OTP. Please try again.');
    }
}

function sendOTP(phone) {
    // Show loading
    showLoading('phoneLoading', 'phoneLoginBtn');

    // Simulate API call
    setTimeout(() => {
        // Generate fake OTP (for demo: always 123456)
        phoneOtpCode = '123456';
        phoneOtpSent = true;

        // Show OTP input
        document.getElementById('otpGroup').style.display = 'block';
        document.getElementById('phoneInput').disabled = true;

        // Update button
        const btn = document.getElementById('phoneLoginBtn');
        btn.textContent = 'Verify OTP';

        // Hide loading
        hideLoading('phoneLoading', 'phoneLoginBtn');

        // Show success
        showSuccess('OTP sent to +91-' + phone.substring(0, 4) + '-XXXX. Demo OTP: 123456');

        // Start OTP timer
        startOTPTimer(120);
    }, 1000);
}

function startOTPTimer(seconds) {
    const timerElement = document.getElementById('otpTimer');
    
    const timer = setInterval(() => {
        seconds--;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerElement.textContent = ` (${mins}:${String(secs).padStart(2, '0')})`;

        if (seconds <= 0) {
            clearInterval(timer);
            phoneOtpSent = false;
            resetPhoneLogin();
        }
    }, 1000);
}

function resetPhoneLogin() {
    document.getElementById('otpGroup').style.display = 'none';
    document.getElementById('phoneInput').disabled = false;
    document.getElementById('phoneInput').value = '';
    document.getElementById('otpInput').value = '';
    document.getElementById('phoneLoginBtn').textContent = 'Send OTP';
    document.getElementById('otpTimer').textContent = '';
    phoneOtpCode = null;
    showError('otpError', 'OTP expired. Please request a new one.');
}

// ============================================
// GOOGLE LOGIN (SIMULATED)
// ============================================
function loginWithGoogle() {
    showLoading('emailLoading', 'emailLoginBtn');

    // Simulate Google OAuth
    setTimeout(() => {
        const user = {
            id: userDatabase.length + 1,
            email: 'google.user@gmail.com',
            password: 'oauth-google',
            name: 'Google User',
            phone: 'N/A',
            provider: 'google'
        };

        createSession(user);
        showSuccess('Google login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

// ============================================
// GITHUB LOGIN (SIMULATED)
// ============================================
function loginWithGithub() {
    showLoading('emailLoading', 'emailLoginBtn');

    setTimeout(() => {
        const user = {
            id: userDatabase.length + 1,
            email: 'github.user@github.com',
            password: 'oauth-github',
            name: 'GitHub User',
            phone: 'N/A',
            provider: 'github'
        };

        createSession(user);
        showSuccess('GitHub login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

// ============================================
// CREATE SESSION
// ============================================
function createSession(user) {
    userSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        provider: user.provider || 'email',
        loginTime: new Date().toISOString()
    };

    localStorage.setItem('userSession', JSON.stringify(userSession));
    localStorage.setItem('userName', user.name);
}

// ============================================
// LOGOUT
// ============================================
function logout() {
    localStorage.removeItem('userSession');
    localStorage.removeItem('userName');
    userSession = null;
    window.location.href = 'login.html';
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
}

function showSuccess(message) {
    const successElement = document.getElementById('successMessage');
    if (successElement) {
        successElement.textContent = message;
        successElement.classList.add('show');
    }
}

function showLoading(loadingId, buttonId) {
    document.getElementById(loadingId).style.display = 'block';
    document.getElementById(buttonId).disabled = true;
}

function hideLoading(loadingId, buttonId) {
    document.getElementById(loadingId).style.display = 'none';
    document.getElementById(buttonId).disabled = false;
}

function loadDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================
function goToAdmin() {
    window.location.href = 'admin.html';
}

function goToHome() {
    window.location.href = 'index.html';
}

function goToLectures() {
    window.location.href = 'lectures.html';
}

function goToTests() {
    window.location.href = 'tests.html';
}

function goToDPP() {
    alert('Daily Practice Problems coming soon!');
}

// ============================================
