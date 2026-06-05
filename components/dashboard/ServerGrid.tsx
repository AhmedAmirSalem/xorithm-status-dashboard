import { Server } from "@/lib/mock-servers";
import ServerCard from "@/components/ServerCard";
import SkeletonCard from "@/components/SkeletonCard";

interface ServerGridProps {
  servers: Server[];
  loading: boolean;
  onSelect: (server: Server) => void;
  onClearFilter: () => void;
}

export default function ServerGrid({
  servers,
  loading,
  onSelect,
  onClearFilter,
}: ServerGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (servers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-white font-medium mb-1">No servers found</h3>
        <p className="text-gray-500 text-sm mb-4">
          No servers match the current filter.
        </p>
        <button
          onClick={onClearFilter}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Clear filter
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {servers.map((server, i) => (
        <div
          key={server.id}
          className="animate-slideUp"
          style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}
        >
          <ServerCard server={server} onClick={() => onSelect(server)} />
        </div>
      ))}
    </div>
  );
}
