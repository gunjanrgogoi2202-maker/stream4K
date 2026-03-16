import { PremiumGate } from "@/components/PremiumGate";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { Clock, Crown, Eye, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const WEEKLY_DATA = [
  { day: "Mon", views: 3200 },
  { day: "Tue", views: 4500 },
  { day: "Wed", views: 2800 },
  { day: "Thu", views: 6200 },
  { day: "Fri", views: 8900 },
  { day: "Sat", views: 12400 },
  { day: "Sun", views: 9800 },
];

const MAX_VIEWS = Math.max(...WEEKLY_DATA.map((d) => d.views));

const RECENT_STREAMS = [
  {
    id: 1,
    title: "VALORANT Ranked Grind — Diamond Pushing!",
    date: "Mar 15, 2026",
    viewers: 14320,
    duration: "3:42:11",
    quality: "1080p",
  },
  {
    id: 2,
    title: "CS2 Pro Warmup — Road to Global Elite",
    date: "Mar 14, 2026",
    viewers: 18920,
    duration: "4:30:00",
    quality: "1080p",
  },
  {
    id: 3,
    title: "VALORANT Pro Tips — Aim Training Session",
    date: "Mar 13, 2026",
    viewers: 9100,
    duration: "2:15:00",
    quality: "4K",
  },
  {
    id: 4,
    title: "Late Night Grind — Diamond or Bust",
    date: "Mar 12, 2026",
    viewers: 6800,
    duration: "5:00:00",
    quality: "1080p",
  },
  {
    id: 5,
    title: "Weekly Ranked Session — Community Games",
    date: "Mar 11, 2026",
    viewers: 11200,
    duration: "4:10:00",
    quality: "1080p",
  },
];

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function Analytics() {
  const { user, isLoggedIn } = useApp();
  const isPremium = isLoggedIn && (user?.isSubscribed ?? false);

  if (!isPremium) {
    return <PremiumGate feature="Analytics Dashboard" />;
  }

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl">Analytics</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Your streaming performance overview
            </p>
          </div>
          <Badge className="bg-accent/10 text-accent border-accent/30">
            <Crown className="w-3 h-3 mr-1" /> Premium
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Eye,
              label: "Total Views",
              value: "247.3K",
              change: "+12.4%",
              ocid: "analytics.views_card",
            },
            {
              icon: Users,
              label: "Followers",
              value: "87.4K",
              change: "+8.1%",
              ocid: "analytics.followers_card",
            },
            {
              icon: Clock,
              label: "Hours Streamed",
              value: "312h",
              change: "+5.2%",
              ocid: "analytics.hours_card",
            },
            {
              icon: TrendingUp,
              label: "Peak Viewers",
              value: "22.1K",
              change: "+31.0%",
              ocid: "analytics.peak_card",
            },
          ].map(({ icon: Icon, label, value, change, ocid }, i) => (
            <motion.div
              key={label}
              data-ocid={ocid}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-green-400 font-medium">
                  {change}
                </span>
              </div>
              <p className="font-display font-bold text-2xl">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-xl p-5 mb-8">
          <h2 className="font-semibold text-sm mb-5">Weekly Views</h2>
          <div className="flex items-end gap-2 h-40">
            {WEEKLY_DATA.map((d, i) => (
              <motion.div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
              >
                <span className="text-xs text-muted-foreground font-mono">
                  {formatNum(d.views)}
                </span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary/70 to-primary"
                  style={{ height: `${(d.views / MAX_VIEWS) * 120}px` }}
                />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Streams Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-sm">Recent Streams</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-2.5 px-4 text-xs text-muted-foreground font-medium">
                    Title
                  </th>
                  <th className="text-left py-2.5 px-4 text-xs text-muted-foreground font-medium">
                    Date
                  </th>
                  <th className="text-right py-2.5 px-4 text-xs text-muted-foreground font-medium">
                    Viewers
                  </th>
                  <th className="text-right py-2.5 px-4 text-xs text-muted-foreground font-medium">
                    Duration
                  </th>
                  <th className="text-right py-2.5 px-4 text-xs text-muted-foreground font-medium">
                    Quality
                  </th>
                </tr>
              </thead>
              <tbody>
                {RECENT_STREAMS.map((s, i) => (
                  <tr
                    key={s.id}
                    data-ocid={`analytics.streams.row.${i + 1}`}
                    className={`border-t border-border/50 transition-colors hover:bg-muted/30 ${i % 2 === 0 ? "" : "bg-muted/10"}`}
                  >
                    <td className="py-3 px-4 text-sm max-w-xs">
                      <span className="truncate block">{s.title}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap">
                      {s.date}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-mono">
                      {formatNum(s.viewers)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-mono text-muted-foreground">
                      {s.duration}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge
                        className={`text-xs font-mono ${
                          s.quality === "4K"
                            ? "bg-accent/10 text-accent border-accent/30"
                            : "bg-muted text-muted-foreground border-0"
                        }`}
                      >
                        {s.quality}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
