 "use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/"); // Redirect to login if not authenticated
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    // You can render a loading spinner here
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
