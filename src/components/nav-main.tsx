"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CirclePlusIcon, MailIcon, SettingsIcon } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Create Event"
              className="min-w-8 h-8 bg-violet-500 text-white duration-200 ease-linear hover:bg-violet-400 hover:text-white active:bg-violet-400"
            onClick={()=> router.push("/organizer/events/create")}
            >
              <CirclePlusIcon />
              <span>Create Event</span>
            </SidebarMenuButton>
            <Button
              variant="outline"
              className="h-10 w-10 text-white duration-200 ease-linear hover:text-white rounded-sm"
              onClick={()=> router.push("/organizer/settings")}
            >
              <SettingsIcon className=""/>
            </Button>
          </SidebarMenuItem>
          {/* <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Create Event"
              className="min-w-8 h-10 bg-violet-500 text-white duration-200 ease-linear hover:bg-violet-400 hover:text-white active:bg-violet-400"
            >
              <CirclePlusIcon />
              <span>Create Event</span>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>

        <SidebarMenu className="pt-6 space-y-1">
          {items.map((item) => {
            const active =
              pathname === item.url || pathname.startsWith(`${item.url}/`);
              

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={active}
                  className="data-[active=true]:bg-violet-500/10 h-11 data-[active=true]:text-violet-300 text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
