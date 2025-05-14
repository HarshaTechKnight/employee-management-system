 "use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarPlus, FileText, Star, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const payslips = [
  { id: "ps1", month: "June 2024", date: "2024-06-30" },
  { id: "ps2", month: "May 2024", date: "2024-05-31" },
  { id: "ps3", month: "April 2024", date: "2024-04-30" },
];

const performanceReviews = [
  { id: "pr1", period: "Q2 2024", date: "2024-07-15", status: "Completed" },
  { id: "pr2", period: "Q1 2024", date: "2024-04-15", status: "Completed" },
];

export function EmployeeDashboard() {
  const { toast } = useToast();

  const handleRequestLeave = () => {
    // Mock leave request submission
    toast({
        title: "Leave Request Submitted",
        description: "Your leave request has been sent for approval.",
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarPlus className="h-6 w-6 text-primary" /> Leave Management</CardTitle>
          <CardDescription>Request new leave or view your leave balance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>Your current leave balance: <strong>10 days</strong> (Annual), <strong>5 days</strong> (Sick)</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Request Leave</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Request Leave</DialogTitle>
                    <DialogDescription>
                        Fill in the details for your leave request. Click submit when you're done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="leave-type" className="text-right">Leave Type</Label>
                            {/* In a real app, this would be a Select component */}
                            <Input id="leave-type" defaultValue="Annual" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="start-date" className="text-right">Start Date</Label>
                            <Input id="start-date" type="date" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="end-date" className="text-right">End Date</Label>
                            <Input id="end-date" type="date" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reason" className="text-right">Reason</Label>
                            <Textarea id="reason" placeholder="Reason for leave" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" onClick={handleRequestLeave}>Submit Request</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="h-6 w-6 text-primary" /> Payslips</CardTitle>
          <CardDescription>Access your monthly payslips.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {payslips.map((payslip) => (
              <li key={payslip.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">Payslip - {payslip.month}</p>
                  <p className="text-sm text-muted-foreground">Issued: {new Date(payslip.date).toLocaleDateString()}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert(`Downloading payslip for ${payslip.month}`)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Star className="h-6 w-6 text-primary" /> Performance Reviews</CardTitle>
          <CardDescription>View your past performance evaluations.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {performanceReviews.map((review) => (
              <li key={review.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">Performance Review - {review.period}</p>
                  <p className="text-sm text-muted-foreground">Date: {new Date(review.date).toLocaleDateString()} - Status: {review.status}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert(`Viewing review for ${review.period}`)}>
                  View Details
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
