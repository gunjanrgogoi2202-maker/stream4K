import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart2,
  BookMarked,
  ChevronRight,
  Crown,
  Gamepad2,
  Home,
  Library,
  LogIn,
  LogOut,
  Menu,
  Radio,
  Video,
  X,
} from "lucide-react";
import { type ReactNode, useState } from "react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", to: "/", ocid: "nav.home_link" },
  { icon: Radio, label: "Live", to: "/?filter=live", ocid: "nav.live_link" },
  {
    icon: Gamepad2,
    label: "Categories",
    to: "/?filter=categories",
    ocid: "nav.categories_link",
  },
  {
    icon: BookMarked,
    label: "Subscriptions",
    to: "/?filter=subscriptions",
    ocid: "nav.subscriptions_link",
  },
  {
    icon: Library,
    label: "Library",
    to: "/?filter=library",
    ocid: "nav.library_link",
  },
];

const BOTTOM_NAV = [
  { icon: Crown, label: "Upgrade", to: "/upgrade", ocid: "nav.upgrade_link" },
  {
    icon: BarChart2,
    label: "Analytics",
    to: "/analytics",
    ocid: "nav.analytics_link",
  },
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isLoggedIn, user, login, logout } = useApp();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (to: string) => location.pathname === to.split("?")[0];
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 flex items-center gap-3 px-4 h-14 bg-background/95 backdrop-blur border-b border-border">
        <button
          type="button"
          className="lg:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setSidebarOpen((o) => !o)}
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/assets/generated/streamforge-logo-transparent.dim_120x120.png"
            alt="StreamForge"
            className="w-8 h-8 object-contain"
          />
          <span className="font-display font-bold text-lg hidden sm:block">
            Stream<span className="text-primary">Forge</span>
          </span>
        </Link>

        <div className="flex-1 max-w-xl mx-auto hidden md:block">
          <input
            data-ocid="browse.search_input"
            type="text"
            placeholder="Search streams, games, channels…"
            className="w-full h-9 bg-muted border border-border rounded-full px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {isLoggedIn && user ? (
            <>
              {user.isSubscribed && (
                <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-accent border border-accent/30 rounded-full px-2 py-0.5 bg-accent/10">
                  <Crown className="w-3 h-3" /> Premium
                </span>
              )}
              <Link to="/studio">
                <Button
                  data-ocid="nav.golive_button"
                  size="sm"
                  className="bg-primary hover:bg-primary/80 text-white font-semibold h-8 hidden sm:flex gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" /> Go Live
                </Button>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                title="Sign out"
              >
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-7 h-7 rounded-full border border-border"
                />
                <LogOut className="w-4 h-4 hidden sm:block" />
              </button>
            </>
          ) : (
            <Button
              data-ocid="nav.signin_button"
              size="sm"
              variant="outline"
              className="h-8 border-border text-foreground hover:bg-muted"
              onClick={login}
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5" /> Sign In
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-56 bg-background border-r border-border flex flex-col transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-thin">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to.split("?")[0]}
                data-ocid={item.ocid}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(item.to)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {isActive(item.to) && (
                  <ChevronRight className="w-3 h-3 ml-auto" />
                )}
              </Link>
            ))}

            <div className="my-3 border-t border-border" />

            {BOTTOM_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                data-ocid={item.ocid}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(item.to)
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground/50 text-center leading-relaxed">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-muted-foreground"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-30 bg-black/50 lg:hidden w-full cursor-default"
            onClick={closeSidebar}
          />
        )}

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
