"use client";
import { Server } from "@/lib/mock-servers";
import StatusBadge from "./StatusBadge";

export default function ServerCard({
  server,
  onClick,
}: {
  server: Server;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer hover:border-gray-600 hover:bg-gray-800/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
            {server.name}
          </h3>
          <p className="text-gray-500 text-xs mt-0.5">{server.ip}</p>
        </div>
        <StatusBadge status={server.status} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800/60 rounded-lg p-3">
          <p className="text-gray-500 text-xs mb-1">Response time</p>
          <p className="text-white text-sm font-medium">
            {server.status === "down" ? "—" : `${server.responseTime}ms`}
          </p>
        </div>
        <div className="bg-gray-800/60 rounded-lg p-3">
          <p className="text-gray-500 text-xs mb-1">Uptime</p>
          <p className="text-white text-sm font-medium">{server.uptime}%</p>
        </div>
      </div>
      <p className="text-gray-600 text-xs mt-3">
        Last checked: {server.lastChecked} · {server.location}
      </p>
    </div>
  );
}
