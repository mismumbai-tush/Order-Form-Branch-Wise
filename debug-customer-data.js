import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qtctkhkykkwntecxgezs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3RraGt5a2t3bnRlY3hnZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Mzc5MzEsImV4cCI6MjA3OTIxMzkzMX0.JYwNRCuadt34wvKpIwjQjvfkMVr73iCphMnZ3oc-xFM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugCustomerData() {
  try {
    console.log('🔍 DEBUGGING CUSTOMER DATA...\n');

    // Get total count
    const { count: totalCount } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Total Customers in Database: ${totalCount}\n`);

    // Get all data WITHOUT limit
    let allFetchedData = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error) {
        console.error(`❌ Error on page ${page}:`, error);
        break;
      }

      if (!data || data.length === 0) {
        hasMore = false;
      } else {
        allFetchedData = [...allFetchedData, ...data];
        console.log(`   Fetched page ${page}: ${data.length} records (total: ${allFetchedData.length})`);
        page++;
      }
    }

    const allData = allFetchedData;

    // Group by branch
    const byBranch = {};
    allData.forEach(c => {
      const branch = c.branch || 'Unknown';
      if (!byBranch[branch]) byBranch[branch] = [];
      byBranch[branch].push(c);
    });

    console.log('📍 CUSTOMERS BY BRANCH:');
    Object.keys(byBranch).sort().forEach(branch => {
      console.log(`   ${branch}: ${byBranch[branch].length} customers`);
    });

    // Group by sales person
    const bySalesPerson = {};
    allData.forEach(c => {
      const sp = c.sales_person_name || 'Unknown';
      if (!bySalesPerson[sp]) bySalesPerson[sp] = [];
      bySalesPerson[sp].push(c);
    });

    console.log('\n👤 CUSTOMERS BY SALES PERSON:');
    Object.keys(bySalesPerson).sort().forEach(sp => {
      console.log(`   ${sp}: ${bySalesPerson[sp].length} customers`);
    });

    // Group by branch AND sales person
    console.log('\n📍👤 CUSTOMERS BY BRANCH & SALES PERSON:');
    Object.keys(byBranch).sort().forEach(branch => {
      console.log(`\n   ${branch}:`);
      const salesPersons = {};
      byBranch[branch].forEach(c => {
        const sp = c.sales_person_name || 'Unknown';
        if (!salesPersons[sp]) salesPersons[sp] = 0;
        salesPersons[sp]++;
      });
      Object.keys(salesPersons).sort().forEach(sp => {
        console.log(`      ${sp}: ${salesPersons[sp]}`);
      });
    });

    // Sample data structure
    console.log('\n📋 SAMPLE CUSTOMER DATA:');
    console.log(JSON.stringify(allData.slice(0, 2), null, 2));

    // Check for duplicate sales person names
    console.log('\n🔎 CHECKING FOR DATA ISSUES:');
    
    // Check for null/empty sales_person_name
    const nullSpName = allData.filter(c => !c.sales_person_name);
    console.log(`   Customers with no sales_person_name: ${nullSpName.length}`);

    // Check for null/empty branch
    const nullBranch = allData.filter(c => !c.branch);
    console.log(`   Customers with no branch: ${nullBranch.length}`);

    // Check exact sales person matches
    console.log('\n🔍 TESTING SALES PERSON FILTERS:');
    const testSalesPersons = ['Vishal Ambhore', 'Amit', 'Kamlesh', 'Pradeep', 'Rakesh', 'Santosh'];
    testSalesPersons.forEach(sp => {
      const matches = allData.filter(c => 
        (c.sales_person_name || '').toLowerCase().trim() === sp.toLowerCase().trim()
      );
      console.log(`   "${sp}": ${matches.length} customers`);
    });

  } catch (err) {
    console.error('❌ Error:', err);
  }
}

debugCustomerData();
