import { Badge } from "@/components/ui/badge";
import type { Stream } from "@/data/mockData";
import {
  Maximize,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useState } from "react";

function formatViewers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function VideoPlayer({ stream }: { stream: Stream }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => setPlaying((p) => !p);

  return (
    <div
      data-ocid="stream.player.canvas_target"
      className="relative w-full bg-black rounded-lg overflow-hidden aspect-video group"
    >
      <img
        src={stream.thumbnail}
        alt={stream.title}
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Center play/pause button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          aria-label={playing ? "Pause stream" : "Play stream"}
          onClick={togglePlay}
          className={`w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm cursor-pointer transition-opacity duration-200 ${
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          {playing ? (
            <Pause className="w-7 h-7 text-white" />
          ) : (
            <Play className="w-7 h-7 text-white ml-1" />
          )}
        </button>
      </div>

      {/* LIVE badge */}
      {stream.isLive && (
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-live text-white text-xs font-bold px-2.5 py-1 rounded">
            <span className="live-dot" /> LIVE
          </div>
          <Badge className="bg-black/70 text-white border-0 text-xs">
            {formatViewers(stream.viewers)} watching
          </Badge>
        </div>
      )}

      {/* Quality badge */}
      <div className="absolute top-3 right-3">
        <Badge className="bg-black/70 text-white border border-white/20 font-mono text-xs">
          {stream.quality}
        </Badge>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors"
            >
              {playing ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="text-white hover:text-primary transition-colors"
            >
              {muted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <span className="text-white text-sm font-medium truncate max-w-48">
              {stream.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="text-white hover:text-primary">
              <Settings className="w-4 h-4" />
            </button>
            <button type="button" className="text-white hover:text-primary">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
