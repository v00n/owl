"use client";

import { useAppContext } from "@/context/AppContext";
import { getTopCategories, calculateTotals } from "@/lib/financial-utils";
import { Progress } from "@/components/ui/progress";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function TopCategories() {
  const { state } = useAppContext();
  const topCategories = getTopCategories(state.transactions);
  const { monthlyExpenses } = calculateTotals(state.transactions);

  if (topCategories.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No spending this month.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topCategories.map(([category, amount]) => {
        const percentage = monthlyExpenses > 0 ? (amount / monthlyExpenses) * 100 : 0;
        return (
          <div key={category}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{category}</span>
              <span className="text-sm text-muted-foreground">
                {formatCurrency(amount, state.settings.currency)}
              </span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )
      })}
    </div>
  );
}
