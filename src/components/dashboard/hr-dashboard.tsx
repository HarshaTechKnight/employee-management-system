 "use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Briefcase, TrendingDown, Users, Target, FileText, Percent } from "lucide-react";
import type { Candidate } from "@/types";

const kpiData = [
  { title: "Total Employees", value: "1,250", icon: Users, trend: "+2% this month" },
  { title: "Open Positions", value: "45", icon: Briefcase, trend: "5 new today" },
  { title: "Attrition Rate", value: "8.5%", icon: TrendingDown, trendColor: "text-destructive", trend: "-0.5% vs last quarter" },
  { title: "Hiring Success Rate", value: "72%", icon: Target, trend: "+3% this quarter" },
];

const hiringPipelineData: Candidate[] = [
  { id: "cand1", name: "Alice Wonderland", role: "Software Engineer", stage: "Interview", matchScore: 85 },
  { id: "cand2", name: "Bob The Builder", role: "Product Manager", stage: "Screening", matchScore: 70 },
  { id: "cand3", name: "Charlie Brown", role: "UX Designer", stage: "Offer", matchScore: 92 },
  { id: "cand4", name: "Diana Prince", role: "Data Analyst", stage: "Applied" },
];

const attritionRiskData = [
  { name: 'Engineering', Low: 60, Medium: 25, High: 15 },
  { name: 'Sales', Low: 50, Medium: 30, High: 20 },
  { name: 'Marketing', Low: 70, Medium: 20, High: 10 },
  { name: 'HR', Low: 80, Medium: 15, High: 5 },
  { name: 'Support', Low: 40, Medium: 35, High: 25 },
];

const departmentDistributionData = [
    { name: 'Engineering', value: 400 },
    { name: 'Sales', value: 300 },
    { name: 'Marketing', value: 150 },
    { name: 'HR', value: 50 },
    { name: 'Support', value: 250 },
    { name: 'Operations', value: 100 },
];
const PIE_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', '#FF8042'];


export function HrDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.trendColor || 'text-muted-foreground'} pt-1`}>{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-6 w-6 text-primary" /> Hiring Pipeline</CardTitle>
            <CardDescription>Current status of candidates in the hiring process.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="text-right">Match %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hiringPipelineData.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">{candidate.name}</TableCell>
                    <TableCell>{candidate.role}</TableCell>
                    <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                            candidate.stage === 'Interview' ? 'bg-blue-100 text-blue-700' :
                            candidate.stage === 'Screening' ? 'bg-yellow-100 text-yellow-700' :
                            candidate.stage === 'Offer' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                            {candidate.stage}
                        </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {candidate.matchScore ? (
                        <div className="flex items-center justify-end gap-2">
                          <span>{candidate.matchScore}%</span>
                          <Progress value={candidate.matchScore} className="w-16 h-2" indicatorClassName="bg-teal-500" />
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Percent className="h-6 w-6 text-primary" /> Department Distribution</CardTitle>
            <CardDescription>Employee count by department.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={Math.min(150, window.innerWidth / 2 * 0.3)} // Responsive radius
                  fill="hsl(var(--primary))"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingDown className="h-6 w-6 text-primary" /> Attrition Risk by Department</CardTitle>
          <CardDescription>Breakdown of potential attrition risk levels across departments.</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attritionRiskData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Low" stackId="a" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="Medium" stackId="a" fill="hsl(var(--chart-4))" radius={[0, 0, 0, 0]} barSize={30} />
              <Bar dataKey="High" stackId="a" fill="hsl(var(--chart-5))" radius={[0, 0, 4, 4]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}
