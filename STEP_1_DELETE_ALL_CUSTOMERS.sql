-- ============================================================
-- STEP 1: Delete ALL Customer Data from Supabase
-- ============================================================
-- Run this in: Supabase Dashboard → SQL Editor
-- This will PERMANENTLY DELETE all customers - be sure!

-- Backup first if needed:
-- SELECT COUNT(*) FROM customers; -- Check how many records

-- Delete all records:
DELETE FROM customers;

-- Verify it's empty:
SELECT COUNT(*) as remaining_customers FROM customers;

-- Should return: 0
