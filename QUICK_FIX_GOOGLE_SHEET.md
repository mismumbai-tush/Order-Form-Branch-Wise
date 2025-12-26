# ✅ QUICK ACTION CHECKLIST - Google Sheet Data Not Showing

## 🚨 TOP 3 MOST COMMON CAUSES (TRY THESE FIRST)

### ❌ ISSUE 1: Google Apps Script Deployment Not Public
**Symptom:** 401 Unauthorized error in console

**FIX:**
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Click **Deploy** button at top
4. Click **Manage deployments**
5. Edit the deployment with type "Web app"
6. Change **"Who has access"** from "Me only" to **"Anyone"**
7. Update the deployment
8. Come back to form and try again ✅

---

### ❌ ISSUE 2: URL Ends with `/dev` Instead of `/exec`
**Symptom:** Data not received, no visible error

**FIX:**
1. Check the URL in form settings
2. It should end with **`/exec`** not `/dev`
3. If it has `/dev`, replace with `/exec`:
   ```
   WRONG: https://script.google.com/macros/s/.../dev
   RIGHT: https://script.google.com/macros/s/.../exec
   ```
4. Save settings and try again ✅

---

### ❌ ISSUE 3: Wrong Sheet Name in Google Apps Script
**Symptom:** Script runs but no data appears in sheet

**FIX:**
1. Go to Google Sheet
2. Look at the sheet tabs at the bottom
3. Find the correct sheet name (e.g., "Orders", "Sheet1")
4. Go to **Extensions** → **Apps Script**
5. Find this line in `doPost()`:
   ```javascript
   const sheet = ss.getSheetByName("Orders"); // ← Change "Orders" to your sheet name
   ```
6. Change the sheet name to match your actual sheet
7. Save and deploy ✅

---

## 📋 COMPLETE VERIFICATION STEPS

### Step 1: Test Using Debug Page (EASIEST)
```
1. Open this file in browser: test-google-sheet-submission.html
2. Paste your Google Apps Script URL
3. Click "Test Connection"
4. Check if error appears in console output
5. If success, click "Submit Test Data"
6. Check your Google Sheet for test data
```

### Step 2: Check Browser Console
```
1. Open your form in browser
2. Press F12 (Developer Tools)
3. Click "Console" tab
4. Submit a test order
5. Look for messages starting with:
   ✅ = Success
   ⚠️ = Warning
   ❌ = Error
```

**Look for specific error messages:**
- `401 Unauthorized` → Fix Issue #1 (Make script public)
- `Cannot read property of undefined` → Fix Issue #3 (Wrong sheet name)
- `POST /exec` without response → Fix Issue #2 (URL format)

### Step 3: Verify Google Apps Script Settings
```
Google Sheet → Extensions → Apps Script

✅ Should have:
   - A function called doPost(e)
   - A loop that handles items.forEach()
   - sheet.appendRow() to add data
   - A proper return statement

❌ Remove:
   - console.log() statements (cause errors)
   - Unnecessary validation
   - Testing/debug code
```

### Step 4: Check Permissions
```
1. Google Sheet → Share button
2. Make sure:
   - You have EDIT access
   - The script is deployed under your account
   - Google hasn't blocked it
```

---

## 🔧 SIMPLE COPY-PASTE FIX

If you're not sure what's wrong, here's a working Google Apps Script:

**Go to Google Sheet → Extensions → Apps Script**

**Delete everything and paste this:**

```javascript
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet(); // Gets current sheet (most flexible)
    
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
    
    // Add data row for each item
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
      JSON.stringify({
        success: true,
        message: 'Order saved successfully',
        itemsCount: data.items ? data.items.length : 0
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Then:**
1. **Save** (Ctrl+S)
2. **Deploy** → **New Deployment**
3. **Type:** Web app
4. **Execute as:** Your account
5. **Who has access:** Anyone
6. Click **Deploy**
7. Copy the new URL
8. Paste in Form Settings
9. **Submit test order** ✅

---

## 🎯 EXPECTED BEHAVIOR

After submitting form, you should see in browser console:

```
🚀 Submitting to Google Sheet...
   URL: https://script.google.com/macros/s/.../exec
   Mode: DIRECT (Legacy)
   Branch: Mumbai
   Customer: Test Customer
   Items: 2
   Sending request...
   Using no-cors mode for direct GAS URL
   ✅ Order request sent (no-cors mode)
   ✅ Successfully sent order with 2 item(s) to Google Sheet.
```

And in Google Sheet, you should see new rows with:
- Timestamp
- Customer Name
- **Customer Email** ← THIS SHOULD SHOW
- All other order details

---

## ❓ IF STILL NOT WORKING

1. Open the test file: `test-google-sheet-submission.html`
2. Run the diagnostics
3. Share the output showing:
   - Error messages
   - Whether connection test succeeded
   - Whether test data submission succeeded

---

## 📞 SUPPORT

If you need help:
1. Check the detailed guide: `GOOGLE_SHEET_SUBMISSION_DEBUG.md`
2. Open browser console (F12)
3. Look for error messages
4. Follow the specific fix for that error
