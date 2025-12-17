# Ginza Industries Order Portal - AI Coding Instructions

## Project Overview
**Ginza Order Portal** is a React+Vite TypeScript application for managing textile orders across multiple branches. It's a full-stack system combining:
- **Frontend**: React SPA with form-based order management
- **Backend**: Supabase (PostgreSQL + Auth) for data persistence
- **Integration**: Google Sheets API for order export, Google Gemini API for order parsing
- **Deployment**: Vercel with environment variable management for secrets

**Key distinction**: This is primarily a **data-driven business application**, not a UX-heavy product. Prioritize data integrity and multi-branch operational logic over polish.

---

## Architecture Patterns

### Data Layer (Supabase-First)
- All persistent data flows through `services/supabaseService.ts` - treat this as the single source of truth
- Environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are loaded in `supabaseClient.ts`
- Every service function **must check `isSupabaseConfigured`** before querying - app gracefully degrades if secrets missing
- **Critical Pattern**: Branch names in database use "HO" suffix (`"Mumbai HO"`, `"Ulhasnagar HO"`), but the UI uses simple names (`"Mumbai"`, `"Ulhasnagar"`) - `supabaseService.ts` lines 366-372 handle this mapping

### Multi-Branch Business Logic
- User authentication binds a user to a **branch** and a **sales person** (stored in session state after login)
- HO users (Mumbai HO, Ulhasnagar HO) see all customers; branch users see only their branch's customers
- Filter logic at lines 227-251 of `supabaseService.ts` shows branch variation handling - branch names match both with/without HO suffix
- Constants in `constants.ts` define `BRANCHES`, `SALES_PERSONS`, `UNIT_CATEGORIES` (WARP, CKU, EMBROIDARY, etc.)

### Item Categories & Dynamic Columns
- Items stored in `items_new` table with category-specific column mappings (lines 457-463 of `supabaseService.ts`)
- Example: WARP category uses `['warp']` item columns and `['width_warp']` width columns
- When adding new categories, **update both `UNIT_CATEGORIES` constant AND the categoryMap in `fetchMasterItems()`**
- Width validation happens client-side in `App.tsx` line ~1450 using these mappings

### Form State Management
- `OrderFormData` interface defines header (branch, customer, dates)
- `OrderLineItem[]` represents line items (category, item name, quantity, rate, discount)
- Mode state (`FormMode.NEW_FORM`, `EDIT_FORM`, `VIEW_HISTORY`) controls UI rendering in `App.tsx` lines 69-70
- **Important**: Form uses `date-fns` format (`'yyyy-MM-dd'`) consistently across all date fields

---

## Critical Developer Workflows

### Local Development
```bash
npm run dev      # Starts Vite server on http://localhost:3000
npm run build    # Production build → dist/ directory
npm run preview  # Test production build locally
```

### Environment Setup
1. **Local**: Create `.env` file with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from Supabase dashboard (Settings → API)
2. **Vercel Deployment**: Set env vars in Vercel UI **without @ prefix** - use actual values, not references
3. **Common Issue**: `vercel.json` uses `@VAR_NAME` syntax for references, but this only works if secrets are pre-registered in Vercel

### Debugging Data Issues
- Browser console has exposed helper: `window.diagnoseSupabase()` (injected in `App.tsx` line 186)
- Checks `items_new`, `items`, `products` tables for existence and RLS permissions
- **RLS Errors**: If Row Level Security blocks queries, console shows error code `'42501'` - fix in Supabase by disabling RLS on tables

### Database Permissions
- Common error: `"DB Error (Check SQL Permissions): Permission Denied"` at registration
- **Fix**: Run in Supabase SQL Editor: `ALTER TABLE app_users DISABLE ROW LEVEL SECURITY;` (and for `customers`, `items_new` tables)

---

## Project-Specific Patterns & Conventions

### Error Handling Convention
- All service functions return `{ success: boolean, message: string, data?: any }`
- Supabase errors map to console logs with emoji prefixes: `❌` (error), `✅` (success), `🔍` (diagnostic)
- Network/DB failures gracefully return empty arrays instead of throwing - app handles offline state

### State Initialization
- `INITIAL_FORM_DATA` and `INITIAL_ITEM` (lines 14-40 of `App.tsx`) reset to current date every new form
- History persists in `historyOrders` state during session but is not persisted to DB (intentional - it's UI-only)
- User session stores only `{ branch, salesPerson }` objects - branch ID mapping happens via `BRANCH_ID_MAPPING` constant

### Service Boundaries
| Service | Responsibility | Key Functions |
|---------|---|---|
| `supabaseService.ts` | All DB CRUD + user auth | `loginUser`, `registerUser`, `fetchCustomersByBranchAndSalesPerson`, `saveOrderToDb`, `bulkUpsertItems` |
| `sheetService.ts` | Export orders to Google Sheets | `submitOrderToSheet` |
| `geminiService.ts` | Parse free-form order text using AI | `smartParseOrder` |

### No Direct DB Queries in Components
- `App.tsx` **never calls Supabase directly** - all DB access is through service functions
- This keeps data layer logic centralized and testable

---

## Integration Points & External Dependencies

### Google Sheets API (`sheetService.ts`)
- Orders are exported to Google Sheets for reporting/archival
- Requires `GAS_URL` environment variable (Google Apps Script deployment URL)
- Sheet structure: columns for branch, customer, items, rates, discounts

### Google Gemini API (`geminiService.ts`)
- Optional feature for parsing free-form order text into structured form fields
- Requires `GEMINI_API_KEY` environment variable
- If missing, feature degrades gracefully - button still visible but returns error

### CORS Proxy (`api/proxy.js`)
- Handles cross-origin requests for external APIs
- Deployed as Vercel serverless function
- Used when client-side CORS policies block direct requests

---

## Common Gotchas & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Database not connected" on login | Missing `VITE_SUPABASE_URL` or key | Check `.env` file and `supabaseClient.ts` initialization |
| Empty customer list after login | Branch name mismatch | Verify `supabaseService.ts` lines 227-251 - try branch with "HO" suffix |
| Items dropdown shows nothing | `items_new` table empty or missing | Run `bulkUpsertItems()` or seed data via admin panel |
| RLS permission errors | Row Level Security enabled on tables | Disable RLS in Supabase for development; use policies in production |
| Vercel env var error on deploy | Using `@VAR` syntax in Vercel UI | Set raw values, not references - Vercel auto-handles substitution |

---

## Key Files Reference
- **`App.tsx`** (1983 lines) - Main React component, form state, UI logic
- **`supabaseClient.ts`** - Singleton Supabase client initialization
- **`services/supabaseService.ts`** (740+ lines) - All database operations
- **`types.ts`** - TypeScript interfaces for domain models (Branch, Customer, Item, Order)
- **`constants.ts`** - Branch/category mappings, dropdown data
- **`vercel.json`** - Deployment config with build command, rewrites, env references
- **`vite.config.ts`** - Vite bundler config, port 3000, React plugin

---

## Before Making Changes
1. **DB schema changes**: Ensure new columns added to Supabase match the category mapping logic
2. **Branch logic changes**: Update both `constants.ts` and `supabaseService.ts` filtering logic
3. **Form changes**: Keep `INITIAL_FORM_DATA` and `types.ts` interfaces in sync
4. **New services**: Always export a `{ success, message, data? }` response object
5. **Deployment**: Test env vars locally first (`.env` file) before pushing to Vercel
