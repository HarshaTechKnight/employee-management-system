 "use client";

import { useAuth } from "@/hooks/use-auth";
import { HrDashboard } from "@/components/dashboard/hr-dashboard";
import { ManagerDashboard } from "@/components/dashboard/manager-dashboard";
import { EmployeeDashboard } from "@/components/dashboard/employee-dashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    // This should ideally be handled by the AuthenticatedLayout,
    // but as a fallback or during initial render:
    return <div className="flex h-full items-center justify-center"><p>Loading user data...</p></div>;
  }

  return (
    <div className="container mx-auto py-2">
      {user.role === "HR_ADMIN" && <HrDashboard />}
      {user.role === "MANAGER" && <ManagerDashboard />}
      {user.role === "EMPLOYEE" && <EmployeeDashboard />}
    </div>
  );
}
