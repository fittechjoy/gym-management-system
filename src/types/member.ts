import { pricing } from "../data/pricing";

/** All valid plan IDs come directly from pricing */
export type PlanId = keyof typeof pricing;

export type MemberType = "tenant" | "non-tenant";

export type Member = {
  id: string;
  name: string;
  phone: string;
  planId: PlanId;           // ✅ strongly typed
  memberType: MemberType;
  status: "active" | "inactive";
  joinDate: string;
  expiryDate: string;
  daysLeft?: number;
};
