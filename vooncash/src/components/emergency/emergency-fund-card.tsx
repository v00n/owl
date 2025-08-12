"use client";

import { useAppContext } from "@/context/AppContext";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";
import { SetGoalDialog } from "./set-goal-dialog";
import { ContributeDialog } from "./contribute-dialog";
import { AnimatedCard } from "../ui/animated-card";
import { cn } from "@/lib/utils";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

interface EmergencyFundCardProps {
    delay?: number;
}

export function EmergencyFundCard({ delay }: EmergencyFundCardProps) {
  const { state } = useAppContext();
  const { emergencyFund, settings } = state;
  const { current, target } = emergencyFund;

  const progress = target > 0 ? (current / target) * 100 : 0;
  const remaining = target - current;

  return (
    <AnimatedCard delay={delay}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Emergency Fund</span>
          <Shield className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold">{formatCurrency(current, settings.currency)}</div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className={cn("h-2", progress < 100 && "animate-shimmer")} />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Goal: {formatCurrency(target, settings.currency)}</span>
          {remaining > 0 && (
             <span className="text-muted-foreground">Remaining: {formatCurrency(remaining, settings.currency)}</span>
          )}
        </div>

        <div className="flex gap-2 pt-2">
            <ContributeDialog />
            <SetGoalDialog />
        </div>
      </CardContent>
    </AnimatedCard>
  );
}
