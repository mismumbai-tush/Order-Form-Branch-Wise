import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const SUPABASE_URL = 'https://qtctkhkykkwntecxgezs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM';
const GOOGLE_SHEET_ID = '1vfHEdJY4q6IQNlYG3BHCCXZSiXROqBcYukU9mLLAZx0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchGoogleSheetData() {
  console.log('📥 Fetching data from Google Sheet...');
  
  // Try to fetch the CSV export
  const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`;
  
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    console.log('✅ Google Sheet data fetched successfully!');
    return csvText;
  } catch (error) {
    console.error('❌ Error fetching Google Sheet:', error.message);
    console.log('\n📋 Please make sure:');
    console.log('1. The Google Sheet is shared publicly (Anyone with the link can view)');
    console.log('2. The Sheet ID is correct');
    console.log('3. Your internet connection is working');
    return null;
  }
}

function parseCSV(csvText) {
  console.log('\n📊 Parsing CSV data...');
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  console.log('📋 Headers found:', headers);
  
  const customers = [];
  
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',').map(c => c.trim());
    
    const customer = {
      customer_name: cells[headers.indexOf('customer_name')] || cells[headers.indexOf('customer name')] || '',
      sales_person_name: cells[headers.indexOf('sales_person_name')] || cells[headers.indexOf('sales person name')] || cells[headers.indexOf('sales person')] || '',
      branch: cells[headers.indexOf('branch')] || '',
      mob_no: cells[headers.indexOf('mob_no')] || cells[headers.indexOf('mob no')] || cells[headers.indexOf('mobile')] || '',
      email_id: cells[headers.indexOf('email_id')] || cells[headers.indexOf('email id')] || cells[headers.indexOf('email')] || '',
      billing_address: cells[headers.indexOf('billing_address')] || cells[headers.indexOf('billing address')] || cells[headers.indexOf('address')] || '',
      delivery_address: cells[headers.indexOf('delivery_address')] || cells[headers.indexOf('delivery address')] || ''
    };
    
    // Only add if customer has a name
    if (customer.customer_name && customer.customer_name.trim()) {
      customers.push(customer);
    }
  }
  
  console.log(`✅ Parsed ${customers.length} customers from Google Sheet`);
  console.log('\n📝 Sample customers:');
  customers.slice(0, 5).forEach((c, i) => {
    console.log(`${i + 1}. ${c.customer_name} | ${c.sales_person_name} | ${c.branch}`);
  });
  
  return customers;
}

async function uploadToSupabase(customers) {
  console.log('\n📤 Uploading to Supabase...');
  
  try {
    // First, clear existing data (optional - comment out to keep old data)
    console.log('🗑️  Clearing old customer data...');
    const { error: deleteError } = await supabase.from('customers').delete().gt('id', 0);
    if (deleteError) {
      console.log('⚠️  Could not clear old data:', deleteError.message);
    }
    
    // Insert all customers
    console.log(`\n📤 Inserting ${customers.length} customers...`);
    
    // Split into batches to avoid limits
    const batchSize = 500;
    for (let i = 0; i < customers.length; i += batchSize) {
      const batch = customers.slice(i, i + batchSize);
      const { error } = await supabase.from('customers').insert(batch);
      
      if (error) {
        console.error(`❌ Error uploading batch ${Math.floor(i / batchSize) + 1}:`, error.message);
        return false;
      }
      
      console.log(`✅ Uploaded batch ${Math.floor(i / batchSize) + 1} (${batch.length} customers)`);
    }
    
    console.log('\n✅ All customers uploaded successfully!');
    return true;
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    return false;
  }
}

async function verifiyData() {
  console.log('\n🔍 Verifying uploaded data...');
  
  const { data, error } = await supabase.from('customers').select('*').limit(100);
  
  if (error) {
    console.error('❌ Error fetching data:', error.message);
    return;
  }
  
  console.log(`✅ Found ${data?.length || 0} customers in database`);
  
  if (data && data.length > 0) {
    console.log('\n📝 Sample of uploaded data:');
    data.slice(0, 10).forEach((c, i) => {
      console.log(`${i + 1}. ${c.customer_name} | ${c.sales_person_name} | ${c.branch} | 📞 ${c.mob_no}`);
    });
  }
}

async function main() {
  console.log('🚀 Starting Google Sheet to Supabase Upload\n');
  
  // Fetch Google Sheet
  const csvData = await fetchGoogleSheetData();
  if (!csvData) {
    console.error('\n❌ Failed to fetch Google Sheet data. Exiting.');
    process.exit(1);
  }
  
  // Parse CSV
  const customers = parseCSV(csvData);
  if (customers.length === 0) {
    console.error('\n❌ No customers found in Google Sheet. Exiting.');
    process.exit(1);
  }
  
  // Upload to Supabase
  const success = await uploadToSupabase(customers);
  if (!success) {
    console.error('\n❌ Upload failed. Exiting.');
    process.exit(1);
  }
  
  // Verify
  await verifiyData();
  
  console.log('\n🎉 Done! Your real customer data is now in Supabase!');
  console.log('   Open your app and select a sales person to see the real customers.');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
