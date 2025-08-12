import { CurrencySelector } from "@/components/settings/currency-selector";
import { DataActions } from "@/components/settings/data-actions";
import { WalletConnector } from "@/components/settings/wallet-connector";
import { RuntimeTests } from "@/components/settings/runtime-tests";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCard } from "../ui/animated-card";

export function SettingsScreen() {
  return (
    <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
            <AnimatedCard delay={0}>
                <CardHeader><CardTitle>General</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <CurrencySelector />
                </CardContent>
            </AnimatedCard>
            <AnimatedCard delay={0.1}>
                <CardHeader><CardTitle>Data Management</CardTitle></CardHeader>
                <CardContent>
                    <DataActions />
                </CardContent>
            </AnimatedCard>
            <AnimatedCard delay={0.2}>
                <CardHeader><CardTitle>Wallet</CardTitle></CardHeader>
                <CardContent>
                    <WalletConnector />
                </CardContent>
            </AnimatedCard>
            <AnimatedCard delay={0.3}>
                <CardHeader><CardTitle>Self-Tests</CardTitle></CardHeader>
                <CardContent>
                    <RuntimeTests />
                </CardContent>
            </AnimatedCard>
        </div>
    </div>
  );
}
