'use client';
import AuthForm from './AuthForm';

export default function LoginForm() {
  const handleLogin = async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    return data;
  };

  return (
    <AuthForm 
      type="login" 
      onSubmit={handleLogin} 
    />
  );
}