import { useMembers } from "../context/MembersContext";
import { membershipPlans } from "../data/membershipPlans";

export default function Payments() {
  const { payments } = useMembers();

  const getPlanName = (planId: string) =>
    membershipPlans.find((p) => p.id === planId)?.name || "Unknown";

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payments</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-gray-500">Total Revenue</p>
        <p className="text-3xl font-bold">KES {totalRevenue}</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Member ID</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Amount (KES)</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No payments recorded yet
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="p-3">{payment.date}</td>
                  <td className="p-3">{payment.memberId}</td>
                  <td className="p-3">
                    {getPlanName(payment.planId)}
                  </td>
                  <td className="p-3">{payment.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
