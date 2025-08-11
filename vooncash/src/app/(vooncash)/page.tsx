"use client";

import { useAppContext } from "@/context/AppContext";
import { OverviewScreen } from "@/components/screens/overview-screen";
import { TransactionsScreen } from "@/components/screens/transactions-screen";
import { EmergencyScreen } from "@/components/screens/emergency-screen";
import { AnalyticsScreen } from "@/components/screens/analytics-screen";
import { SettingsScreen } from "@/components/screens/settings-screen";

export default function HomePage() {
  const { state } = useAppContext();
  const activeTab = state.settings.activeTab;

  const renderScreen = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewScreen />;
      case "transactions":
        return <TransactionsScreen />;
      case "emergency":
        return <EmergencyScreen />;
      case "analytics":
        return <AnalyticsScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <OverviewScreen />;
    }
  };

  return <>{renderScreen()}</>;
}
