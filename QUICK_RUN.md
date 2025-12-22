# 📋 QUICK REFERENCE - Run App in 30 Seconds

## THE COMMAND

```powershell
cd "c:\Users\ASD\Downloads\GinzaOrder\GinzaOrder" ; npm run dev
```

**Copy → Paste → Enter**

---

## THEN

Wait for this message:
```
➜  Local:   http://localhost:3000/
```

Click the link or type in browser: `http://localhost:3000`

---

## THAT'S IT! ✅

App is running. You can now:
- ✅ Select branch & sales person
- ✅ Search customers
- ✅ Create orders
- ✅ Upload CSV files
- ✅ Submit orders to Google Sheets

---

## TO STOP

Press: **Ctrl + C** in terminal

---

## PROBLEMS?

| Issue | Fix |
|-------|-----|
| "npm: not found" | Install Node.js from nodejs.org |
| "Port 3000 in use" | `Get-Process node \| Stop-Process -Force` then retry |
| "Missing script: dev" | Make sure path is correct: `c:\Users\ASD\Downloads\GinzaOrder\GinzaOrder` |
| App not updating | Press Ctrl+Shift+R in browser (hard refresh) |
| Customers not showing | Check Supabase has data for that branch |

---

## KEY FILES

- **App code**: `App.tsx`
- **Settings**: `constants.ts` (branches, sales persons)
- **Database**: `supabaseService.ts`
- **Config**: `vite.config.ts`, `package.json`

---

## RUNNING COMMANDS

| What | Command |
|------|---------|
| Start app | `npm run dev` |
| Build for production | `npm run build` |
| Install dependencies | `npm install` |
| Format code | `npm run format` |
| Stop server | `Ctrl + C` |

---

**Full guide**: See `HOW_TO_RUN.md`

