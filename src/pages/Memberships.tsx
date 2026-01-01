import { membershipPlans } from "../data/membershipPlans";

export default function Memberships() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Membership Plans</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {membershipPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-500 mt-2">
              Duration: {plan.durationMonths} months
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
