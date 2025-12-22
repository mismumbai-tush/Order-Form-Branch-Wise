import { createClient } from '@supabase/supabase-js';

const url = 'https://qtctkhkykkwntecxgezs.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM';
const client = createClient(url, key);

(async () => {
  const { data, error } = await client.from('customers').select('customer_name, sales_person_name, branch').limit(100);
  
  if (error) {
    console.error('ERROR:', error.message);
  } else {
    console.log('\n📊 REAL CUSTOMER NAMES IN DATABASE:\n');
    const byBranch = {};
    data.forEach((row) => {
      if (!byBranch[row.branch]) byBranch[row.branch] = [];
      byBranch[row.branch].push(row);
    });
    
    Object.keys(byBranch).forEach(branch => {
      console.log(`\n${branch}:`);
      byBranch[branch].slice(0, 10).forEach((row, i) => {
        console.log(`  ${i + 1}. ${row.customer_name} (${row.sales_person_name})`);
      });
      if (byBranch[branch].length > 10) {
        console.log(`  ... and ${byBranch[branch].length - 10} more`);
      }
    });
    console.log(`\nTotal customers: ${data.length}`);
  }
})();
