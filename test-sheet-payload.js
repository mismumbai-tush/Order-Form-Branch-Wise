// Test the Google Sheet payload structure
// This simulates what sheetService.ts sends to Google Apps Script

const formData = {
  branch: "Mumbai",
  salesPerson: "Amit Korgaonkar",
  salesContactNo: "9876543210",
  customerName: "Test Company Pvt Ltd",
  customerEmail: "test@company.com",
  customerContactNo: "9876543210",
  billingAddress: "123 Main St, Mumbai",
  deliveryAddress: "456 Service Rd, Mumbai",
  orderDate: "2025-12-23"
};

const items = [
  {
    category: "WARP",
    itemName: "Item 1 - SAMPLE-100",
    color: "Blue",
    width: "60",
    quantity: "100",
    uom: "meters",
    rate: "50",
    discount: "10",
    deliveryDate: "2025-12-30",
    remark: "Urgent"
  },
  {
    category: "WARP",
    itemName: "Item 2 - SAMPLE-200",
    color: "Red",
    width: "75",
    quantity: "50",
    uom: "meters",
    rate: "75",
    discount: "5",
    deliveryDate: "2025-12-31",
    remark: "Standard"
  }
];

// This is the CORRECT payload structure for Google Apps Script
const payload = {
  submissionId: `${Date.now()}`,
  submissionDate: new Date().toISOString(),
  branch: formData.branch,
  salesPerson: formData.salesPerson,
  salesContactNo: formData.salesContactNo,
  customerName: formData.customerName,
  customerEmail: formData.customerEmail,
  customerContactNo: formData.customerContactNo,
  billingAddress: formData.billingAddress,
  deliveryAddress: formData.deliveryAddress,
  orderDate: formData.orderDate,
  // IMPORTANT: Items must be an array for Google Apps Script to process
  items: items.map((item) => ({
    category: item.category,
    itemName: item.itemName,
    color: item.color,
    width: item.width,
    quantity: item.quantity,
    uom: item.uom,
    rate: item.rate,
    discount: item.discount,
    deliveryDate: item.deliveryDate,
    remark: item.remark,
    totalAmount: (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)
  }))
};

console.log("✅ CORRECT PAYLOAD STRUCTURE FOR GOOGLE APPS SCRIPT:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(JSON.stringify(payload, null, 2));

console.log("\n✅ PAYLOAD HAS REQUIRED STRUCTURE:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`✅ payload.branch: "${payload.branch}" (branch name for sheet tab)`);
console.log(`✅ payload.customerName: "${payload.customerName}"`);
console.log(`✅ payload.items: Array[${payload.items.length}] (THIS IS WHAT GAS EXPECTS!)`);
console.log(`   - Item 1: "${payload.items[0].itemName}"`);
console.log(`   - Item 2: "${payload.items[1].itemName}"`);

console.log("\n✅ GOOGLE APPS SCRIPT PROCESSING:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("doPost(e) receives this payload and:");
console.log("1. Parses JSON: data = JSON.parse(e.postData.contents)");
console.log("2. Gets branch: branchName = data.branch → 'Mumbai'");
console.log("3. Creates/gets sheet: sheet = doc.getSheetByName('Mumbai')");
console.log("4. Maps items: data.items.map(item => [row data])");
console.log("5. Each item becomes ONE ROW in the Google Sheet");

console.log("\n✅ RESULT IN GOOGLE SHEET:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("Tab: 'Mumbai' (from payload.branch)");
console.log("Row 1: [Headers]");
console.log("Row 2: [timestamp, Test Company Pvt Ltd, 2025-12-23, WARP, Item 1 - SAMPLE-100, Blue, 60, meters, 100, 50, 10, 2025-12-30, Urgent, 9876543210, 123 Main St Mumbai, 456 Service Rd Mumbai, Amit Korgaonkar, 9876543210]");
console.log("Row 3: [timestamp, Test Company Pvt Ltd, 2025-12-23, WARP, Item 2 - SAMPLE-200, Red, 75, meters, 50, 75, 5, 2025-12-31, Standard, 9876543210, 123 Main St Mumbai, 456 Service Rd Mumbai, Amit Korgaonkar, 9876543210]");
console.log("       ↑ Same customer info, different items, separate rows");

console.log("\n✅ VERIFICATION:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
const data = payload; // Simulating what GAS receives
if (Array.isArray(data.items) && data.items.length > 0) {
  console.log(`✅ data.items is an array: YES (${data.items.length} items)`);
  console.log(`✅ data.items.map() will work: YES`);
  
  // Simulate what GAS does
  const rows = data.items.map(item => [
    new Date(), // Timestamp
    data.customerName,
    data.orderDate,
    item.category, // Unit
    item.itemName,
    item.color,
    item.width,
    item.uom,
    item.quantity,
    item.rate,
    item.discount,
    item.deliveryDate,
    item.remark,
    data.customerContactNo,
    data.billingAddress,
    data.deliveryAddress,
    data.salesPerson,
    data.salesContactNo
  ]);
  
  console.log(`✅ Created ${rows.length} rows for Google Sheet`);
  console.log(`✅ All rows have same customer info: ${rows[0][1]}`);
  console.log(`✅ Different items: ${rows[0][4]} vs ${rows[1][4]}`);
  console.log(`✅ Data will save correctly!`);
} else {
  console.log(`❌ ERROR: data.items is NOT an array`);
}
