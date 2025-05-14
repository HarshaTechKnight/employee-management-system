 "use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, CalendarCheck, Activity, UserCheck, UserX, AlertTriangle } from "lucide-react";
import type { DirectReport } from "@/types";

const attendanceData = [
  { title: "Team On Time", value: "95%", icon: UserCheck, trend: "Improved from 92%" },
  { title: "Late Arrivals", value: "3", icon: AlertTriangle, trendColor: "text-yellow-600", trend: "Avg. 2 daily" },
  { title: "Absences Today", value: "1", icon: UserX, trendColor: "text-destructive", trend: "John Doe (Sick)" },
];

const directReportsData: DirectReport[] = [
  { id: "emp2", name: "Jane Smith", role: "Senior Developer", performance: "Good", lastLogin: "2 hours ago" },
  { id: "emp3", name: "John Doe", role: "Junior Developer", performance: "Average", lastLogin: "1 day ago" },
  { id: "emp4", name: "Peter Pan", role: "QA Engineer", performance: "Good", lastLogin: "30 mins ago" },
  { id: "emp5", name: "Alice Johnson", role: "DevOps Engineer", performance: "Poor", lastLogin: "5 hours ago" },
];

const performanceTrendData = [
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 78 },
  { month: 'Mar', score: 82 },
  { month: 'Apr', score: 80 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 88 },
];

export function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {attendanceData.map((item) => (
          <Card key={item.title} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <p className={`text-xs ${item.trendColor || 'text-muted-foreground'} pt-1`}>{item.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6 text-primary" /> Direct Reports</CardTitle>
            <CardDescription>Overview of your team members.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {directReportsData.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.performance === "Good" ? "default" :
                          report.performance === "Average" ? "secondary" : "destructive"
                        }
                        className={
                          report.performance === "Good" ? "bg-green-500 hover:bg-green-600 text-white" :
                          report.performance === "Average" ? "bg-yellow-500 hover:bg-yellow-600 text-white" :
                           "bg-red-500 hover:bg-red-600 text-white"
                        }
                      >
                        {report.performance}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{report.lastLogin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-6 w-6 text-primary" /> Team Performance Trend</CardTitle>
            <CardDescription>Average performance score over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="score" name="Avg. Score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
