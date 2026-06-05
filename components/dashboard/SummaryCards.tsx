import StatusBadge from "@/components/StatusBadge";
import { ServerStatus } from "@/lib/mock-servers";

interface SummaryCardsProps {
  counts: Record<ServerStatus, number>;
  filter: string;
  onFilter: (status: ServerStatus) => void;
  loading: boolean;
}

export default function SummaryCards({ counts, filter, onFilter, loading }: SummaryCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 animate-pulse">
            <div className="flex items-center justify-between mb-2">
              <div className="h-6 w-16 bg-gray-800 rounded-full" />
              <div className="h-8 w-8 bg-gray-800 rounded" />
            </div>
            <div className="h-3 w-20 bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {(["up", "degraded", "down"] as ServerStatus[]).map((status) => (
        <button
          key={status}
          onClick={() => onFilter(status)}
          className={`bg-gray-900 border rounded-xl p-4 text-left transition-all ${
            filter === status
              ? "border-blue-500"
              : "border-gray-800 hover:border-gray-700"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <StatusBadge status={status} />
            <span className="text-2xl font-bold text-white">{counts[status]}</span>
          </div>
          <p className="text-gray-500 text-xs capitalize">{status} servers</p>
        </button>
      ))}
    </div>
  );
}