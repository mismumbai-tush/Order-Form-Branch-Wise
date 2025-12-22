# 🚀 How to Run the App - Step by Step

## Quick Start (3 Steps)

### Step 1: Open Terminal
Press: **`Ctrl + ` (backtick)** in VS Code
OR open PowerShell manually

### Step 2: Navigate to Project
```powershell
cd "c:\Users\ASD\Downloads\GinzaOrder\GinzaOrder"
```

### Step 3: Start the Server
```powershell
npm run dev
```

**You should see:**
```
VITE v6.4.1  ready in 677 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.0.133:3000/
```

### Step 4: Open in Browser
Click: **http://localhost:3000/** (from terminal output)
OR type in browser address bar: `http://localhost:3000`

---

## Detailed Steps (If Above Doesn't Work)

### Option A: Using VS Code Terminal

1. **Open VS Code** 
   - Open folder: `c:\Users\ASD\Downloads\GinzaOrder\GinzaOrder`

2. **Open Terminal**
   - Press: `Ctrl + ` (the backtick key - same as ~)
   - Or: Menu → Terminal → New Terminal

3. **Run the command:**
   ```powershell
   npm run dev
   ```

4. **Wait for message:**
   ```
   ➜  Local:   http://localhost:3000/
   ```

5. **Click the link** or paste in browser

---

### Option B: Using PowerShell Directly

1. **Open PowerShell** (press Windows key, type "PowerShell")

2. **Navigate to folder:**
   ```powershell
   cd "c:\Users\ASD\Downloads\GinzaOrder\GinzaOrder"
   ```

3. **Run dev server:**
   ```powershell
   npm run dev
   ```

4. **Open browser:**
   - Go to: `http://localhost:3000`

---

## What You Should See

### Terminal Output:
```
VITE v6.4.1  ready in 677 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.0.133:3000/
  ➜  press h + enter to show help
```

### Browser (App):
- Order form with dropdowns
- Branch, Sales Person, Customer fields
- Items, quantities, order management

---

## Commands You Can Use

### Start Development Server
```powershell
npm run dev
```
Runs the app on http://localhost:3000 with auto-reload when you save files

### Build for Production
```powershell
npm run build
```
Creates optimized version in `dist/` folder

### Preview Build
```powershell
npm run preview
```
Shows what production version looks like locally

### Stop the Server
Press: **`Ctrl + C`** in terminal (while dev server is running)

---

## Troubleshooting

### Problem: "Missing script: dev"
**Solution:** Make sure you're in the correct folder
```powershell
cd "c:\Users\ASD\Downloads\GinzaOrder\GinzaOrder"
npm run dev
```

### Problem: Port 3000 Already in Use
**Solution:** Stop other processes and try again
```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
npm run dev
```

### Problem: npm not found
**Solution:** Install Node.js from https://nodejs.org/
Then restart your terminal

### Problem: Files Not Updating in Browser
**Solution:** 
- Hard refresh: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
- Check terminal for build errors

---

## After App is Running

### Test Your Data

1. **Select Branch**: Choose "Mumbai", "Jaipur", "Kolkata", etc.
2. **Select Sales Person**: Pick "Vishal Ambhore", "Durgesh", etc.
3. **Type Customer Name**: Start typing - should show customers from Supabase
4. **Add Items**: Select unit category, enter quantity
5. **Create Order**: Fill details and submit

### Debug Data (Open Browser Console F12)

```javascript
// Check if customers loaded
debugVishalAmbhore()

// Or test specific branch
debugKolkata()
```

---

## File Structure

```
GinzaOrder/
├── src/
│   ├── App.tsx          ← Main app file
│   ├── types.ts         ← Data types
│   ├── constants.ts     ← Branches, sales persons
│   ├── services/
│   │   ├── supabaseService.ts    ← Database
│   │   ├── sheetService.ts       ← Google Sheets
│   │   └── geminiService.ts      ← AI
├── package.json         ← Dependencies & scripts
├── vite.config.ts       ← Build config
├── tsconfig.json        ← TypeScript config
└── index.html           ← HTML entry point
```

---

## Keep This Running

### While Developing:
- Keep terminal running with `npm run dev`
- Make code changes in VS Code
- Browser auto-refreshes when you save

### To Stop:
- Press `Ctrl + C` in terminal

### To Start Again:
- Run `npm run dev` again

---

## Summary - Quickest Way

```powershell
# 1. Open PowerShell (Windows key → "PowerShell")

# 2. Go to folder
cd "c:\Users\ASD\Downloads\GinzaOrder\GinzaOrder"

# 3. Run app
npm run dev

# 4. Wait for ➜ Local: http://localhost:3000/

# 5. Copy and paste http://localhost:3000 in browser
```

**That's it!** 🎉 App will be running.

---

## Questions?

- **App won't start?** → Check if you're in correct folder
- **Port 3000 in use?** → Kill node process or use different port
- **Dependencies missing?** → Run `npm install`
- **Still stuck?** → Share terminal error message

