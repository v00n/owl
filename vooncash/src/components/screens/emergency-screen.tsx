import { EmergencyFundCard } from "@/components/emergency/emergency-fund-card";
import { BudgetGuardCard } from "@/components/emergency/budget-guard-card";

export function EmergencyScreen() {
  return (
    <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Emergency & Budget</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            <EmergencyFundCard delay={0} />
            <BudgetGuardCard delay={0.1} />
        </div>
    </div>
  );
}
