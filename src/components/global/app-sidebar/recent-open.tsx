import React from 'react'
import { Project } from '@prisma/client'
import { SidebarGroup, SidebarGroupLabel, SidebarMenuButton, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import type { JsonValue } from '@prisma/client/runtime/library'
import { toast } from 'sonner'
import  { useRouter } from 'next/navigation'
import { useSlideStore } from '@/store/useSlideStore'

type Props = {
    recentProjects: Project[],
}

const RecentOpen = ({recentProjects}: Props) => {

    const router = useRouter()
    const { setSlides } = useSlideStore()
    const handleClick = (projectId:string, slides:JsonValue) => {
        if(!projectId || !slides) {
            toast("Project Not Found",{                
                description: "Please try again",
                duration: 2000,
            })
            return;
        }
        
        setSlides(JSON.parse(JSON.stringify(slides)))
        router.push(`/presentation/${projectId}`)
        toast("Project Opened",{
            description: "Project opened successfully",
            duration: 1500,
        })
    }

  return (
    <SidebarGroup>
        <SidebarGroupLabel> Recently Opened</SidebarGroupLabel>
        <SidebarMenu>
            {recentProjects.length > 0 ? 
              recentProjects.map((item) =>  (
               <SidebarMenuItem key={item.id}>  
                <SidebarMenuButton
                 asChild
                 tooltip={'item.title'}
                 className={'hover:bg-primary-80'}
                 >
                    <Button
                    variant={'link'}
                    onClick ={() => handleClick(item.id, item.slides)}
                    className={`test-xs items-center justify-start`}
                    >
                        <span>{item.title}</span>                    
                    </Button>
                 </SidebarMenuButton>
                </SidebarMenuItem>
            )) : ( 
                <div>
                    <p className="text-m text-muted-foreground ml-2">No recent projects</p>
                </div>
            )}
        </SidebarMenu>
    </SidebarGroup>
  )
}

export default RecentOpen