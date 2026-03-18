# 📱 Soul of Medico - HOW TO ADD VIDEOS AND TESTS

---

## 🎥 HOW TO ADD VIDEOS/LECTURES

### Step 1: Get YouTube Video ID

1. Go to YouTube
2. Find your video
3. Copy the URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
4. The **Video ID** is: `dQw4w9WgXcQ` (part after `v=`)

### Step 2: Edit `data.js`

Open `data.js` and add to the `lectures` array:

```javascript
const lectures = [
    {
        id: 1,
        title: "Ohm's Law",           // Your lecture title
        subject: "Physics",            // Subject name
        youtubeId: "dQw4w9WgXcQ",     // YouTube Video ID (replace this)
        duration: "45 min",            // Video duration
        description: "Learn about Ohm's Law and circuit analysis", // What's covered
        notes: "PDF link or notes content here"  // Notes or link to PDF
    },
    {
        id: 2,
        title: "Magnetism Basics",
        subject: "Physics",
        youtubeId: "REPLACE_WITH_ACTUAL_ID",  // Get from YouTube
        duration: "52 min",
        description: "Understanding magnetic fields",
        notes: "Additional resources here"
    }
];
```

### Step 3: Open `lectures.html`

Videos will automatically appear in a card list. Click "Watch" to play.

### Complete Example:

```javascript
const lectures = [
    {
        id: 1,
        title: "Current Electricity",
        subject: "Physics",
        youtubeId: "jNgzyeUwrnU",  // Real YouTube ID
        duration: "45 min",
        description: "This lecture covers electric current, Ohm's law, and circuit analysis",
        notes: "📄 Download notes from drive/folder"
    },
    {
        id: 2,
        title: "Organic Chemistry Basics",
        subject: "Chemistry",
        youtubeId: "XYZ123ABC",  // Another video
        duration: "38 min",
        description: "Introduction to organic chemistry molecules",
        notes: "PDF: organic_basics.pdf"
    }
];
```

---

## ✏️ HOW TO ADD TESTS

### Step 1: Understand Test Structure

Each test has:
- **Title**: Test name
- **Description**: What it covers
- **Duration**: Time in minutes
- **Questions**: Array of questions with options and correct answer

### Step 2: Edit `data.js`

Add to the `tests` array:

```javascript
const tests = [
    {
        id: 1,
        title: "Physics Chapter Test - Current Electricity",
        description: "Test your understanding of current electricity",
        duration: 30,  // 30 minutes
        questions: [
            {
                id: 1,
                text: "What is the SI unit of electric current?",
                options: ["Ohm", "Ampere", "Volt", "Watt"],
                correctAnswer: 1,  // Answer index: B) Ampere (index 1)
                explanation: "Ampere (A) is the SI unit of electric current"
            },
            {
                id: 2,
                text: "Which of the following is Ohm's Law?",
                options: ["V = I × R", "P = V × I", "F = m × a", "E = m × c²"],
                correctAnswer: 0,  // Answer index: A) V = I × R (index 0)
                explanation: "Ohm's Law states V = I × R (Voltage = Current × Resistance)"
            }
        ]
    }
];
```

### Step 3: Answer Index Explanation

For options: `["Option A", "Option B", "Option C", "Option D"]`

- **correctAnswer: 0** = Option A is correct
- **correctAnswer: 1** = Option B is correct
- **correctAnswer: 2** = Option C is correct
- **correctAnswer: 3** = Option D is correct

### Complete Example:

```javascript
const tests = [
    {
        id: 1,
        title: "Physics Quiz - Electricity",
        description: "20 questions on current and circuits",
        duration: 45,
        questions: [
            {
                id: 1,
                text: "Define electric current",
                options: [
                    "Flow of electrons",
                    "Flow of protons",
                    "Flow of photons",
                    "Flow of neutrons"
                ],
                correctAnswer: 0,
                explanation: "Electric current is the flow of electrons through a conductor"
            },
            {
                id: 2,
                text: "In a series circuit, if one bulb burns out...",
                options: [
                    "Other bulbs remain on",
                    "All bulbs turn off",
                    "Other bulbs get brighter",
                    "Current increases"
                ],
                correctAnswer: 1,
                explanation: "In a series circuit, all components are in one path"
            },
            {
                id: 3,
                text: "Resistance is measured in...",
                options: [
                    "Amperes",
                    "Volts",
                    "Ohms",
                    "Watts"
                ],
                correctAnswer: 2,
                explanation: "Resistance is measured in Ohms (Ω)"
            }
        ]
    },
    {
        id: 2,
        title: "Chemistry Quiz - Bonds",
        description: "15 questions on chemical bonding",
        duration: 30,
        questions: [
            {
                id: 1,
                text: "What is a covalent bond?",
                options: [
                    "Transfer of electrons",
                    "Sharing of electrons",
                    "Electrostatic attraction",
                    "Hydrogen bonding"
                ],
                correctAnswer: 1,
                explanation: "Covalent bonding is the sharing of electron pairs"
            }
        ]
    }
];
```

---

## 📂 File Structure

```
SOM APP/
├── index.html           ← Main home page
├── lectures.html        ← Lectures page
├── tests.html           ← Tests page
├── data.js              ← YOUR DATA (videos & tests)
├── app.js               ← Main app logic
├── lectures.js          ← Lectures page logic
├── tests.js             ← Tests page logic
├── style.css            ← All styling
└── Introduction.html    ← (Old file - can delete)
```

---

## 🚀 Quick Start

1. **Add Videos**: Edit `data.js` → Add lectures with YouTube IDs
2. **Add Tests**: Edit `data.js` → Add test questions
3. **Open in Browser**: Open `index.html` in any browser
4. **Test**: Click "Lectures" or "Tests" buttons

---

## ✅ What's Real vs What's Not

✅ **REAL (Everything Works)**
- Video player (YouTube embedded)
- Test timer
- Answer selection
- Results calculation
- Dark mode toggle
- Navigation

❌ **NO FAKE FEATURES**
- No fake AI ranking
- No fake analytics
- No fake certificates
- Only real data you add

---

## 🔧 Troubleshooting

### Videos not showing?
1. Check `data.js` - YouTube ID must be correct
2. YouTube ID should be 11 characters
3. Open browser console (F12) for errors

### Tests not working?
1. Check `correctAnswer` is 0-3 (valid index)
2. Make sure you have at least 4 options
3. Check option count matches answer index

### Data not loading?
1. Make sure `data.js` is in same folder as HTML files
2. Hard refresh browser (Ctrl+Shift+R)
3. Check browser console for errors

---

## 💡 Tips

- Keep video duration format: "45 min", "1h 30 min"
- Write clear descriptions for lectures
- Test your questions first before adding
- Use real YouTube video IDs only
- Keep file names lowercase

---

## 📞 Need Help?

Check:
1. Console (F12 → Console tab) for error messages
2. Make sure `data.js` syntax is correct (use VSCode)
3. YouTube IDs are exactly 11 characters

---

**Ready? Start adding your content in `data.js` now! 🎯**
