# Ginza Industries Order Portal - Setup Guide

## 📋 Prerequisites

- Node.js v16 or higher
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/task-delegate/order-form-multiple-location.git
cd Downloads/GinzaOrder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini API
VITE_GOOGLE_GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_KEY=your_gemini_api_key

# Google Apps Script
VITE_GOOGLE_APPS_SCRIPT_URL=your_gas_url

# Optional
VITE_GOOGLE_SHEET_ID=your_sheet_id
VITE_PROXY_URL=your_proxy_url
```

### 4. Get Required API Keys

#### A. Supabase Setup
1. Go to https://app.supabase.com
2. Create a new project or use existing
3. Go to Project Settings > API
4. Copy:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `Anon Key` → `VITE_SUPABASE_ANON_KEY`

#### B. Google Gemini API
1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create new API key
4. Copy to `VITE_GOOGLE_GEMINI_API_KEY` and `GEMINI_API_KEY`

#### C. Google Apps Script Setup
1. Create a Google Sheet
2. Go to Extensions > Apps Script
3. Deploy as Web App:
   - Execute as: Your account
   - Access: Anyone
4. Copy the deployment URL to `VITE_GOOGLE_APPS_SCRIPT_URL`

### 5. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:3005`

### 6. Build for Production
```bash
npm run build
```

### 7. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
GinzaOrder/
├── index.html              # Main HTML entry point
├── index.tsx              # React app entry
├── App.tsx                # Root React component
├── supabaseClient.ts      # Supabase configuration
├── constants.ts           # App constants
├── types.ts               # TypeScript types
├── services/              # Business logic
│   ├── sheetService.ts    # Google Sheets API
│   ├── supabaseService.ts # Supabase operations
│   └── geminiService.ts   # AI features
├── components/            # React components
├── api/                   # Backend API routes
├── .env                   # Environment variables (local)
├── .env.example           # Example environment file
└── package.json           # Dependencies
```

---

## 🔧 Troubleshooting

### Problem: "VITE_SUPABASE_URL is not defined"
**Solution:** 
- Make sure `.env` file exists in root directory
- All keys start with `VITE_` in the file
- Restart dev server after creating `.env`

### Problem: "Gemini API Key error"
**Solution:**
- Get fresh key from https://ai.google.dev/
- Check key doesn't have extra spaces
- Restart dev server

### Problem: Google Apps Script URL not working
**Solution:**
- Use `/userweb` endpoint, not `/dev`
- Deploy as "Anyone" access
- Test URL directly in browser first

### Problem: Supabase connection fails
**Solution:**
- Verify Project URL format: `https://xxxxx.supabase.co`
- Anon Key should start with `eyJ`
- Check internet connection

---

## 📱 Features

✅ Multi-location order management  
✅ Real-time data sync with Supabase  
✅ Google Sheets integration  
✅ AI-powered order suggestions (Gemini)  
✅ Mobile-responsive design  
✅ PWA support  
✅ Branch-wise order tracking  

---

## 🌐 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard:
- Settings > Environment Variables
- Add all keys from `.env`

### Deploy to Other Platforms
Ensure these environment variables are set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GOOGLE_GEMINI_API_KEY`
- `GEMINI_API_KEY`
- `VITE_GOOGLE_APPS_SCRIPT_URL`

---

## 📞 Support

For issues or questions:
1. Check `.env` configuration
2. Verify API keys are valid
3. Check browser console for errors
4. Review logs in Supabase dashboard

---

## 📄 License

Private project - Ginza Industries Ltd.
