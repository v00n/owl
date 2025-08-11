"use client";

import { useAppContext } from "@/context/AppContext";
import { calculateTotals } from "@/lib/financial-utils";
import { StatCard } from "@/components/overview/stat-card";
import { RecentActivityList } from "@/components/overview/recent-activity-list";
import { TopCategories } from "@/components/overview/top-categories";
import { DollarSign, ArrowUp, ArrowDown, Shield } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatedCard } from "../ui/animated-card";
import { cn } from "@/lib/utils";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

export function OverviewScreen() {
  const { state } = useAppContext();
  const { transactions, emergencyFund, settings } = state;
  const { monthlyIncome, monthlyExpenses } = calculateTotals(transactions);

  const netMonthly = monthlyIncome - monthlyExpenses;
  const emergencyFundProgress = emergencyFund.target > 0 ? (emergencyFund.current / emergencyFund.target) * 100 : 0;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly Income"
          value={formatCurrency(monthlyIncome, settings.currency)}
          icon={<ArrowUp className="h-4 w-4 text-muted-foreground" />}
          delay={0}
        />
        <StatCard
          title="Monthly Expenses"
          value={formatCurrency(monthlyExpenses, settings.currency)}
          icon={<ArrowDown className="h-4 w-4 text-muted-foreground" />}
          delay={0.1}
        />
        <StatCard
          title="Net Monthly"
          value={formatCurrency(netMonthly, settings.currency)}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          delay={0.2}
        />
        <AnimatedCard delay={0.3}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emergency Fund</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(emergencyFund.current, settings.currency)}</div>
                <p className="text-xs text-muted-foreground">
                    {formatCurrency(emergencyFund.target, settings.currency)} Goal
                </p>
                <Progress value={emergencyFundProgress} className={cn("h-2 mt-2", emergencyFundProgress < 100 && "animate-shimmer")} />
            </CardContent>
        </AnimatedCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatedCard className="lg:col-span-2" delay={0.4}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityList />
          </CardContent>
        </AnimatedCard>
        <AnimatedCard delay={0.5}>
          <CardHeader>
            <CardTitle>Top Categories (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <TopCategories />
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  );
}
