'use client';

import ICurrentUser from '@/interfaces/ICurrentUser';
import React, { createContext, useState } from 'react';

type UserContextType = {
  user: ICurrentUser | null;
  setUser: (user: ICurrentUser | null) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  currentUser,
  children,
}: {
  currentUser: ICurrentUser;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<ICurrentUser | null>(currentUser);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
