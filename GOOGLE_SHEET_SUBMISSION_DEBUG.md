# 🔍 GOOGLE SHEET DATA NOT SHOWING - TROUBLESHOOTING GUIDE

## ✅ CHECKLIST TO FIX THE ISSUE

### Step 1: Check Browser Console for Errors
1. Open your form in browser
2. Press **F12** to open Developer Tools
3. Click **Console** tab
4. Submit a test order
5. Look for error messages starting with ❌ or ⚠️

---

### Step 2: Verify Google Apps Script Settings (CRITICAL)

Your Google Apps Script URL is:
```
https://script.google.com/macros/s/AKfycbwMfDlawVVHEJfykwLcruYUNhpAgBMSU7rl06kupKRXkMWUFvkJrv4E-FRw2_FB631t0A/exec
```

**Check this:**
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Look for the Google Apps Script code
4. Find the `doPost(e)` function
5. Make sure it has these key operations:
   - ✅ Reading the form data
   - ✅ Appending data to sheet
   - ✅ Handling the items array

---

### Step 3: Check Deployment Settings (IMPORTANT!)

The Google Apps Script **MUST** be deployed with these settings:

1. Click **Deploy** → **New Deployment**
2. Select **Type**: Web app
3. Set **Execute as**: Your account
4. Set **Who has access**: ⚠️ **ANYONE** (This is critical!)

❌ If it says "Me only" - Data won't be received!

---

### Step 4: Check Network Request

In Browser Console, after submitting:

**Look for message like:**
```
🚀 Submitting to Google Sheet...
   URL: https://script.google.com/macros/s/AKfycbwMfDlawVVHEJfykwLcruYUNhpAgBMSU7rl06kupKRXkMWUFvkJrv4E-FRw2_FB631t0A/...
   Mode: DIRECT (Legacy)
   Branch: Mumbai
   Customer: Test Customer
   Items: 2
   Sending request...
```

**If you see 401 error:**
```
Response status: 401 Unauthorized
🔐 GOOGLE APPS SCRIPT AUTHORIZATION ERROR (401):
   Fix: GAS deployment does NOT have public access.
   Action: Use a Proxy URL instead, or update GAS deployment to 'Who has access: Anyone'
```

**Solution: Update deployment to "Anyone"**

---

### Step 5: Use Settings Panel to Configure

1. Click **Settings** (gear icon)
2. Enter your **Google Script URL**:
   ```
   https://script.google.com/macros/s/AKfycbwMfDlawVVHEJfykwLcruYUNhpAgBMSU7rl06kupKRXkMWUFvkJrv4E-FRw2_FB631t0A/exec
   ```
3. Make sure it ends with `/exec` (not `/dev`)
4. Click **Save Settings**
5. Try submitting again

---

### Step 6: Check Google Apps Script Function

In your Google Apps Script Editor, make sure `doPost` function:

```javascript
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Orders"); // or your sheet name
  
  const data = JSON.parse(e.postData.contents);
  
  // Create header row if missing
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Customer Name', 'Customer Email', 'Order Date', 
      'Category', 'Item Name', 'Color', 'Width', 'Qty', 'UOM', 
      'Rate', 'Discount', 'Delivery Date', 'Remark', 'Customer No',
      'Billing Address', 'Delivery Address', 'Sales Person', 'Sales Contact'
    ]);
  }
  
  // Append data for each item
  if (data.items && data.items.length > 0) {
    data.items.forEach(item => {
      sheet.appendRow([
        new Date(),
        data.customerName,
        data.customerEmail,  // ← EMAIL COLUMN
        data.orderDate,
        item.category,
        item.itemName,
        item.color,
        item.width,
        item.quantity,
        item.uom,
        item.rate,
        item.discount,
        item.deliveryDate,
        item.remark,
        data.customerContactNo,
        data.billingAddress,
        data.deliveryAddress,
        data.salesPerson,
        data.salesContactNo
      ]);
    });
  }
  
  return ContentService.createTextOutput(
    JSON.stringify({success: true, message: "Order saved successfully"})
  ).setMimeType(ContentService.MimeType.JSON);
}
```

---

### Step 7: Quick Test Script

Run this test in browser console to verify the payload:

```javascript
// Test payload
const payload = {
  submissionId: Date.now(),
  submissionDate: new Date().toISOString(),
  customerName: "Test Customer",
  customerEmail: "test@example.com",
  items: [
    { itemName: "Test Item", quantity: "5" }
  ]
};

console.log("Sending to Google Sheet:", payload);

// Send test
fetch('https://script.google.com/macros/s/AKfycbwMfDlawVVHEJfykwLcruYUNhpAgBMSU7rl06kupKRXkMWUFvkJrv4E-FRw2_FB631t0A/exec', {
  method: 'POST',
  body: JSON.stringify(payload),
  mode: 'no-cors'
})
.then(() => console.log("✅ Test request sent"))
.catch(err => console.error("❌ Error:", err));
```

---

## 🔧 COMMON ISSUES & FIXES

| Issue | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Google Apps Script not public | Change deployment to "Anyone" |
| No error but data missing | Wrong sheet name in GAS | Update sheet name in doPost() |
| CORS error | Browser blocking request | Use Proxy URL in Settings |
| Request never sent | URL not configured | Set URL in Settings → save |
| Empty columns | Missing item.forEach loop | Add loop to create multiple rows |

---

## 📋 DATA FLOW DIAGRAM

```
Form Submit
    ↓
App.tsx: handleSubmitOrder()
    ↓
sheetService.ts: submitOrderToSheet()
    ↓
Fetch POST to Google Apps Script URL
    ↓
Google Apps Script: doPost(e)
    ↓
Parse JSON payload
    ↓
Append rows to Google Sheet
    ↓
Success ✅ or Error ❌
```

---

## 🚀 QUICK FIX STEPS (Most Common Solution)

1. **Go to Google Apps Script** (Extensions → Apps Script in Sheets)
2. **Click Deploy** → **Manage deployments**
3. **Find the latest deployment**
4. **Edit settings**
5. **Change "Who has access" to "Anyone"**
6. **Update the deployment**
7. **Try submitting form again**

---

## 📞 IF STILL NOT WORKING

Share these logs from browser console:
- The exact error message (F12 → Console)
- The response status code
- Whether "DIRECT" or "PROXY" mode is being used
