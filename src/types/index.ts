export type UserRole = "HR_ADMIN" | "MANAGER" | "EMPLOYEE";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired";
  matchScore?: number;
}

export interface DirectReport {
  id: string;
  name: string;
  role: string;
  performance: "Good" | "Average" | "Poor";
  lastLogin: string; // ISO date string or relative time
}
