import { createClient } from '@supabase/supabase-js';

const url = "https://qtctkhkykkwntecxgezs.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM";

const supabase = createClient(url, key);

async function uploadByBranch() {
  console.log('\n===============================================');
  console.log('🚀 UPLOADING DATA BY BRANCH');
  console.log('===============================================\n');

  try {
    // Delete all first
    console.log('🗑️  Clearing database...');
    await supabase.from('customers').delete().neq('id', 0);
    console.log('✅ Cleared\n');

    // Jaipur
    console.log('📍 Uploading JAIPUR HO (37 customers)...');
    const jaipurCustomers = [];
    for (let i = 1; i <= 37; i++) {
      jaipurCustomers.push({
        branch: 'Jaipur HO',
        sales_person_name: 'Durgesh',
        customer_name: `Jaipur Customer ${i}`,
        billing_address: `Jaipur Address ${i}`,
        mob_no: `+91-${Math.floor(Math.random()*9000000000 + 1000000000)}`,
        email_id: `jaipur.cust${i}@example.com`
      });
    }
    const { error: jErr } = await supabase.from('customers').insert(jaipurCustomers);
    console.log(jErr ? `❌ Error: ${jErr.message}` : `✅ Jaipur done\n`);

    // Kolkata
    console.log('📍 Uploading KOLKATA HO (29 customers)...');
    const kolkataCustomers = [];
    for (let i = 1; i <= 29; i++) {
      kolkataCustomers.push({
        branch: 'Kolkata HO',
        sales_person_name: 'Rajesh',
        customer_name: `Kolkata Customer ${i}`,
        billing_address: `Kolkata Address ${i}`,
        mob_no: `+91-${Math.floor(Math.random()*9000000000 + 1000000000)}`,
        email_id: `kolkata.cust${i}@example.com`
      });
    }
    const { error: kErr } = await supabase.from('customers').insert(kolkataCustomers);
    console.log(kErr ? `❌ Error: ${kErr.message}` : `✅ Kolkata done\n`);

    // Ulhasnagar
    console.log('📍 Uploading ULHASNAGAR HO (233 customers)...');
    const ulsCustomers = [];
    
    // Shiv Ratan: 110
    for (let i = 1; i <= 110; i++) {
      ulsCustomers.push({
        branch: 'Ulhasnagar HO',
        sales_person_name: 'Shiv Ratan',
        customer_name: `Shiv Customer ${i}`,
        billing_address: `Ulhasnagar Address ${i}`,
        mob_no: `+91-${Math.floor(Math.random()*9000000000 + 1000000000)}`,
        email_id: `shiv.cust${i}@example.com`
      });
    }
    
    // Vijay Sutar: 123
    for (let i = 1; i <= 123; i++) {
      ulsCustomers.push({
        branch: 'Ulhasnagar HO',
        sales_person_name: 'Vijay Sutar',
        customer_name: `Vijay Customer ${i}`,
        billing_address: `Ulhasnagar Address ${i}`,
        mob_no: `+91-${Math.floor(Math.random()*9000000000 + 1000000000)}`,
        email_id: `vijay.cust${i}@example.com`
      });
    }
    
    const { error: uErr } = await supabase.from('customers').insert(ulsCustomers);
    console.log(uErr ? `❌ Error: ${uErr.message}` : `✅ Ulhasnagar done\n`);

    // Mumbai (keep your existing if possible, otherwise generate)
    console.log('📍 Uploading MUMBAI HO (1195 customers)...');
    const mumbaiCustomers = [];
    
    const mumbaiSalesPersons = [
      { name: 'Amit Korgaonkar', count: 204 },
      { name: 'Kamlesh Sutar', count: 195 },
      { name: 'Pradeep Jadhav', count: 134 },
      { name: 'Rakesh Jain', count: 412 },
      { name: 'Santosh Pachratkar', count: 212 },
      { name: 'Vishal Ambhore', count: 38 }
    ];

    mumbaiSalesPersons.forEach(sp => {
      for (let i = 1; i <= sp.count; i++) {
        mumbaiCustomers.push({
          branch: 'Mumbai HO',
          sales_person_name: sp.name,
          customer_name: `${sp.name} - Cust ${i}`,
          billing_address: `Mumbai Address ${i}`,
          mob_no: `+91-${Math.floor(Math.random()*9000000000 + 1000000000)}`,
          email_id: `${sp.name.toLowerCase().replace(/\s/g,'')}.cust${i}@example.com`
        });
      }
    });
    
    // Upload Mumbai in batches
    for (let i = 0; i < mumbaiCustomers.length; i += 500) {
      const batch = mumbaiCustomers.slice(i, i + 500);
      const { error: mErr } = await supabase.from('customers').insert(batch);
      if (mErr) {
        console.log(`❌ Mumbai batch error: ${mErr.message}`);
        break;
      }
    }
    console.log(`✅ Mumbai done\n`);

    // Final verification
    console.log('===============================================');
    console.log('📊 VERIFYING UPLOAD:');
    console.log('===============================================\n');

    const { data: all } = await supabase.from('customers').select('branch, sales_person_name').limit(5000);
    
    const summary = {};
    all.forEach(c => {
      const b = c.branch;
      if (!summary[b]) summary[b] = {};
      const sp = c.sales_person_name;
      if (!summary[b][sp]) summary[b][sp] = 0;
      summary[b][sp]++;
    });

    Object.keys(summary).sort().forEach(b => {
      console.log(`📍 ${b}`);
      Object.keys(summary[b]).sort().forEach(sp => {
        console.log(`   👤 ${sp}: ${summary[b][sp]}`);
      });
    });

    const total = all.length;
    console.log(`\n✅ TOTAL: ${total} customers`);
    console.log('\n===============================================\n');

  } catch (err) {
    console.error('❌ Exception:', err.message);
  }
}

uploadByBranch();
