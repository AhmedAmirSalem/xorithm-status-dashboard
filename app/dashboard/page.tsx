"use client";
import { useState, useMemo } from "react";
import { mockServers, Server, ServerStatus } from "@/lib/mock-servers";
import ServerCard from "@/components/ServerCard";
import StatusBadge from "@/components/StatusBadge";
import Navbar from "@/components/Navbar";

type SortKey = "name" | "responseTime" | "uptime";
type FilterStatus = "all" | ServerStatus;

export default function DashboardPage() {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [selected, setSelected] = useState<Server | null>(null);

  const counts = useMemo(
    () => ({
      up: mockServers.filter((s) => s.status === "up").length,
      degraded: mockServers.filter((s) => s.status === "degraded").length,
      down: mockServers.filter((s) => s.status === "down").length,
    }),
    [],
  );

  const servers = useMemo(() => {
    return mockServers
      .filter((s) => filter === "all" || s.status === filter)
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "responseTime") return a.responseTime - b.responseTime;
        return b.uptime - a.uptime;
      });
  }, [filter, sort]);

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {(["up", "degraded", "down"] as ServerStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter((f) => (f === status ? "all" : status))}
              className={`bg-gray-900 border rounded-xl p-4 text-left transition-all ${
                filter === status
                  ? "border-blue-500"
                  : "border-gray-800 hover:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <StatusBadge status={status} />
                <span className="text-2xl font-bold text-white">
                  {counts[status]}
                </span>
              </div>
              <p className="text-gray-500 text-xs capitalize">
                {status} servers
              </p>
            </button>
          ))}
        </div>

        {/* Filters + sort */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-2">
            {(["all", "up", "degraded", "down"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
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
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort: Name</option>
            <option value="responseTime">Sort: Response time</option>
            <option value="uptime">Sort: Uptime</option>
          </select>
        </div>

        {/* Server grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servers.map((server) => (
            <ServerCard
              key={server.id}
              server={server}
              onClick={() => setSelected(server)}
            />
          ))}
        </div>
      </main>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-white text-lg font-semibold">
                  {selected.name}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  {selected.location}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={selected.status} />
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "IP Address", value: selected.ip },
                {
                  label: "Response time",
                  value:
                    selected.status === "down"
                      ? "Unreachable"
                      : `${selected.responseTime}ms`,
                },
                { label: "Uptime", value: `${selected.uptime}%` },
                { label: "Last checked", value: selected.lastChecked },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-800 rounded-xl p-4">
                  <p className="text-gray-500 text-xs mb-1">{label}</p>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
