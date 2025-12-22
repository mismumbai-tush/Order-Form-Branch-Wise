import { createClient } from '@supabase/supabase-js';

const url = "https://qtctkhkykkwntecxgezs.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM";

const supabase = createClient(url, key);

async function quickCheck() {
  const { data } = await supabase.from('customers').select('branch, sales_person_name').limit(2000);
  const byBranch = {};
  data.forEach(c => {
    const b = c.branch || 'UNKNOWN';
    if (!byBranch[b]) byBranch[b] = {};
    const sp = c.sales_person_name || 'UNKNOWN';
    if (!byBranch[b][sp]) byBranch[b][sp] = 0;
    byBranch[b][sp]++;
  });
  
  console.log('\n📊 DATABASE STATE:\n');
  Object.keys(byBranch).sort().forEach(b => {
    console.log(`${b}`);
    Object.keys(byBranch[b]).forEach(sp => {
      console.log(`  - ${sp}: ${byBranch[b][sp]}`);
    });
  });
}

quickCheck();
