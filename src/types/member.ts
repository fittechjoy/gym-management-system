export interface Member {
  id: string;
  name: string;
  phone: string;
  planId: string;
  status: "active" | "inactive";
  joinDate: string;
  expiryDate: string;

  // derived (not stored)
  daysLeft?: number;
}
