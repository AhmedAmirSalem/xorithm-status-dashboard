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
    <div className="flex flex-col gap-3 mb-5">
      {/* Filter buttons row */}
      <div className="flex gap-2 flex-wrap">
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

      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-sm shrink-0">Sort by</span>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
          className="flex-1 sm:flex-none bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Name</option>
          <option value="responseTime">Response time</option>
          <option value="uptime">Uptime</option>
        </select>
      </div>
    </div>
  );
}
