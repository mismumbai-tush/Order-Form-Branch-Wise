# ✅ FIX CUSTOMERS NOT LOADING - 3 Simple Steps

## The Problem
Customers aren't showing in dropdown even though you select branch & sales person.

## The Solution

### Step 1: Run Diagnostic (1 minute)

1. **Open app**: http://localhost:3000
2. **Press F12** (developer console)
3. **Go to Console tab**
4. **Paste & Run**:
   ```javascript
   diagnoseSupabase()
   ```

You'll see detailed info about your database.

---

### Step 2: Look for This Pattern in Output

**LOOK FOR:**
```
🏢 UNIQUE BRANCHES in database:
   • Mumbai HO
   • Jaipur HO
   • Kolkata HO
```

**OR:**
```
🏢 UNIQUE BRANCHES in database:
   • Mumbai
   • Jaipur
   • Kolkata
```

## KEY QUESTION: Do branch names have " HO" at the end?

---

### Step 3: Apply the Fix

#### If branches have " HO" (first pattern):

Go to: **https://app.supabase.com/projects/qtctkhkykkwntecxgezs/sql/new**

**Paste & Run**:
```sql
UPDATE customers
SET branch = TRIM(REPLACE(branch, ' HO', ''));

UPDATE customers
SET sales_person_name = TRIM(sales_person_name);

SELECT COUNT(*) FROM customers;
```

**Then refresh browser** and test! ✅

#### If branches don't have " HO" (second pattern):

Keep database as is. But check console output for:

```
👤 UNIQUE SALES PERSONS in database:
```

**Tell me the exact names shown here** (copy & paste).

Then compare with the Sales Person dropdown in your form - they must match exactly!

---

## Test After Fix

1. Select: **Branch = "Mumbai"**
2. Select: **Sales Person = "Vishal Ambhore"** (or any name)
3. Click: **Customer Name field**
4. Type: Any character
5. **Should see dropdown with customers** ✅

---

## Most Common Issues

### Issue 1: Database has "Mumbai HO", app shows "Mumbai"
**FIX**: Run the SQL above (removes " HO")

### Issue 2: Sales person name has extra spaces "Durgesh  "
**FIX**: SQL above trims them

### Issue 3: Name mismatch (spelling different)
**FIX**: Copy exact names from console output, use in form

---

## What NOT to Do

❌ Don't manually edit database rows
❌ Don't upload CSV again (might add duplicates)
❌ Don't restart app unnecessarily

## What TO Do

✅ Run diagnostic first
✅ Show me the output
✅ Run SQL to clean names
✅ Test again
✅ Tell me if it works!

---

## 30 Second Test

After running SQL fix:

```javascript
// Hard refresh to reload code
location.reload();

// Wait 2 seconds then run:
diagnoseSupabase()

// Check if branch names look right
```

---

**READY? Start with Step 1 right now!** 🚀

