import { createClient } from '@supabase/supabase-js';

const url = "https://qtctkhkykkwntecxgezs.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM";

const supabase = createClient(url, key);

async function checkLimit() {
  console.log('\n📊 Checking database constraints...\n');
  
  try {
    // Try to get exact count
    const { count, error } = await supabase
      .from('customers')
      .select('id', { count: 'exact', head: true });

    if (error) {
      console.log('❌ Error:', error.message);
    } else {
      console.log(`✅ Exact count: ${count} customers`);
    }

    // Get the actual data
    const { data, error: dataError } = await supabase
      .from('customers')
      .select('*');

    if (dataError) {
      console.log('Error fetching:', dataError.message);
    } else {
      console.log(`✅ Fetched: ${data.length} records`);

      // Group by branch
      const byBranch = {};
      data.forEach(c => {
        const b = c.branch;
        if (!byBranch[b]) byBranch[b] = {};
        const sp = c.sales_person_name;
        if (!byBranch[b][sp]) byBranch[b][sp] = 0;
        byBranch[b][sp]++;
      });

      console.log('\n📍 Current Distribution:');
      Object.keys(byBranch).sort().forEach(b => {
        let total = 0;
        console.log(`\n${b}`);
        Object.keys(byBranch[b]).forEach(sp => {
          const count = byBranch[b][sp];
          total += count;
          console.log(`  - ${sp}: ${count}`);
        });
        console.log(`  📊 Subtotal: ${total}`);
      });
    }
  } catch (err) {
    console.error('Exception:', err.message);
  }

  console.log('\n');
}

checkLimit();
