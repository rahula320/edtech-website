const { v4: uuidv4 } = require('uuid');
const db = require('./config/db');

async function testOrderCreation() {
  try {
    console.log('Testing order creation...');
    
    // Check if the orders table exists
    const tablesResult = await db.sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name = 'orders'
    `;
    
    if (tablesResult.length === 0) {
      console.error('Orders table does not exist!');
      return false;
    }
    
    console.log('Orders table exists, proceeding with test order creation');

    // Create test data
    const orderId = `TEST_${uuidv4().substring(0, 8)}_${Date.now()}`;
    const programId = 'test-program';
    const planType = 'self';
    const paymentType = 'full';
    const amount = 100.00;
    const remainingAmount = 0;
    const userName = 'Test User';
    const userEmail = 'test@example.com';
    const userPhone = '1234567890';
    
    console.log('Test order data:', {
      orderId,
      programId,
      planType,
      paymentType,
      amount,
      remainingAmount,
      userName,
      userEmail,
      userPhone
    });
    
    // Try to insert a test order
    try {
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
          ${orderId}, 
          ${programId}, 
          ${planType}, 
          ${paymentType}, 
          ${amount}, 
          ${remainingAmount}, 
          ${userName}, 
          ${userEmail}, 
          ${userPhone}, 
          'PENDING',
          ${new Date().toISOString()}, 
          ${new Date().toISOString()}
        )
      `;
      
      console.log('✅ Test order created successfully');
      
      // Verify the order was created
      const orders = await db.sql`
        SELECT * FROM orders WHERE order_id = ${orderId}
      `;
      
      if (orders.length === 0) {
        console.error('❌ Order was not found after creation!');
        return false;
      }
      
      console.log('✅ Order retrieved successfully:', orders[0]);
      
      // Clean up the test order
      await db.sql`
        DELETE FROM orders WHERE order_id = ${orderId}
      `;
      
      console.log('✅ Test order cleaned up');
      return true;
    } catch (insertError) {
      console.error('❌ Error inserting test order:', insertError);
      console.error('Error message:', insertError.message);
      console.error('Error stack:', insertError.stack);
      return false;
    }
  } catch (error) {
    console.error('❌ Error in test order creation:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return false;
  }
}

// Run the test
testOrderCreation()
  .then(success => {
    if (success) {
      console.log('✅ Order creation test passed!');
      process.exit(0);
    } else {
      console.error('❌ Order creation test failed!');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Uncaught error in test:', err);
    process.exit(1);
  }); 