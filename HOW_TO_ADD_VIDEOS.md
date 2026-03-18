# 📚 HOW TO ADD VIDEOS TO SOUL OF MEDICO

## ✅ NEW METHOD - Local Video Upload (RECOMMENDED)

### Step 1️⃣: Open Lectures Page
- Click on **"Lectures"** from the home page
- You'll see the lecture list

### Step 2️⃣: Click "+ Add Video" Button
- Look for the **blue "+ Add Video"** button in the top-right corner
- Click it to open the video upload form

### Step 3️⃣: Fill in Video Details
```
📝 Lecture Title     → Name of your lecture (e.g., "IUPAC Nomenclature")
📚 Subject          → Select from dropdown (Chemistry, Biology, Physics, etc.)
⏱️ Duration         → Duration (e.g., "45 min")
🎬 Upload Video     → Click to select your video file from computer
📖 Description      → Brief description of the lecture
📝 Notes            → Important notes or key points
```

### Step 4️⃣: Upload Video File
- Click **"🎬 Upload Video File"** button
- Select a video from your computer
- **Supported formats:** MP4, WebM, Ogg
- **Maximum size:** 500MB

### Step 5️⃣: Save Lecture
- Click the **"✅ Save Lecture"** button
- Video will be saved to your browser's local storage
- You'll see success message

### Step 6️⃣: Watch Your Lecture
- Go back to lecture list
- Click **"Watch"** on your new lecture
- Video player will load with controls

---

## 🎮 Video Player Features

Once your video is playing:

### ⏸️ Playback Controls
- **Play/Pause** - Click on video or space bar
- **Full Screen** - Double-click video
- **Progress Bar** - Drag to skip to any time

### ⚡ Speed Control
- **1x** - Normal speed
- **1.5x** - 50% faster
- **2x** - Double speed (useful for revision)

### 📖 Description & Notes
- View lecture description
- View important notes
- Two tabs at bottom of video

---

## 💾 How Videos Are Stored

Your videos are stored in **two ways**:

### Local Storage (Browser Memory)
- Videos are saved in your browser's localStorage
- They persist across sessions
- Takes up space on your device (use SSD)
- Only available on this device/browser

### Export & Backup (Optional)
```javascript
// To backup your lectures:
1. Open Browser Console (F12)
2. Paste: localStorage.getItem('lectures')
3. Copy the entire JSON data
4. Save to a .txt file for backup
```

---

## 🖥️ Video File Recommendations

### Supported Formats
✅ **MP4** (Most Compatible)
✅ **WebM** (Good for Web)
✅ **Ogg** (Alternative)

### Size Recommendations
- **Small lectures:** 30-100 MB
- **Medium lectures:** 100-300 MB
- **Long lectures:** 300-500 MB

### How to Reduce Video Size
```bash
# Using FFmpeg (free tool)
ffmpeg -i original.mp4 -vcodec libx264 -crf 28 -preset medium compressed.mp4

# Or use: HandBrake (GUI tool)
# Download from: https://handbrake.fr/
```

---

## 🔧 Advanced: Bulk Upload via data.js

If you have pre-recorded videos and want to add multiple at once:

### Step 1: Add Videos via JavaScript Console
```javascript
// Open Console (F12) and paste:

const newLectures = [
    {
        id: 1,
        title: "IUPAC Nomenclature",
        subject: "Chemistry",
        duration: "45 min",
        description: "Learn IUPAC naming convention for organic compounds",
        notes: "Focus on functional groups and prefixes",
        videoFile: "" // Will be filled by upload
    },
    {
        id: 2,
        title: "Photosynthesis",
        subject: "Biology",
        duration: "60 min",
        description: "Understanding light and dark reactions",
        notes: "Calvin cycle is important",
        videoFile: "" // Will be filled by upload
    }
];

localStorage.setItem('lectures', JSON.stringify(newLectures));
location.reload();
```

### Step 2: Upload Videos One by One
- Use the **"+ Add Video"** button
- This will add them to the list you created

---

## ❌ Troubleshooting

### ❓ "Video doesn't load"
**Solution:** 
- Check if video file is in supported format
- Try converting to MP4 using HandBrake
- Check browser console (F12) for errors

### ❓ "File too large"
**Solution:**
- Maximum 500MB per video
- Compress using FFmpeg or HandBrake
- Or upload smaller video file

### ❓ "Videos disappeared after refresh"
**Solution:**
- Browser cache was cleared
- localStorage data was deleted
- Try importing from backup

### ❓ "Add Video button not working"
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart browser
- Check console (F12) for JavaScript errors

---

## 🔄 Backup Your Videos

### Export All Lectures
```javascript
// Open Console (F12) and paste:
const data = localStorage.getItem('lectures');
console.log(data);
// Copy the output and save to backup.json file
```

### Import Lectures
```javascript
// Open Console (F12) and paste:
const backupData = `[paste your backup JSON here]`;
localStorage.setItem('lectures', backupData);
location.reload();
```

---

## 📱 Tips for Best Experience

✅ Use **MP4 format** for best compatibility
✅ Compress videos to **100-300 MB** for smooth playback
✅ Use **1080p** resolution (1920×1080) for clarity
✅ Keep **frame rate at 30fps** to reduce file size
✅ Test video in player before saving
✅ Keep **descriptions and notes** concise but informative
✅ Use **1.5x or 2x speed** for quick revision

---

## 🎬 Example Video Specifications

**Perfect Lecture Video:**
- Duration: 45-60 minutes
- Format: MP4 (H.264 codec)
- Resolution: 1920×1080 (1080p)
- Frame Rate: 30fps
- File Size: 150-250 MB
- Audio: 128kbps

---

## ❓ Questions?

If you encounter any issues:

1. Check **browser console (F12)**
2. Check **localStorage in DevTools**
3. Verify **video file format**
4. Try **clearing cache** and reopening
5. Test with **different browser**

---

**Last Updated:** March 18, 2026
**Version:** 2.0 (Local Video Upload)
