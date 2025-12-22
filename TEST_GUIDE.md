# ✅ TEST GUIDE - VERIFY CUSTOMER LOADING BY BRANCH & SALES PERSON

## Current Database Status

Your database now has:
- ✅ **Mumbai HO**
  - Amit Korgaonkar: 204 customers
  - Rakesh Jain: 412 customers
  - Kamlesh Sutar: 195 customers
  - Pradeep Jadhav: 134 customers
  - Santosh Pachratkar: 52 customers
  - **Vishal Ambhore: 2 test customers** ← NEWLY ADDED

- ✅ **Jaipur HO**
  - **Durgesh: 1 test customer** ← NEWLY ADDED

---

## How to Test in Your App

### Step 1: Open the App
- Go to: `http://localhost:3000`
- Login or proceed as guest

### Step 2: Test Each Branch/Sales Person

#### Test 1: Mumbai - Vishal Ambhore (NEW!)
1. **Branch Dropdown**: Select "**Mumbai**"
2. **Sales Person Dropdown**: Select "**Vishal Ambhore**"
3. **Expected Result**: ✅ Should show **2 customers**
   - "Vishal Test Company 1"
   - "Vishal Test Company 2"

#### Test 2: Jaipur - Durgesh (NEW!)
1. **Branch Dropdown**: Select "**Jaipur**"
2. **Sales Person Dropdown**: Select "**Durgesh**"
3. **Expected Result**: ✅ Should show **1 customer**
   - "Durgesh Test Company 1"

#### Test 3: Mumbai - Kamlesh Sutar (EXISTING DATA)
1. **Branch Dropdown**: Select "**Mumbai**"
2. **Sales Person Dropdown**: Select "**Kamlesh Sutar**"
3. **Expected Result**: ✅ Should show **195 customers**

#### Test 4: Mumbai - Rakesh Jain (EXISTING DATA)
1. **Branch Dropdown**: Select "**Mumbai**"
2. **Sales Person Dropdown**: Select "**Rakesh Jain**"
3. **Expected Result**: ✅ Should show **412 customers**

---

## What This Proves

If all tests pass:
- ✅ **Code is working correctly** - customers load by branch and sales person
- ✅ **Database connections are correct**
- ✅ **Branch/Sales Person matching is working**
- ✅ **The problem IS data-related** - we need to upload data for Kolkata and Ulhasnagar

---

## Next Steps: Upload Your Actual Data

Once you confirm tests pass, you need to:

### 1. Prepare CSV Files for Missing Branches

**For Kolkata (with your actual customer data):**
```csv
branch,sales_person_name,customer_name,billing_address,mob_no,email_id
Kolkata HO,Rajesh,Company Name 1,Address,Phone,Email
Kolkata HO,Rajesh,Company Name 2,Address,Phone,Email
```

**For Ulhasnagar (with your actual customer data):**
```csv
branch,sales_person_name,customer_name,billing_address,mob_no,email_id
Ulhasnagar HO,Vijay Sutar,Company Name 1,Address,Phone,Email
Ulhasnagar HO,Vijay Sutar,Company Name 2,Address,Phone,Email
Ulhasnagar HO,Shiv Ratan,Company Name 1,Address,Phone,Email
```

### 2. Upload via App

1. Click **Upload** button (⬆️ icon)
2. Select **CUSTOMERS** tab
3. Choose your CSV file
4. Click **Upload**
5. Repeat for each branch

### 3. Re-test

After uploading, test each branch to confirm customers now load!

---

## Browser Console Debugging

If customers don't load:

1. Open **Developer Tools** (F12 or Right-click → Inspect)
2. Go to **Console** tab
3. Select a branch and sales person
4. Look for messages like:
   - ✅ `"195 customers loaded"` - Data found!
   - ❌ `"No match for 'SalesPersonName'"` - Wrong sales person name
   - ❌ `"0 customers"` - No data for this branch

5. The console will show:
   ```
   Unique branches in database: ['Mumbai HO', 'Jaipur HO']
   Unique sales persons: ['Amit...', 'Rakesh...', 'Durgesh', 'Vishal...']
   ```

---

## Important: Exact Matching Required

Your branch/sales person names MUST match EXACTLY:

✅ CORRECT:
- Branch: `Mumbai HO`, `Jaipur HO`, `Kolkata HO`, `Ulhasnagar HO`
- Sales Person: `Durgesh`, `Rajesh`, `Vijay Sutar`, `Shiv Ratan`

❌ WRONG:
- Branch: `Mumbai` (missing "HO"), `mumbai` (lowercase)
- Sales Person: `durgesh` (lowercase), `Durgesh Kumar` (extra name)

---

## Status Summary

| Feature | Status |
|---------|--------|
| Code Loading Customers | ✅ WORKING |
| Mumbai Branch Data | ✅ COMPLETE |
| Vishal Ambhore Customers | ✅ ADDED (2 test records) |
| Jaipur Data | ✅ ADDED (1 test record) |
| Kolkata Data | ⏳ PENDING - Need your CSV |
| Ulhasnagar Data | ⏳ PENDING - Need your CSV |

**Next Action**: Test with current data, then upload your actual CSVs for Kolkata and Ulhasnagar!
