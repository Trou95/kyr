import React from 'react';
import { AppSidebar } from '@/components/radix-ui/sidebar/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';


export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <SidebarProvider >
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
