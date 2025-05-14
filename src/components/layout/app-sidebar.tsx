 "use client";

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, LogOut, ScanSearch, Workflow } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", tooltip: "Dashboard" },
  { href: "/smart-matching", icon: ScanSearch, label: "Smart Matching", tooltip: "Smart Candidate Matching" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { setOpenMobile } = useSidebar();


  const handleLinkClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) { // Tailwind's md breakpoint
      setOpenMobile(false);
    }
  };


  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={handleLinkClick}>
          <Workflow className="h-8 w-8 text-sidebar-primary" />
          <h1 className="text-2xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            TalentFlow
          </h1>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.tooltip}
                  onClick={handleLinkClick}
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <Separator className="my-2 bg-sidebar-border" />

      <SidebarFooter className="p-3">
        {user && (
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || undefined} alt={user.name} data-ai-hint="user avatar small" />
              <AvatarFallback>
                {user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium text-sidebar-foreground">{user.name}</span>
              <span className="text-xs text-sidebar-foreground/70">{user.role.replace('_', ' ')}</span>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" className="w-full justify-start mt-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:aspect-square group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0" onClick={logout}>
          <LogOut className="mr-2 group-data-[collapsible=icon]:mr-0" />
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
        </Button>
      </SidebarFooter>
    </>
  );
}
