# 🔍 Debug Customer Data Display - Step by Step

## Problem Diagnosed
Your customers are in Supabase but not showing in the form when you select sales person. Let's fix this step by step.

---

## STEP 1: Check Your Actual Supabase Data Structure

Go to: **https://app.supabase.com/projects/qtctkhkykkwntecxgezs/editor/28897**

### Run this SQL query to see your actual data:

```sql
SELECT 
  id,
  name,
  branch,
  sales_person_name,
  sales_person_id,
  COUNT(*) as count
FROM customers
GROUP BY id, name, branch, sales_person_name, sales_person_id
LIMIT 20;
```

**This will show:**
- ✅ What column names exist in your table
- ✅ What branch names you have
- ✅ What sales person names you have
- ✅ How many customers per sales person

---

## STEP 2: Check Exact Branch Names Format

```sql
SELECT DISTINCT branch, COUNT(*) as count
FROM customers
GROUP BY branch
ORDER BY count DESC;
```

**Copy the exact branch names shown here**

Examples:
- "Mumbai HO" or "Mumbai"?
- "Jaipur HO" or "Jaipur"?
- "Kolkata HO" or "Kolkata"?

---

## STEP 3: Check Exact Sales Person Names

```sql
SELECT DISTINCT sales_person_name, COUNT(*) as count
FROM customers
GROUP BY sales_person_name
ORDER BY count DESC;
```

**Copy the exact sales person names shown here**

Examples:
- "Vishal Ambhore" or "vishal ambhore"?
- "Jaipur HO" or "Durgesh"?
- Spelling exactly as they appear?

---

## STEP 4: Test the Fetch Function

1. **Open your app**: http://localhost:3000
2. **Press F12** to open browser console
3. **Paste this command** (update with YOUR actual data from STEP 2 & 3):

```javascript
// Test with YOUR exact branch and sales person names from Supabase
const result = await fetchCustomersByBranchAndSalesPerson('mumbai', 'Vishal Ambhore');
console.log('Result:', result);
```

**Expected output:**
```
✅ Fetched 4482 total customers from database
✅ After branch filter: 50 customers
✅ After sales person filter: 25 customers
```

If you see `0` customers, something doesn't match.

---

## STEP 5: Common Issues & Fixes

### Issue 1: Branch names don't match
**In Supabase, you have:** "Jaipur" (without HO)
**In app, looking for:** "Jaipur HO"

**FIX:** Update your CSV or update the branch mapping in code

### Issue 2: Sales person names have typos
**In Supabase:** "Vishal Ambhore" (with space)
**In app, you selected:** "VishalAmbhore" (no space)

**FIX:** Check spelling in both places match EXACTLY

### Issue 3: Spaces or extra characters
**In Supabase:** "Durgesh  " (has extra spaces)
**In app:** "Durgesh" (no spaces)

**FIX:** Trim data during upload or update database

### Issue 4: NULL sales_person_name
If sales_person_name is NULL in Supabase

**FIX:** Update with this SQL:
```sql
UPDATE customers
SET sales_person_name = 'Your Sales Person Name'
WHERE branch = 'Jaipur' AND sales_person_name IS NULL;
```

---

## STEP 6: Enable Real-Time Debug Mode

Replace line in **supabaseService.ts** to add MORE logging:

In `fetchCustomersByBranchAndSalesPerson` function, add this at the start:

```typescript
console.log('🚀 STARTING FETCH:');
console.log('   Input - Branch ID:', branchId);
console.log('   Input - Sales Person:', salesPersonName);
```

Then:
1. Save file
2. Browser auto-refreshes
3. Open F12 console
4. Select branch + sales person in form
5. **Take screenshot of console output**
6. Share with me

---

## STEP 7: Check What's Currently in constants.ts

Your branch IDs need to match your Supabase data.

**In constants.ts, you should have:**

```typescript
{ id: 'mumbai', name: 'Mumbai' },
{ id: 'jaipur', name: 'Jaipur' },
{ id: 'kolkata', name: 'Kolkata' },
// etc
```

**And in BRANCH_ID_MAPPING:**

```typescript
'ho_mum': 'mumbai',
'ho_jpr': 'jaipur',
'ho_kol': 'kolkata',
// etc
```

---

## STEP 8: What to Try Now

### Option A: Quick Test
1. Go to Supabase
2. Run this query to see exact data:
   ```sql
   SELECT branch, sales_person_name, COUNT(*) 
   FROM customers 
   GROUP BY branch, sales_person_name
   LIMIT 100;
   ```
3. **Tell me the exact output**

### Option B: Check Form Defaults
1. Open app at http://localhost:3000
2. What branch appears by default?
3. What sales person appears by default?
4. When you type customer name, does dropdown appear?

### Option C: Share Browser Console Output
1. F12 → Console tab
2. Select branch & sales person
3. Screenshot the log output
4. Share with me

---

## My Questions for You

1. **When you uploaded CSV, what branch names did you use?**
   - "Mumbai HO" or "Mumbai"?
   - "Jaipur HO" or "Jaipur"?

2. **In form dropdown, what branch names appear?**
   - Can you screenshot the dropdown list?

3. **In form dropdown, what sales person names appear?**
   - Can you screenshot the sales person dropdown?

4. **When you select a sales person, does the customer field become active?**
   - Or does nothing happen?

---

## Next Action

1. **Run SQL query from STEP 1** to see your actual data
2. **Tell me the branch names exactly as they appear**
3. **Tell me the sales person names exactly as they appear**
4. I'll update the code to match your exact data

---

**Ready?** Start with STEP 1 - run the SQL query and share what you see! 📊

