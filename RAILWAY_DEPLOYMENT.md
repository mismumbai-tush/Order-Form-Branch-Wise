# Railway पर Deploy करने के लिए - आसान Steps

## क्या किया गया:
✅ Vite को Railway के लिए configure किया  
✅ Environment variable handling को fix किया  
✅ Caddyfile (web server config) add किया  
✅ railway.json configuration add किया  

---

## Railway पर Deploy करने के लिए:

### Step 1: Railway Account बनाएं
1. https://railway.app खोलें
2. **Sign up with GitHub** क्लिक करें

### Step 2: नया Project Create करें
1. Railway dashboard में जाएं
2. **"New Project"** क्लिक करें
3. **"Deploy from GitHub repo"** चुनें
4. अपना repo select करें: **order-form-multiple-location**

### Step 3: Environment Variables Add करें
Railway Dashboard में:
1. Project खोलें
2. **"Variables"** tab क्लिक करें
3. **"Add Variable"** क्लिक करें

ये 3 variables add करें:

```
VITE_SUPABASE_URL
https://qtctkhkykkwntecxgezs.supabase.co
```

```
VITE_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM
```

```
VITE_GEMINI_API_KEY
AIzaSyCNBhSoKkehZSOuY3PtUMGj3O41ysBR8pA
```

### Step 4: Deploy को trigger करें
1. Railway automatically detect करेगा कि आपकी repo में changes हैं
2. Build शुरू होगा (2-3 minutes लगेगा)
3. Successfully deployed! 🎉

---

## Deployment के बाद:

Railway आपको एक **public URL** देगा जैसे:
```
https://order-form-multiple-location-production.up.railway.app
```

Voila! 🚀 आपका app live है!

---

## अगर Deploy fail हो तो:

### Check करने के लिए:
1. Railway Dashboard में **Logs** tab देखो
2. Build errors देख सकते हो
3. Environment variables सही हैं क्या?

### Common Issues:

**Issue: Build fails**
- Solution: Logs में देखो क्या error है

**Issue: Site loads but no data**
- Solution: Browser console में (F12) error check करो
- Environment variables सही हैं क्या Railway में?

**Issue: 404 error**
- Solution: URL सही है क्या? Railway से मिला URL use करो

---

## Next: Try karo Railway पर! 🚀

1. https://railway.app पर जाओ
2. GitHub से login करो
3. Repo connect करो
4. Environment variables add करो
5. **Deploy!**

कोई issue हो तो Logs से error message भेज दो! 📝
