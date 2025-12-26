# 🎯 VERCEL + GOOGLE SHEET - QUICK REFERENCE CARD

## ✅ YOUR STATUS
- ✅ Form deployed on Vercel (LIVE)
- ✅ Code pushed to GitHub
- ✅ Email field fully configured
- ⏳ Google Sheet integration - SETUP NEEDED

---

## 🚀 3-MINUTE QUICK START

### Step 1: Get Google Apps Script URL (2 minutes)
```
A) Already have one?
   → Go to Google Sheet
   → Extensions → Apps Script
   → Copy URL ending in /exec

B) Need to create one?
   → Read: VERCEL_GOOGLE_SHEET_SETUP.md (Step 1)
   → Follow code snippet
   → Deploy and copy URL
```

### Step 2: Add URL to Form (1 minute)
```
1. Open your Vercel form
2. Click Settings (gear icon ⚙️)
3. Paste Google Apps Script URL
4. Save Settings
5. Refresh page
```

### Step 3: Test (1 minute)
```
1. Fill form with test data
2. Include email: test@example.com
3. Click Submit
4. Check Google Sheet for new row
5. Done! ✅
```

---

## 📋 CHECKLIST

Before you test:
- [ ] Google Apps Script created
- [ ] Script set to "Anyone" access
- [ ] URL ends with /exec
- [ ] URL pasted in form Settings
- [ ] Page refreshed after save

After you submit:
- [ ] No error in form
- [ ] No error in browser console (F12)
- [ ] New row appears in Google Sheet (5-10 sec)
- [ ] Email shows in column 3
- [ ] All data correct

---

## 🔗 YOUR VERCEL FORM

Share this link with customers:
```
https://[your-vercel-url]
(Replace [your-vercel-url] with actual URL)
```

---

## 🎯 IF SOMETHING GOES WRONG

**Error: 401 Unauthorized**
→ Fix: Make deployment "Anyone"

**Error: Silent failure (no data)**
→ Fix: Check URL ends with /exec

**No error but data missing**
→ Fix: Check sheet name in script

**Can't find Settings button**
→ Fix: Press F12 → Console → check localStorage

---

## 📊 DATA COLUMNS

Email appears in **Column 3** (Customer Email)

```
1: Timestamp | 2: Customer Name | 3: Customer Email | 4: Order Date | ...
```

---

## ✨ WHAT WORKS

✅ Form frontend (all fields)
✅ Email capture (works!)
✅ Vercel deployment (live!)
✅ Data submission (ready!)
✅ Error handling (active!)

Just connect:
✅ Google Apps Script (your side)
✅ Google Sheet (your side)

---

## 📚 HELP FILES

- **VERCEL_GOOGLE_SHEET_SETUP.md** - Full setup guide
- **QUICK_FIX_GOOGLE_SHEET.md** - Common issues
- **CHECK_BROWSER_CONSOLE_GUIDE.md** - Error messages

---

**Ready?** → Open `VERCEL_GOOGLE_SHEET_SETUP.md`
