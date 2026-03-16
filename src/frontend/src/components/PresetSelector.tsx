import { Monitor, Smartphone } from "lucide-react";

export type Preset = "landscape" | "portrait";

interface PresetSelectorProps {
  value: Preset;
  onChange: (v: Preset) => void;
}

function CheckIcon() {
  return (
    <svg
      className="w-2.5 h-2.5 text-white"
      fill="none"
      viewBox="0 0 12 12"
      aria-hidden="true"
      role="img"
      aria-label="Selected"
    >
      <title>Selected</title>
      <path
        d="M10 3L5 8.5 2 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PresetSelector({ value, onChange }: PresetSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Landscape preset */}
      <button
        type="button"
        data-ocid="studio.preset.landscape_button"
        onClick={() => onChange("landscape")}
        className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
          value === "landscape"
            ? "border-primary bg-primary/10 glow-red"
            : "border-border bg-card hover:border-border/80 hover:bg-muted/50"
        }`}
      >
        <div className="w-full aspect-video rounded-md bg-gradient-to-br from-secondary to-muted flex items-center justify-center border border-border/50">
          <Monitor
            className={`w-8 h-8 ${value === "landscape" ? "text-primary" : "text-muted-foreground"}`}
          />
        </div>
        <div className="text-center">
          <p
            className={`text-sm font-semibold ${value === "landscape" ? "text-primary" : "text-foreground"}`}
          >
            Landscape 16:9
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">PC Gaming</p>
        </div>
        {value === "landscape" && (
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
            <CheckIcon />
          </div>
        )}
      </button>

      {/* Portrait preset */}
      <button
        type="button"
        data-ocid="studio.preset.portrait_button"
        onClick={() => onChange("portrait")}
        className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
          value === "portrait"
            ? "border-primary bg-primary/10 glow-red"
            : "border-border bg-card hover:border-border/80 hover:bg-muted/50"
        }`}
      >
        <div className="w-full aspect-video rounded-md bg-gradient-to-br from-secondary to-muted flex items-center justify-center border border-border/50">
          <div className="w-10 h-16 rounded-md bg-muted-foreground/20 border border-muted-foreground/30 flex items-center justify-center">
            <Smartphone
              className={`w-5 h-5 ${value === "portrait" ? "text-primary" : "text-muted-foreground"}`}
            />
          </div>
        </div>
        <div className="text-center">
          <p
            className={`text-sm font-semibold ${value === "portrait" ? "text-primary" : "text-foreground"}`}
          >
            Portrait 9:16
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Mobile Gaming</p>
        </div>
        {value === "portrait" && (
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
            <CheckIcon />
          </div>
        )}
      </button>
    </div>
  );
}
