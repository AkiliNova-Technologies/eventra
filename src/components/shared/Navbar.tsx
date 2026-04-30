"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Explore", href: "/" },
  { label: "Events", href: "/events" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "For Organizers", href: "/organizers" },
];

export function Navbar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-md lg:px-8">
      <Link href="/" className="text-2xl font-bold tracking-tight text-white">
        Eventra
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(
                "relative text-sm font-medium transition-colors",
                active ? "text-white" : "text-slate-400 hover:text-white",
              )}
            >
              {item.label}

              {/* Active underline */}
              {active && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <Button
          asChild
          variant="ghost"
          className="h-11 px-4 text-slate-400 hover:text-white hover:bg-white/10"
        >
          <Link href="/login">Log In</Link>
        </Button>

        <Button
          asChild
          className="bg-violet-500 h-11 px-8 text-white hover:bg-violet-700!"
        >
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}
