import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { Link } from "@tanstack/react-router";
import { Crown, Zap } from "lucide-react";
import type { ReactNode } from "react";

interface PremiumGateProps {
  children?: ReactNode;
  feature?: string;
}

export function PremiumGate({
  children,
  feature = "this feature",
}: PremiumGateProps) {
  const { user, isLoggedIn } = useApp();

  if (isLoggedIn && user?.isSubscribed) return <>{children}</>;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-5 glow-purple">
          <Crown className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-2">
          Premium Feature
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {!isLoggedIn
            ? `Sign in and subscribe to access ${feature}. Plans start at just ₹50/month.`
            : `Unlock ${feature} with a StreamForge Premium subscription at just ₹50/month.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!isLoggedIn && (
            <Button variant="outline" className="border-border">
              Sign In
            </Button>
          )}
          <Button
            asChild
            className="bg-accent hover:bg-accent/80 text-white glow-purple"
          >
            <Link to="/upgrade">
              <Zap className="w-4 h-4 mr-2" />
              Upgrade — ₹50/mo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
