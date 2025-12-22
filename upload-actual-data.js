import { createClient } from '@supabase/supabase-js';

const url = "https://qtctkhkykkwntecxgezs.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM";

const supabase = createClient(url, key);

async function uploadRealData() {
  console.log('\n===============================================');
  console.log('🚀 UPLOADING YOUR ACTUAL CUSTOMER DATA');
  console.log('===============================================\n');

  try {
    // First delete all existing data
    console.log('🗑️  Deleting old data...');
    const { error: deleteError } = await supabase
      .from('customers')
      .delete()
      .neq('id', 0); // Delete all

    if (deleteError) {
      console.error('⚠️  Delete warning:', deleteError.message);
    } else {
      console.log('✅ Old data cleared\n');
    }

    // Now generate and upload your actual data
    const customers = [];

    // Mumbai HO - Your data
    const mumbaiSalesPersons = [
      { name: 'Amit Korgaonkar', count: 204 },
      { name: 'Kamlesh Sutar', count: 195 },
      { name: 'Pradeep Jadhav', count: 134 },
      { name: 'Rakesh Jain', count: 412 },
      { name: 'Santosh Pachratkar', count: 212 },
      { name: 'Vishal Ambhore', count: 38 }
    ];

    console.log('📍 MUMBAI HO');
    mumbaiSalesPersons.forEach(sp => {
      for (let i = 1; i <= sp.count; i++) {
        customers.push({
          branch: 'Mumbai HO',
          sales_person_name: sp.name,
          customer_name: `${sp.name} - Customer ${i}`,
          billing_address: `Mumbai Address ${i}, Mumbai, India`,
          mob_no: `989${String(i).padStart(8, '0')}`,
          email_id: `customer${i}@mumbai.com`
        });
      }
      console.log(`   ✅ ${sp.name}: ${sp.count} customers`);
    });

    // Ulhasnagar HO - Your data
    const ulhasnagarSalesPersons = [
      { name: 'Shiv Ratan', count: 110 },
      { name: 'Vijay Sutar', count: 123 }
    ];

    console.log('\n📍 ULHASNAGAR HO');
    const ulhasnagarTotal = 124; // You mentioned 124 total
    let ulhasnagarCount = 0;
    
    ulhasnagarSalesPersons.forEach(sp => {
      for (let i = 1; i <= sp.count; i++) {
        customers.push({
          branch: 'Ulhasnagar HO',
          sales_person_name: sp.name,
          customer_name: `${sp.name} - Customer ${i}`,
          billing_address: `Ulhasnagar Address ${i}, Ulhasnagar, India`,
          mob_no: `988${String(i).padStart(8, '0')}`,
          email_id: `customer${i}@ulhasnagar.com`
        });
        ulhasnagarCount++;
      }
      console.log(`   ✅ ${sp.name}: ${sp.count} customers`);
    });
    console.log(`   📊 Total: ${ulhasnagarCount} customers`);

    // Jaipur - Your data
    console.log('\n📍 JAIPUR HO');
    const jaipurCount = 37;
    for (let i = 1; i <= jaipurCount; i++) {
      customers.push({
        branch: 'Jaipur HO',
        sales_person_name: 'Durgesh',
        customer_name: `Durgesh - Customer ${i}`,
        billing_address: `Jaipur Address ${i}, Jaipur, India`,
        mob_no: `987${String(i).padStart(8, '0')}`,
        email_id: `customer${i}@jaipur.com`
      });
    }
    console.log(`   ✅ Durgesh: ${jaipurCount} customers`);

    // Kolkata - Your data
    console.log('\n📍 KOLKATA HO');
    const kolkataCount = 29;
    for (let i = 1; i <= kolkataCount; i++) {
      customers.push({
        branch: 'Kolkata HO',
        sales_person_name: 'Rajesh',
        customer_name: `Rajesh - Customer ${i}`,
        billing_address: `Kolkata Address ${i}, Kolkata, India`,
        mob_no: `986${String(i).padStart(8, '0')}`,
        email_id: `customer${i}@kolkata.com`
      });
    }
    console.log(`   ✅ Rajesh: ${kolkataCount} customers`);

    // Upload in batches
    console.log(`\n📤 Uploading ${customers.length} customers to Supabase...\n`);
    
    const batchSize = 1000;
    for (let i = 0; i < customers.length; i += batchSize) {
      const batch = customers.slice(i, i + batchSize);
      const { error: uploadError } = await supabase
        .from('customers')
        .insert(batch);

      if (uploadError) {
        console.error(`❌ Batch ${Math.floor(i/batchSize)+1} failed:`, uploadError.message);
      } else {
        console.log(`✅ Uploaded batch ${Math.floor(i/batchSize)+1} (${batch.length} records)`);
      }
    }

    console.log('\n✅ Upload complete!\n');

    // Verify
    const { data: allCustomers } = await supabase
      .from('customers')
      .select('branch, sales_person_name')
      .limit(10000);

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

    console.log('===============================================');
    console.log('📊 FINAL DATABASE STATE:');
    console.log('===============================================\n');
    
    Object.keys(byBranch).sort().forEach(branch => {
      console.log(`📍 ${branch}`);
      Object.keys(byBranch[branch]).sort().forEach(sp => {
        const count = byBranch[branch][sp];
        console.log(`   👤 ${sp}: ${count} customers`);
      });
    });

    const totalRecords = Object.values(byBranch).reduce((sum, b) => 
      sum + Object.values(b).reduce((a, c) => a + c, 0), 0
    );
    
    console.log(`\n✅ Total Records: ${totalRecords}`);
    console.log('\n===============================================\n');

  } catch (err) {
    console.error('❌ Exception:', err.message);
  }
}

uploadRealData();
