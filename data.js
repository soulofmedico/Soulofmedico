// ============================================
// HOW TO ADD VIDEOS TO THE APP
// ============================================
// NEW METHOD: Use the "Add Video" button in app
// 
// STEPS:
// 1. Open Lectures page
// 2. Click "+ Add Video" button
// 3. Fill in details and upload video file
// 4. Click "Save Lecture"
// 5. Video is now available to watch!
//
// SUPPORTED FORMATS: MP4, WebM, Ogg
// MAXIMUM SIZE: 500MB per video
//
// For detailed guide, read: HOW_TO_ADD_VIDEOS.md

const lectures = [
    // Videos are now stored in localStorage via app interface
    // Original data.js lectures below (if any)
];

// ============================================
// HOW TO ADD TESTS TO THE APP
// ============================================
// 1. Create test questions in this format
// 2. Add correct answer index (0-3 for A, B, C, D)
// 3. No fake data - only add real questions

const tests = [
    // TEMPLATE - Copy and modify this to add your tests
    // {
    //     id: 1,
    //     title: "Test Name",
    //     description: "Brief description",
    //     duration: 45,  // in minutes
    //     questions: [
    //         {
    //             id: 1,
    //             text: "Question text here?",
    //             options: ["Option A", "Option B", "Option C", "Option D"],
    //             correctAnswer: 1,  // Index: 0=A, 1=B, 2=C, 3=D
    //             explanation: "Why this answer is correct"
    //         }
    //     ]
    // }

    // Add your tests below (remove examples and add real ones)
];

// ============================================
// HOW TO USE THESE IN YOUR APP
// ============================================
// In lectures.js:
//   lecturesData = lectures;
//   displayLectures(lecturesData);
//
// In tests.js:
//   testsData = tests;
//   displayTests(testsData);

console.log('✅ Data configuration ready. Add your videos and tests above.');
