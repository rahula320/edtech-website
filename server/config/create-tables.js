const db = require('./db');

async function createTables() {
  try {
    console.log('Setting up database tables...');
    
    // Create orders table if it doesn't exist
    console.log('Checking if orders table exists...');
    const ordersTableResult = await db.sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name = 'orders'
    `;
    
    if (ordersTableResult.length === 0) {
      console.log('Creating orders table...');
      await db.sql`
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          order_id VARCHAR(255) UNIQUE NOT NULL,
          program_id VARCHAR(255) NOT NULL,
          plan_type VARCHAR(50) NOT NULL,
          payment_type VARCHAR(50) NOT NULL,
          amount DECIMAL(10, 2) NOT NULL,
          remaining_amount DECIMAL(10, 2) DEFAULT 0,
          user_name VARCHAR(255) NOT NULL,
          user_email VARCHAR(255) NOT NULL,
          user_phone VARCHAR(50) NOT NULL,
          payment_id VARCHAR(255),
          payment_status VARCHAR(50) DEFAULT 'PENDING',
          payment_date TIMESTAMP,
          remaining_payment_due_date TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('Orders table created successfully');
    } else {
      console.log('Orders table already exists');
    }
    
    // Create completed_payments table if it doesn't exist
    console.log('Checking if completed_payments table exists...');
    const completedPaymentsTableResult = await db.sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name = 'completed_payments'
    `;
    
    if (completedPaymentsTableResult.length === 0) {
      console.log('Creating completed_payments table...');
      await db.sql`
        CREATE TABLE completed_payments (
          id SERIAL PRIMARY KEY,
          order_id VARCHAR(255) NOT NULL,
          payment_id VARCHAR(255) NOT NULL,
          program_id VARCHAR(255) NOT NULL,
          amount DECIMAL(10, 2) NOT NULL,
          payment_date TIMESTAMP NOT NULL,
          user_name VARCHAR(255) NOT NULL,
          user_email VARCHAR(255) NOT NULL,
          user_phone VARCHAR(50) NOT NULL,
          plan_type VARCHAR(50) NOT NULL,
          payment_type VARCHAR(50) NOT NULL,
          payment_method VARCHAR(100),
          payment_details JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_order 
            FOREIGN KEY(order_id) 
            REFERENCES orders(order_id)
            ON DELETE CASCADE
        )
      `;
      console.log('Completed payments table created successfully');
    } else {
      console.log('Completed payments table already exists');
    }
    
    console.log('Database setup completed successfully');
    return true;
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  createTables()
    .then(() => {
      console.log('Database setup completed');
      process.exit(0);
    })
    .catch(err => {
      console.error('Database setup failed:', err);
      process.exit(1);
    });
}

module.exports = { createTables }; 