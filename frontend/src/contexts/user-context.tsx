"use client"

import ICurrentUser from '@/interfaces/ICurrentUser';
import React, { createContext, useEffect, useState } from 'react';
import { authService } from '@/lib/auth';

type UserContextType = {
  user: ICurrentUser | null;
  setUser: (user: ICurrentUser | null) => void;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ICurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    if (authService.isAuthenticated()) {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to load user:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      await refreshUser();
      setIsLoading(false);
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}