import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getUniqueSalesPersons() {
  const { data, error } = await supabase
    .from('customers')
    .select('sales_person_name')
    .limit(1000);
  
  if (error) {
    console.error('Error:', error.message);
    return;
  }

  const unique = [...new Set(data?.map(d => d.sales_person_name) || [])].sort();
  console.log('\n✅ ACTUAL SALES PERSONS IN MUMBAI BRANCH:');
  unique.forEach((sp, i) => {
    if (sp) console.log(`${i + 1}. ${sp}`);
  });
  
  console.log(`\nTotal: ${unique.length} unique sales persons`);
}

getUniqueSalesPersons();
