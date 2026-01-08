import { pricing } from "../data/pricing";
import type { MemberType, PlanId } from "../types/member";

export function getMembershipPrice(
  planId: PlanId,
  memberType: Exclude<MemberType, "corporate">
): number {
  const planPricing =
    pricing[planId as keyof typeof pricing];

  const price = planPricing[memberType];

  if (price === undefined) {
    throw new Error(
      `Invalid pricing for ${planId} and ${memberType}`
    );
  }

  return price;
}