import { PremiumGate } from "@/components/PremiumGate";
import { type Preset, PresetSelector } from "@/components/PresetSelector";
import { type Quality, QualitySelector } from "@/components/QualitySelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/context/AppContext";
import { Check, Clock, Copy, Radio, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const STREAM_KEY = "sfk_live_xK7mP2nQr8vTdYwL9bJcAeZ3";

export function Studio() {
  const { user, isLoggedIn, isLive, setIsLive } = useApp();
  const isPremium = isLoggedIn && (user?.isSubscribed ?? false);

  const [title, setTitle] = useState("My Awesome Gaming Stream");
  const [category, setCategory] = useState("FPS");
  const [quality, setQuality] = useState<Quality>("1080p");
  const [preset, setPreset] = useState<Preset>("landscape");
  const [visibility, setVisibility] = useState<"public" | "unlisted">("public");
  const [keyVisible, setKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewers] = useState(0);
  const [peakViewers] = useState(0);
  const [duration] = useState("00:00:00");

  const copyKey = () => {
    navigator.clipboard.writeText(STREAM_KEY).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Stream key copied!");
  };

  const toggleLive = () => {
    if (!isLive) {
      if (!title.trim()) {
        toast.error("Please enter a stream title");
        return;
      }
      setIsLive(true);
      toast.success("You are now LIVE! 🔴");
    } else {
      setIsLive(false);
      toast("Stream ended.");
    }
  };

  if (!isLoggedIn || !isPremium) {
    return <PremiumGate feature="Go Live Studio" />;
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
            <h1 className="font-display font-bold text-2xl">Go Live Studio</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Configure and start your broadcast
            </p>
          </div>
          {isLive && (
            <div className="flex items-center gap-2 bg-live/10 border border-live/30 rounded-full px-4 py-1.5">
              <span className="live-dot" />
              <span className="text-sm font-semibold text-live">LIVE</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Setup Form */}
          <div className="lg:col-span-2 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="stream-title" className="text-sm font-medium">
                Stream Title
              </Label>
              <Input
                id="stream-title"
                data-ocid="studio.title_input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your stream an awesome title…"
                className="bg-muted border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Game Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  data-ocid="studio.category_select"
                  className="bg-muted border-border"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {[
                    "FPS",
                    "Battle Royale",
                    "RPG",
                    "Sports",
                    "Racing",
                    "Strategy",
                    "Mobile",
                    "Other",
                  ].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Stream Quality</Label>
              <QualitySelector
                value={quality}
                onChange={setQuality}
                isPremium={isPremium}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Stream Layout Preset
              </Label>
              <PresetSelector value={preset} onChange={setPreset} />
            </div>

            <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
              <div>
                <p className="text-sm font-medium">Public Stream</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Anyone can discover and watch your stream
                </p>
              </div>
              <Switch
                checked={visibility === "public"}
                onCheckedChange={(v) =>
                  setVisibility(v ? "public" : "unlisted")
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Stream Key</Label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    type={keyVisible ? "text" : "password"}
                    readOnly
                    value={STREAM_KEY}
                    className="bg-muted border-border font-mono text-xs pr-16"
                  />
                  <button
                    type="button"
                    onClick={() => setKeyVisible((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {keyVisible ? "Hide" : "Show"}
                  </button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyKey}
                  className="border-border h-10 px-3"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this key in OBS, Streamlabs, or any RTMP encoder
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-3 border-b border-border">
                <p className="text-sm font-semibold">
                  Preview — {preset === "landscape" ? "16:9" : "9:16"}
                </p>
              </div>
              <div className="p-4 flex items-center justify-center bg-black/40">
                <div
                  className={`bg-gradient-to-br from-secondary to-muted rounded-lg border border-border/50 flex items-center justify-center ${
                    preset === "landscape"
                      ? "w-full aspect-video"
                      : "w-16 aspect-[9/16]"
                  }`}
                >
                  <Radio
                    className={`text-muted-foreground ${preset === "landscape" ? "w-10 h-10" : "w-5 h-5"}`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold mb-2">Stream Stats</p>
              {[
                {
                  icon: Users,
                  label: "Viewers",
                  value: isLive ? viewers : "—",
                },
                { icon: Zap, label: "Peak", value: isLive ? peakViewers : "—" },
                {
                  icon: Clock,
                  label: "Duration",
                  value: isLive ? duration : "—",
                },
                {
                  icon: Radio,
                  label: "Bitrate",
                  value: isLive ? "6000 kbps" : "—",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                  <span className="font-mono font-medium">{String(value)}</span>
                </div>
              ))}
            </div>

            <Button
              data-ocid="studio.start_button"
              className={`w-full h-12 text-base font-bold font-display transition-all ${
                isLive
                  ? "bg-muted text-foreground border border-border hover:bg-muted/80"
                  : "bg-primary hover:bg-primary/80 text-white glow-red"
              }`}
              onClick={toggleLive}
            >
              {isLive ? (
                <span className="flex items-center gap-2">
                  <span className="live-dot" /> End Stream
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Radio className="w-4 h-4" /> Start Streaming
                </span>
              )}
            </Button>

            {isLive && (
              <Badge className="w-full justify-center py-1.5 bg-live/10 text-live border-live/30">
                <span className="live-dot mr-2" /> Broadcasting Live
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
