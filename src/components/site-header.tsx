"use client";

import {
  BellIcon,
  SearchIcon,
  ChevronDownIcon,
  TicketIcon,
  CalendarIcon,
  CreditCardIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/organizer/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your events and performance",
  },
  "/organizer/events": {
    title: "Events",
    subtitle: "Manage and organize your events",
  },
  "/organizer/tickets": {
    title: "Tickets",
    subtitle: "Track sales and ticket performance",
  },
  "/organizer/attendees": {
    title: "Attendees",
    subtitle: "View and manage attendees",
  },
  "/organizer/revenue": {
    title: "Revenue",
    subtitle: "Monitor your earnings and payouts",
  },
  "/organizer/settings": {
    title: "Settings",
    subtitle: "Manage your account and preferences",
  },
};

const notifications = [
  {
    id: 1,
    title: "New ticket purchase",
    message: "12 VIP tickets were sold for Tech Future Summit.",
    time: "2 min ago",
    icon: TicketIcon,
    unread: true,
  },
  {
    id: 2,
    title: "Event almost sold out",
    message: "Startup Mixer Night has reached 87% ticket capacity.",
    time: "18 min ago",
    icon: CalendarIcon,
    unread: true,
  },
  {
    id: 3,
    title: "Payout processed",
    message: "UGX 1,250,000 has been processed to your payout account.",
    time: "1 hr ago",
    icon: CreditCardIcon,
    unread: false,
  },
];

export function SiteHeader() {
  const pathname = usePathname();

  const page = pageTitles[pathname] || {
    title: "Organizer Dashboard",
    subtitle: "Manage events, tickets, revenue, and attendees.",
  };

  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <header className="flex shrink-0 items-center border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1 text-white hover:bg-white/10 hover:text-white" />

          <Separator
            orientation="vertical"
            className="mx-1 bg-white/10 data-[orientation=vertical]:h-5"
          />

          <div>
            <h1 className="text-base font-semibold text-white">
              {page.title}
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              {page.subtitle}
            </p>
          </div>
        </div>

        <div className="hidden w-full max-w-md md:block">
          <div className="group relative">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500 group-focus-within:text-white" />
            <Input
              placeholder="Search... (Ctrl + K)"
              className="h-11 border-white/10 bg-[#0d141d] pl-10 pr-16 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
              ⌘K
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge className="hidden border border-violet-500/20 bg-violet-500/10 text-violet-300 md:flex">
            Pro Plan
          </Badge>

          <Popover>
            <PopoverTrigger asChild>
              <button className="relative rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
                <BellIcon className="size-5" />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white ring-2 ring-slate-950">
                    {unreadCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="min-w-96 sm:w-96 md:w-100 lg:w-106 border-white/10 bg-[#0B0F14] p-0 text-white shadow-2xl mt-5 mx-4 sm:mx-4 lg:mr-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Notifications
                  </h3>
                  <p className="text-xs text-slate-500">
                    Latest organizer activity
                  </p>
                </div>

                <Badge className="bg-violet-500/10 text-violet-300">
                  {unreadCount} new
                </Badge>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = notification.icon;

                  return (
                    <button
                      key={notification.id}
                      className="flex w-full gap-3 border-b border-white/5 px-4 py-4 text-left transition hover:bg-white/5"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                        <Icon className="size-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>

                          {notification.unread && (
                            <span className="mt-1 size-2 rounded-full bg-violet-500" />
                          )}
                        </div>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {notification.message}
                        </p>

                        <p className="mt-2 text-[11px] text-slate-600">
                          {notification.time}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-white/10 p-3">
                <button className="w-full rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
                  View all notifications
                </button>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-white/5">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-violet-600 text-sm text-white">
                EP
              </AvatarFallback>
            </Avatar>

            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold text-white">Eventra Pro</p>
              <p className="text-xs text-slate-400">Organization Account</p>
            </div>

            <ChevronDownIcon className="hidden size-4 text-slate-500 md:block" />
          </div>
        </div>
      </div>
    </header>
  );
}