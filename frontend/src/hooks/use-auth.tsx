import { useContext } from 'react';
import { UserContext } from '@/contexts/user-context';
import { authService, LoginCredentials, RegisterCredentials } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const context = useContext(UserContext);
  const router = useRouter();
  
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  const { user, setUser, isLoading, refreshUser } = context;
  const isAuthenticated = !!user;

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      await refreshUser(); // Refresh user from /me endpoint
      router.push('/');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await authService.register(credentials);
      await refreshUser(); // Refresh user from /me endpoint
      router.push('/');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push('/login');
  };

  return {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
  };
}
