"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BarChart3Icon,
  CalendarDaysIcon,
  CircleHelpIcon,
  FileChartColumnIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SearchIcon,
  Settings2Icon,
  TicketIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Marcus Chen",
    email: "organizer@eventra.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/organizer/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Events",
      url: "/organizer/events",
      icon: <CalendarDaysIcon />,
    },
    {
      title: "Tickets",
      url: "/organizer/tickets",
      icon: <TicketIcon />,
    },
    {
      title: "Attendees",
      url: "/organizer/attendees",
      icon: <UsersIcon />,
    },
    {
      title: "Revenue",
      url: "/organizer/revenue",
      icon: <WalletIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/organizer/settings",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
  documents: [
    {
      name: "Reports",
      url: "/organizer/reports",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Analytics",
      url: "/organizer/revenue",
      icon: <BarChart3Icon />,
    },
    {
      name: "Back to Eventra",
      url: "/",
      icon: <HomeIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/10 bg-slate-950 text-white"
      {...props}
    >
      <SidebarHeader className="border-b border-white/10 py-4 lg:py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! h-11"
            >
              <a href="/organizer/dashboard">
                <div className="flex size-8 min-w-8 items-center justify-center rounded-sm bg-violet-500 text-white">
                  E
                </div>
                <div>
                  <span className="block text-base font-bold">Eventra</span>
                  <span className="block text-[10px] uppercase tracking-widest text-slate-500">
                    Premium Organizer
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}