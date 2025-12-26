# 🚀 GitHub & Vercel Deployment Complete Guide

## ✅ FEATURE: Branch-Wise Google Sheets Submission

Your app **automatically submits form data to Google Sheets based on the selected branch**.

### How It Works:
1. **User selects branch** in form (Mumbai, Delhi, Bangalore, etc.)
2. **On submission**, data is sent to Google Sheets
3. **Google Apps Script** creates separate tabs for each branch
4. **Data appears** in the correct branch-wise tab automatically

---

## 📋 STEP 1: GITHUB SETUP (First Time Only)

### Option A: Push Existing Git Repository

```bash
cd c:\Users\ASD\Downloads\GinzaOrder\GinzaOrder

# Check current Git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Ginza Industries Order Portal with branch-wise Google Sheets integration"

# Create a new repository on GitHub:
# 1. Go to https://github.com/new
# 2. Create repo: "ginza-order-portal"
# 3. Copy the repository URL

# Add remote and push (replace YOUR_USERNAME/YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/ginza-order-portal.git
git branch -M main
git push -u origin main
```

### Option B: If Remote Already Exists

```bash
# Check existing remote
git remote -v

# Update if needed
git remote set-url origin https://github.com/YOUR_USERNAME/ginza-order-portal.git

# Push
git push -u origin main
```

---

## 🌐 STEP 2: VERCEL DEPLOYMENT

### Method 1: Connect GitHub to Vercel (Recommended)

**Step 1: Go to Vercel**
```
1. Visit https://vercel.com/new
2. Click "Continue with GitHub"
3. Authorize Vercel for your GitHub account
```

**Step 2: Import Project**
```
1. Search for "ginza-order-portal"
2. Click "Import"
3. Vercel will auto-detect it's a Vite project
```

**Step 3: Configure Environment Variables**
```
On Vercel dashboard:
1. Click project name
2. Go to Settings → Environment Variables
3. Add variables:
   
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   VITE_GEMINI_API_KEY = your-gemini-key-here (optional)
```

**Step 4: Deploy**
```
1. Click "Deploy"
2. Wait 3-5 minutes for build
3. You get a live URL: https://ginza-order-portal.vercel.app
```

### Method 2: Deploy from Command Line (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd c:\Users\ASD\Downloads\GinzaOrder\GinzaOrder
vercel

# Follow prompts:
# - Link to existing project? (No for first time)
# - Project name? ginza-order-portal
# - Framework: Other
# - Root directory: ./
# - Build command: npm run build
# - Output directory: dist
```

---

## 🔐 STEP 3: CONFIGURE ENVIRONMENT VARIABLES

Your deployed app needs these secrets:

```
Environment Variable              Where to Get It
─────────────────────────────────────────────────────
VITE_SUPABASE_URL                 Supabase Dashboard
VITE_SUPABASE_ANON_KEY            Supabase Dashboard
VITE_GEMINI_API_KEY               Google AI Studio (optional)
```

### Get Supabase URL & Key:
```
1. Go to https://app.supabase.com
2. Select your project
3. Click Settings → API
4. Copy:
   - Project URL → VITE_SUPABASE_URL
   - anon (public) key → VITE_SUPABASE_ANON_KEY
```

### Add to Vercel:
```
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add all three variables
5. Click "Save"
```

---

## 📊 STEP 4: CONFIGURE GOOGLE SHEETS INTEGRATION

### Your App Already Has Branch-Wise Setup!

The Google Apps Script in your app includes:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const branchName = (data.branch || 'Unknown').trim();
  const doc = SpreadsheetApp.openById(SHEET_ID);
  
  // Automatically creates tabs for each branch
  let sheet = doc.getSheetByName(branchName);
  if (!sheet) {
    sheet = doc.insertSheet(branchName);
  }
  
  // Appends data to the correct branch tab
  sheet.appendRow([...data]);
}
```

### To Enable Google Sheets Submission:

**Step 1: Get Your Google Apps Script URL**
```
1. Open your Google Sheet
2. Extensions → Apps Script
3. Deploy → Manage Deployments
4. Get the URL (ends with /exec)
```

**Step 2: Set It in the App**
```
On your Vercel form:
1. Click the Settings icon (top right)
2. Paste Google Script URL
3. Click Save

Or add to Vercel environment:
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

**Step 3: Test Submission**
```
1. Fill out the form
2. Select a branch (Mumbai, Delhi, etc.)
3. Click Submit Order
4. Check console (F12) for success message:
   ✅ Successfully sent order with X item(s) to Google Sheet.
5. Open Google Sheet → Check the branch-specific tab
6. Your data should appear in 5-10 seconds
```

---

## ✅ VERIFICATION CHECKLIST

### After Deployment:

- [ ] App loads at `https://ginza-order-portal.vercel.app`
- [ ] Can login with credentials
- [ ] Form displays all fields
- [ ] Branch dropdown works
- [ ] Can select customers
- [ ] Can add items
- [ ] Submission succeeds
- [ ] Data appears in Supabase
- [ ] Data appears in Google Sheet (in branch-specific tab)
- [ ] Browser console shows no errors (F12)

### Test Form Submission:

```
Branch: Mumbai
Customer: Any existing customer
Sales Person: Any available
Add 2-3 items
Click Submit Order
Click Review & Submit

✅ Success Message in Browser
✅ Data in Google Sheet > Mumbai tab
✅ Data in Supabase Database
```

---

## 🔄 AUTO-DEPLOYMENT SETUP

Once connected, Vercel **automatically deploys** when you push to GitHub:

```bash
# Make code changes locally
cd GinzaOrder

# Commit and push
git add .
git commit -m "Fix: Update branch submission logic"
git push origin main

# Vercel automatically:
# 1. Detects the push
# 2. Builds your app
# 3. Deploys to production
# 4. Updates https://ginza-order-portal.vercel.app
```

---

## 🚨 TROUBLESHOOTING

### App Won't Load
```
1. Check browser console (F12)
2. Check Vercel deployment logs:
   - Dashboard → Project → Deployments
3. Verify environment variables are set correctly
```

### Google Sheets Not Receiving Data
```
1. Verify Google Script URL is set in Settings
2. Check browser console for error messages
3. Ensure deployment URL ends with /exec
4. Make sure "Who has access" = "Anyone" in Apps Script
```

### Build Fails on Vercel
```
Check:
1. package.json has correct build command: "npm run build"
2. All dependencies installed: npm install
3. No TypeScript errors: npm run build locally first
4. Vercel logs show specific error
```

---

## 📝 BRANCH-WISE DATA FLOW

```
User Form (Vercel)
    ↓
Select Branch: "Mumbai"
    ↓
Submit Order
    ↓
sheetService.submitOrderToSheet()
    ↓
Google Apps Script receives:
{
  "branch": "Mumbai",
  "customerName": "ABC Corp",
  "customerEmail": "contact@abc.com",
  "items": [...]
}
    ↓
Script detects branch: "Mumbai"
    ↓
Creates/finds "Mumbai" sheet tab
    ↓
Appends row with all data
    ↓
✅ Data in Google Sheet → Mumbai tab
✅ Data in Supabase database
```

---

## 🎯 NEXT STEPS

1. **Push to GitHub** → Follow Step 1
2. **Deploy to Vercel** → Follow Step 2
3. **Add Environment Variables** → Follow Step 3
4. **Configure Google Sheets** → Follow Step 4
5. **Test Everything** → Follow Verification Checklist

---

## 📞 HELPFUL LINKS

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Docs:** https://docs.github.com
- **Supabase Dashboard:** https://app.supabase.com
- **Google Apps Script:** https://script.google.com/home
- **Your Deployed App:** Will be shown after Vercel deployment

---

## 💡 Key Features Already Implemented

✅ **Branch-wise Google Sheets tabs** - Automatic
✅ **Customer email captured** - In form
✅ **Order items array** - Full support
✅ **Supabase storage** - Integrated
✅ **Form validation** - Complete
✅ **Error handling** - Comprehensive
✅ **User authentication** - Implemented
✅ **Sales person tracking** - Included

---

**Status: Ready for Production Deployment! 🎉**
