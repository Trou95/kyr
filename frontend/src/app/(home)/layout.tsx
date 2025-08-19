import React from 'react';
import { AppSidebar } from '@/components/radix-ui/sidebar/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UserProvider } from '@/contexts/user-context';
import { getMeApi } from '@/api/current-user.api';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getMeApi();
  console.log(currentUser);

  return (
    <UserProvider currentUser={currentUser}>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className={'p-1'}>{children}</div>
        </main>
      </SidebarProvider>
    </UserProvider>
  );
}
