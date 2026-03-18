# 🔬 Soul of Medico - Mission MBBS App

## **Complete NEET Preparation Platform**

---

## 🚀 **Quick Start (3 Steps)**

### 1️⃣ **Open Login Page**
```
Open: login.html
```

### 2️⃣ **Login with Test Credentials**
```
Email: student@example.com
Password: 123456
```

### 3️⃣ **Click Lectures → Watch Videos**
```
You'll see IUPAC Nomenclature lecture
Click Watch → YouTube video plays
```

---

## 📚 **Features Included**

### ✅ **Authentication System**
- Email/Password login
- Phone OTP login
- Google login (simulated)
- GitHub login (simulated)
- Session management
- Secure logout

### ✅ **Lectures**
- YouTube video embed
- Speed controls (1x, 1.5x, 2x)
- Description & notes
- Video list with chapters
- Resume watching

### ✅ **Tests**
- Multiple choice questions
- Timer (per test)
- Answer tracking
- Results with accuracy
- Score calculation

### ✅ **UI/UX**
- Professional design
- Dark mode support
- Responsive (all devices)
- Smooth animations
- Intuitive navigation

### ✅ **NO Fake Features**
- ❌ No fake AI ranking
- ❌ No fake certificates
- ❌ No fake analytics
- ✅ Only real working features

---

## 📁 **File Guide**

| File | Purpose |
|------|---------|
| `login.html` | 🔐 Login page (START HERE) |
| `login.js` | Login logic & sessions |
| `index.html` | 🏠 Home page |
| `lectures.html` | 🎥 Lectures & videos |
| `lectures.js` | Lectures logic |
| `tests.html` | ✏️ Tests & quizzes |
| `tests.js` | Tests logic |
| `data.js` | 📊 YOUR DATA (add videos/tests) |
| `app.js` | 🔧 Global app logic |
| `style.css` | 🎨 All styling |
| `debug.html` | 🔍 Troubleshooting |

---

## 🎥 **How to Add Lectures**

### **Step 1: Get YouTube Video ID**
```
YouTube URL: https://www.youtube.com/watch?v=58GV7_WTCoKzaX_Y
Video ID:    58GV7_WTCoKzaX_Y (part after v=)
```

### **Step 2: Edit data.js**
```javascript
const lectures = [
    {
        id: 1,
        title: "IUPAC Nomenclature",
        subject: "Chemistry",
        youtubeId: "58GV7_WTCoKzaX_Y",
        duration: "60 min",
        description: "Complete guide to IUPAC nomenclature",
        notes: "Learn systematic naming of compounds"
    },
    {
        id: 2,
        title: "YOUR LECTURE",
        subject: "Physics",
        youtubeId: "YOUR_YOUTUBE_ID",  // REPLACE THIS
        duration: "45 min",
        description: "What you'll learn",
        notes: "Additional notes"
    }
];
```

### **Step 3: Refresh lectures.html**
- New lectures appear automatically
- Click "Watch" to play

---

## ✏️ **How to Add Tests**

Edit `data.js`:

```javascript
const tests = [
    {
        id: 1,
        title: "Physics Quiz",
        description: "Test your knowledge",
        duration: 30,  // minutes
        questions: [
            {
                id: 1,
                text: "What is SI unit of current?",
                options: ["Ohm", "Ampere", "Volt", "Watt"],
                correctAnswer: 1,  // B) index 1
                explanation: "Ampere is the SI unit"
            },
            {
                id: 2,
                text: "Ohm's Law?",
                options: ["V=I×R", "P=V×I", "F=m×a", "E=mc²"],
                correctAnswer: 0,  // A) index 0
                explanation: "Ohm's Law: V = I × R"
            }
        ]
    }
];
```

---

## 🔐 **Test Credentials**

### Email Login
```
Email:    student@example.com
Password: 123456
```

### Phone Login
```
Phone: 9876543210 (any 10 digits)
OTP:   123456 (always works for demo)
```

### Social Login
```
Google / GitHub (simulated - works)
```

---

## 🐛 **Troubleshooting**

### **Lectures Not Showing?**

1. Open `debug.html` in browser
2. Check console output
3. Verify YouTube ID in data.js:
   - Should be 11 characters
   - No spaces or extra characters

Example ❌ Wrong:
```javascript
youtubeId: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
youtubeId: "dQw4w9WgXcQ "  // extra space
```

Example ✅ Correct:
```javascript
youtubeId: "dQw4w9WgXcQ"
```

### **Can't Login?**

1. Check credentials (see above)
2. Open browser console: F12
3. Check for error messages
4. Try hard refresh: Ctrl+Shift+R

### **Video Won't Play?**

1. Check YouTube ID is correct
2. Video should be publicly available
3. Check internet connection
4. Try different YouTube ID to test

### **Data Not Loading?**

1. Check `data.js` syntax (F12 → Console)
2. No typos in variable names
3. Proper commas between objects
4. Reload browser

---

## 🔄 **Application Flow**

```
login.html (Entry)
    ↓
[Login with credentials]
    ↓
index.html (Home)
    ├→ Lectures (lectures.html)
    │   ├→ Select lecture
    │   └→ Watch video
    │
    ├→ Tests (tests.html)
    │   ├→ Start test
    │   ├→ Answer questions
    │   └→ View results
    │
    └→ Profile (index.html)
        ├→ Settings
        └→ Logout → back to login
```

---

## 📊 **Data Structure**

### Lectures Format:
```javascript
{
    id: 1,                          // Unique ID
    title: "Lecture Title",         // Display name
    subject: "Physics",             // Subject name
    youtubeId: "xyzABCDEF123",      // YouTube ID (11 chars)
    duration: "45 min",             // Duration
    description: "What you learn",  // Description
    notes: "Additional notes"       // Notes or link
}
```

### Tests Format:
```javascript
{
    id: 1,
    title: "Test Name",
    description: "What test covers",
    duration: 30,                   // minutes
    questions: [
        {
            id: 1,
            text: "Question text?",
            options: ["A", "B", "C", "D"],
            correctAnswer: 0,       // 0=A, 1=B, 2=C, 3=D
            explanation: "Why correct"
        }
    ]
}
```

---

## 🎯 **Checklist**

- [ ] Open login.html in browser
- [ ] Login with test credentials
- [ ] See home page
- [ ] Click "Lectures"
- [ ] See lecture cards
- [ ] Click "Watch"
- [ ] Video plays on YouTube
- [ ] Can change speed
- [ ] Can read description
- [ ] Click "Back" to lectures
- [ ] Go to "Tests"
- [ ] See test cards
- [ ] Click "Start Test"
- [ ] Answer questions
- [ ] Submit test
- [ ] See results
- [ ] Go to "Profile"
- [ ] Click "Logout"
- [ ] Back to login page

---

## 💡 **Tips**

1. **YouTube ID:** Get from URL after `v=`
2. **Test Questions:** Always provide 4 options
3. **Correct Answer:** Use index (0-3)
4. **Duration:** In minutes for tests
5. **Dark Mode:** Automatically remembers preference

---

## 🚀 **Deployment**

### Option 1: Local (Testing)
```
1. Keep all files in same folder
2. Open login.html in browser
3. Works offline (except YouTube videos)
```

### Option 2: Web Server
```
1. Upload all files to web hosting
2. Set login.html as index/entry point
3. Works with custom domain
```

### Option 3: App Store (Future)
```
1. Convert HTML to Android APK (Cordova)
2. Or use React Native wrapper
3. Deploy to Play Store
```

---

## 📱 **Browser Support**

✅ Chrome/Edge (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Mobile browsers  
✅ Tablets  

---

## 🔒 **Security Notes**

**Current:** Demo system (safe for learning)  
**Production:** Use proper:
- Backend authentication
- Password hashing (bcrypt)
- HTTPS/TLS
- JWT tokens
- Rate limiting
- 2FA

---

## 📞 **Help**

### Debug Page
Open `debug.html` to see:
- Session status
- Data loaded
- Console logs
- Errors

### Console (F12)
Press F12 → Console tab:
- Check error messages
- See logs
- Test variables

### Files
- `SETUP_GUIDE.md` - Step-by-step
- `LOGIN_README.md` - Login details
- `HOW_TO_ADD_VIDEOS_AND_TESTS.md` - Data format

---

## ✨ **What's Next?**

1. ✅ **App works** - Login, home, lectures, tests
2. ⏭️ **Add your content** - Edit data.js
3. ⏭️ **Add more features** - Comments, progress tracking
4. ⏭️ **Backend** - Real database, authentication
5. ⏭️ **Deploy** - Hosting, domain name
6. ⏭️ **Mobile** - Convert to Android/iOS

---

## 📝 **License**

Free to use for educational purposes.

---

**Ready? Start with `login.html` 🎯**

Built with ❤️ for NEET aspirants

---

### Questions?
1. Check `debug.html`
2. Read `SETUP_GUIDE.md`
3. Open console (F12)
4. Check `data.js` syntax
