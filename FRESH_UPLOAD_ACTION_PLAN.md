# 🎯 FRESH DATA UPLOAD - Complete Action Plan

## Current Status ✅
- Dev server: **Running** (http://localhost:3000)
- Database: **Ready to reset**
- App: **Ready for upload**

---

## YOUR ACTION ITEMS

### ACTION 1: Delete Old Data (SQL)
**Time: 5 minutes**

1. Go to: https://app.supabase.com/projects/qtctkhkykkwntecxgezs/sql/new
2. Paste this SQL:
   ```sql
   DELETE FROM customers;
   SELECT COUNT(*) as customers_remaining FROM customers;
   ```
3. Click: **Run**
4. Verify: Shows `0`

**Screenshot example:**
```
customers_remaining
       0
```

---

### ACTION 2: Prepare Your CSV File
**Time: 10-15 minutes**

**Required format:**
```
branch,sales_person_name,customer_name,billing_address,mob_no,email_id
Mumbai HO,Vishal Ambhore,Customer Name,Address,PhoneNo,Email
```

**Things to check:**
- ✅ Headers: exactly as shown above
- ✅ Branch names: Use "HO" suffix (Mumbai HO, not Mumbai)
- ✅ Sales person names: Spelled correctly
- ✅ Phone numbers: Valid format
- ✅ Emails: Valid email format (or can be empty)
- ✅ No blank rows at end of file

**Sales persons you should have (per branch):**

| Mumbai HO | Ulhasnagar HO | Delhi HO | Others... |
|-----------|---------------|----------|-----------|
| Vishal Ambhore | Vijay Sutar | Anish | ... |
| Amit Korgaonkar | Shiv Ratan | Lalit | ... |
| Kamlesh Sutar | Ulhasnagar HO | Mukesh | ... |
| Pradeep Jadhav | | Rahul | ... |
| Rakesh Jain | | Suresh | ... |
| Santosh Pachratkar | | Delhi HO | ... |

---

### ACTION 3: Upload via App
**Time: 3 minutes**

1. **App:** http://localhost:3000
2. **Login** (if needed)
3. **Find:** Data Management / Upload section
4. **Tab:** CUSTOMERS
5. **Choose:** Your CSV file
6. **Upload**

**Expected result:**
```
✅ Success! 4482 customers imported.
Also created X new Sales Person accounts.
```

---

### ACTION 4: Verify Data Works
**Time: 2 minutes**

**Test 1 - In App:**
- Select: **Mumbai** branch
- Select: **Vishal Ambhore** sales person
- Type: Start typing customer name
- **Result:** Customers should appear in dropdown ✅

**Test 2 - In Browser Console (F12):**
```javascript
debugVishalAmbhore()
```

**Should show:**
```
Total customers in Mumbai HO: 50
Unique Sales Persons: 6
  • Vishal Ambhore: 50 customers
  • Amit Korgaonkar: 25 customers
  ...
```

---

## Important Notes

### Before Upload
- Have your CSV file ready
- Verify all column headers match exactly
- Check branch names have "HO" suffix
- Ensure sales person names are spelled correctly

### During Upload
- The upload will create new sales persons if needed
- All customers will be associated with sales persons
- Branch data will be preserved as-is

### After Upload
- Customers should appear when selecting sales person
- If not, run `debugVishalAmbhore()` to check
- Data should be grouped by branch and sales person

---

## Files to Reference

- **STEP_1_DELETE_ALL_CUSTOMERS.sql** - SQL deletion script
- **QUICK_UPLOAD.md** - Quick 3-step guide
- **COMPLETE_UPLOAD_GUIDE.md** - Detailed guide

---

## Ready?

1. ✅ Delete data in Supabase (5 min)
2. ✅ Prepare CSV (have it ready)
3. ✅ Upload via app (3 min)
4. ✅ Verify works (2 min)

**Total time: ~25 minutes**

---

## Questions?

If you need:
- Help formatting CSV → Show me sample data
- Help verifying format → Share CSV sample
- Help with upload → I can guide step by step
- Troubleshooting → Run debug commands and share output

**Ready to proceed?** 🚀

