# 🚀 VERCEL DEPLOYMENT + GOOGLE SHEET INTEGRATION GUIDE

## ✅ YOUR VERCEL DEPLOYMENT IS LIVE!

Your form is now hosted on Vercel and ready to save data to Google Sheets.

---

## 📋 3-STEP SETUP

### Step 1: Get Your Google Apps Script URL

You need a Google Apps Script to receive form submissions.

**Option A: Use Your Existing Script**
```
If you already have one:
1. Go to Google Sheet
2. Extensions → Apps Script
3. Copy the deployment URL
4. Make sure it ends with /exec
```

**Option B: Create a New Script**
```
1. Open Google Sheet
2. Extensions → Apps Script
3. Paste this code:
```

```javascript
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
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
      JSON.stringify({success: true, message: 'Order saved'})
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({success: false, error: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

```
4. Save (Ctrl+S)
5. Click Deploy → New Deployment
6. Type: Web app
7. Execute as: Your account
8. Who has access: Anyone
9. Click Deploy
10. Copy the URL
```

---

### Step 2: Configure Your Vercel Form Settings

Your deployed form needs the Google Apps Script URL.

**Access Your Form Settings:**
```
1. Open your Vercel deployed form in browser
2. Look for Settings icon (gear ⚙️)
3. Click it
4. Paste your Google Apps Script URL
5. Click Save Settings
```

**The URL should look like:**
```
https://script.google.com/macros/s/[YOUR-ID]/exec
```

**Important:** Make sure it ends with `/exec` (not `/dev`)

---

### Step 3: Test the Integration

**Test Data Submission:**
```
1. Open your Vercel form
2. Fill in all fields:
   - Customer Name: "Test Customer"
   - Customer Email: "test@example.com"
   - Add an item
3. Click Submit Order
4. Check Google Sheet for new data (wait 5-10 seconds)
5. Verify email appears in column 3
```

---

## ✅ VERIFICATION CHECKLIST

After submission, you should see:

- [ ] No error messages in form
- [ ] Success notification appears
- [ ] New row in Google Sheet
- [ ] All columns filled correctly
- [ ] Email shows in column 3
- [ ] Timestamp shows current date/time

---

## 🔍 IF DATA DOESN'T APPEAR

### Check 1: Browser Console
```
1. Open your Vercel form
2. Press F12 (Developer Tools)
3. Click Console tab
4. Submit test data
5. Look for error messages
```

**Expected success message:**
```
✅ Successfully sent order with X item(s) to Google Sheet.
```

**If you see 401 error:**
```
Solution:
1. Go to your Google Sheet
2. Extensions → Apps Script
3. Deploy → Manage Deployments
4. Edit the deployment
5. Change "Who has access" to "Anyone"
6. Update and try again
```

### Check 2: Google Apps Script Settings
```
Verify:
1. Script URL ends with /exec
2. Deployment is set to "Anyone"
3. Sheet name is correct in script
4. doPost() function exists
```

### Check 3: Form Settings
```
1. Click Settings icon on form
2. Paste your URL
3. URL should show at least 80 characters
4. Save Settings
5. Refresh page and try again
```

---

## 📊 DATA FLOW DIAGRAM

```
Your Vercel Form
      ↓
User fills form
      ↓
User clicks Submit
      ↓
Form sends data to Google Apps Script
      ↓
Google Apps Script receives request
      ↓
Parses JSON payload
      ↓
Appends row to Google Sheet
      ↓
✅ Data visible in sheet (5-10 seconds)
```

---

## 🎯 EXPECTED COLUMNS IN GOOGLE SHEET

After first submission, your sheet will have these columns:

```
Column 1:  Timestamp
Column 2:  Customer Name
Column 3:  Customer Email ← Your email appears here
Column 4:  Order Date
Column 5:  Category
Column 6:  Item Name
Column 7:  Color
Column 8:  Width
Column 9:  Qty
Column 10: UOM
Column 11: Rate
Column 12: Discount
Column 13: Delivery Date
Column 14: Remark
Column 15: Contact No
Column 16: Billing Address
Column 17: Delivery Address
Column 18: Sales Person
Column 19: Sales Contact
```

---

## 🚀 QUICK TEST STEPS

**For verification, you can test directly with this code in browser console:**

```javascript
// Open browser console on your Vercel form (F12)
// Paste this code:

const testPayload = {
  submissionId: Date.now(),
  customerName: "Vercel Test",
  customerEmail: "vercel@test.com",
  items: [{itemName: "Test Item", quantity: "5"}]
};

// Get URL from form settings
const gasUrl = localStorage.getItem('google_script_url');

console.log("Testing with URL:", gasUrl);
console.log("Payload:", testPayload);

if (gasUrl) {
  fetch(gasUrl, {
    method: 'POST',
    body: JSON.stringify(testPayload),
    mode: 'no-cors'
  })
  .then(() => console.log("✅ Test sent! Check Google Sheet in 10 seconds"))
  .catch(err => console.error("❌ Error:", err));
} else {
  console.error("❌ Google Apps Script URL not set in settings!");
}
```

---

## 📋 TROUBLESHOOTING

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 Error | Script not public | Set deployment to "Anyone" |
| Silent failure | URL not set | Enter URL in Settings |
| Data missing | Wrong sheet name | Update sheet name in script |
| CORS error | Browser blocking | Already handled (no-cors mode) |
| No Settings button | UI issue | Clear browser cache, reload |

---

## ✨ YOUR FORM IS READY!

**What's configured:**
- ✅ Form deployed on Vercel
- ✅ Email field working
- ✅ All validation in place
- ✅ Google Sheet integration ready
- ✅ Error handling active

**Just need:**
- ✅ Google Apps Script URL
- ✅ Set to "Anyone" access
- ✅ Correct sheet name

---

## 🔗 YOUR VERCEL DEPLOYMENT

You can now:
1. Share your Vercel link with customers
2. They submit orders from anywhere
3. Data automatically saves to your Google Sheet
4. No database needed!

---

## 📞 NEXT STEPS

1. **Get your Google Apps Script URL**
2. **Enter it in form Settings**
3. **Test with sample data**
4. **Verify data in Google Sheet**
5. **Share the Vercel link** 🎉

---

## 🎓 ADDITIONAL RESOURCES

If you need help:
- Check: `QUICK_FIX_GOOGLE_SHEET.md`
- Test: `test-google-sheet-submission.html`
- Debug: `CHECK_BROWSER_CONSOLE_GUIDE.md`
- Setup: `GOOGLE_SHEET_SUBMISSION_DEBUG.md`

All guides are in your project files!

---

**Status:** ✅ Ready for production use
**Deployment:** Vercel (live)
**Integration:** Google Sheets (ready)
