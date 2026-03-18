// ============================================
// SESSION CHECK
// ============================================
function checkUserSession() {
    const session = localStorage.getItem('userSession');
    if (!session) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// ============================================
// LECTURES PAGE - DISPLAY VIDEOS
// ============================================

let lecturesData = [];
let currentLecture = null;

function displayLectures() {
    const lecturesList = document.getElementById('lecturesList');
    
    if (!lecturesList) {
        console.error('❌ lecturesList element not found');
        return;
    }
    
    console.log('📚 Lectures loaded:', lecturesData.length);
    
    if (lecturesData.length === 0) {
        lecturesList.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #999;">
                <p>📝 No lectures added yet</p>
                <p style="font-size: 12px; margin-top: 10px;">
                    To add lectures:<br>
                    1. Click <strong>"+ Add Video"</strong> button<br>
                    2. Upload your video file (.mp4)<br>
                    3. Fill in details<br>
                    4. Click Save
                </p>
            </div>
        `;
        return;
    }

    let html = '';
    lecturesData.forEach(lecture => {
        html += `
            <div class="card" onclick="openVideo(${lecture.id})">
                <div class="card-title">${lecture.title}</div>
                <div class="card-subtitle">${lecture.subject} • ${lecture.duration}</div>
                <button class="btn-small btn-small-primary" onclick="event.stopPropagation(); openVideo(${lecture.id})">
                    Watch
                </button>
            </div>
        `;
    });
    
    lecturesList.innerHTML = html;
}

// Open video player
function openVideo(lectureId) {
    currentLecture = lecturesData.find(l => l.id === lectureId);
    
    if (!currentLecture) {
        console.error('❌ ERROR: Lecture not found with ID:', lectureId);
        showError('Lecture Not Found', 'Please refresh and try again.');
        return;
    }

    // Validate video file
    if (!currentLecture.videoFile) {
        console.error('❌ ERROR: No video file found for lecture:', currentLecture.title);
        showError('Video Missing', 'Please upload a video file for this lecture.');
        return;
    }

    console.log('▶️ Opening video:', currentLecture.title);

    // Hide lecture list, show video player
    const listView = document.getElementById('lectureListView');
    const playerView = document.getElementById('videoPlayerView');
    
    if (!listView || !playerView) {
        console.error('❌ ERROR: Video views not found in HTML');
        return;
    }
    
    listView.style.display = 'none';
    playerView.style.display = 'flex';

    // Set video title
    const titleElement = document.getElementById('videoTitle');
    if (titleElement) {
        titleElement.textContent = currentLecture.title;
    }

    // Load video player
    const videoContainer = document.getElementById('videoContainer');
    if (!videoContainer) {
        console.error('❌ ERROR: Video container not found in HTML');
        return;
    }
    
    try {
        videoContainer.innerHTML = `
            <video 
                id="lecture-video"
                width="100%"
                height="100%"
                controls
                style="background: #000;">
                <source src="${currentLecture.videoFile}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        console.log('✅ Video loaded successfully');
    } catch (error) {
        console.error('❌ ERROR loading video:', error);
        showError('Video Load Error', 'Failed to load video file.');
    }

    // Set description and notes
    const descElement = document.getElementById('descriptionContent');
    if (descElement) {
        descElement.innerHTML = `
            <div style="padding: 10px 0;">
                <p><strong style="font-size: 16px;">${currentLecture.title}</strong></p>
                <p style="margin-top: 10px; line-height: 1.6; color: #555;">${currentLecture.description || 'No description available'}</p>
            </div>
        `;
    }
    
    const notesElement = document.getElementById('notesContent');
    if (notesElement) {
        notesElement.innerHTML = `
            <div style="padding: 10px 0;">
                <p style="line-height: 1.6; color: #555;">${currentLecture.notes || 'No notes available'}</p>
            </div>
        `;
    }

    // Reset description tab
    switchDescTab(0);
}

// Show error message
function showError(title, message) {
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        videoContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; background: #fff3cd; color: #856404; padding: 20px; text-align: center; border-radius: 8px;">
                <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                <h3 style="margin-bottom: 10px;">${title}</h3>
                <p style="margin-bottom: 20px;">${message}</p>
                <button onclick="backToLectureList()" style="padding: 10px 20px; background: #856404; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    ← Back to Lectures
                </button>
            </div>
        `;
    }
}

// Show add video form
function showAddVideoForm() {
    const listView = document.getElementById('lectureListView');
    const formView = document.getElementById('addVideoForm');
    
    if (!formView) {
        console.error('❌ Add video form not found');
        return;
    }
    
    listView.style.display = 'none';
    formView.style.display = 'flex';
    
    // Reset form
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoSubject').value = 'Chemistry';
    document.getElementById('videoDuration').value = '60 min';
    document.getElementById('videoDescription').value = '';
    document.getElementById('videoNotes').value = '';
    document.getElementById('videoFileInput').value = '';
}

// Cancel add video form
function cancelAddVideo() {
    const listView = document.getElementById('lectureListView');
    const formView = document.getElementById('addVideoForm');
    
    if (listView && formView) {
        listView.style.display = 'flex';
        formView.style.display = 'none';
    }
}

// Save new lecture with video
function saveNewLecture() {
    const title = document.getElementById('videoTitle').value.trim();
    const subject = document.getElementById('videoSubject').value.trim();
    const duration = document.getElementById('videoDuration').value.trim();
    const description = document.getElementById('videoDescription').value.trim();
    const notes = document.getElementById('videoNotes').value.trim();
    const fileInput = document.getElementById('videoFileInput');
    
    // Validate
    if (!title) {
        alert('❌ Please enter a lecture title');
        return;
    }
    
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('❌ Please select a video file');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Validate file type
    if (!file.type.includes('video')) {
        alert('❌ Please select a valid video file (.mp4, .webm, etc.)');
        return;
    }
    
    // Read file and create data URL
    const reader = new FileReader();
    reader.onload = function(e) {
        // Create new lecture object
        const newId = lecturesData.length > 0 ? Math.max(...lecturesData.map(l => l.id)) + 1 : 1;
        
        const newLecture = {
            id: newId,
            title: title,
            subject: subject,
            duration: duration,
            description: description,
            notes: notes,
            videoFile: e.target.result  // Base64 encoded video
        };
        
        // Add to lectures array
        lecturesData.push(newLecture);
        
        // Save to localStorage
        localStorage.setItem('lectures', JSON.stringify(lecturesData));
        
        console.log('✅ Lecture saved:', newLecture);
        
        // Show success message
        alert(`✅ "${title}" has been added successfully!`);
        
        // Refresh display
        cancelAddVideo();
        displayLectures();
    };
    
    reader.readAsDataURL(file);
}

// ============================================
// TAB & CONTROL FUNCTIONS
// ============================================

function backToLectureList() {
    const listView = document.getElementById('lectureListView');
    const playerView = document.getElementById('videoPlayerView');
    
    if (listView && playerView) {
        listView.style.display = 'flex';
        playerView.style.display = 'none';
    }
    
    currentLecture = null;
}

function switchDescTab(index) {
    const tabs = document.querySelectorAll('.desc-tab');
    const contents = document.querySelectorAll('.desc-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    if (tabs[index]) tabs[index].classList.add('active');
    if (contents[index]) contents[index].classList.add('active');
}

function setSpeed(btn, speed) {
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const video = document.getElementById('lecture-video');
    if (video) {
        const speedValue = parseFloat(speed);
        video.playbackRate = speedValue;
        console.log('⚡ Speed set to:', speed);
    }
}

// ============================================
// NAVIGATION
// ============================================

function goHome() { 
    window.location.href = 'index.html';
}

function goLectures() { 
    window.location.href = 'lectures.html';
}

function goTests() { 
    window.location.href = 'tests.html';
}

function goProfile() { 
    window.location.href = 'index.html';
}

function goBack() { 
    window.history.back();
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userSession');
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    }
}

// ============================================
// INITIALIZE PAGE
// ============================================

window.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Lectures page loading...');
    
    // Check session first
    if (!checkUserSession()) {
        console.error('❌ No user session found');
        return;
    }

    console.log('✅ User session valid');

    // Load dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Load lectures from localStorage
    setTimeout(function() {
        let savedLectures = localStorage.getItem('lectures');
        
        if (savedLectures) {
            // Load saved lectures from localStorage
            lecturesData = JSON.parse(savedLectures);
            console.log('✅ Loaded saved lectures:', lecturesData.length);
        } else if (typeof lectures !== 'undefined' && lectures.length > 0) {
            // Fall back to data.js
            lecturesData = lectures;
            console.log('✅ Data.js loaded with', lectures.length, 'lecture(s)');
        } else {
            lecturesData = [];
            console.warn('⚠️ No lectures found');
        }
        
        displayLectures();

        // Check if we should auto-open a video
        const currentVideoId = localStorage.getItem('currentVideoId');
        if (currentVideoId) {
            openVideo(parseInt(currentVideoId));
            localStorage.removeItem('currentVideoId');
        }
    }, 500);
});

console.log('✅ lectures.js loaded - Local video upload version');


// Enhanced video opening with multiple fallback options
function openVideo(lectureId) {
    currentLecture = lecturesData.find(l => l.id === lectureId);
    videoLoadAttempts = 0;
    
    if (!currentLecture) {
        console.error('❌ ERROR: Lecture not found with ID:', lectureId);
        showError('Lecture Not Found', 'Please refresh and try again.');
        return;
    }

    // Validate YouTube ID
    if (!currentLecture.youtubeId || currentLecture.youtubeId.trim() === '') {
        console.error('❌ ERROR: No YouTube ID found for lecture:', currentLecture.title);
        showError('Video ID Missing', 'Please check data.js configuration.');
        return;
    }

    console.log('▶️ Opening video:', currentLecture.title);
    console.log('🎥 YouTube ID:', currentLecture.youtubeId);

    // Hide lecture list, show video player
    const listView = document.getElementById('lectureListView');
    const playerView = document.getElementById('videoPlayerView');
    
    if (!listView || !playerView) {
        console.error('❌ ERROR: Video views not found in HTML');
        return;
    }
    
    listView.style.display = 'none';
    playerView.style.display = 'flex';

    // Set video title
    const titleElement = document.getElementById('videoTitle');
    if (titleElement) {
        titleElement.textContent = currentLecture.title;
    }

    // Load video with fallback options
    loadVideoWithFallback();
}

// Video loading with multiple fallback mechanisms
function loadVideoWithFallback() {
    const videoContainer = document.getElementById('videoContainer');
    if (!videoContainer) {
        console.error('❌ ERROR: Video container not found in HTML');
        return;
    }

    console.log('🔄 Attempting to load video (Attempt ' + (videoLoadAttempts + 1) + ')');
    
    // Show loading state
    videoContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; background: #000; color: #fff;">
            <div style="font-size: 24px; margin-bottom: 20px;">⏳</div>
            <p style="margin-bottom: 10px;">Loading video...</p>
            <p style="font-size: 12px; color: #aaa;">Attempt ${videoLoadAttempts + 1}/${MAX_RETRY_ATTEMPTS}</p>
        </div>
    `;

    // Try to embed with basic URL first
    const youtubeUrl = `https://www.youtube.com/embed/${currentLecture.youtubeId}`;
    
    try {
        videoContainer.innerHTML = `
            <iframe 
                id="youtube-iframe"
                width="100%"
                height="100%"
                src="${youtubeUrl}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
            </iframe>
        `;
        
        // Check if iframe loads within 5 seconds
        setTimeout(() => {
            const iframe = document.getElementById('youtube-iframe');
            if (iframe && videoLoadAttempts < MAX_RETRY_ATTEMPTS) {
                console.log('✅ Video loaded successfully');
            }
        }, 5000);

        console.log('✅ Video embed initiated');
    } catch (error) {
        console.error('❌ ERROR embedding video:', error);
        handleVideoLoadError();
    }

    // Set description and notes
    const descElement = document.getElementById('descriptionContent');
    if (descElement) {
        descElement.innerHTML = `
            <div style="padding: 10px 0;">
                <p><strong style="font-size: 16px;">${currentLecture.title}</strong></p>
                <p style="margin-top: 10px; line-height: 1.6; color: #555;">${currentLecture.description || 'No description available'}</p>
            </div>
        `;
    }
    
    const notesElement = document.getElementById('notesContent');
    if (notesElement) {
        notesElement.innerHTML = `
            <div style="padding: 10px 0;">
                <p style="line-height: 1.6; color: #555;">${currentLecture.notes || 'No notes available'}</p>
            </div>
        `;
    }

    // Reset description tab
    switchDescTab(0);
}

// Handle video loading errors with fallback options
function handleVideoLoadError() {
    videoLoadAttempts++;
    const videoContainer = document.getElementById('videoContainer');
    
    if (videoLoadAttempts < MAX_RETRY_ATTEMPTS) {
        console.warn(`⚠️ Retry attempt ${videoLoadAttempts}/${MAX_RETRY_ATTEMPTS}`);
        setTimeout(() => {
            loadVideoWithFallback();
        }, 1500);
        return;
    }

    // If all retries failed, show fallback options
    console.error('❌ Video failed to load after all retry attempts');
    showVideoFallbackOptions();
}

// Show fallback options when video embedding fails
function showVideoFallbackOptions() {
    const videoContainer = document.getElementById('videoContainer');
    const youtubeLink = `https://www.youtube.com/watch?v=${currentLecture.youtubeId}`;
    
    videoContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 20px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 20px;">🎥</div>
            <h2 style="margin-bottom: 10px;">Video Loading Issue</h2>
            <p style="margin-bottom: 20px; font-size: 14px; opacity: 0.9;">Unable to load embedded video.</p>
            
            <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px; max-width: 300px;">
                <p style="margin-bottom: 15px; font-size: 12px;">Try one of these options:</p>
                
                <button onclick="retryVideoLoad()" style="width: 100%; padding: 12px; margin-bottom: 10px; background: #fff; color: #667eea; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                    🔄 Retry Loading
                </button>
                
                <a href="${youtubeLink}" target="_blank" style="display: block; width: 100%; padding: 12px; margin-bottom: 10px; background: #FF0000; color: white; text-decoration: none; border-radius: 6px; cursor: pointer; font-weight: bold; transition: all 0.3s; text-align: center;">
                    ▶️ Watch on YouTube
                </a>
                
                <button onclick="showVideoInfo()" style="width: 100%; padding: 12px; background: #2196F3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                    ℹ️ Video Details
                </button>
            </div>
            
            <p style="font-size: 11px; opacity: 0.7; margin-top: 20px;">YouTube ID: ${currentLecture.youtubeId}</p>
        </div>
    `;
}

// Retry video loading
function retryVideoLoad() {
    videoLoadAttempts = 0;
    loadVideoWithFallback();
}

// Show video information and YouTube link
function showVideoInfo() {
    const videoContainer = document.getElementById('videoContainer');
    const youtubeLink = `https://www.youtube.com/watch?v=${currentLecture.youtubeId}`;
    
    videoContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; background: #f5f5f5; padding: 20px; text-align: center;">
            <div style="font-size: 64px; margin-bottom: 20px;">📹</div>
            <h3 style="margin-bottom: 10px; color: #333;">${currentLecture.title}</h3>
            <p style="margin-bottom: 20px; color: #666;">${currentLecture.subject}</p>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; max-width: 300px; border-left: 4px solid #667eea;">
                <p style="font-size: 12px; margin-bottom: 10px; color: #666;">Duration: <strong>${currentLecture.duration}</strong></p>
                <p style="font-size: 12px; color: #666;">YouTube ID: <code style="background: #f0f0f0; padding: 5px; border-radius: 3px;">${currentLecture.youtubeId}</code></p>
            </div>
            
            <a href="${youtubeLink}" target="_blank" style="display: inline-block; padding: 12px 30px; background: #FF0000; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-bottom: 10px;">
                ▶️ Open on YouTube
            </a>
            
            <button onclick="loadVideoWithFallback()" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                🔄 Try Embedding Again
            </button>
        </div>
    `;
}

// Show generic error message
function showError(title, message) {
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        videoContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; background: #fff3cd; color: #856404; padding: 20px; text-align: center; border-radius: 8px;">
                <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                <h3 style="margin-bottom: 10px;">${title}</h3>
                <p style="margin-bottom: 20px;">${message}</p>
                <button onclick="backToLectureList()" style="padding: 10px 20px; background: #856404; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    ← Back to Lectures
                </button>
            </div>
        `;
    }
}


function backToLectureList() {
    const listView = document.getElementById('lectureListView');
    const playerView = document.getElementById('videoPlayerView');
    
    if (listView && playerView) {
        listView.style.display = 'flex';
        playerView.style.display = 'none';
    }
    
    currentLecture = null;
}

function switchDescTab(index) {
    const tabs = document.querySelectorAll('.desc-tab');
    const contents = document.querySelectorAll('.desc-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    if (tabs[index]) tabs[index].classList.add('active');
    if (contents[index]) contents[index].classList.add('active');
}

function setSpeed(btn, speed) {
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    console.log('⚡ Speed set to:', speed);
}

// ============================================
// NAVIGATION
// ============================================
function goHome() { 
    window.location.href = 'index.html';
}

function goLectures() { 
    window.location.href = 'lectures.html';
}

function goTests() { 
    window.location.href = 'tests.html';
}

function goProfile() { 
    window.location.href = 'index.html';
}

function goBack() { 
    window.history.back();
}

function logout() {
    localStorage.removeItem('userSession');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

// ============================================
// INITIALIZE PAGE
// ============================================
window.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Lectures page loading...');
    
    // Check session first
    if (!checkUserSession()) {
        console.error('❌ No user session found');
        return;
    }

    console.log('✅ User session valid');

    // Load dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Wait for data.js to load
    setTimeout(function() {
        if (typeof lectures !== 'undefined' && lectures.length > 0) {
            console.log('✅ Data.js loaded with', lectures.length, 'lecture(s)');
            lecturesData = lectures;
            displayLectures();
        } else {
            console.warn('⚠️ No lectures found in data.js');
            lecturesData = [];
            displayLectures();
        }
    }, 500);
});

console.log('✅ lectures.js loaded');
