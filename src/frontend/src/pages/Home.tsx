import { StreamCard } from "@/components/StreamCard";
import { Badge } from "@/components/ui/badge";
import { MOCK_STREAMS } from "@/data/mockData";
import { Link } from "@tanstack/react-router";
import { Eye, Flame, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const FILTERS = [
  "All",
  "Live Now",
  "Gaming",
  "FPS",
  "Battle Royale",
  "RPG",
  "Sports",
  "Mobile",
] as const;
type Filter = (typeof FILTERS)[number];

const CATEGORY_MAP: Record<string, string> = {
  "Live Now": "live",
  FPS: "FPS",
  "Battle Royale": "Battle Royale",
  RPG: "RPG",
  Mobile: "Mobile",
  Sports: "Sports",
  Gaming: "gaming",
};

export function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = MOCK_STREAMS.filter((s) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Live Now") return s.isLive;
    const cat = CATEGORY_MAP[activeFilter];
    return s.category === cat;
  });

  const featured = MOCK_STREAMS.find((s) => s.isLive)!;

  return (
    <div className="p-4 lg:p-6">
      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link to="/watch/$streamId" params={{ streamId: featured.id }}>
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-border/50 group cursor-pointer">
            <img
              src={featured.thumbnail}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-1.5 bg-live text-white text-xs font-bold px-2.5 py-1 rounded">
                  <span className="live-dot" /> LIVE
                </span>
                <Badge className="bg-black/50 text-white border-white/20">
                  {featured.category}
                </Badge>
                <Badge className="bg-black/50 text-white border-white/20 font-mono">
                  {featured.quality}
                </Badge>
              </div>
              <h1 className="text-xl lg:text-3xl font-display font-bold text-white mb-2 leading-tight max-w-lg">
                {featured.title}
              </h1>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <img
                  src={featured.streamerAvatar}
                  alt={featured.streamer}
                  className="w-7 h-7 rounded-full border-2 border-white/30"
                />
                <span className="font-medium">{featured.streamer}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {(featured.viewers / 1000).toFixed(1)}K watching
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            data-ocid="browse.filter.tab"
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === f
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Live Streams Section */}
      {(activeFilter === "All" || activeFilter === "Live Now") && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Live Now</h2>
            <Badge className="bg-live/20 text-live border-live/30 ml-1">
              {MOCK_STREAMS.filter((s) => s.isLive).length} streams
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MOCK_STREAMS.filter((s) => s.isLive).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <StreamCard stream={s} index={i + 1} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Browse / Filtered */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h2 className="font-display font-bold text-lg">
            {activeFilter === "All" ? "Recommended for You" : activeFilter}
          </h2>
        </div>
        {filtered.length === 0 ? (
          <div
            data-ocid="browse.empty_state"
            className="text-center py-16 text-muted-foreground"
          >
            No streams found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <StreamCard stream={s} index={i + 1} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
