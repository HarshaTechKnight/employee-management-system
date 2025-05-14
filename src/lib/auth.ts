import type { User, UserRole } from "@/types";

const USER_STORAGE_KEY = "talentflow_user";

const mockUsers: Record<string, User> = {
  "hr@example.com": {
    id: "hr1",
    name: "Admin HR",
    email: "hr@example.com",
    role: "HR_ADMIN",
    avatar: "https://placehold.co/100x100",
  },
  "manager@example.com": {
    id: "mgr1",
    name: "Manager Mike",
    email: "manager@example.com",
    role: "MANAGER",
    avatar: "https://placehold.co/100x100",
  },
  "employee@example.com": {
    id: "emp1",
    name: "Employee Eve",
    email: "employee@example.com",
    role: "EMPLOYEE",
    avatar: "https://placehold.co/100x100",
  },
};

export async function login(email: string, password?: string): Promise<User | null> {
  // In a real app, you'd validate the password against a backend.
  // Here, we just check if the email exists in our mock users.
  const user = mockUsers[email.toLowerCase()];
  if (user) {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
    return user;
  }
  return null;
}

export async function logout(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (userJson) {
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  }
  return null;
}
