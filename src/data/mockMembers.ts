import type { Member } from "../types/member";

export const mockMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "0700123456",
    planId: "monthly",
    status: "active",
    joinDate: "2025-01-01",
    expiryDate: "2025-02-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "0712345678",
    planId: "annual",
    status: "inactive",
    joinDate: "2024-01-01",
    expiryDate: "2025-01-01",
  },
];
