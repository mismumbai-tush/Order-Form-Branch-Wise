# 📋 Complete Guide: Fresh Customer Data Upload

## Overview
1. Delete all existing customer data
2. Upload fresh CSV with all sales person wise customers
3. Verify data displays correctly in app

---

## STEP 1: Delete All Existing Data ✅

**Go to:** Supabase Dashboard → SQL Editor → New Query

**Paste this SQL:**
```sql
DELETE FROM customers;
SELECT COUNT(*) as remaining_customers FROM customers;
```

**Click Run**

**Expected Result:**
```
remaining_customers: 0
```

---

## STEP 2: Prepare Your CSV File

### CSV Format (Required Headers)

Your CSV file must have EXACTLY these headers (in any order):

```
branch, sales_person_name, customer_name, billing_address, mob_no, email_id
```

### Example Data

```csv
branch,sales_person_name,customer_name,billing_address,mob_no,email_id
Mumbai HO,Vishal Ambhore,Customer A,Address 1,9876543210,customer_a@example.com
Mumbai HO,Vishal Ambhore,Customer B,Address 2,9876543211,customer_b@example.com
Mumbai HO,Amit Korgaonkar,Customer C,Address 3,9876543212,customer_c@example.com
Ulhasnagar HO,Vijay Sutar,Customer D,Address 4,9876543213,customer_d@example.com
Delhi HO,Anish,Customer E,Address 5,9876543214,customer_e@example.com
```

### Branch Names (Use Exactly These)

```
Mumbai HO
Ulhasnagar HO
Delhi HO
Banglore HO
Tirupur HO
Ahmedabad HO
Surat HO
Ludhiana HO
```

### Sales Person Names (Must Match Your Data)

**For each branch, use the exact sales person names you want:**

```
Mumbai HO:
- Amit Korgaonkar
- Kamlesh Sutar
- Pradeep Jadhav
- Rakesh Jain
- Santosh Pachratkar
- Vishal Ambhore

Ulhasnagar HO:
- Vijay Sutar
- Shiv Ratan
- Ulhasnagar HO

Delhi HO:
- Anish
- Lalit
- Mukesh
- Rahul
- Suresh
- Delhi HO

... (other branches)
```

---

## STEP 3: Upload CSV via App

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open app:** http://localhost:3000

3. **Login**

4. **Go to:** Data Management (look for upload section)

5. **Select:** CUSTOMERS tab

6. **Choose your CSV file**

7. **Click Upload**

**Expected Message:**
```
Success! 4482 customers imported.
```

---

## STEP 4: Verify Data

### Test 1: In App

1. Select Branch: **Mumbai**
2. Select Sales Person: **Vishal Ambhore**
3. Start typing in "Customer Name" field
4. **✅ Should see customers appear in dropdown**

### Test 2: In Browser Console

1. **Press F12** to open console
2. **Run:**
   ```javascript
   debugVishalAmbhore()
   ```

3. **Should see:**
   ```
   Total customers in Mumbai HO: 50
   Unique Sales Persons: 6
     • Amit Korgaonkar
     • Kamlesh Sutar
     • ...
     • Vishal Ambhore: 50 customers
   ```

### Test 3: Query Supabase Directly

**Go to:** Supabase → SQL Editor

**Run:**
```sql
SELECT branch, sales_person_name, COUNT(*) as customer_count
FROM customers
GROUP BY branch, sales_person_name
ORDER BY branch, sales_person_name;
```

**Should see all your branches and sales persons with customer counts**

---

## Complete Checklist

- [ ] **Delete:** Run SQL to delete all customers
- [ ] **Verify:** Check that count is 0
- [ ] **Prepare:** Create CSV with correct headers and data
- [ ] **Upload:** Upload via app
- [ ] **Check:** Customers appear when selecting sales person
- [ ] **Debug:** Run `debugVishalAmbhore()` to verify
- [ ] **Query:** Check Supabase SQL to see all data

---

## CSV File Requirements

✅ **Headers must include:**
- branch
- sales_person_name
- customer_name
- billing_address
- mob_no
- email_id

✅ **Branch names exactly:**
- Mumbai HO (not Mumbai or mumbai)
- Ulhasnagar HO (not Ulhasnagar)
- etc.

✅ **Sales person names:**
- Match your needs exactly
- Must be spelled correctly
- Case sensitive

---

## If Upload Fails

**Check:**
1. CSV headers exactly match (case sensitive)
2. Branch names use "HO" suffix
3. Sales persons match app requirements
4. File is valid CSV format
5. Check browser console for errors

**Run debug:**
```javascript
debugSalesPersons()
```

This shows exact names and data structure in database.

---

## Need Your CSV File

**Can you provide your CSV data?**

If you share the CSV file or data, I can:
1. Verify it's in correct format
2. Ensure all sales persons are configured
3. Check for any data issues before upload

Send me the file path or data sample, and I'll help prepare it!

