export type ServerStatus = "up" | "down" | "degraded";

export interface Server {
  id: string;
  name: string;
  ip: string;
  status: ServerStatus;
  responseTime: number; // ms
  uptime: number; // percentage
  location: string;
  lastChecked: string;
}

export const mockServers: Server[] = [
  {
    id: "1",
    name: "API Gateway",
    ip: "192.168.1.1",
    status: "up",
    responseTime: 42,
    uptime: 99.98,
    location: "US East",
    lastChecked: "Just now",
  },
  {
    id: "2",
    name: "Auth Service",
    ip: "192.168.1.2",
    status: "up",
    responseTime: 38,
    uptime: 99.95,
    location: "US East",
    lastChecked: "Just now",
  },
  {
    id: "3",
    name: "Database Primary",
    ip: "192.168.1.3",
    status: "up",
    responseTime: 12,
    uptime: 99.99,
    location: "US West",
    lastChecked: "Just now",
  },
  {
    id: "4",
    name: "Database Replica",
    ip: "192.168.1.4",
    status: "degraded",
    responseTime: 310,
    uptime: 97.4,
    location: "US West",
    lastChecked: "2 min ago",
  },
  {
    id: "5",
    name: "CDN Node",
    ip: "192.168.1.5",
    status: "up",
    responseTime: 8,
    uptime: 99.97,
    location: "Europe",
    lastChecked: "Just now",
  },
  {
    id: "6",
    name: "Mail Service",
    ip: "192.168.1.6",
    status: "down",
    responseTime: 0,
    uptime: 81.2,
    location: "US East",
    lastChecked: "5 min ago",
  },
  {
    id: "7",
    name: "Storage Service",
    ip: "192.168.1.7",
    status: "up",
    responseTime: 65,
    uptime: 99.91,
    location: "Asia",
    lastChecked: "Just now",
  },
  {
    id: "8",
    name: "Queue Worker",
    ip: "192.168.1.8",
    status: "degraded",
    responseTime: 520,
    uptime: 95.3,
    location: "Europe",
    lastChecked: "1 min ago",
  },
];
