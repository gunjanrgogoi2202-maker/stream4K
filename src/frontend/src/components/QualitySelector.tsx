import { Crown } from "lucide-react";

export type Quality = "1080p" | "4K";

interface QualitySelectorProps {
  value: Quality;
  onChange: (v: Quality) => void;
  isPremium: boolean;
}

export function QualitySelector({
  value,
  onChange,
  isPremium,
}: QualitySelectorProps) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        data-ocid="studio.quality_toggle"
        onClick={() => onChange("1080p")}
        className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
          value === "1080p"
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-card text-muted-foreground hover:border-border/80"
        }`}
      >
        1080p
      </button>
      <button
        type="button"
        onClick={() => isPremium && onChange("4K")}
        className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
          !isPremium
            ? "border-border/40 bg-card/50 text-muted-foreground/50 cursor-not-allowed"
            : value === "4K"
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-card text-muted-foreground hover:border-accent/60"
        }`}
      >
        <Crown className="w-3.5 h-3.5" />
        4K
        {!isPremium && <span className="text-xs">Premium</span>}
      </button>
    </div>
  );
}
