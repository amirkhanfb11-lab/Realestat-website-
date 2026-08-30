"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { dashboardNavItems } from "@/lib/dashboardNav";

function isActiveLink(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link href="/dashboard" onClick={onNavigate} className="flex items-center gap-3 px-6 py-6">
        <Image
          src="/logo/abu-salem-logo.jpg"
          alt="Abu Salem Real Estate"
          width={36}
          height={36}
          className="h-9 w-9 rounded-lg border border-ivory-50/20 object-contain"
        />
        <div className="leading-tight">
          <p className="font-serif text-base text-ivory-50">Abu Salem</p>
          <p className="text-xs tracking-wide text-ivory-50/50">Admin Dashboard</p>
        </div>
      </Link>

      <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {dashboardNavItems.map((item) => {
            const active = isActiveLink(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-gold-500 text-navy-950"
                      : "text-ivory-50/70 hover:bg-ivory-50/10 hover:text-ivory-50"
                  )}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="flex-none"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-ivory-50/10 px-6 py-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2 text-xs font-medium text-ivory-50/50 transition-colors hover:text-gold-400"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to website
        </Link>
      </div>
    </div>
  );
}

export function DashboardSidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: fixed, always visible */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col lg:bg-navy-950">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile: drawer + backdrop */}
      <div className="lg:hidden">
        <div
          aria-hidden="true"
          onClick={onClose}
          className={cn(
            "fixed inset-0 z-40 bg-navy-950/60 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        />
        <aside
          id="dashboard-mobile-sidebar"
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard navigation"
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col bg-navy-950 shadow-elevated transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-ivory-50/70 transition-colors hover:bg-ivory-50/10 hover:text-ivory-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
            </svg>
          </button>
          <SidebarContent pathname={pathname} onNavigate={onClose} />
        </aside>
      </div>
    </>
  );
}
