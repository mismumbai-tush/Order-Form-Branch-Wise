# ⚡ Quick Start: Fresh Upload Process

## 3 Simple Steps

### STEP 1: Clean Database (5 min)

1. Go to: **Supabase Dashboard → SQL Editor**
2. Click: **New Query**
3. Paste:
```sql
DELETE FROM customers;
SELECT COUNT(*) FROM customers;
```
4. Click: **Run**
5. Verify: Shows `0`

---

### STEP 2: Prepare CSV File (10 min)

**Headers needed:**
```
branch,sales_person_name,customer_name,billing_address,mob_no,email_id
```

**Example row:**
```
Mumbai HO,Vishal Ambhore,John Doe,123 Street,9876543210,john@example.com
```

**Important:**
- Branch must be: `Mumbai HO`, `Ulhasnagar HO`, etc. (with HO suffix)
- Sales person name must match exactly
- All fields required

---

### STEP 3: Upload via App (5 min)

1. Start dev server:
   ```
   npm run dev
   ```

2. Open: **http://localhost:3000**

3. Login

4. Find: **Data Management** section

5. Select: **CUSTOMERS** tab

6. Choose your CSV file

7. Click: **Upload**

---

## Verify It Works

**In browser console (F12):**
```javascript
debugVishalAmbhore()
```

**Should show:**
- Total customers
- All sales persons
- Vishal Ambhore customer count

---

## Do You Have Your CSV File Ready?

If you have your data, I can help verify it's in the correct format before uploading!

**Can you:**
1. Share the CSV file path?
2. Or tell me: How many customers per sales person?
3. Or send sample rows of your data?

This will ensure clean upload! 📋

