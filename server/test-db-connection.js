require('dotenv').config();
const db = require('./config/db');
const { createTables } = require('./config/create-tables');

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    const connected = await db.testConnection();
    if (!connected) {
      console.error('❌ Failed to connect to database!');
      return;
    }
    
    console.log('✅ Successfully connected to database');
    
    // Test table creation
    await createTables();
    
    // Test a simple query to the orders table
    try {
      console.log('Testing query to orders table...');
      const testOrder = {
        order_id: `TEST_${Date.now()}`,
        program_id: 'test-program',
        plan_type: 'self',
        payment_type: 'full',
        amount: 100.00,
        remaining_amount: 0.00,
        user_name: 'Test User',
        user_email: 'test@example.com',
        user_phone: '1234567890',
      };
      
      // Insert a test order
      await db.sql`
        INSERT INTO orders (
          order_id, 
          program_id, 
          plan_type, 
          payment_type, 
          amount, 
          remaining_amount, 
          user_name, 
          user_email, 
          user_phone, 
          payment_status, 
          created_at, 
          updated_at
        ) VALUES (
          ${testOrder.order_id}, 
          ${testOrder.program_id}, 
          ${testOrder.plan_type}, 
          ${testOrder.payment_type}, 
          ${testOrder.amount}, 
          ${testOrder.remaining_amount}, 
          ${testOrder.user_name}, 
          ${testOrder.user_email}, 
          ${testOrder.user_phone}, 
          'PENDING', 
          ${new Date().toISOString()}, 
          ${new Date().toISOString()}
        )
      `;
      
      console.log('✅ Successfully inserted test order');
      
      // Query the test order
      const orders = await db.sql`
        SELECT * FROM orders WHERE order_id = ${testOrder.order_id}
      `;
      
      if (orders.length > 0) {
        console.log('✅ Successfully queried test order', orders[0]);
      } else {
        console.error('❌ Failed to query test order');
      }
      
      // Clean up the test order
      await db.sql`
        DELETE FROM orders WHERE order_id = ${testOrder.order_id}
      `;
      
      console.log('✅ Successfully cleaned up test order');
      
    } catch (error) {
      console.error('❌ Error testing orders table:', error);
    }
    
    console.log('✅ Database test completed');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    process.exit(0);
  }
}

// Run the test
testDatabaseConnection(); 