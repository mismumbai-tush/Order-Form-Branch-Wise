import { createClient } from '@supabase/supabase-js';

const url = "https://qtctkhkykkwntecxgezs.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM";

const supabase = createClient(url, key);

async function addTestData() {
  console.log('\n===============================================');
  console.log('📊 ADDING TEST DATA TO SUPABASE');
  console.log('===============================================\n');

  const testCustomers = [
    // Vishal Ambhore (Mumbai)
    {
      branch: 'Mumbai HO',
      sales_person_name: 'Vishal Ambhore',
      customer_name: 'Vishal Test Company 1',
      billing_address: 'Vishal Building, Mumbai',
      mob_no: '9876543290',
      email_id: 'vishal.test1@example.com'
    },
    {
      branch: 'Mumbai HO',
      sales_person_name: 'Vishal Ambhore',
      customer_name: 'Vishal Test Company 2',
      billing_address: 'Mumbai Test Address',
      mob_no: '9876543291',
      email_id: 'vishal.test2@example.com'
    },
    // Jaipur (Durgesh)
    {
      branch: 'Jaipur HO',
      sales_person_name: 'Durgesh',
      customer_name: 'Durgesh Test Company 1',
      billing_address: 'Jaipur Test Address',
      mob_no: '9999999990',
      email_id: 'durgesh.test1@example.com'
    },
    {
      branch: 'Jaipur HO',
      sales_person_name: 'Durgesh',
      customer_name: 'Durgesh Test Company 2',
      billing_address: 'Jaipur Test Building',
      mob_no: '9999999991',
      email_id: 'durgesh.test2@example.com'
    },
    // Kolkata (Rajesh)
    {
      branch: 'Kolkata HO',
      sales_person_name: 'Rajesh',
      customer_name: 'Rajesh Test Company 1',
      billing_address: 'Kolkata Test Address',
      mob_no: '8888888880',
      email_id: 'rajesh.test1@example.com'
    },
    {
      branch: 'Kolkata HO',
      sales_person_name: 'Rajesh',
      customer_name: 'Rajesh Test Company 2',
      billing_address: 'Kolkata Test Building',
      mob_no: '8888888881',
      email_id: 'rajesh.test2@example.com'
    },
    // Ulhasnagar (Vijay Sutar)
    {
      branch: 'Ulhasnagar HO',
      sales_person_name: 'Vijay Sutar',
      customer_name: 'Vijay Test Company 1',
      billing_address: 'Ulhasnagar Test Address',
      mob_no: '7777777770',
      email_id: 'vijay.test1@example.com'
    },
    {
      branch: 'Ulhasnagar HO',
      sales_person_name: 'Vijay Sutar',
      customer_name: 'Vijay Test Company 2',
      billing_address: 'Ulhasnagar Test Building',
      mob_no: '7777777771',
      email_id: 'vijay.test2@example.com'
    },
    // Ulhasnagar (Shiv Ratan)
    {
      branch: 'Ulhasnagar HO',
      sales_person_name: 'Shiv Ratan',
      customer_name: 'Shiv Test Company 1',
      billing_address: 'Ulhasnagar Test Address',
      mob_no: '7777777772',
      email_id: 'shiv.test1@example.com'
    }
  ];

  try {
    const { data, error } = await supabase
      .from('customers')
      .insert(testCustomers);

    if (error) {
      console.error('❌ Upload Error:', error.message);
      console.error('   Code:', error.code);
      return;
    }

    console.log(`✅ Successfully added ${testCustomers.length} test customers!\n`);

    // Now check the data
    const { data: allCustomers } = await supabase
      .from('customers')
      .select('*')
      .limit(10000);

    console.log(`📊 Total customers in database: ${allCustomers.length}\n`);

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

    console.log('🏢 BRANCHES IN DATABASE NOW:\n');
    Object.keys(byBranch).sort().forEach(branch => {
      console.log(`📍 ${branch}`);
      Object.keys(byBranch[branch]).sort().forEach(sp => {
        const count = byBranch[branch][sp];
        console.log(`   👤 ${sp}: ${count} customers`);
      });
    });

    console.log('\n===============================================\n');

  } catch (err) {
    console.error('❌ Exception:', err.message);
  }
}

addTestData();
