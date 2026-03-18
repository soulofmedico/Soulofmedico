# 🚀 Complete Setup Guide - Soul of Medico

---

## ✅ **Step-by-Step Instructions**

### **Step 1: Start with Login**
1. Open **`login.html`** in your browser
2. Use test credentials:
   - Email: `student@example.com`
   - Password: `123456`

### **Step 2: You'll See Home Page**
- Home page loads (index.html)
- Click **"Lectures"** button at bottom

### **Step 3: View Lectures**
- Lectures page (lectures.html) opens
- Should see **"IUPAC Nomenclature"** card
- Click **"Watch"** button
- YouTube video plays

### **Step 4: Add More Lectures**
1. Edit **`data.js`**
2. Add new lecture in the `lectures` array:

```javascript
const lectures = [
    {
        id: 1,
        title: "IUPAC Nomenclature",
        subject: "Chemistry",
        youtubeId: "58GV7_WTCoKzaX_Y",
        duration: "60 min",
        description: "Complete guide to IUPAC nomenclature with examples",
        notes: "Learn systematic naming..."
    },
    // ADD YOUR LECTURE HERE:
    {
        id: 2,
        title: "Your Lecture Title",
        subject: "Physics",
        youtubeId: "YOUR_YOUTUBE_ID",  // Get from YouTube URL
        duration: "45 min",
        description: "What you'll learn",
        notes: "Additional notes"
    }
];
```

3. Refresh lectures.html - new lecture appears

---

## 📁 **File Structure**

```
SOM APP/
├── login.html           ← START HERE (entry point)
├── login.js             ← Login logic
├── index.html           ← Home page
├── lectures.html        ← Lectures page
├── lectures.js          ← Lectures logic
├── tests.html           ← Tests page
├── tests.js             ← Tests logic
├── data.js              ← YOUR DATA (videos & tests)
├── app.js               ← Global logic
├── style.css            ← All styling
├── debug.html           ← Debug/troubleshoot
├── HOW_TO_ADD_VIDEOS_AND_TESTS.md
└── LOGIN_README.md
```

---

## 🎥 **How to Add YouTube Videos**

### **Get YouTube Video ID:**
1. Go to YouTube
2. Watch your video
3. Copy URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
4. Video ID is: `dQw4w9WgXcQ` (after `v=`)

### **Add to data.js:**
```javascript
{
    id: 2,
    title: "Your Lecture Title",
    subject: "Chemistry",
    youtubeId: "dQw4w9WgXcQ",  // REPLACE THIS
    duration: "45 min",
    description: "What's covered",
    notes: "Additional notes"
}
```

---

## ✏️ **How to Add Tests**

Edit **`data.js`** and add to `tests` array:

```javascript
const tests = [
    {
        id: 1,
        title: "Chemistry Quiz",
        description: "Test your knowledge",
        duration: 30,  // minutes
        questions: [
            {
                id: 1,
                text: "What is the SI unit of current?",
                options: ["Ohm", "Ampere", "Volt", "Watt"],
                correctAnswer: 1,  // B) Ampere (index 1)
                explanation: "Ampere is the SI unit of electric current"
            },
            {
                id: 2,
                text: "Ohm's Law is?",
                options: ["V=I×R", "P=V×I", "F=m×a", "E=mc²"],
                correctAnswer: 0,  // A) V=I×R (index 0)
                explanation: "Ohm's Law: Voltage = Current × Resistance"
            }
        ]
    }
];
```

Then refresh `tests.html` - tests appear!

---

## 🔍 **Troubleshooting**

### **Lectures Not Showing?**

1. Open **`debug.html`** in browser
2. Check if lectures are loaded:
   - ✅ Should show "Lectures array found"
   - ✅ Should show YouTube ID

3. If not showing:
   - Check `data.js` syntax (F12 → Console)
   - YouTube ID must be 11 characters
   - No spaces or special characters

### **Can't Login?**

Test credentials:
- **Email:** student@example.com
- **Password:** 123456

If still fails:
- Open `debug.html`
- Check "Session Status"
- Check browser console (F12 → Console)

### **Video Not Playing?**

1. Check YouTube ID is correct
2. Video should be 11 characters long
3. No extra characters or spaces
4. Try: `https://www.youtube.com/embed/VIDEO_ID`

### **Session Issues?**

1. Hard refresh: `Ctrl+Shift+R`
2. Clear cache: Settings → Clear browsing data
3. Open debug.html to check session

---

## 🧪 **Test Everything**

### **Checklist:**

- [ ] Open login.html
- [ ] Login with test credentials
- [ ] See home page
- [ ] Click "Lectures"
- [ ] See "IUPAC Nomenclature" card
- [ ] Click "Watch"
- [ ] YouTube video plays
- [ ] Can change playback speed
- [ ] Can read description
- [ ] Click "Back" to lecture list
- [ ] Go to home
- [ ] Go to tests
- [ ] Click profile
- [ ] Click logout
- [ ] Back to login page

---

## 💡 **Common Mistakes**

❌ **Wrong:** `youtubeId: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"`  
✅ **Correct:** `youtubeId: "dQw4w9WgXcQ"`

❌ **Wrong:** `youtubeId: "dQw4w9WgXcQ "`  (extra space)  
✅ **Correct:** `youtubeId: "dQw4w9WgXcQ"`

❌ **Wrong:** Comma missing after object  
✅ **Correct:** Add comma between objects

---

## 🔧 **Debug Tips**

1. **Open Console:** F12 → Console tab
2. **Check for errors:** Red messages = problems
3. **Check network:** F12 → Network tab
4. **Check storage:** F12 → Application → LocalStorage

---

## 🚀 **Next Steps**

1. ✅ Login works
2. ✅ Home page works
3. ✅ Add lectures in data.js
4. ⏭️ Add tests in data.js
5. ⏭️ Connect to real backend (optional)
6. ⏭️ Deploy app

---

**You're all set! Start with `login.html` 🎯**

Questions? Open `debug.html` to see what's loaded.
