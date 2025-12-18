# 🔍 DEBUG: Sales Person & Customer Data Not Loading

## Problem
- **Mumbai, Vishal Ambhore**: Customers not showing
- **Ulhasnagar, Sales Person**: Customers not showing

## Root Causes (FIXED)

### Issue 1: "Vishal Ambhore" Missing from constants
❌ **Before**: Only 6 Mumbai sales persons in constants.ts
✅ **After**: Added "Vishal Ambhore" as sp_mumbai_6

### Issue 2: Sales Person Matching Too Strict
❌ **Before**: Only exact match or simple substring
- "Vijay" would NOT match "Vijay Sutar" in database
- "Vishal" would NOT match "Vishal Ambhore" in database

✅ **After**: Enhanced matching with 5 strategies:
1. Exact match: `"vijay" === "vijay"`
2. Contains: `"vijay sutar".includes("vijay")`
3. Reverse contains: `"vijay".includes("vijay sutar")`
4. First name: `"vijay" (first part of "vijay sutar")`
5. Last name: `"sutar" (last part of "vijay sutar")`

## How to Debug

### Step 1: Check Database Structure
Open browser F12 Console and run:
```javascript
diagnoseSupabase()
```

**Look for:**
```
🏢 UNIQUE BRANCHES in database:
   • Mumbai HO
   • Ulhasnagar HO
   
👤 UNIQUE SALES PERSONS in database:
   • Vishal Ambhore
   • Vijay Sutar
   • Shiv Ratan
   
🔗 CUSTOMERS BY BRANCH & SALES PERSON:
   Mumbai HO | Vishal Ambhore: 50 customers
   Ulhasnagar HO | Vijay Sutar: 25 customers
```

### Step 2: Test Specific Branch + Sales Person
```javascript
// Test Mumbai → Vishal Ambhore
debugCustomersFor('mumbai', 'Vishal Ambhore')

// Test Ulhasnagar → Vijay
debugCustomersFor('ulhasnagar', 'Vijay')
```

**Expected Output:**
```
🔍 DEBUG: Customers for mumbai → Vishal Ambhore

Found: 50 customers
1. Customer Name 1 (9876543210)
2. Customer Name 2 (9876543211)
3. Customer Name 3 (9876543212)
...
```

## What Changed in Code

### `constants.ts`
```diff
  // Mumbai
  { id: 'sp_mumbai_5', name: 'Santosh Pachratkar', ... },
+ { id: 'sp_mumbai_6', name: 'Vishal Ambhore', ... },
- { id: 'sp_mumbai_6', name: 'Mumbai HO', ... },
+ { id: 'sp_mumbai_7', name: 'Mumbai HO', ... },
```

### `supabaseService.ts` - `fetchCustomersByBranchAndSalesPerson()`
```typescript
// NEW: Enhanced matching with first/last name support
if (salesPersonName) {
  const cleanSpName = salesPersonName.toLowerCase().trim();
  filteredData = filteredData.filter((c: any) => {
    const customerSpName = (c.sales_person_name || '').toLowerCase().trim();
    
    // Strategy 1: Exact match
    if (customerSpName === cleanSpName) return true;
    
    // Strategy 2: Contains (user input inside database value)
    if (customerSpName.includes(cleanSpName)) return true;
    
    // Strategy 3: Reverse contains (database inside user input)
    if (cleanSpName.includes(customerSpName)) return true;
    
    // Strategy 4: First name match
    const dbFirstName = customerSpName.split(' ')[0];
    if (dbFirstName === cleanSpName || cleanSpName.includes(dbFirstName)) return true;
    
    // Strategy 5: Last name match
    const dbLastName = customerSpName.split(' ').pop();
    if (dbLastName === cleanSpName || cleanSpName.includes(dbLastName)) return true;
    
    return false;
  });
}
```

## Testing Checklist

- [ ] Run `npm run dev` locally
- [ ] Login to app
- [ ] Select Branch: "Mumbai"
- [ ] Select Sales Person: "Vishal Ambhore"
- [ ] **Verify**: Customers appear in dropdown
- [ ] Select Branch: "Ulhasnagar"
- [ ] Select Sales Person: "Vijay" (or "Vijay Sutar")
- [ ] **Verify**: Customers appear in dropdown
- [ ] Open F12 Console
- [ ] Run: `diagnoseSupabase()`
- [ ] Verify database structure shows both sales persons
- [ ] Run: `debugCustomersFor('mumbai', 'Vishal Ambhore')`
- [ ] Verify customers listed
- [ ] Check deployed version on Vercel (should auto-deploy)

## If Still Not Working

1. **Check console output** - Look for warning messages
2. **Run diagnostic** - `diagnoseSupabase()` to see actual database data
3. **Check branch names** - Verify database has "Mumbai HO" or "Mumbai"
4. **Check sales person names** - Exact spelling in database
5. **Report these details**:
   - Branch name from database (exact spelling)
   - Sales person name from database (exact spelling)
   - Number of customers for that combination

## Files Changed
- ✅ `constants.ts` - Added Vishal Ambhore
- ✅ `services/supabaseService.ts` - Enhanced sales person matching + debugging helpers
- ✅ Committed and pushed to GitHub
- ✅ Vercel will auto-deploy from main branch
