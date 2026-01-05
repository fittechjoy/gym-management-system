import StatCard from "../components/ui/StatCard";
import { useMembers } from "../context/MembersContext";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { members } = useMembers();

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (m) => m.status === "active"
  ).length;

  const expiredMembers = members.filter(
    (m) => m.status === "inactive"
  ).length;

  const expiringSoon = members.filter(
    (m) =>
      m.daysLeft !== undefined &&
      m.daysLeft <= 7 &&
      m.daysLeft > 0
  ).length;

  const expiringUrgent = members.filter(
    (m) =>
      m.daysLeft !== undefined &&
      m.daysLeft <= 3 &&
      m.daysLeft > 0
  ).length;

  return (
    <motion.div
      className="p-4 md:p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.h1
        className="text-2xl font-bold mb-2 text-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Savannah Fitness Exchange Dashboard
      </motion.h1>

      {/* subtle orange divider */}
      <div className="h-1 w-14 bg-orange-500 rounded mb-3" />

      <motion.p
        className="text-sm text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Membership health overview and renewal priorities.
      </motion.p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          className="border-l-4 border-blue-500 bg-white/90 rounded-lg"
          whileHover={{ y: -4 }}
        >
          <StatCard label="Total Members" value={totalMembers} />
        </motion.div>

        <motion.div
          className="border-l-4 border-green-500 bg-white/90 rounded-lg"
          whileHover={{ y: -4 }}
        >
          <StatCard label="Active Members" value={activeMembers} />
        </motion.div>

        <motion.div
          className="border-l-4 border-red-500 bg-white/90 rounded-lg"
          whileHover={{ y: -4 }}
        >
          <StatCard label="Expired Members" value={expiredMembers} />
        </motion.div>

        <motion.div
          className="border-l-4 border-yellow-500 bg-white/90 rounded-lg"
          whileHover={{ y: -4 }}
        >
          <StatCard
            label="Expiring Soon (7 days)"
            value={expiringSoon}
          />
        </motion.div>

        <motion.div
          className="border-l-4 border-orange-500 bg-white/90 rounded-lg"
          whileHover={{ y: -4 }}
        >
          <StatCard
            label="Urgent (3 days)"
            value={expiringUrgent}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
