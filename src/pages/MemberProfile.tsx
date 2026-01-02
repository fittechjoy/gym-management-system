import { useParams } from "react-router-dom";
import { useMembers } from "../context/MembersContext";
import { membershipPlans } from "../data/membershipPlans";

export default function MemberProfile() {
  const { id } = useParams();
  const { members, payments, renewMembership } = useMembers();

  const member = members.find((m) => m.id === id);

  if (!member) {
    return <p className="text-red-600">Member not found</p>;
  }

  const planName =
    membershipPlans.find((p) => p.id === member.planId)?.name ||
    "Unknown";

  const memberPayments = payments.filter(
    (p) => p.memberId === member.id
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{member.name}</h1>

      {/* Member Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <p><strong>Phone:</strong> {member.phone}</p>
        <p><strong>Plan:</strong> {planName}</p>
        <p>
          <strong>Status:</strong>{" "}
          {member.status === "active" ? "Active" : "Expired"}
        </p>
        <p><strong>Join Date:</strong> {member.joinDate}</p>
        <p><strong>Expiry Date:</strong> {member.expiryDate}</p>

        <button
          onClick={() =>
            renewMembership(member.id, member.planId, 3000)
          }
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Renew Membership
        </button>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-4 border-b">
          Payment History
        </h2>

        {memberPayments.length === 0 ? (
          <p className="p-4 text-gray-500">
            No payments recorded yet
          </p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {memberPayments.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="p-3">{payment.date}</td>
                  <td className="p-3">{planName}</td>
                  <td className="p-3">
                    KES {payment.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
