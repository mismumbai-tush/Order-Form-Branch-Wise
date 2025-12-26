# 🔍 HOW TO CHECK BROWSER CONSOLE FOR ERRORS

## ⚡ QUICK GUIDE

### Step 1: Open Browser Developer Tools
Press **F12** on your keyboard

(Alternative: Right-click → Inspect → Console tab)

---

### Step 2: Submit Your Form
1. Fill in the form fields
2. Add items to order
3. Click **Submit Order**

---

### Step 3: Look in Console Tab
You should see one of these messages:

### ✅ SUCCESS MESSAGE
```
🚀 Submitting to Google Sheet...
   URL: https://script.google.com/macros/s/.../exec
   Mode: DIRECT (Legacy)
   Branch: Mumbai
   Customer: Test Customer
   Items: 2
   Sending request...
   ✅ Order request sent (no-cors mode)
   ✅ Successfully sent order with 2 item(s) to Google Sheet.
```

👉 **This means:** Data was sent successfully!
Check your Google Sheet in 5-10 seconds.

---

### ⚠️ WARNING MESSAGE
```
⚠️ Google Sheet URL is not configured. Data will NOT be sent to Sheets.
   Please set either Proxy URL or Google Script URL in Settings.
```

👉 **This means:** You haven't set the Google Apps Script URL in Settings.

**FIX:**
1. Click **Settings** (gear icon)
2. Enter your Google Apps Script URL:
   ```
   https://script.google.com/macros/s/YOUR-ID/exec
   ```
3. Click **Save**
4. Try submitting again

---

### ❌ ERROR MESSAGE: 401 Unauthorized
```
❌ Order submission failed with status 401
🔐 GOOGLE APPS SCRIPT AUTHORIZATION ERROR (401):
   Fix: GAS deployment does NOT have public access.
   Action: Use a Proxy URL instead, or update GAS deployment to 'Who has access: Anyone'
```

👉 **This means:** Google Apps Script is not set to public.

**FIX:**
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Click **Deploy** → **Manage deployments**
4. Find the Web App deployment
5. Click Edit (pencil icon)
6. Change **"Who has access"** from "Me only" to **"Anyone"**
7. Click **Update**
8. Go back to form and try again

---

### ❌ ERROR MESSAGE: CORS Error
```
Access to fetch at 'https://...' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

👉 **This means:** Browser is blocking the request.

**FIX Option 1 - Use Proxy URL (Recommended):**
1. Set up a proxy server
2. In Settings, enter Proxy URL instead
3. Re-deploy Google Apps Script to get new URL

**FIX Option 2 - Use `/userweb` Endpoint:**
1. Make sure your Google Apps Script URL ends with `/userweb`
2. NOT `/dev`

---

### ❌ ERROR MESSAGE: Cannot read property
```
TypeError: Cannot read property 'forEach' of undefined
```

👉 **This means:** Google Apps Script is not receiving the items properly.

**FIX:**
1. Go to Google Sheet → Extensions → Apps Script
2. Check that `doPost()` function has:
   ```javascript
   if (data.items && Array.isArray(data.items)) {
     data.items.forEach(item => {
       // Add rows to sheet
     });
   }
   ```
3. Make sure the function is spelled correctly: `doPost` (not `dopost`)
4. Save and deploy again

---

## 🎯 WHAT TO LOOK FOR

| Color | Meaning | What to do |
|-------|---------|-----------|
| 🟢 Green | Success | Data was sent ✅ |
| 🟡 Orange | Warning | URL not configured ⚠️ |
| 🔴 Red | Error | Something is wrong ❌ |

---

## 📝 COPY-PASTE QUICK TEST

If you want to manually test, paste this in the console:

```javascript
// Minimal test payload
const testPayload = {
  customerName: "Test Customer",
  customerEmail: "test@example.com",
  items: [
    { itemName: "Test Item", quantity: "5" }
  ]
};

// Get URL from form settings
const gasUrl = localStorage.getItem('google_script_url') || 
  'https://script.google.com/macros/s/AKfycbwMfDlawVVHEJfykwLcruYUNhpAgBMSU7rl06kupKRXkMWUFvkJrv4E-FRw2_FB631t0A/exec';

console.log("Sending test data to:", gasUrl);
console.log("Payload:", testPayload);

// Send request
fetch(gasUrl, {
  method: 'POST',
  body: JSON.stringify(testPayload),
  mode: 'no-cors'
})
.then(() => console.log("✅ Request sent! Check Google Sheet in 10 seconds."))
.catch(err => console.error("❌ Error:", err));
```

---

## 🔧 DEBUGGING TIPS

### Tip 1: Clear Console
Click the circle with slash icon to clear console messages.

### Tip 2: Filter Messages
Use search box to find:
- "🚀" for submission messages
- "❌" for errors
- "401" for auth errors
- "CORS" for cross-origin errors

### Tip 3: Open Network Tab
Click **Network** tab to see:
- The actual HTTP request being sent
- The response status (200, 401, etc.)
- The response body

**To see Network requests:**
1. Click **Network** tab
2. Submit form
3. Look for `exec` in the request list
4. Click it to see details

### Tip 4: Check Storage
Click **Application** tab to see:
- `google_script_url` - Your configured GAS URL
- `proxy_url` - If using proxy
- `order_history` - Submitted orders

---

## 📋 WHEN REPORTING A BUG

Please share:
1. The exact error message from console
2. The URL being used (first 60 chars)
3. Whether "DIRECT" or "PROXY" mode
4. The status code (if error shows one)

Example:
```
Error: 401 Unauthorized
URL: https://script.google.com/macros/s/AKfycbwMfDlawV...
Mode: DIRECT (Legacy)
Status: 401
```

---

## ✅ VERIFICATION STEPS

After submission, you should see:

1. ✅ No red error messages
2. ✅ Message ending with "Successfully sent order"
3. ✅ New rows in Google Sheet within 10 seconds
4. ✅ All columns filled with correct data
5. ✅ Email column shows your submitted email

---

**Remember:** Browser console (F12) is your best friend for debugging! Always check it when something doesn't work.
