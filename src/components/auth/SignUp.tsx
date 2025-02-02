import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { FormInput } from './FormInput';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const { signUp } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      showNotification('Invalid password', 'error');
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password);
      showNotification('Sign up successfully! Please Sign in to save score.', 'success');
      navigate('/auth?signup=false');
    } catch (err) {
      showNotification('Email already used or something wrong.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput icon={<Mail className="w-5 h-5 text-gray-400" />} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <FormInput icon={<Lock className="w-5 h-5 text-gray-400" />} type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <FormInput icon={<Lock className="w-5 h-5 text-gray-400" />} type="password" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

      <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}
