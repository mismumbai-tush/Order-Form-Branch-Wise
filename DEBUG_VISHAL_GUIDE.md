# 🔧 Troubleshoot Vishal Ambhore Customers - Step by Step

## Test Steps

1. **Open App:** http://localhost:3000
2. **Login**
3. **Select Branch:** Mumbai
4. **Select Sales Person:** Vishal Ambhore
5. **Try typing** in "Customer Name" field
6. **If customers don't appear**, follow the debug steps below

## Debug Steps (F12 Console)

### Step 1: Check Database Structure

```javascript
debugVishalAmbhore()
```

**This will show:**
- Total customers in Mumbai HO
- Unique sales person IDs and Names
- Data with JOIN to app_users
- Grouped customers by sales person
- Search results for "Vishal"

**Look for:**
- How many total customers in Mumbai HO?
- Is Vishal Ambhore in the list?
- How many of his customers exist?

### Step 2: Check Fetch Logs

When you select Vishal Ambhore, the browser console will show:

```
🔍 FETCHING CUSTOMERS:
   Branch ID: mumbai
   Sales Person Name: Vishal Ambhore
✅ Customers table is accessible
📊 Sample data from database:
   Columns: [id, name, email, contact_no, ...]
   First record - checking different column names:
     customer_name: undefined
     name: "John Doe"
     email_id: undefined
     email: "john@example.com"
   ✅ After enriching with app_users join:
   Unique sales persons after enrichment: 6
     • Amit Korgaonkar: 25 customers
     • Vishal Ambhore: 50 customers
     ...
```

**Key things to check:**
1. What column names actually exist (name, email, contact_no)?
2. Are sales persons being enriched correctly from app_users?
3. How many customers total after enrichment?

### Step 3: Run Fetch Command

```javascript
debugCustomersFor('mumbai', 'Vishal Ambhore')
```

**Expected result:**
```
Found: 50 customers
1. Customer Name A
2. Customer Name B
...
```

**If 0 customers:**
- Something is wrong with the filter

## What Each Log Means

| Log | Meaning |
|-----|---------|
| `📊 Columns: [...]` | Actual database columns - check if name/email/contact_no exist |
| `Unique sales persons after enrichment` | Names retrieved from app_users table |
| `After branch filter` | How many matched the Mumbai HO branch |
| `After sales person filter` | How many matched Vishal Ambhore |

## Most Common Issues

### 1. Column Names Don't Match
**If logs show:**
```
customer_name: undefined
name: "John Doe"
```

**Fix:** Already handled - code now tries both names

### 2. Sales Person Name is NULL/Empty
**If logs show:**
```
Unique sales persons after enrichment: 3
     • Amit Korgaonkar
     •
     • Vishal Ambhore
```

**(empty line means null sales_person_name)**

**Fix:** The code now enriches from app_users, should work automatically

### 3. Branch Mismatch
**If logs show:**
```
Unique branches: [mumbai, Mumbai, Mumbai HO]
```

**(but filter is looking for Mumbai HO)**

**Fix:** Code tries multiple branch variations

## Report What You See

After running the debug steps, please tell me:

1. How many total customers in Mumbai HO?
2. Does "Vishal Ambhore" appear in the sales persons list?
3. How many customers does Vishal have?
4. What columns actually exist? (from the first record log)
5. Does `debugCustomersFor('mumbai', 'Vishal Ambhore')` return 0 or a number?

---

**Status:** Dev server running with enhanced logging  
**App URL:** http://localhost:3000  
**Ready to test:** Yes

