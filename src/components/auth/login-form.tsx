 "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Workflow } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Login Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        toast({
            title: "Login Error",
            description: "Please enter a valid email address.",
            variant: "destructive",
        });
        return;
    }

    try {
      const user = await login(email, password);
      if (!user) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center mb-4">
            <Workflow className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">TalentFlow</CardTitle>
        <CardDescription>Sign in to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="hr@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password (Optional)</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center text-sm text-muted-foreground">
        <p>Use pre-filled emails for different roles:</p>
        <ul className="list-disc list-inside mt-1">
            <li>hr@example.com (HR Admin)</li>
            <li>manager@example.com (Manager)</li>
            <li>employee@example.com (Employee)</li>
        </ul>
      </CardFooter>
    </Card>
  );
}
