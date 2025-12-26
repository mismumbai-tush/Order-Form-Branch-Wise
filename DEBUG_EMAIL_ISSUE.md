// Debug script to check if email is being sent to Google Sheet
// Run this in browser console while submitting an order

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 EMAIL DEBUGGING GUIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: Check Browser Console When Submitting Order
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Look for messages like:
  📊 Submitting to Google Sheet...
  Branch: Mumbai
  Customer: Aadee Enterprise
  Items: 2

STEP 2: Look for Payload Being Sent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The payload should include:
  "customerEmail": "example@email.com"

STEP 3: Three Possible Problems
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ PROBLEM 1: Email field is EMPTY in form
   → Solution: Make sure you fill the "Customer Email" field before submitting
   
❌ PROBLEM 2: Google Sheet doesn't have Email column header
   → The old sheet was created WITHOUT email column
   → Solution: 
     a) Delete branch tabs in Google Sheet
     b) Submit new order - system will create fresh tabs WITH email column
     
❌ PROBLEM 3: Headers exist but in wrong position
   → Solution: Manually add "Customer Email" column between "Customer Name" and "Order Date"

STEP 4: How to Check Google Sheet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open: https://docs.google.com/spreadsheets/d/1xVSJlNilOKu2zi-R1Jeuv__buGkzbECSWef0MSLr4oM/

Check header row (Row 1):
  A: Timestamp
  B: Customer Name
  C: Email Id  ← Should be HERE
  D: Order Date
  E: Unit
  ...

If Column C is NOT "Email Id", it means old headers are still there.

STEP 5: Fix - Delete Old Tabs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Open Google Sheet
2. Right-click on "Mumbai" tab → Delete sheet
3. Right-click on "Ulhasnagar" tab → Delete sheet
4. Right-click on "Jaipur" tab → Delete sheet
5. Right-click on "Kolkata" tab → Delete sheet
6. Go back to app and submit a NEW order
7. Check Google Sheet - Fresh tabs will have email column!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
