import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllData() {
  console.log('🔍 Checking ALL data in Supabase customers table...\n');

  try {
    // Get all customers (no limit to see everything)
    const { data: allCustomers, error } = await supabase
      .from('customers')
      .select('*')
      .limit(5000); // Increase limit to get more data

    if (error) {
      console.error('❌ Error fetching customers:', error);
      return;
    }

    console.log(`✅ Total customers in database: ${allCustomers.length}\n`);

    // Get unique branches
    const uniqueBranches = [...new Set(allCustomers.map(c => c.branch))];
    console.log(`📍 Unique branches in database:\n   ${uniqueBranches.join('\n   ')}\n`);

    // Get unique sales persons
    const uniqueSalesPersons = [...new Set(allCustomers.map(c => c.sales_person_name))];
    console.log(`👤 Unique sales persons in database:\n   ${uniqueSalesPersons.join('\n   ')}\n`);

    // Show breakdown by branch and sales person
    console.log('📊 BREAKDOWN BY BRANCH AND SALES PERSON:\n');
    
    for (const branch of uniqueBranches) {
      const branchCustomers = allCustomers.filter(c => c.branch === branch);
      console.log(`\n🏢 BRANCH: "${branch}" (${branchCustomers.length} customers)`);
      
      const salesPersonsInBranch = [...new Set(branchCustomers.map(c => c.sales_person_name))];
      for (const sp of salesPersonsInBranch) {
        const spCustomers = branchCustomers.filter(c => c.sales_person_name === sp);
        console.log(`   ├─ ${sp}: ${spCustomers.length} customers`);
      }
    }

    // Sample data
    console.log('\n\n📋 SAMPLE CUSTOMERS:\n');
    console.log('First 5 customers from database:');
    allCustomers.slice(0, 5).forEach((c, i) => {
      console.log(`\n${i + 1}. Name: ${c.customer_name}`);
      console.log(`   Branch: ${c.branch}`);
      console.log(`   Sales Person: ${c.sales_person_name}`);
      console.log(`   Contact: ${c.mob_no || c.contact_no}`);
    });

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

checkAllData();
