# 🔧 GOOGLE SHEET DATA NOT SAVING - DIAGNOSTIC & FIX

## 🚨 PROBLEM
Data is NOT being saved to Google Sheet after form submission on Vercel.

---

## ✅ DIAGNOSTIC CHECKLIST

### Check 1: Is Google Apps Script URL Configured?

**Current URL in constants.ts:**
```
https://script.google.com/macros/s/AKfycbwMfDlawVVHEJfykwLcruYUNhpAgBMSU7rl06kupKRXkMWUFvkJrv4E-FRw2_FB631t0A/exec
```

**Action:**
```
1. Open your Google Sheet
2. Check if this URL is correct
3. Verify the script still exists (Extensions → Apps Script)
4. Make sure it's the SAME script that was working before
```

---

### Check 2: Is Google Apps Script Set to "Anyone"?

**Critical Fix:**
```
1. Open your Google Sheet
2. Extensions → Apps Script
3. Click "Deploy" button
4. Click "Manage deployments"
5. Find the Web App deployment
6. Click Edit (pencil icon)
7. Look for "Who has access"
8. If it says "Me only" → CHANGE TO "Anyone"
9. Click "Update"
```

**⚠️ If this is set to "Me only", data CANNOT be saved!**

---

### Check 3: Test the URL Directly

**Option A: Quick Browser Test**

Open browser console (F12) and paste:

```javascript
const testPayload = {
  submissionId: Date.now(),
  submissionDate: new Date().toISOString(),
  branch: "Mumbai",
  customerName: "Test Customer",
  customerEmail: "test@example.com",
  items: [{itemName: "Test Item", quantity: "5"}]
};

const gasUrl = "https://script.google.com/macros/s/AKfycbwMfDlawVVHEJfykwLcruYUNhpAgBMSU7rl06kupKRXkMWUFvkJrv4E-FRw2_FB631t0A/exec";

console.log("Testing URL:", gasUrl);
console.log("Sending:", testPayload);

fetch(gasUrl, {
  method: 'POST',
  body: JSON.stringify(testPayload),
  mode: 'no-cors'
})
.then(() => console.log("✅ Request sent! Check Google Sheet in 10 seconds."))
.catch(err => console.error("❌ Error:", err));
```

**Expected result:** ✅ appears in console

**If error:** Check the error message and fix accordingly

---

### Check 4: Verify Google Sheet Structure

**Your Google Sheet should have:**

```
Column 1:  Timestamp
Column 2:  Customer Name
Column 3:  Customer Email
Column 4:  Order Date
Column 5:  Category
Column 6:  Item Name
Column 7:  Color
Column 8:  Width
Column 9:  Quantity
Column 10: UOM
... (and more)
```

**If columns are missing or named differently:**
→ The Google Apps Script might be trying to write to a different sheet
→ Check the `doPost()` function in your Google Apps Script

---

### Check 5: Check Browser Console for Errors

**On your Vercel form:**
```
1. Open your Vercel deployed form
2. Press F12 (Developer Tools)
3. Click "Console" tab
4. Fill form & submit
5. Look for messages
```

**You should see:**
```
✅ 🚀 Submitting to Google Sheet...
✅ ✅ Successfully sent order with X item(s) to Google Sheet.
```

**If you see:**
```
❌ Google Sheet URL is not configured
→ Fix: Set URL in form Settings

❌ 401 Unauthorized
→ Fix: Change deployment to "Anyone"

❌ Cannot read property 'appendRow'
→ Fix: Check sheet name in doPost() function
```

---

## 🔧 THE 5 MOST COMMON FIXES

### Fix #1: Make Google Apps Script Public (MOST COMMON)
```
Time: 2 minutes
Success Rate: 60%

1. Google Sheet → Extensions → Apps Script
2. Deploy → Manage Deployments
3. Edit deployment
4. "Who has access" → Select "Anyone"
5. Click "Update"
6. Go back to form and submit test data
7. Check Google Sheet
```

---

### Fix #2: Verify Google Apps Script Function

**Check that your Google Apps Script has:**

```javascript
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet(); // Gets the FIRST sheet
    
    const data = JSON.parse(e.postData.contents);
    
    // Add header if first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Customer Name', 'Customer Email', 'Order Date',
        'Category', 'Item Name', 'Color', 'Width', 'Qty', 'UOM',
        'Rate', 'Discount', 'Delivery Date', 'Remark', 'Contact No',
        'Billing Address', 'Delivery Address', 'Sales Person', 'Sales Contact'
      ]);
    }
    
    // Add row for each item
    if (data.items && Array.isArray(data.items)) {
      data.items.forEach(item => {
        sheet.appendRow([
          new Date(),
          data.customerName || '',
          data.customerEmail || '',
          data.orderDate || '',
          item.category || '',
          item.itemName || '',
          item.color || '',
          item.width || '',
          item.quantity || '',
          item.uom || '',
          item.rate || 0,
          item.discount || 0,
          item.deliveryDate || '',
          item.remark || '',
          data.customerContactNo || '',
          data.billingAddress || '',
          data.deliveryAddress || '',
          data.salesPerson || '',
          data.salesContactNo || ''
        ]);
      });
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({success: true})
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({success: false, error: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

**If missing:** Add it now and redeploy

---

### Fix #3: Update Google Apps Script Deployment

**If you recently updated the code:**
```
1. Google Sheet → Extensions → Apps Script
2. Edit the code if needed
3. Click "Deploy" → "New Deployment"
4. Type: Web app
5. Execute as: Your account
6. Who has access: Anyone
7. Click "Deploy"
8. Copy the NEW URL
9. Go to form Settings
10. Paste NEW URL
11. Save Settings
12. Test form submission
```

---

### Fix #4: Ensure URL Ends with /exec

**WRONG:** `https://script.google.com/macros/s/[ID]/dev`
**RIGHT:** `https://script.google.com/macros/s/[ID]/exec`

**Fix:**
```
1. Form Settings
2. Check Google Script URL
3. Must end with /exec
4. If not → Correct it
5. Save
6. Test again
```

---

### Fix #5: Check Google Sheet Name

**If your Google Sheet is NOT named "Sheet1":**

You need to update the doPost() function:

```javascript
// CHANGE THIS:
const sheet = ss.getSheetByName("Orders"); // Wrong name

// TO THIS:
const sheet = ss.getActiveSheet(); // Gets current sheet (flexible)
```

OR specify your sheet name:

```javascript
const sheet = ss.getSheetByName("Your Exact Sheet Name");
```

**Then:**
1. Save the script
2. Deploy (New Deployment)
3. Use new URL in form Settings
4. Test again

---

## 🎯 STEP-BY-STEP FIX GUIDE

### For Vercel Deployment (Your Case)

**Step 1: Check Browser Console** (2 minutes)
```
1. Open Vercel form URL
2. Press F12
3. Go to Console tab
4. Submit test data
5. Read the error message (if any)
```

**Step 2: Check Google Apps Script** (3 minutes)
```
1. Google Sheet → Extensions → Apps Script
2. Look for doPost() function
3. Make sure it has:
   - JSON.parse(e.postData.contents)
   - sheet.appendRow() calls
   - Return ContentService
```

**Step 3: Verify Public Access** (2 minutes)
```
1. Deploy → Manage Deployments
2. Edit deployment
3. "Who has access" → "Anyone"
4. Update
```

**Step 4: Verify URL** (2 minutes)
```
1. Copy the deployment URL
2. Form → Settings
3. Paste URL
4. Must end with /exec
5. Save Settings
6. Refresh form page
```

**Step 5: Test** (1 minute)
```
1. Fill form with test data
2. Click Submit
3. Check Google Sheet (5-10 seconds)
4. Verify new row appears with email in column 3
```

---

## 📋 VERIFICATION CHECKLIST

- [ ] Google Apps Script exists
- [ ] Google Apps Script has doPost() function
- [ ] Deployment is set to "Anyone"
- [ ] URL in form Settings is correct
- [ ] URL ends with /exec
- [ ] Form Settings saved and page refreshed
- [ ] No errors in browser console (F12)
- [ ] New data appears in Google Sheet (5-10 sec after submit)
- [ ] Email shows in column 3

---

## 🚨 IF STILL NOT WORKING

**Check these in order:**

1. **Browser Console Error?**
   → Share the exact error message
   → Check: CHECK_BROWSER_CONSOLE_GUIDE.md

2. **No Error but No Data?**
   → URL might be wrong
   → Script might not have doPost()
   → Sheet name might be incorrect

3. **401 Error?**
   → Deployment not set to "Anyone"
   → Change it and try again

4. **Still Stuck?**
   → Try the test code above in browser console
   → If test fails → Issue is with Google Apps Script
   → If test works → Issue is with form Settings

---

## 💡 PRO TIP

If you had it working before with "branch wise name sheets":

**Your old doPost() might have used:**
```javascript
const sheet = ss.getSheetByName(data.branch); // Gets sheet by branch name
```

**But now you might have:**
```javascript
const sheet = ss.getActiveSheet(); // Gets current sheet
```

**Solution:**
```javascript
// If you want branch-wise sheets, use:
const sheet = ss.getSheetByName(data.branch);

// If you want single sheet, use:
const sheet = ss.getActiveSheet();
```

**Make sure your branch names match exactly with sheet names!**

---

## 📞 QUICK REFERENCE

| Issue | Fix | Time |
|-------|-----|------|
| 401 error | Set deployment to "Anyone" | 2 min |
| URL wrong | Ends with /exec | 1 min |
| No data | Check doPost() function | 3 min |
| Silent fail | Check form Settings URL | 2 min |
| Branch sheets | Update sheet name in code | 3 min |

---

**Status:** Follow fixes above in order until data saves!
