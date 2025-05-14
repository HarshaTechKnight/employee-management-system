
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>User data not found. Please try logging in again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card className="shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="text-center bg-card p-8">
          <div className="relative mx-auto mb-6">
            <Avatar className="h-36 w-36 border-4 border-primary shadow-lg ring-2 ring-primary/50">
              <AvatarImage src={user.avatar || undefined} alt={user.name} data-ai-hint="profile avatar large" />
              <AvatarFallback className="text-5xl bg-muted">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {/* Placeholder for future avatar edit functionality
            <Button variant="outline" size="icon" className="absolute bottom-1 right-1 rounded-full bg-background/80 hover:bg-background">
              <Edit3 className="h-4 w-4 text-primary" />
              <span className="sr-only">Edit Avatar</span>
            </Button>
            */}
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight">{user.name}</CardTitle>
          <CardDescription className="text-xl text-muted-foreground mt-1">
            {user.role.replace('_', ' ')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-6 md:p-8">
          <Separator />
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-muted-foreground">Email Address</Label>
              <Input id="email" type="email" value={user.email} readOnly disabled className="mt-1 text-base bg-muted/30 border-muted-foreground/20 cursor-default" />
            </div>
            <div>
              <Label htmlFor="userId" className="text-sm font-semibold text-muted-foreground">User ID</Label>
              <Input id="userId" type="text" value={user.id} readOnly disabled className="mt-1 text-base bg-muted/30 border-muted-foreground/20 cursor-default" />
            </div>
            {/* 
            Example of a future editable field:
            <div className="space-y-2 pt-4">
              <Label htmlFor="displayName" className="text-sm font-semibold">Display Name</Label>
              <Input id="displayName" defaultValue={user.name} className="mt-1 text-base"/>
            </div>
            <Button className="w-full mt-6" disabled>
              <Edit3 className="mr-2 h-4 w-4" />
              Update Profile (Coming Soon)
            </Button> 
            */}
          </div>
           <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground italic">
              This is your profile overview. Profile editing features will be available in a future update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
