-- ============================================
-- FIX: Populate sales_person_name for existing customers
-- ============================================
-- This script updates the customers table to ensure all records
-- have the sales_person_name field properly populated
-- 
-- RUN THIS IN: Supabase Dashboard → SQL Editor

-- First, let's check if any customers are missing sales_person_name:
SELECT COUNT(*) as missing_sales_person_name
FROM customers
WHERE sales_person_name IS NULL OR sales_person_name = '';

-- Then update them by joining with app_users table:
UPDATE customers
SET sales_person_name = CONCAT(au.first_name, ' ', au.last_name)
WHERE sales_person_id = au.id
AND (sales_person_name IS NULL OR sales_person_name = '');

-- Verify the fix:
SELECT branch, sales_person_name, COUNT(*) as customer_count
FROM customers
WHERE sales_person_name IS NOT NULL
GROUP BY branch, sales_person_name
ORDER BY branch, sales_person_name;

-- Check which branches and sales persons now have data:
SELECT DISTINCT branch, sales_person_name
FROM customers
WHERE branch IS NOT NULL
AND sales_person_name IS NOT NULL
ORDER BY branch, sales_person_name;
