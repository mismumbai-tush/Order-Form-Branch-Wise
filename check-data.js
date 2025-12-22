import { createClient } from '@supabase/supabase-js';

const url = "https://qtctkhkykkwntecxgezs.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM";

const supabase = createClient(url, key);

async function checkData() {
  try {
    // Get ALL customers with ALL columns
    const { data: allCustomers, error } = await supabase
      .from('customers')
      .select('*')
      .limit(10000);

    if (error) {
      console.error('❌ ERROR:', error.message);
      return;
    }

    console.log('\n===============================================');
    console.log('📊 CURRENT DATABASE STATE');
    console.log('===============================================\n');
    console.log(`✅ Total Customers: ${allCustomers.length}\n`);

    // Group by branch
    const byBranch = {};
    allCustomers.forEach(c => {
      const branch = c.branch || 'UNKNOWN';
      if (!byBranch[branch]) {
        byBranch[branch] = {};
      }
      const sp = c.sales_person_name || 'UNKNOWN';
      if (!byBranch[branch][sp]) {
        byBranch[branch][sp] = [];
      }
      byBranch[branch][sp].push(c);
    });

    console.log('🏢 BRANCH OVERVIEW:\n');
    Object.keys(byBranch).sort().forEach(branch => {
      console.log(`📍 ${branch}`);
      Object.keys(byBranch[branch]).sort().forEach(sp => {
        const customers = byBranch[branch][sp];
        console.log(`   👤 ${sp}: ${customers.length} customers`);
        if (customers.length > 0) {
          const first = customers[0];
          console.log(`      Name: ${first.customer_name || first.name}`);
          console.log(`      Email: ${first.email_id || first.email || 'N/A'}`);
          console.log(`      Contact: ${first.contact_no || first.mob_no || 'N/A'}`);
        }
      });
    });

    console.log('\n===============================================');
    console.log('📋 COLUMN MAPPING:');
    if (allCustomers.length > 0) {
      const first = allCustomers[0];
      console.log('\nColumns in database:');
      Object.keys(first).forEach(col => {
        console.log(`   ✓ ${col}: "${first[col]}"`);
      });
    }
    console.log('\n===============================================\n');

  } catch (err) {
    console.error('❌ EXCEPTION:', err.message);
  }
}

checkData();
