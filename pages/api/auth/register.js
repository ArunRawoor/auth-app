// import { Pool } from 'pg';
// // import bcrypt from 'bcryptjs';

// const pool = new Pool({
//   connectionString: process.env.NEONDB_URL,
//   ssl: { rejectUnauthorized: false }
// });

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     console.log('Request body:', req.body); // Add debug log
    
//     const { name, email, password } = req.body;
    
//     if (!name || !email || !password) {
//       console.log('Missing fields:', { name, email, password });
//       return res.status(400).json({ 
//         message: 'All fields are required',
//         received: { name, email, password } 
//       });
//     }
    
//     if (password.length < 6) {
//       return res.status(400).json({ message: 'Password must be at least 6 characters' });
//     }

//     const client = await pool.connect();
    
//     // Check if user exists
//     const userExists = await client.query(
//       'SELECT * FROM users WHERE email = $1', 
//       [email]
//     );

//  if (userExists.rows.length > 0) {
//   client.release();
//   return res.status(400).json({ message: 'Email already registered' });
// }


//     // Hash password
//     // const salt = await bcrypt.genSalt(10);
//     // const hashedPassword = await bcrypt.hash(password, salt);
//     // console.log('Password hashed successfully'); // Debug log
//     const hashedPassword = password;

//     // Create user
//     const result = await client.query(
//       'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
//       [name, email, hashedPassword]
//     );

//     client.release();
//     return res.status(201).json({ 
//       message: 'User created successfully',
//       user: result.rows[0] 
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     return res.status(500).json({ 
//       message: 'Internal server error',
//       error: error.message 
//     });
//   }
// }



import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEONDB_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const client = await pool.connect();

    const userExists = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      client.release();
      return res.status(400).json({ message: 'Email already registered' });
    }

    const result = await client.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );

    client.release();
    return res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
