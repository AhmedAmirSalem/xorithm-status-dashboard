"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import { mockServers, Server, ServerStatus } from "@/lib/mock-servers";
import Navbar from "@/components/Navbar";
import RefreshBar from "@/components/dashboard/RefreshBar";
import SummaryCards from "@/components/dashboard/SummaryCards";
import FilterBar from "@/components/dashboard/FilterBar";
import ServerGrid from "@/components/dashboard/ServerGrid";
import ServerDetailModal from "@/components/dashboard/ServerDetailModal";

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

  const handleFilter = (status: ServerStatus) => {
    setFilter((f) => (f === status ? "all" : status));
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        {!loading && (
          <RefreshBar
            countdown={countdown}
            refreshing={refreshing}
            onRefresh={refresh}
          />
        )}
        <SummaryCards
          counts={counts}
          filter={filter}
          onFilter={handleFilter}
          loading={loading}
        />
        {!loading && (
          <FilterBar
            filter={filter}
            sort={sort}
            onFilter={setFilter}
            onSort={setSort}
          />
        )}
        <ServerGrid
          servers={servers}
          loading={loading}
          onSelect={setSelected}
          onClearFilter={() => setFilter("all")}
        />
      </main>

      {selected && (
        <ServerDetailModal
          server={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
