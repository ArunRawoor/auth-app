// import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

export const loginUser = async (email, password) => {
  try {
    // Find user by email
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    
    const user = result.rows[0];
    
    // Debug: Log the stored hash and input password
    console.log('Stored hash:', user.password);
    console.log('Input password:', password);
    
    // Compare passwords
 const isMatch = password === user.password;

    
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Return user without password
    const { password: _, ...userData } = user;
    return userData;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};