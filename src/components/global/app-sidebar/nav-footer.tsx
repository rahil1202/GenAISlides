'use client'

import { User } from '@prisma/client'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()

  const handleUpgrade = () => {
    setLoading(true)
    // Add your upgrade logic here
    setTimeout(() => setLoading(false), 2000) // Simulate API call
  }

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <SidebarMenu className="mt-auto border-t border-border/50 pt-4">
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-4 w-full group-data-[collapsed=true]:hidden">
          {!prismaUser?.subscription && (
            <div className="flex flex-col items-start p-4 gap-3 bg-background-80 rounded-lg shadow-sm border border-border/50">
              <div className="flex flex-col items-start gap-2 w-full">
                <p className="text-base font-bold flex items-center gap-2">
                  Get <span className="text-vivid">GENAI SLIDES PRO</span>
                  <Sparkles size={16} className="text-vivid" />
                </p>
                <span className="text-sm text-muted-foreground">Unlock all features with AI and more</span>
              </div>
              <div className="w-full bg-vivid-gradient p-[1px] rounded-lg mt-1">
                <Button
                  className="w-full bg-background-90 hover:bg-background/90 text-primary font-bold transition-all"
                  onClick={handleUpgrade}
                  variant="default"
                  size="default"
                  disabled={loading}
                >
                  {loading ? "Upgrading..." : "Upgrade Now"}
                </Button>
              </div>
            </div>
          )}

          <SignedIn>
            <SidebarMenuButton
              size="lg"
              className="w-full p-2 gap-3 hover:bg-background-80 rounded-lg transition-colors data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserButton />
              <div className="flex flex-col flex-1 text-left text-sm leading-tight group-data-[collapsed=true]:hidden overflow-hidden">
                {user?.fullName && (
                  <span className="truncate text-primary font-medium">
                    {user.fullName}
                  </span>
                )}
                <span className="truncate text-muted-foreground text-xs">
                  {user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavFooter