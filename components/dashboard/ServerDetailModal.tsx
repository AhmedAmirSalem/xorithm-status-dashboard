import { Server } from "@/lib/mock-servers";
import StatusBadge from "@/components/StatusBadge";

interface ServerDetailModalProps {
  server: Server;
  onClose: () => void;
}

export default function ServerDetailModal({ server, onClose }: ServerDetailModalProps) {
  const details = [
    { label: "IP Address",    value: server.ip },
    { label: "Response time", value: server.status === "down" ? "Unreachable" : `${server.responseTime}ms` },
    { label: "Uptime",        value: `${server.uptime}%` },
    { label: "Last checked",  value: server.lastChecked },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-white text-lg font-semibold">{server.name}</h2>
            <p className="text-gray-500 text-sm mt-0.5">{server.location}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={server.status} />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors hover:bg-gray-800 w-7 h-7 rounded-lg flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {details.map(({ label, value }, i) => (
            <div
              key={label}
              className="bg-gray-800 rounded-xl p-4 animate-slideUp"
              style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}
            >
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              <p className="text-white text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}