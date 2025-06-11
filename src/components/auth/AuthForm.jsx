'use client';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  setLoading(true);

  try {
    if (type === 'register' && formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const dataToSend =
      type === 'login'
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

    const response = await onSubmit(dataToSend);

    setSuccess(response.message);

    // ✅ Reset form for both login and register
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  } catch (err) {
    setError(err.message || 'An error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      
      {type === 'register' && (
        <Input
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      )}
      
      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        required
      />
      
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        required
        minLength={6}
      />
      
      {type === 'register' && (
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          required
          minLength={6}
        />
      )}
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Create Account'}
      </Button>
    </form>
  );
};

export default AuthForm;