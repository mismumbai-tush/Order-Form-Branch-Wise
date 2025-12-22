import { createClient } from '@supabase/supabase-js';

const url = "https://qtctkhkykkwntecxgezs.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM";

const supabase = createClient(url, key);

async function analyzeDatabase() {
  console.log('\n===============================================');
  console.log('📊 SUPABASE DATABASE ANALYSIS');
  console.log('===============================================\n');

  try {
    // Get ALL customers
    const { data: allCustomers, error } = await supabase
      .from('customers')
      .select('id, customer_name, branch, sales_person_name')
      .limit(10000);

    if (error) {
      console.error('❌ ERROR:', error.message);
      return;
    }

    console.log(`✅ Total Customers in Database: ${allCustomers.length}\n`);

    // Group by branch
    const byBranch = {};
    allCustomers.forEach(c => {
      const branch = c.branch || 'UNKNOWN';
      if (!byBranch[branch]) {
        byBranch[branch] = {};
      }
      const sp = c.sales_person_name || 'UNKNOWN';
      if (!byBranch[branch][sp]) {
        byBranch[branch][sp] = 0;
      }
      byBranch[branch][sp]++;
    });

    // Display by branch
    console.log('🏢 BRANCHES IN DATABASE:');
    Object.keys(byBranch).sort().forEach(branch => {
      console.log(`\n  📍 ${branch}`);
      Object.keys(byBranch[branch]).sort().forEach(sp => {
        const count = byBranch[branch][sp];
        console.log(`     👤 ${sp}: ${count} customers`);
      });
    });

    console.log('\n===============================================');
    console.log('\n📋 QUICK REFERENCE:');
    console.log('   Unique Branches:', Object.keys(byBranch).sort());
    const allSP = new Set();
    Object.values(byBranch).forEach(b => {
      Object.keys(b).forEach(sp => allSP.add(sp));
    });
    console.log('   Unique Sales Persons:', Array.from(allSP).sort());
    console.log('\n===============================================\n');

  } catch (err) {
    console.error('❌ EXCEPTION:', err.message);
  }
}

analyzeDatabase();
