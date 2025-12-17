# Vercel Environment Variables Setup - Quick Fix

## समस्या:
```
Environment Variable "VITE_SUPABASE_URL" references Secret "VITE_SUPABASE_URL", which does not exist.
```

## समाधान - Vercel Dashboard में करने का काम:

### Step 1: Vercel Dashboard खोलें
1. https://vercel.com/dashboard जाएं
2. अपना project **order-form-multiple-location** खोलें

### Step 2: Environment Variables सेट करें
1. **Settings** टैब क्लिक करें
2. **Environment Variables** चुनें
3. **"Add New"** बटन क्लिक करें

### Step 3: ये 3 variables add करें:

#### Variable 1:
```
Name: VITE_SUPABASE_URL
Value: https://qtctkhkykkwntecxgezs.supabase.co
Select: ✓ Production  ✓ Preview  ✓ Development
Click: Save
```

#### Variable 2:
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM
Select: ✓ Production  ✓ Preview  ✓ Development
Click: Save
```

#### Variable 3:
```
Name: VITE_GEMINI_API_KEY
Value: AIzaSyCNBhSoKkehZSOuY3PtUMGj3O41ysBR8pA
Select: ✓ Production  ✓ Preview  ✓ Development
Click: Save
```

### Step 4: Redeploy करें
1. **Deployments** टैब पर जाएं
2. सबसे हाल की deployment (top one) को ढूंढें
3. उसके आगे के **"..."** (three dots) पर क्लिक करें
4. **"Redeploy"** चुनें
5. **"Redeploy"** बटन दोबारा क्लिक करें

---

## Important Points:

⚠️ **हर variable के लिए तीनों environments select करें:**
- ✓ Production
- ✓ Preview  
- ✓ Development

⚠️ **Value को copy करते समय कोई space न add हो**

⚠️ **Save करने के बाद redeploy करना ज़रूरी है**

---

## अगर अभी भी काम न हो तो:

### Option A: Vercel CLI से करें
```bash
npm install -g vercel
vercel env pull
vercel deploy --prod
```

### Option B: GitHub से Redeploy करें
1. Vercel Dashboard में Project खोलें
2. **Deployments** → Recent deployment → **"..."** → **Redeploy**

---

## Verify करने के लिए:
Deployment के बाद:
1. Live URL खोलें
2. Browser console खोलें (F12)
3. कोई red errors न हों
4. Data properly load हो रहा हो

अगर अभी भी issue है तो Vercel deployment logs दिखाना - वहां से exact error मिलेगा।
