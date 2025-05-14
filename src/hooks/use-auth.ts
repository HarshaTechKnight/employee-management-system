 "use client";

import type { User } from "@/types";
import { login as apiLogin, logout as apiLogout, getCurrentUser as apiGetCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<User | null>;
  logout: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = apiGetCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password?: string) => {
    setIsLoading(true);
    const loggedInUser = await apiLogin(email, password);
    setUser(loggedInUser);
    setIsLoading(false);
    if (loggedInUser) {
      router.push("/dashboard");
    }
    return loggedInUser;
  }, [router]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    await apiLogout();
    setUser(null);
    setIsLoading(false);
    router.push("/");
  }, [router]);

  return { user, isLoading, login, logout };
}
