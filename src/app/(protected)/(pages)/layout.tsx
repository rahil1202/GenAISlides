/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { onAuthenticateUser } from '@/actions/user';
import AppSidebar from '@/components/global/app-sidebar';
import React from 'react'
import { redirect } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';

type Props = {
    children: React.ReactNode;
}


const Layout = async ( {children}: Props) => {

  const checkUser = await onAuthenticateUser()

  if(!checkUser.user) {
    redirect('/sign-in')
  }
     
  return (
   <SidebarProvider>
    <AppSidebar></AppSidebar>
   </SidebarProvider>
  )
}

export default Layout