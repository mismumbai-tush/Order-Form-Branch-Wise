# 🔍 DIAGNOSE CUSTOMER DATA ISSUE - Step by Step

## Problem Summary
✓ Branch selection works
✓ Sales person dropdown shows correctly
✗ Customers don't load when you select a sales person

---

## STEP 1: Check Your Actual Supabase Data (CRITICAL!)

Go to: **https://app.supabase.com/projects/qtctkhkykkwntecxgezs/sql/new**

### Query 1: Check Total Customers
```sql
SELECT COUNT(*) as total_customers FROM customers;
```

**Expected**: Should show a number > 0 (like 4482)

If 0 → **NO DATA IN DATABASE** - Need to upload CSV again!

---

### Query 2: Check Branch Names (MOST IMPORTANT)
```sql
SELECT DISTINCT branch, COUNT(*) as count
FROM customers
GROUP BY branch
ORDER BY branch;
```

**Copy the EXACT output here. Examples:**
- You might see: "Mumbai HO", "Jaipur HO", "Kolkata HO" (WITH HO)
- Or you might see: "Mumbai", "Jaipur", "Kolkata" (NO HO)
- Or mixed!

**THIS IS THE KEY** - The branch names in your database must match what the app is looking for!

---

### Query 3: Check Sales Person Names
```sql
SELECT DISTINCT sales_person_name, COUNT(*) as count
FROM customers
GROUP BY sales_person_name
ORDER BY sales_person_name;
```

**Look for:**
- Are the names exactly as they appear in form?
- Any extra spaces? (like "Durgesh  " with 2 spaces)
- NULL values? (empty cells)
- Spelling matches exactly?

---

### Query 4: Check Mumbai Data Specifically
```sql
SELECT 
  branch, 
  sales_person_name, 
  COUNT(*) as count
FROM customers
WHERE branch LIKE '%Mumbai%'
GROUP BY branch, sales_person_name;
```

**You should see:**
- Branch name (exactly as stored)
- Sales persons under Mumbai
- How many customers per sales person

---

## STEP 2: Browser Console Debug (F12)

1. **Open app**: http://localhost:3000
2. **Press F12** (opens developer tools)
3. **Go to Console tab**
4. **Select**: Branch = "Mumbai"
5. **Select**: Sales Person = "Vishal Ambhore"
6. **Look for messages in console**

**Expected messages:**
```
🔄 LOADING CUSTOMERS:
   Salesman Name: Vishal Ambhore
   Branch ID: mumbai

🔍 FETCHING CUSTOMERS:
   Branch ID: mumbai
   Sales Person Name: Vishal Ambhore

✅ Fetched 4482 total customers from database
✅ After branch filter: 50 customers
✅ After sales person filter: 25 customers
✅ Returning customers: [...]
```

**What you actually see?** Tell me, and I'll know the exact problem!

---

## STEP 3: Paste This in Console

Open console (F12) and paste:

```javascript
// Check what's in the database
const { data: all, error: err } = await supabase
  .from('customers')
  .select('id, branch, sales_person_name')
  .limit(10);

if (err) {
  console.error('ERROR:', err.message);
} else {
  console.log('Sample 10 customers:');
  all.forEach(c => {
    console.log(`  Branch: "${c.branch}" | Sales Person: "${c.sales_person_name}"`);
  });
}
```

This will show:
- Are customers being fetched?
- What do branch names look like?
- What do sales person names look like?

---

## STEP 4: Common Causes & Fixes

### Cause 1: Database is EMPTY
**Symptom**: "Fetched 0 total customers"

**Fix**: Your CSV upload didn't work
1. Go to Supabase → customers table
2. Check if table has rows
3. If empty → Upload CSV again using the app

---

### Cause 2: Branch Names Don't Match
**Symptom**: "After branch filter: 0 customers"

**Example**:
- Database has: "Jaipur HO"
- App looking for: "Jaipur"
- Result: NO MATCH ❌

**Fix Options**:

**Option A: Clean Database (Recommended)**
```sql
-- Remove " HO" from all branch names
UPDATE customers
SET branch = TRIM(REPLACE(branch, ' HO', ''));
```

Then app will find them!

**Option B: Update constants.ts**
Change branch display names to match database:
```typescript
{ id: 'jaipur', name: 'Jaipur HO' }  // Was: 'Jaipur'
```

---

### Cause 3: Sales Person Names Don't Match
**Symptom**: "After sales person filter: 0 customers"

**Example**:
- Database has: "Durgesh " (with space at end)
- App looking for: "Durgesh"
- Result: NO MATCH ❌

**Fix**:
```sql
-- Trim all sales person names
UPDATE customers
SET sales_person_name = TRIM(sales_person_name);
```

---

### Cause 4: NULL sales_person_name
**Symptom**: Sales person field is empty in database

**Fix**:
```sql
-- Fill NULL values with sales person name from upload
UPDATE customers
SET sales_person_name = 'Sales Person Name Here'
WHERE sales_person_name IS NULL AND branch = 'Jaipur';
```

---

## STEP 5: What to Tell Me

Run the SQL queries above and share:

1. **Total customers**: How many in database?
2. **Branch names**: Copy exact output (with/without HO?)
3. **Sales person names**: Copy exact names shown
4. **Console messages**: What do you see when selecting sales person?
5. **Sample data**: Show me the first 5 rows from Query 4

**With this info, I can fix it 100%!** ✅

---

## STEP 6: The Most Likely Issue

Based on your description, I bet:
- Database has: "Jaipur HO", "Kolkata HO", "Mumbai HO"
- App looking for: "Jaipur", "Kolkata", "Mumbai"
- **MISMATCH** = No customers load

**Quick Fix**:
Either:
1. Clean the branch names in Supabase (remove " HO")
2. OR update constants.ts to show " HO"

---

## IMMEDIATE ACTION

**Do this NOW**:

1. Go to Supabase
2. Run Query 1 (check total customers)
3. Run Query 2 (check branch names)
4. **Tell me what you see**

Example output:
```
Query 1: total_customers = 4482 ✅
Query 2 results:
  branch | count
  -----------
  Jaipur HO | 100
  Kolkata HO | 150
  Mumbai HO | 200
```

Then I'll know EXACTLY what to fix! 💯

---

## Testing After Fix

Once we fix the names:

1. Select Branch: "Jaipur"
2. Select Sales Person: "Durgesh"
3. Type customer name
4. **Dropdown should show customers** ✅

---

**Ready? Start with STEP 1 - run the SQL queries!** 🚀

