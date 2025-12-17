# Vercel Supabase Environment Variable Fix

## समस्या (Problem)
Vercel पर Supabase URL और API key नहीं मिल रहे हैं। आपके `vercel.json` में `@` prefix के साथ secret references हैं पर वो Vercel में सेट नहीं हैं।

## समाधान (Solution)

### Step 1: Vercel Dashboard में जाएं
1. https://vercel.com/dashboard में लॉगिन करें
2. अपना project खोलें (GinzaOrder)

### Step 2: Environment Variables सेट करें
**Settings → Environment Variables** पर जाएं और ये variables add करें:

```
VITE_SUPABASE_URL = आपका_supabase_url (https://xxx.supabase.co)
VITE_SUPABASE_ANON_KEY = आपकी_supabase_anon_key
GEMINI_API_KEY = आपकी_gemini_api_key
GAS_URL = आपकी_gas_url
```

**Important:** सभी variables के लिए सभी environments select करें (Production, Preview, Development)

### Step 3: vercel.json ठीक करें
Current (WRONG):
```json
"env": {
  "VITE_SUPABASE_URL": "@supabase_url",
  "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key"
}
```

Updated (CORRECT):
```json
"env": {
  "VITE_SUPABASE_URL": "@VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY": "@VITE_SUPABASE_ANON_KEY",
  "GEMINI_API_KEY": "@GEMINI_API_KEY",
  "GAS_URL": "@GAS_URL"
}
```

### Step 4: Supabase की Keys कहाँ से मिलेंगी?

#### Supabase URL:
1. https://supabase.com/dashboard में लॉगिन करें
2. अपना project खोलें
3. **Settings → API** पर जाएं
4. **Project URL** copy करें (कुछ ऐसा दिखेगा: `https://xxx.supabase.co`)

#### Supabase Anon Key:
1. Same page (**Settings → API**)
2. **Project API keys** के अंदर **anon** key copy करें

### Step 5: Verify करें
Deployment के बाद, browser console में check करें:
- कोई environment variable errors न हों
- Supabase से data load हो रहा हो

## Troubleshooting

### अगर अभी भी काम नहीं कर रहा है:

**Option A: Direct fix in vercel.json**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_SUPABASE_URL": "@VITE_SUPABASE_URL",
    "VITE_SUPABASE_ANON_KEY": "@VITE_SUPABASE_ANON_KEY",
    "GEMINI_API_KEY": "@GEMINI_API_KEY",
    "GAS_URL": "@GAS_URL"
  },
  "rewrites": [{"source": "/(.*)", "destination": "/index.html"}]
}
```

**Option B: Use .env.production**
Local में `.env.production` file बनाएं:
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
GEMINI_API_KEY=your_key
GAS_URL=your_url
```

### Commands:
```bash
npm run build
git add .
git commit -m "Fix Vercel Supabase env variables"
git push origin main
```

फिर Vercel dashboard में redeploy करें।
