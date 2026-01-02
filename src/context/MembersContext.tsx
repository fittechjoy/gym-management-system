import { createContext, useContext, useState } from "react";
import type { Member } from "../types/member";
import { mockMembers } from "../data/mockMembers";
import { membershipPlans } from "../data/membershipPlans";
import { isExpired } from "../utils/dateUtils";

interface MembersContextType {
  members: Member[];
  addMember: (member: Omit<Member, "id" | "expiryDate">) => void;
}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

/* ------------------ Helpers ------------------ */

function calculateExpiryDate(joinDate: string, planId: string): string {
  const plan = membershipPlans.find((p) => p.id === planId);
  if (!plan) return joinDate;

  const date = new Date(joinDate);
  date.setMonth(date.getMonth() + plan.durationMonths);

  return date.toISOString().split("T")[0];
}

/* ------------------ Provider ------------------ */

export function MembersProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<Member[]>(mockMembers);

  const addMember = (member: Omit<Member, "id" | "expiryDate">) => {
    const expiryDate = calculateExpiryDate(
      member.joinDate,
      member.planId
    );

    const newMember: Member = {
      id: crypto.randomUUID(),
      ...member,
      expiryDate,
    };

    setMembers((prev) => [...prev, newMember]);
  };

  // 🔥 Derive status automatically (single source of truth)
  const membersWithStatus: Member[] = members.map((member) => ({
    ...member,
    status: isExpired(member.expiryDate) ? "inactive" : "active",
  }));

  return (
    <MembersContext.Provider
      value={{ members: membersWithStatus, addMember }}
    >
      {children}
    </MembersContext.Provider>
  );
}

/* ------------------ Hook ------------------ */

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembers must be used within MembersProvider");
  }
  return context;
}
