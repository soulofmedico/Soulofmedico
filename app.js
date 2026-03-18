// ============================================
// SESSION PROTECTION
// ============================================

let currentUser = null;

function checkUserSession() {
    const session = localStorage.getItem('userSession');
    
    if (!session) {
        // User not logged in - redirect to login
        window.location.href = 'login.html';
        return false;
    }

    try {
        currentUser = JSON.parse(session);
        console.log('✅ User session found:', currentUser.name);
        return true;
    } catch (e) {
        console.error('Invalid session');
        logout();
        return false;
    }
}

// Global navigation functions

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
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
    window.location.href = 'dpp.html';
}

function goToProfile() {
    showScreen('profileScreen');
}

function goToSettings() {
    showScreen('settingsScreen');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userSession');
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    }
}

function goBack() {
    window.history.back();
}

function toggleDarkMode(element) {
    document.body.classList.toggle('dark-mode');
    element.classList.toggle('active');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load on page load
window.addEventListener('DOMContentLoaded', function() {
    // Check session
    if (!checkUserSession()) return;

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const toggle = document.querySelector('.toggle-switch');
        if (toggle) toggle.classList.add('active');
    }

    // Update user name in profile
    const userName = localStorage.getItem('userName');
    if (userName) {
        const userInitial = userName.charAt(0).toUpperCase();
        const profileIcon = document.querySelector('.profile-icon');
        if (profileIcon) {
            profileIcon.textContent = userInitial;
        }
    }
});

console.log('✅ App loaded successfully');
