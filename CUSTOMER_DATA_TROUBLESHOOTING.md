# 🔍 Customer Data Troubleshooting Guide

## Quick Test (Do This Now!)

### Step 1: Open the App
- Go to http://localhost:3000
- Log in to the app
- Select **Mumbai** branch from the dropdown

### Step 2: Open Browser Console
- Press **F12** (or Cmd+Option+I on Mac)
- Go to **Console** tab
- Keep it open while you test

### Step 3: Check Customer Loading
When the page loads, you should see logs like:
```
📍 SALESMAN SELECTION CHANGED: "Vishal Ambhore"
📋 Selected Branch ID: mumbai
🔄 LOADING CUSTOMERS:
   Salesman Name: Vishal Ambhore
   Branch ID: mumbai
✅ RESULT: 50 customers loaded
```

**If you see "RESULT: 0 customers loaded" → Data is not being found in database**
**If you see "RESULT: 50 customers loaded" → Data IS found, but not displaying in form**

### Step 4: Test with Debug Functions

Run this command in the browser console:

```javascript
debugCustomersFor('mumbai', 'Vishal Ambhore')
```

This will output exactly how many customers are found and show the first few names.

If this returns 50 customers in the console but they don't show in the dropdown, the issue is in the form display.

### Step 5: Check Supabase Data Directly

Run this in the browser console:

```javascript
debugSalesPersons()
```

This will show ALL sales persons and their customer counts in the database. Look for:
- What branches exist in database (Mumbai HO? Mumbai?)
- What sales person names exist (Vishal Ambhore? Vishal? Something else?)
- How many customers each has

## Expected Results

**If everything is working:**
```
Found: 50 customers
1. Customer Name A (9876543210)
2. Customer Name B (9876543211)
...
```

**If database is empty or data not uploaded:**
```
Found: 0 customers
```

**If RLS is blocking access:**
```
❌ Cannot access customers table: permission denied
⚠️ Row Level Security (RLS) might be blocking access
```

## What to Report

After running the above steps, tell me:
1. What does the browser console log show?
2. How many customers does `debugCustomersFor('mumbai', 'Vishal Ambhore')` return?
3. What sales persons appear when you run `debugSalesPersons()`?
4. Are the customer names showing in the form autocomplete dropdown?

This will help pinpoint exactly where the issue is!
