import { createClient } from '@supabase/supabase-js';

const url = "https://qtctkhkykkwntecxgezs.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM";

const supabase = createClient(url, key);

async function checkRealData() {
  try {
    // Get some real customer samples
    const { data } = await supabase
      .from('customers')
      .select('*')
      .limit(50);

    console.log('\n===============================================');
    console.log('🔍 REAL CUSTOMER DATA FROM SUPABASE');
    console.log('===============================================\n');

    data.forEach((c, idx) => {
      console.log(`${idx + 1}. ${c.customer_name || c.name}`);
      console.log(`   Branch: ${c.branch}`);
      console.log(`   Sales Person: ${c.sales_person_name}`);
      console.log(`   Email: ${c.email_id || c.email || 'N/A'}`);
      console.log(`   Mobile: ${c.mob_no || c.contact_no || 'N/A'}`);
      console.log(`   Address: ${c.billing_address}`);
      console.log('');
    });

    console.log('===============================================\n');

  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkRealData();
