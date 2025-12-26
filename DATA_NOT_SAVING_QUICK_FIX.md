# ⚠️ DATA NOT SAVING - QUICK FIX (5 MINUTES)

## 🚨 PROBLEM
Your Vercel form is deployed but **data is NOT saving to Google Sheet**.

---

## ✅ MOST LIKELY CAUSE

**Google Apps Script deployment is set to "Me only" instead of "Anyone"**

This is the #1 reason data doesn't save!

---

## 🔧 QUICK FIX (5 MINUTES)

### Step 1: Check Google Apps Script (2 min)
```
1. Open your Google Sheet
2. Click Extensions → Apps Script
3. Click Deploy button at top
4. Click "Manage deployments"
```

### Step 2: Fix the "Who has access" Setting (2 min)
```
5. Find the Web App deployment
6. Click the Edit button (pencil icon)
7. Look for "Who has access"
8. If it says "Me only" → Click to change
9. Select "Anyone"
10. Click "Update"
```

### Step 3: Test (1 min)
```
11. Go back to your Vercel form
12. Fill in test data (including email)
13. Click Submit
14. Wait 5-10 seconds
15. Check Google Sheet for new row with email in column 3
```

---

## ✨ IF THAT DOESN'T WORK

**Try in this order:**

1. **Check form Settings**
   ```
   Click Settings (gear icon) on your Vercel form
   → Make sure Google Apps Script URL is there
   → Should end with /exec
   → Save & Refresh page
   ```

2. **Test the URL**
   ```
   Open: test-data-saving.html (in browser)
   → Paste your Google Apps Script URL
   → Click "Test Current URL"
   → Check console output
   ```

3. **Verify Google Apps Script Function**
   ```
   Google Sheet → Extensions → Apps Script
   → Should have a function called: doPost(e)
   → If missing → Use code from GOOGLE_SHEET_NOT_SAVING_FIX.md
   ```

4. **Read Full Guide**
   ```
   Open: GOOGLE_SHEET_NOT_SAVING_FIX.md
   → Has 5 detailed fixes with step-by-step instructions
   ```

---

## 📋 CHECKLIST

- [ ] Google Apps Script deployment set to "Anyone"
- [ ] Google Apps Script URL in form Settings
- [ ] URL ends with /exec
- [ ] Form page refreshed after Settings change
- [ ] Test data submitted
- [ ] New row appears in Google Sheet (5-10 sec)
- [ ] Email shows in column 3

---

## 🎯 EMAIL FIELD VERIFICATION

✅ Email field IS configured correctly:
- Input exists on form ✓
- Data is captured ✓
- Will be sent in column 3 ✓

It WILL appear in Google Sheet once you fix the deployment!

---

## 📞 IF STILL STUCK

1. Open browser console (F12)
2. Submit test form
3. Copy any error message
4. Search that error in: GOOGLE_SHEET_NOT_SAVING_FIX.md
5. Follow the specific fix

---

**Most common fix:** Set deployment to "Anyone" ← Try this FIRST!
