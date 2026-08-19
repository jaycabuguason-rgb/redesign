"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  CirclePlus,
  Users,
  Gift,
  History,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Order Board", href: "/orders", icon: ClipboardList },
  { label: "New Order", href: "/new-order", icon: CirclePlus },
  { label: "Members", href: "/members", icon: Users },
  { label: "Rewards", href: "/rewards", icon: Gift },
  { label: "History", href: "/history", icon: History },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border fixed inset-y-0 left-0 z-30">
      {/* Brand Header */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/" className="block">
          <h1 className="font-heading text-xl font-bold text-sidebar-foreground tracking-[-0.5px]">
            <span className="text-sidebar-primary">Fresh</span>Spin
          </h1>
          <p className="text-xs text-sidebar-foreground/50 mt-0.5 font-sans">
            Laundry Management
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/" || pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-semibold shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn("w-4.5 h-4.5 shrink-0", isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Sign out */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => {}}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-150 cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export function MobileHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-sidebar border-b border-sidebar-border px-4 py-3 flex items-center justify-between">
        <Link href="/" className="block">
          <h1 className="font-heading text-lg font-bold text-sidebar-foreground">
            <span className="text-sidebar-primary">Fresh</span>Spin
          </h1>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-xs pt-14">
          <div className="bg-sidebar border-b border-sidebar-border p-4 space-y-1 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/" || pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-sidebar-border mt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
