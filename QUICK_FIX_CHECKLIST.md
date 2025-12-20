# ✅ IMMEDIATE ACTION CHECKLIST

## For Existing Customer Data That's Not Showing

Do this NOW to fix the issue:

### Action 1: Run SQL Migration (5 minutes)

**Go to:** https://app.supabase.com → Your Project → SQL Editor

**Run this query:**
```sql
UPDATE customers
SET sales_person_name = CONCAT(au.first_name, ' ', au.last_name)
FROM app_users au
WHERE customers.sales_person_id = au.id
AND (customers.sales_person_name IS NULL OR customers.sales_person_name = '');
```

**Then verify:**
```sql
SELECT COUNT(*) FROM customers WHERE sales_person_name IS NOT NULL;
```

You should see a number > 0

---

### Action 2: Check RLS (2 minutes)

**Go to:** Supabase → Authentication → Policies (or Tables → customers → RLS)

**Look for:**
- Are there RLS policies on the `customers` table?
- If yes, do they allow SELECT access for the `anon` role?

**If you see 42501 error in browser console:**
- Disable RLS on `customers` table temporarily
- Or ensure policies allow SELECT for your use case

---

### Action 3: Test Locally (2 minutes)

1. **Stop dev server:** Ctrl+C
2. **Start fresh:** `npm run dev`
3. **Open:** http://localhost:3000
4. **Login** and test selecting a sales person

---

### Action 4: Check Console (1 minute)

**If customers still don't show:**

1. **Press F12** to open browser console
2. **Run command:**
   ```javascript
   debugCustomersFor('mumbai', 'Vishal Ambhore')
   ```

3. **Report what you see:**
   - How many customers returned?
   - Any error messages?

---

## Summary of Code Changes

### ✅ Fixed in App.tsx
- Line 821: Now uploads include `sales_person_name`
- Future CSV uploads will work correctly

### ✅ Fixed in supabaseService.ts  
- Line 482: Type now accepts `sales_person_name`
- Data will be saved to database

### ⚠️  Still Need Manual Fix
- Run SQL migration above for existing data
- This copies sales person name from app_users → customers

---

## Expected Result

After these steps:

1. Select branch: **Mumbai**
2. Select sales person: **Vishal Ambhore**
3. Start typing in customer name field
4. **✅ You should see customer names appear in dropdown!**

---

## If Still Not Working

Create an issue with:
- Browser console output from `debugCustomersFor('mumbai', 'Vishal Ambhore')`
- Output from running the SQL query above
- Screenshot of what's showing/not showing

