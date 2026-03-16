import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import {
  BarChart2,
  Check,
  Crown,
  Headphones,
  Shield,
  Video,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const FREE_FEATURES = [
  "Watch all live streams",
  "Basic live chat",
  "SD/720p stream quality",
  "Browse all categories",
  "Follow channels",
];

const PREMIUM_FEATURES = [
  { icon: Video, text: "Go Live — broadcast your games" },
  { icon: Zap, text: "4K Ultra HD streaming" },
  { icon: Crown, text: "All layout presets (Landscape + Portrait)" },
  { icon: BarChart2, text: "Advanced analytics dashboard" },
  { icon: Shield, text: "Custom stream overlays" },
  { icon: Headphones, text: "Priority support" },
  { icon: Check, text: "No ads, ever" },
  { icon: Check, text: "Unlimited VOD storage" },
];

const COMPARISON = [
  { feature: "Watch streams", free: true, premium: true },
  { feature: "Live chat", free: true, premium: true },
  { feature: "Follow channels", free: true, premium: true },
  { feature: "720p stream quality", free: true, premium: true },
  { feature: "1080p streaming", free: false, premium: true },
  { feature: "4K streaming", free: false, premium: true },
  { feature: "Go Live", free: false, premium: true },
  { feature: "Landscape preset", free: false, premium: true },
  { feature: "Portrait preset", free: false, premium: true },
  { feature: "Analytics", free: false, premium: true },
  { feature: "No ads", free: false, premium: true },
  { feature: "VOD storage", free: false, premium: true },
];

const TESTIMONIALS = [
  {
    name: "RaghavFPS",
    text: "Going live in 4K for ₹50 a month is insane value. My stream quality went from meh to cinematic!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raghav",
  },
  {
    name: "MobileQueen_IN",
    text: "The portrait preset is perfect for my mobile gaming streams. Finally a platform that gets it!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MobileQueen",
  },
  {
    name: "ShivamStreams",
    text: "Analytics dashboard helped me 3x my viewership in 2 months. Worth every rupee.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shivam",
  },
];

export function Upgrade() {
  const { user, isLoggedIn, subscribe, login } = useApp();
  const isSubscribed = user?.isSubscribed ?? false;

  const handleSubscribe = () => {
    if (!isLoggedIn) {
      login();
      toast("Signed in! Now subscribing…");
      setTimeout(() => {
        subscribe();
        toast.success("Welcome to StreamForge Premium! 🎉");
      }, 800);
    } else if (!isSubscribed) {
      subscribe();
      toast.success("Welcome to StreamForge Premium! 🎉");
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto pb-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
          <Crown className="w-4 h-4" /> Premium Membership
        </div>
        <h1 className="font-display font-bold text-3xl lg:text-5xl mb-4">
          Unlock{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, oklch(0.55 0.22 27), oklch(0.52 0.22 293))",
            }}
          >
            StreamForge Premium
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Go live, stream in 4K, and grow your audience with the tools India's
          top streamers use.
        </p>
        <div className="mt-3 text-sm text-muted-foreground">
          Join <strong className="text-foreground">10,000+</strong> streamers
          already on Premium
        </div>
      </motion.div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {/* Free */}
        <motion.div
          data-ocid="upgrade.free_plan_card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="p-6 bg-card border border-border rounded-2xl"
        >
          <div className="mb-5">
            <h2 className="font-display font-bold text-xl">Free</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold font-display">₹0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Get started, watch and enjoy
            </p>
          </div>
          <ul className="space-y-2.5 mb-6">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="w-full border-border"
            disabled={!isLoggedIn}
          >
            {isLoggedIn ? "Current Plan" : "Sign In to Start"}
          </Button>
        </motion.div>

        {/* Premium */}
        <motion.div
          data-ocid="upgrade.premium_plan_card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="relative p-6 bg-card border-2 border-accent rounded-2xl glow-purple overflow-hidden"
        >
          <div className="absolute top-4 right-4">
            <Badge className="bg-accent text-white border-0">
              Most Popular
            </Badge>
          </div>
          <div className="mb-5">
            <h2 className="font-display font-bold text-xl flex items-center gap-2">
              <Crown className="w-5 h-5 text-accent" /> Premium
            </h2>
            <div className="mt-2">
              <span className="text-3xl font-bold font-display text-accent">
                ₹50
              </span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Everything you need to grow
            </p>
          </div>
          <ul className="space-y-2.5 mb-6">
            {PREMIUM_FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-sm">
                <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
          {isSubscribed ? (
            <Button
              className="w-full bg-accent/20 text-accent border border-accent/40 cursor-default"
              disabled
            >
              <Crown className="w-4 h-4 mr-2" /> Active Plan
            </Button>
          ) : (
            <Button
              data-ocid="upgrade.subscribe_button"
              className="w-full bg-accent hover:bg-accent/80 text-white font-bold h-11 glow-purple"
              onClick={handleSubscribe}
            >
              <Zap className="w-4 h-4 mr-2" /> Subscribe Now — ₹50/mo
            </Button>
          )}
        </motion.div>
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mb-12"
      >
        <h2 className="font-display font-bold text-xl text-center mb-5">
          Full Feature Comparison
        </h2>
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="text-left py-3 px-4 text-sm font-semibold">
                  Feature
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold">
                  Free
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-accent">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-card" : "bg-background"}
                >
                  <td className="py-2.5 px-4 text-sm">{row.feature}</td>
                  <td className="py-2.5 px-4 text-center">
                    {row.free ? (
                      <Check className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <Check className="w-4 h-4 text-accent mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Testimonials */}
      <div>
        <h2 className="font-display font-bold text-xl text-center mb-5">
          What Streamers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              className="p-4 bg-card border border-border rounded-xl"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-8 h-8 rounded-full border border-border"
                />
                <span className="text-sm font-semibold">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
