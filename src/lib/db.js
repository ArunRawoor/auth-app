import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEONDB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Utility function to execute queries
export const query = async (text, params) => {
  try {
    const client = await pool.connect();
    const result = await client.query(text, params);
    client.release();
    return result;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};

// Initialize the database
export const initDB = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
};

// Call initDB on server start
if (process.env.NODE_ENV !== 'test') {
  initDB();
}