'use client';
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Project, User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NavMain from './nav-main'
import { data } from '@/lib/constant'

const AppSidebar =({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  recentProjects,
  user,
  ...props
}:{
  recentProjects:Project[],
} & {user:User} & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible='icon' className="maz-w-[212px] bg-background-90" {...props}>
      <SidebarHeader className="pt-6 px-3 pb-0">        
       <SidebarMenuButton size={'lg'}
        className = "data-[state=open] : text-sidebar-accent-foreground"
       >
        <div className= "flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={'/next.svg'} alt="logo" />
            <AvatarFallback className="rounded-lg">GAIS</AvatarFallback>
          </Avatar>
        </div>
          <span className="truncate text-primary text-2xl font-semibold">GenAISlides</span>
       </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-3 mt-10 gap-y-6">
        <NavMain items={data.navMain}/>       
      </SidebarContent>
      <SidebarFooter>
      
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
 