# 🔧 TROUBLESHOOT - If Customers Not Showing

## The Problem
You have customer data in Supabase organized by branch & sales person, but when you select a sales person in the form, the customer list doesn't appear.

---

## Quick Diagnosis Checklist

### ✅ Checklist 1: App is Working
- [ ] Can you see the form?
- [ ] Can you select a branch?
- [ ] Can you select a sales person?
- [ ] Can you see the Customer Name field?

**If NO to any** → App might not be running. Try: `npm run dev`

---

### ✅ Checklist 2: Jaipur & Kolkata Appear?
- [ ] In Branch dropdown, do you see "Jaipur"?
- [ ] In Branch dropdown, do you see "Kolkata"?

**If NO** → Hard refresh: `Ctrl+Shift+R` (Windows)

---

### ✅ Checklist 3: Check Console (Press F12)

Open browser developer tools (F12), go to **Console** tab.

Select a branch & sales person, then look for:

**Expected messages:**
```
🔄 LOADING CUSTOMERS:
   Salesman Name: Vishal Ambhore
   Branch ID: mumbai

✅ Fetched 4482 total customers from database
✅ After branch filter: 50 customers
✅ After sales person filter: 25 customers
✅ Returning customers: [...]
```

**What message do you see?** Tell me and I'll tell you what's wrong.

---

## Common Issues & Fixes

### Issue 1: "Fetched 0 customers"
**Meaning**: App can't connect to Supabase

**Fix**: 
1. Check internet connection
2. Check Supabase is running
3. Verify API keys in `supabaseClient.ts`

---

### Issue 2: "After branch filter: 0 customers"
**Meaning**: The branch name in Supabase doesn't match what app is looking for

**Fix**: 
1. Go to Supabase
2. Run this SQL:
   ```sql
   SELECT DISTINCT branch FROM customers;
   ```
3. **Tell me exactly what you see**

Example: Does it show "Jaipur HO" or "Jaipur"?

---

### Issue 3: "After sales person filter: 0 customers"
**Meaning**: Sales person name in database doesn't match app

**Fix**:
1. Go to Supabase
2. Run this SQL:
   ```sql
   SELECT DISTINCT sales_person_name FROM customers
   WHERE branch LIKE '%Jaipur%';
   ```
3. **Tell me exactly what you see**

Example: Does it show "Durgesh" or "Durgesh " (with space)?

---

### Issue 4: Console shows warning
```
⚠️  No match for "Durgesh"
   Sales persons in this branch: ["Jaipur HO", "Durgesh Kumar"]
```

**Meaning**: You selected "Durgesh" but database has "Durgesh Kumar"

**Fix**: Either:
- Change what you select in the form (use exact name)
- OR update Supabase to match (rename)

---

## The Root Cause (99% of time)

Your CSV upload might have:
- Branch: "Jaipur HO" (but app expects "Jaipur")
- Or Sales person: "Durgesh  " with extra spaces

**Solution**: Tell me the exact values from Supabase and I'll update the app to match!

---

## What To Do Right Now

### Step 1: Run Supabase SQL
Go to: https://app.supabase.com/projects/qtctkhkykkwntecxgezs/sql/new

Paste this:
```sql
SELECT DISTINCT branch, sales_person_name, COUNT(*) as count
FROM customers
GROUP BY branch, sales_person_name
ORDER BY branch, sales_person_name;
```

Click Run.

### Step 2: Tell Me
Copy & paste the results, including:
- What branch names appear? (Are they "Jaipur HO" or "Jaipur"?)
- What sales person names appear?
- How many customers for each combo?

### Step 3: I'll Fix
Once I see the actual names in Supabase, I can:
- Update app constants to match
- OR update Supabase to be consistent
- Then customers will appear!

---

## Testing After Fix

After fix is done:

1. **Hard refresh browser**: `Ctrl+Shift+R`
2. **Select branch**: "Jaipur"
3. **Select sales person**: "Jaipur HO" or "Durgesh"
4. **Type in customer field**: Should show customer list ✅

If not, we'll debug further!

---

## Still Stuck?

Share with me:
1. **Screenshot** of your form
2. **Screenshot** of console (F12) showing error message
3. **Output of SQL query** from Supabase
4. **What you selected** (branch & sales person)

With this, I can fix it 100%! 🎯

