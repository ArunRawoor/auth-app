import { loginUser } from '@/services/authService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await loginUser(email, password);
    
    return res.status(200).json({
      message: 'Login successful',
      user
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Login failed'
    });
  }
}