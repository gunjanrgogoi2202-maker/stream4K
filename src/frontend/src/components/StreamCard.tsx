import { Badge } from "@/components/ui/badge";
import type { Stream } from "@/data/mockData";
import { Link } from "@tanstack/react-router";
import { Clock, Eye } from "lucide-react";

function formatViewers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

interface StreamCardProps {
  stream: Stream;
  index: number;
}

export function StreamCard({ stream, index }: StreamCardProps) {
  return (
    <Link
      to="/watch/$streamId"
      params={{ streamId: stream.id }}
      data-ocid={`browse.stream.item.${index}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg bg-card aspect-video mb-3 border border-border/40 transition-all duration-200 group-hover:border-primary/50 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:glow-red">
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {stream.isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-live/90 text-white text-xs font-bold px-2 py-0.5 rounded">
            <span className="live-dot" />
            LIVE
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">
          {stream.quality}
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono flex items-center gap-1">
          {stream.isLive ? (
            <Eye className="w-3 h-3" />
          ) : (
            <Clock className="w-3 h-3" />
          )}
          {stream.isLive ? formatViewers(stream.viewers) : stream.duration}
        </div>
      </div>
      <div className="flex gap-2">
        <img
          src={stream.streamerAvatar}
          alt={stream.streamer}
          className="w-8 h-8 rounded-full flex-shrink-0 border border-border"
        />
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {stream.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {stream.streamer}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4">
              {stream.category}
            </Badge>
            {stream.isLive && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViewers(stream.viewers)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
