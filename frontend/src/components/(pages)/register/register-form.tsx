'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { register } from '@/api/auth.api';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      return;
    }

    setIsLoading(true);

    try {
      await register(username, email, password);
      router.push('/');
    } catch (error: any) {
      setError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && <div className="text-center text-sm text-red-600">{error}</div>}
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="sr-only">
            Kullanıcı Adı
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Şifre
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Şifre Tekrar
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            placeholder="Şifre Tekrar"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
        </Button>
      </div>
    </form>
  );
}
