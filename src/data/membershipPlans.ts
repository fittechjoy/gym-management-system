import type { MembershipPlan } from "../types/membership";

export const membershipPlans: MembershipPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    durationMonths: 1,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    durationMonths: 3,
  },
  {
    id: "semi-annual",
    name: "Semi-Annual",
    durationMonths: 6,
  },
  {
    id: "annual",
    name: "Annual",
    durationMonths: 12,
  },
];
