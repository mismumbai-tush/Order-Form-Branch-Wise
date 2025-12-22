#!/usr/bin/env node

/**
 * Direct Supabase Query Diagnostic Script
 * Checks what data actually exists in the customers table
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

console.log('🔍 SUPABASE DIAGNOSTIC SCRIPT');
console.log('================================\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables:');
  console.error('   VITE_SUPABASE_URL:', supabaseUrl ? '✅ SET' : '❌ NOT SET');
  console.error('   VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✅ SET' : '❌ NOT SET');
  console.error('\n💡 Make sure to set these in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnoseDatabase() {
  try {
    console.log('📊 Fetching ALL customers from database...\n');
    
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*')
      .limit(10000); // Get all records

    if (error) {
      console.error('❌ Error fetching customers:', error.message);
      return;
    }

    console.log(`✅ Total Customers: ${customers?.length || 0}\n`);

    if (!customers || customers.length === 0) {
      console.log('⚠️  No customers found in database!');
      return;
    }

    // Analyze branches
    const branchMap = {};
    const spMap = {};

    customers.forEach(c => {
      // Track branches
      const branch = c.branch || '(no branch)';
      branchMap[branch] = (branchMap[branch] || 0) + 1;

      // Track sales persons
      const sp = c.sales_person_name || '(no sales person)';
      if (!spMap[sp]) {
        spMap[sp] = { count: 0, branches: new Set(), samples: [] };
      }
      spMap[sp].count++;
      spMap[sp].branches.add(branch);
      if (spMap[sp].samples.length < 2) {
        spMap[sp].samples.push({
          customer_name: c.customer_name || c.name,
          branch: branch
        });
      }
    });

    // Display branch analysis
    console.log('📍 BRANCHES IN DATABASE:');
    console.log('========================');
    Object.entries(branchMap).forEach(([branch, count]) => {
      console.log(`  ${branch}: ${count} customers`);
    });

    // Display sales person analysis
    console.log('\n👤 SALES PERSONS IN DATABASE:');
    console.log('=============================');
    Object.entries(spMap).forEach(([sp, info]) => {
      const branches = Array.from(info.branches).join(', ');
      console.log(`\n  ${sp}`);
      console.log(`    • Count: ${info.count} customers`);
      console.log(`    • Branches: ${branches}`);
      console.log(`    • Samples:`);
      info.samples.forEach(sample => {
        console.log(`        - ${sample.customer_name} (${sample.branch})`);
      });
    });

    // Detailed check for each branch and sales person combo
    console.log('\n\n🔗 BRANCH + SALES PERSON COMBINATIONS:');
    console.log('=====================================');
    
    const branches = Object.keys(branchMap);
    branches.forEach(branch => {
      console.log(`\n📍 ${branch}:`);
      const branchCustomers = customers.filter(c => c.branch === branch);
      const branchSPs = new Set(branchCustomers.map(c => c.sales_person_name || '(no sp)'));
      
      branchSPs.forEach(sp => {
        const count = branchCustomers.filter(c => c.sales_person_name === sp).length;
        console.log(`    • ${sp}: ${count} customers`);
      });
    });

    // Check for specific sales persons mentioned by user
    console.log('\n\n🔎 CHECKING SPECIFIC SALES PERSONS:');
    console.log('===================================');
    
    const targetSPs = [
      'Vishal Ambhore',
      'Amit Korgaonkar',
      'Kamlesh Sutar',
      'Rakesh Jain',
      'Pradeep Jadhav',
      'Santosh Pachratkar',
      'Durgesh',
      'Rajesh',
      'Shiv Ratan',
      'Vijay Sutar'
    ];

    targetSPs.forEach(targetSp => {
      const found = customers.filter(c => 
        (c.sales_person_name || '').toLowerCase() === targetSp.toLowerCase()
      );
      console.log(`\n  "${targetSp}": ${found.length} customers`);
      if (found.length > 0) {
        console.log(`    ✅ FOUND in branches: ${new Set(found.map(c => c.branch)).toString()}`);
        console.log(`    Sample: ${found[0].customer_name} - Branch: ${found[0].branch}`);
      } else {
        console.log(`    ❌ NOT FOUND in database`);
      }
    });

    // Show first few customers for reference
    console.log('\n\n📋 FIRST 5 CUSTOMERS (FULL DATA):');
    console.log('================================');
    customers.slice(0, 5).forEach((c, i) => {
      console.log(`\n${i + 1}. ${c.customer_name || c.name}`);
      console.log(`   Branch: ${c.branch}`);
      console.log(`   Sales Person: ${c.sales_person_name}`);
      console.log(`   Email: ${c.email_id || c.email}`);
      console.log(`   Phone: ${c.mob_no || c.contact_no}`);
    });

  } catch (err) {
    console.error('❌ Exception:', err);
  }
}

diagnoseDatabase();
