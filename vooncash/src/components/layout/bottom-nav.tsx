"use client";

import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { Home, List, Shield, PieChart, Settings } from "lucide-react";
import { Tab } from "@/lib/types";

const navItems: { tab: Tab; label: string; icon: React.ElementType }[] = [
  { tab: "overview", label: "Overview", icon: Home },
  { tab: "transactions", label: "Transactions", icon: List },
  { tab: "emergency", label: "Emergency", icon: Shield },
  { tab: "analytics", label: "Analytics", icon: PieChart },
  { tab: "settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const { state, setActiveTab } = useAppContext();
  const activeTab = state.settings.activeTab;

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-16 grid-cols-5 max-w-lg mx-auto font-medium">
        {navItems.map(({ tab, label, icon: Icon }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group",
              activeTab === tab
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
}
