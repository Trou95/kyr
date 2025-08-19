'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/api/auth.api';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/');
    } catch (error: unknown) {
      setError((error as Error).message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && <div className="text-center text-sm text-red-600">{error}</div>}
      <div className="space-y-4">
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
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </Button>
      </div>
    </form>
  );
}
