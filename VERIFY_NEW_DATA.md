# ✅ Verify New Data is Loading - Jaipur & Kolkata

## What Was Updated ✅

1. **constants.ts** - Added new branches:
   - ✅ Jaipur (id: 'jaipur')
   - ✅ Kolkata (id: 'kolkata')

2. **Branch ID Mapping** - Added for lookups:
   - ✅ 'ho_jpr': 'jaipur'
   - ✅ 'ho_kol': 'kolkata'

3. **Sales Persons** - Already configured:
   - **Jaipur**: Jaipur HO, Durgesh
   - **Kolkata**: Kolkata HO, Rajesh

4. **Dev Server** - Started at http://localhost:3000

---

## Test Steps (Do This Now!)

### Test 1: Check Branch Dropdown
1. Go to http://localhost:3000
2. Look for **Branch** dropdown
3. **Should see:**
   - ✅ Jaipur (NEW)
   - ✅ Kolkata (NEW)
   - ✅ All other branches (Mumbai, Delhi, etc.)

### Test 2: Load Jaipur Customers
1. **Branch**: Select **Jaipur**
2. **Sales Person**: Select **Jaipur HO** or **Durgesh**
3. **Customer Name**: Click the field
4. **Expected**: Dropdown shows customers uploaded for Jaipur

### Test 3: Load Kolkata Customers
1. **Branch**: Select **Kolkata**
2. **Sales Person**: Select **Kolkata HO** or **Rajesh**
3. **Customer Name**: Click the field
4. **Expected**: Dropdown shows customers uploaded for Kolkata

### Test 4: Check Other Branches Still Work
1. Try **Mumbai** + **Vishal Ambhore** → Should see customers
2. Try **Delhi** + **Anish** → Should see customers
3. Verify all branches work correctly

---

## Debug Commands (Browser Console - F12)

### Check all branches loaded:
```javascript
// Should show Jaipur and Kolkata
console.log('Branches loaded');
```

### Test Jaipur data fetch:
```javascript
// Replace with actual function call from your app
debugJaipur()  // If you create this function
```

### Test Kolkata data fetch:
```javascript
debugKolkata()  // If you create this function
```

---

## If Data Not Showing

### Step 1: Verify Supabase Data
```sql
-- Check Jaipur customers count
SELECT COUNT(*) as total, branch, COUNT(DISTINCT sales_person_name) as sales_persons
FROM customers
WHERE branch = 'Jaipur'
GROUP BY branch;

-- Check Kolkata customers count
SELECT COUNT(*) as total, branch, COUNT(DISTINCT sales_person_name) as sales_persons
FROM customers
WHERE branch = 'Kolkata'
GROUP BY branch;
```

### Step 2: Check Branch Names Match
Your CSV must have uploaded with:
- `branch` = "Jaipur" or "Jaipur HO" (exactly as in CSV)
- `branch` = "Kolkata" or "Kolkata HO" (exactly as in CSV)

### Step 3: Verify Sales Person Names
Sales persons in database must match constants.ts:
- Jaipur: "Jaipur HO" or "Durgesh"
- Kolkata: "Kolkata HO" or "Rajesh"

---

## What Changed in constants.ts

### BRANCHES array (now has 10 branches):
```typescript
export const BRANCHES: Branch[] = [
  { id: 'bangalore', name: 'Banglore' },
  { id: 'tirupur', name: 'Tirupur' },
  { id: 'delhi', name: 'Delhi' },
  { id: 'ahmedabad', name: 'Ahmedabad' },
  { id: 'ludhiana', name: 'Ludhiana' },
  { id: 'surat', name: 'Surat' },
  { id: 'ulhasnagar', name: 'Ulhasnagar' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'jaipur', name: 'Jaipur' },        // ✅ NEW
  { id: 'kolkata', name: 'Kolkata' },      // ✅ NEW
];
```

### BRANCH_ID_MAPPING (updated):
```typescript
'ho_jpr': 'jaipur',    // ✅ NEW
'ho_kol': 'kolkata'    // ✅ NEW
```

### SALES_PERSONS (already had Jaipur & Kolkata):
```typescript
// Jaipur
{ id: 'sp_jaipur_1', name: 'Jaipur HO', branchId: 'jaipur' },
{ id: 'sp_jaipur_2', name: 'Durgesh', branchId: 'jaipur' },

// Kolkata
{ id: 'sp_kolkata_1', name: 'Kolkata HO', branchId: 'kolkata' },
{ id: 'sp_kolkata_2', name: 'Rajesh', branchId: 'kolkata' }
```

---

## Expected Outcome

**After these changes, you should see:**

| Branch | Sales Persons | Customer Lookup | Status |
|--------|---------------|-----------------|--------|
| Jaipur | Jaipur HO, Durgesh | Works with new data | ✅ |
| Kolkata | Kolkata HO, Rajesh | Works with new data | ✅ |
| All Others | Existing names | Still works | ✅ |

---

## Next Steps

1. ✅ **Test** - Verify Jaipur & Kolkata appear in dropdowns
2. ✅ **Load customers** - Try selecting sales persons and typing customer names
3. ✅ **Create orders** - If customers load, you can create orders
4. ✅ **Commit** - Push changes to GitHub

---

## Quick Links

- **App**: http://localhost:3000
- **Supabase**: https://app.supabase.com/projects/qtctkhkykkwntecxgezs/sql/new
- **GitHub**: [Your repo]

---

**Questions?** If data still isn't showing:
1. Check Supabase has correct branch names
2. Verify sales person names match exactly
3. Run SQL queries to verify customer count
4. Check browser console for errors (F12)

