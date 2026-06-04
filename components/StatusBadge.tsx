import { ServerStatus } from "@/lib/mock-servers";

const config: Record<
  ServerStatus,
  { label: string; classes: string; dot: string }
> = {
  up: {
    label: "Up",
    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  degraded: {
    label: "Degraded",
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
  down: {
    label: "Down",
    classes: "bg-red-500/10 text-red-400 border-red-500/20",
    dot: "bg-red-400",
  },
};

export default function StatusBadge({ status }: { status: ServerStatus }) {
  const { label, classes, dot } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
