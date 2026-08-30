"use client";

import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/lib/dashboardNav";
import { AdminProfile } from "./AdminProfile";

function currentTitle(pathname: string) {
  const match = dashboardNavItems.find(
    (item) => pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`))
  );
  return match?.label ?? "Dashboard";
}

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-ivory-50/95 px-4 shadow-soft backdrop-blur-md sm:px-6 lg:px-8">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={false}
        aria-controls="dashboard-mobile-sidebar"
        onClick={onMenuClick}
        className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-navy-950 transition-colors hover:bg-navy-950/5 lg:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      <h1 className="flex-1 truncate font-serif text-lg text-navy-950">{currentTitle(pathname)}</h1>

      <AdminProfile />
    </header>
  );
}
