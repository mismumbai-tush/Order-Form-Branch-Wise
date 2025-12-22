import { createClient } from '@supabase/supabase-js';

const url = "https://qtctkhkykkwntecxgezs.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM";

const supabase = createClient(url, key);

async function checkData() {
  try {
    // Get count
    const { count } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });

    console.log(`\n✅ Total customers: ${count}\n`);

    // Get all with pagination
    const { data: allCustomers } = await supabase
      .from('customers')
      .select('*')
      .order('id');

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

    console.log('🏢 COMPLETE BRANCH DATA:\n');
    Object.keys(byBranch).sort().forEach(branch => {
      console.log(`📍 ${branch}`);
      Object.keys(byBranch[branch]).sort().forEach(sp => {
        const cnt = byBranch[branch][sp];
        console.log(`   👤 ${sp}: ${cnt} customers`);
      });
    });

  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkData();
