import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkDatabase() {
  console.log('\n🔍 CHECKING SUPABASE DATABASE...\n');
  
  try {
    // Fetch ALL customers without any filters
    const { data, error } = await supabase
      .from('customers')
      .select('id, customer_name, branch, sales_person_name')
      .limit(5000); // Get all data
    
    if (error) {
      console.error('❌ Error fetching data:', error);
      return;
    }
    
    console.log(`✅ Total customers in database: ${data.length}\n`);
    
    // Group by branch
    const byBranch = {};
    data.forEach(customer => {
      const branch = customer.branch || 'NO_BRANCH';
      if (!byBranch[branch]) {
        byBranch[branch] = {};
      }
      const sp = customer.sales_person_name || 'NO_SALES_PERSON';
      if (!byBranch[branch][sp]) {
        byBranch[branch][sp] = [];
      }
      byBranch[branch][sp].push(customer);
    });
    
    // Display results
    console.log('📊 DATABASE STRUCTURE:\n');
    Object.keys(byBranch).forEach(branch => {
      console.log(`\n🏢 BRANCH: "${branch}"`);
      Object.keys(byBranch[branch]).forEach(sp => {
        const count = byBranch[branch][sp].length;
        console.log(`   👤 ${sp}: ${count} customers`);
        // Show first 2 customer names
        byBranch[branch][sp].slice(0, 2).forEach(cust => {
          console.log(`      - ${cust.customer_name}`);
        });
        if (count > 2) console.log(`      ... and ${count - 2} more`);
      });
    });
    
    console.log('\n\n📋 UNIQUE BRANCHES:', Object.keys(byBranch));
    console.log('📋 ALL SALES PERSONS IN DATABASE:');
    const allSP = new Set();
    Object.values(byBranch).forEach(branch => {
      Object.keys(branch).forEach(sp => allSP.add(sp));
    });
    Array.from(allSP).forEach(sp => console.log(`   - ${sp}`));
    
  } catch (err) {
    console.error('❌ Exception:', err);
  }
}

checkDatabase();
