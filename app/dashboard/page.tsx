"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import { mockServers, Server, ServerStatus } from "@/lib/mock-servers";
import ServerCard from "@/components/ServerCard";
import SkeletonCard from "@/components/SkeletonCard";
import StatusBadge from "@/components/StatusBadge";
import Navbar from "@/components/Navbar";

type SortKey = "name" | "responseTime" | "uptime";
type FilterStatus = "all" | ServerStatus;

export default function DashboardPage() {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [selected, setSelected] = useState<Server | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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

  const refresh = useCallback(() => {
    setRefreshing(true);
    setCountdown(30);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          refresh();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, refresh]);

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Auto-refresh bar */}
        {!loading && (
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white font-semibold text-lg">System Status</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-32 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(countdown / 30) * 100}%` }}
                  />
                </div>
                <span className="text-gray-500 text-xs tabular-nums">
                  {countdown}s
                </span>
              </div>
              <button
                onClick={refresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                <svg
                  className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {refreshing ? "Refreshing…" : "Refresh"}
              </button>
            </div>
          </div>
        )}
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-4 animate-pulse"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-6 w-16 bg-gray-800 rounded-full" />
                    <div className="h-8 w-8 bg-gray-800 rounded" />
                  </div>
                  <div className="h-3 w-20 bg-gray-800 rounded" />
                </div>
              ))
            : (["up", "degraded", "down"] as ServerStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    setFilter((f) => (f === status ? "all" : status))
                  }
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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : servers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-white font-medium mb-1">No servers found</h3>
            <p className="text-gray-500 text-sm mb-4">
              No servers match the current filter.
            </p>
            <button
              onClick={() => setFilter("all")}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {servers.map((server) => (
              <ServerCard
                key={server.id}
                server={server}
                onClick={() => setSelected(server)}
              />
            ))}
          </div>
        )}
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
