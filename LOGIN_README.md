# 🔐 Soul of Medico - LOGIN SYSTEM

---

## 🚀 **Getting Started**

1. Open `login.html` in browser
2. Login with credentials below
3. App opens to home page
4. Click Lectures/Tests to access content

---

## 📝 **Test Credentials**

### Email Login:
- **Email:** `student@example.com`
- **Password:** `123456`

### Phone Login (OTP):
- **Phone:** `9876543210` (or any 10-digit number)
- **OTP:** `123456` (always works for demo)

### Social Login:
- Google, GitHub buttons also work (simulated)

---

## ✅ **Features**

### 1. **Email Login**
- Email validation
- Password validation (min 6 chars)
- Remember me checkbox
- Forgot password link (ready to add)
- Social login options (Google, GitHub)

### 2. **Phone Login with OTP**
- Phone number validation (10 digits)
- OTP generation (simulated)
- OTP timer (2 minutes)
- New user auto-creation with phone

### 3. **Session Management**
- User session stored in localStorage
- Protected pages (can't access without login)
- Automatic redirect to login if session expired
- User name displayed in profile
- Logout functionality

### 4. **UI Features**
- Tab switching (Email / Phone)
- Loading spinners
- Error messages
- Success messages
- Dark mode support
- Responsive design

---

## 🔒 **Security Notes**

⚠️ **This is a DEMO system. For production:**
- ❌ Never store passwords in localStorage
- ✅ Use HTTPS only
- ✅ Implement proper backend authentication
- ✅ Use OAuth2 / JWT tokens
- ✅ Add password hashing (bcrypt, etc)
- ✅ Implement refresh tokens
- ✅ Add rate limiting on login attempts
- ✅ Use 2FA for security

---

## 📱 **Page Flow**

```
login.html (START HERE)
    ↓
index.html (home - requires login)
    ├─→ lectures.html (requires login)
    ├─→ tests.html (requires login)
    └─→ profile (logout option)
```

---

## 🔧 **File Structure**

```
SOM APP/
├── login.html          ← LOGIN PAGE (START HERE)
├── login.js            ← Login logic & session management
├── index.html          ← Home page (protected)
├── lectures.html       ← Lectures (protected)
├── tests.html          ← Tests (protected)
├── app.js              ← Global app logic
├── lectures.js         ← Lectures logic
├── tests.js            ← Tests logic
├── style.css           ← All styling
├── data.js             ← Your videos/tests data
└── README.md           ← This file
```

---

## 🎨 **Customization**

### Add Real Email Login (Backend Required):
Replace the simulated login in `login.js`:
```javascript
// Currently: checks userDatabase array
// Change to: POST to your backend API
fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
})
.then(res => res.json())
.then(data => {
    // Handle response
});
```

### Add Real Phone OTP:
Replace OTP generation in `login.js`:
```javascript
// Currently: generates fake OTP
// Change to: send SMS via Twilio/AWS SNS
sendSMS(phone, generatedOTP);
```

### Add Real Social Login:
Implement OAuth2:
```javascript
// Use Google Auth API
// Use GitHub OAuth
// Use your own SSO
```

---

## 🐛 **Troubleshooting**

### Login page not loading?
- Check `login.html` is in correct folder
- Make sure `login.js` is in same folder
- Open browser console (F12) for errors

### Can't login?
- Check test credentials above
- Try email: `student@example.com`, password: `123456`
- Browser console shows helpful messages

### Stuck on login after logout?
- Hard refresh (Ctrl+Shift+R)
- Clear cache if needed
- Check localStorage is enabled

### Pages redirect to login unexpectedly?
- Session may have expired
- localStorage might be cleared
- Try logging in again

---

## 💡 **Next Steps**

1. ✅ **Login system** - DONE
2. ⏭️ Add your videos to `data.js`
3. ⏭️ Add your tests to `data.js`
4. ⏭️ Connect to real backend (optional)
5. ⏭️ Deploy app

---

## 📞 **Questions?**

Check console (F12 → Console) for debug messages and error details.

---

**Ready to use! Start with `login.html` 🚀**
