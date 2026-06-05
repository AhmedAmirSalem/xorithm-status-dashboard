import { ServerStatus } from "@/lib/mock-servers";

type SortKey = "name" | "responseTime" | "uptime";
type FilterStatus = "all" | ServerStatus;

interface FilterBarProps {
  filter: FilterStatus;
  sort: SortKey;
  onFilter: (f: FilterStatus) => void;
  onSort: (s: SortKey) => void;
}

export default function FilterBar({
  filter,
  sort,
  onFilter,
  onSort,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex gap-2">
        {(["all", "up", "degraded", "down"] as const).map((f) => (
          <button
            key={f}
            onClick={() => onFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors capitalize ${
              filter === f
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as SortKey)}
        className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="name">Sort: Name</option>
        <option value="responseTime">Sort: Response time</option>
        <option value="uptime">Sort: Uptime</option>
      </select>
    </div>
  );
}
