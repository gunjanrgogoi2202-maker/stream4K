import { LiveChat } from "@/components/LiveChat";
import { StreamCard } from "@/components/StreamCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { MOCK_STREAMS } from "@/data/mockData";
import { Link, useParams } from "@tanstack/react-router";
import { Flag, Heart, Share2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function formatViewers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function Watch() {
  const { streamId } = useParams({ from: "/watch/$streamId" });
  const { isLoggedIn } = useApp();
  const [following, setFollowing] = useState(false);

  const stream = MOCK_STREAMS.find((s) => s.id === streamId) ?? MOCK_STREAMS[0];
  const recommended = MOCK_STREAMS.filter((s) => s.id !== stream.id).slice(
    0,
    5,
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <VideoPlayer stream={stream} />
          </motion.div>

          {/* Stream Meta */}
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="font-display font-bold text-lg leading-tight">
                  {stream.title}
                </h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge className="bg-live/20 text-live border-live/30 font-mono text-xs">
                    {stream.isLive ? (
                      <>
                        <span className="live-dot mr-1" /> LIVE
                      </>
                    ) : (
                      "VOD"
                    )}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {stream.category}
                  </Badge>
                  <Badge className="bg-muted text-muted-foreground border-0 text-xs font-mono">
                    {stream.quality}
                  </Badge>
                  {stream.isLive && (
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {formatViewers(stream.viewers)} watching
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  data-ocid="stream.follow_button"
                  size="sm"
                  onClick={() => isLoggedIn && setFollowing((f) => !f)}
                  className={
                    following
                      ? "bg-muted text-foreground border border-border"
                      : "bg-primary hover:bg-primary/80"
                  }
                >
                  <Heart
                    className={`w-3.5 h-3.5 mr-1.5 ${following ? "fill-current text-primary" : ""}`}
                  />
                  {following ? "Following" : "Follow"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border h-8 px-2"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border h-8 px-2"
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Streamer info */}
            <div className="flex items-center gap-3 mt-4 p-3 bg-card rounded-lg border border-border">
              <Link
                to="/channel/$username"
                params={{ username: stream.streamer }}
              >
                <img
                  src={stream.streamerAvatar}
                  alt={stream.streamer}
                  className="w-10 h-10 rounded-full border-2 border-border hover:border-primary transition-colors"
                />
              </Link>
              <div className="flex-1">
                <Link
                  to="/channel/$username"
                  params={{ username: stream.streamer }}
                  className="font-semibold hover:text-primary transition-colors"
                >
                  {stream.streamer}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {formatViewers(stream.followers)} followers
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stream.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {stream.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended (mobile) */}
            <div className="mt-6 lg:hidden">
              <h3 className="font-display font-semibold mb-3">
                Recommended Streams
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {recommended.slice(0, 4).map((s, i) => (
                  <StreamCard key={s.id} stream={s} index={i + 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Chat + Recommended */}
      <div className="hidden lg:flex flex-col w-80 xl:w-96 border-l border-border h-full flex-shrink-0">
        {/* Chat */}
        <div className="flex-1 overflow-hidden p-3">
          <LiveChat />
        </div>
        {/* Recommended */}
        <div className="border-t border-border p-3 overflow-y-auto scrollbar-thin max-h-72">
          <h3 className="font-display font-semibold text-sm mb-3">Up Next</h3>
          <div className="space-y-3">
            {recommended.map((s, i) => (
              <StreamCard key={s.id} stream={s} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
