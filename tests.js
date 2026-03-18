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
// TESTS PAGE - HOW TO ADD TEST QUESTIONS
// ============================================

let testsData = [];
let currentTest = null;
let currentQuestion = 0;
let answers = [];
let testStartTime = null;
let testTimer = null;

// HOW TO ADD YOUR TESTS:
// 
// 1. Edit data.js and add to tests array:
//    {
//        id: 1,
//        title: "Physics Chapter Test",
//        description: "Test your knowledge",
//        duration: 45,
//        questions: [
//            {
//                id: 1,
//                text: "What is the SI unit of force?",
//                options: ["Joule", "Newton", "Pascal", "Watt"],
//                correctAnswer: 1,  // Index of correct answer (0=A, 1=B, 2=C, 3=D)
//                explanation: "Newton (N) is the SI unit of force"
//            }
//        ]
//    }
// 
// 2. Open tests.html - tests will appear automatically

function displayTests() {
    const testsList = document.getElementById('testsList');
    
    if (!testsList) return;

    if (testsData.length === 0) {
        testsList.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #999;">
                <p>📝 No tests available yet</p>
                <p style="font-size: 12px; margin-top: 10px;">
                    To add tests:<br>
                    1. Edit <strong>data.js</strong><br>
                    2. Add test objects with questions<br>
                    3. Refresh this page
                </p>
            </div>
        `;
        return;
    }

    testsList.innerHTML = testsData.map(test => `
        <div class="card" onclick="startTest(${test.id})">
            <div class="card-title">${test.title}</div>
            <div style="font-size: 14px; margin: 10px 0; color: #666;">
                <div>📌 Questions: ${test.questions.length}</div>
                <div>⏱️ Duration: ${test.duration} min</div>
            </div>
            <button class="btn-small btn-small-primary" onclick="event.stopPropagation(); startTest(${test.id})">
                Start Test
            </button>
        </div>
    `).join('');
}

function startTest(testId) {
    currentTest = testsData.find(t => t.id === testId);
    
    if (!currentTest) {
        alert('Test not found');
        return;
    }

    // Initialize test
    currentQuestion = 0;
    answers = new Array(currentTest.questions.length).fill(null);
    testStartTime = Date.now();

    // Show test screen
    document.getElementById('testListScreen').style.display = 'none';
    document.getElementById('testQuestionScreen').style.display = 'flex';
    document.getElementById('testResultScreen').style.display = 'none';

    // Start timer
    startTimer();

    // Load first question
    loadQuestion();
}

function loadQuestion() {
    if (!currentTest || currentQuestion >= currentTest.questions.length) {
        return;
    }

    const question = currentTest.questions[currentQuestion];

    // Update header
    document.getElementById('testTitle').textContent = currentTest.title;
    document.getElementById('questionCounter').textContent = `${currentQuestion + 1}/${currentTest.questions.length}`;

    // Update question
    document.getElementById('questionText').textContent = question.text;

    // Update options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="option" onclick="selectAnswer(${index})">
            <div class="option-text">${String.fromCharCode(65 + index)}) ${option}</div>
        </div>
    `).join('');

    // Restore previous answer if any
    if (answers[currentQuestion] !== null) {
        const options = optionsContainer.querySelectorAll('.option');
        options[answers[currentQuestion]].classList.add('selected');
    }

    // Update button states
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').disabled = currentQuestion === currentTest.questions.length - 1;
}

function selectAnswer(optionIndex) {
    answers[currentQuestion] = optionIndex;
    
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
}

function nextQuestion() {
    if (currentQuestion < currentTest.questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function submitTest() {
    if (confirm('Are you sure you want to submit? You cannot go back.')) {
        calculateResults();
    }
}

function calculateResults() {
    clearInterval(testTimer);
    
    let correct = 0;
    let wrong = 0;

    answers.forEach((answer, index) => {
        const question = currentTest.questions[index];
        if (answer === question.correctAnswer) {
            correct++;
        } else {
            wrong++;
        }
    });

    const accuracy = Math.round((correct / currentTest.questions.length) * 100);

    // Show results
    document.getElementById('testQuestionScreen').style.display = 'none';
    document.getElementById('testResultScreen').style.display = 'flex';

    document.getElementById('resultScore').textContent = `${correct}/${currentTest.questions.length}`;
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('wrongCount').textContent = wrong;
    document.getElementById('accuracy').textContent = accuracy + '%';

    if (accuracy >= 70) {
        document.getElementById('resultIcon').textContent = '✅';
    } else if (accuracy >= 50) {
        document.getElementById('resultIcon').textContent = '👍';
    } else {
        document.getElementById('resultIcon').textContent = '📚';
    }
}

function startTimer() {
    let timeLeft = currentTest.duration * 60;

    testTimer = setInterval(function() {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const timerElement = document.getElementById('testTimer');
        if (timerElement) {
            timerElement.textContent = timeDisplay;
        }

        if (timeLeft <= 0) {
            clearInterval(testTimer);
            alert('Time is up! Submitting test...');
            calculateResults();
        }
    }, 1000);
}

function exitTest() {
    if (confirm('Do you want to exit? Progress will be lost.')) {
        clearInterval(testTimer);
        backToTestList();
    }
}

function backToTestList() {
    document.getElementById('testListScreen').style.display = 'flex';
    document.getElementById('testQuestionScreen').style.display = 'none';
    document.getElementById('testResultScreen').style.display = 'none';
    currentTest = null;
}

// Navigation functions
function goHome() { window.location.href = 'index.html'; }
function goLectures() { window.location.href = 'lectures.html'; }
function goTests() { window.location.href = 'tests.html'; }
function goProfile() { window.location.href = 'index.html'; }
function goBack() { window.history.back(); }

// Load tests on page load
window.addEventListener('DOMContentLoaded', function() {
    // Check session first
    if (!checkUserSession()) return;

    // Load from data.js if available
    if (typeof tests !== 'undefined') {
        testsData = tests;
    }
    displayTests();
});

console.log('✅ Tests page loaded. Add tests in data.js');
