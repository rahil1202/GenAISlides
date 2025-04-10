/* eslint-disable @typescript-eslint/no-unused-vars */
import { onAuthenticateUser } from '@/actions/user';
import AppSidebar from '@/components/global/app-sidebar';
import React from 'react'
import { redirect } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getRecentProjects } from '@/actions/project';

type Props = {
    children: React.ReactNode;
}


const Layout = async ( {children}: Props) => {
  
  const recentProjects = await getRecentProjects();
  const checkUser = await onAuthenticateUser()

  if(!checkUser.user) {
    redirect('/sign-in')
  }
     
  return (
   <SidebarProvider>
    <AppSidebar recentProjects={recentProjects.data || []}></AppSidebar>
   </SidebarProvider>
  )
}

export default Layout