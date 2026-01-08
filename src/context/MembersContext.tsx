import React, { createContext, useContext, useState } from "react";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";
import type { CheckIn } from "../types/checkin";
import { mockMembers } from "../data/mockMembers";
import { membershipPlans } from "../data/membershipPlans";
import { pricing } from "../data/pricing";
import { isExpired, daysUntilExpiry } from "../utils/dateUtils";
import { getMembershipPrice } from "../utils/getMembershipPrice";

/* ---------- Types ---------- */

interface MembersContextType {
  members: Member[];
  payments: Payment[];
  checkIns: CheckIn[];
  addMember: (member: Omit<Member, "id" | "expiryDate">) => void;
  renewMembership: (memberId: string, planId: Member["planId"]) => void;
  checkInMember: (memberId: string) => void;
}

/* ---------- Context ---------- */

const MembersContext = createContext<MembersContextType | undefined>(
  undefined
);

/* ---------- Helpers ---------- */

function calculateExpiryDate(joinDate: string, planId: string): string {
  const plan = membershipPlans.find((p) => p.id === planId);
  if (!plan) return joinDate;

  const date = new Date(joinDate);
  date.setMonth(date.getMonth() + plan.durationMonths);
  return date.toISOString().split("T")[0];
}

/* ---------- Provider ---------- */

export function MembersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  const addMember = (member: Omit<Member, "id" | "expiryDate">) => {
    const expiryDate = calculateExpiryDate(
      member.joinDate,
      member.planId
    );

    setMembers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...member,
        expiryDate,
      },
    ]);
  };

  const renewMembership = (
    memberId: string,
    planId: Member["planId"]
  ) => {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;

    const amount = getMembershipPrice(
      planId,
      member.memberType
    );

    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId) return m;

        const startDate = isExpired(m.expiryDate)
          ? new Date().toISOString().split("T")[0]
          : m.expiryDate;

        return {
          ...m,
          planId,
          expiryDate: calculateExpiryDate(startDate, planId),
        };
      })
    );

    setPayments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        memberId,
        planId,
        amount,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const checkInMember = (memberId: string) => {
    const now = new Date();

    setCheckIns((prev) => [
      {
        id: crypto.randomUUID(),
        memberId,
        date: now.toISOString().split("T")[0],
        time: now.toTimeString().slice(0, 5),
      },
      ...prev,
    ]);
  };

  const membersWithStatus: Member[] = members.map((m) => ({
    ...m,
    status: isExpired(m.expiryDate) ? "inactive" : "active",
    daysLeft: daysUntilExpiry(m.expiryDate),
  }));

  return (
    <MembersContext.Provider
      value={{
        members: membersWithStatus,
        payments,
        checkIns,
        addMember,
        renewMembership,
        checkInMember,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

/* ---------- Hook ---------- */

export function useMembers() {
  const ctx = useContext(MembersContext);
  if (!ctx) {
    throw new Error("useMembers must be used within MembersProvider");
  }
  return ctx;
}