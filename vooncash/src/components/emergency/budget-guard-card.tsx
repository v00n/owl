"use client";

import { useAppContext } from "@/context/AppContext";
import { calculateTotals } from "@/lib/financial-utils";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedCard } from "../ui/animated-card";
import { cn } from "@/lib/utils";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

function AdjustBudgetDialog() {
    const { state, setMonthlyBudget } = useAppContext();
    const [open, setOpen] = useState(false);
    const [budget, setBudget] = useState(state.settings.monthlyBudget.toString());

    const handleSubmit = () => {
        const newBudget = parseFloat(budget);
        if (!isNaN(newBudget) && newBudget >= 0) {
            setMonthlyBudget(newBudget);
            setOpen(false);
        } else {
            alert("Please enter a valid positive number for the budget.");
        }
    };

    useEffect(() => {
        setBudget(state.settings.monthlyBudget.toString());
    }, [state.settings.monthlyBudget])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Adjust Budget</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Adjust Monthly Budget</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="budget" className="text-right">
                        Budget Amount
                        </Label>
                        <Input
                        id="budget"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Set Budget</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

interface BudgetGuardCardProps {
    delay?: number;
}

export function BudgetGuardCard({ delay }: BudgetGuardCardProps) {
  const { state } = useAppContext();
  const { transactions, settings } = state;
  const { monthlyExpenses } = calculateTotals(transactions);
  const { monthlyBudget } = settings;

  const spentPercentage = monthlyBudget > 0 ? (monthlyExpenses / monthlyBudget) * 100 : 0;
  const remainingBudget = monthlyBudget - monthlyExpenses;

  return (
    <AnimatedCard delay={delay}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Budget Guard</span>
          <Target className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Spent this month</span>
            <span className="text-sm font-medium">
              {formatCurrency(monthlyExpenses, settings.currency)} / {formatCurrency(monthlyBudget, settings.currency)}
            </span>
          </div>
          <Progress value={spentPercentage} className={cn("h-2", spentPercentage < 100 && "animate-shimmer")} />
        </div>

        <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
                {remainingBudget >= 0
                    ? `${formatCurrency(remainingBudget, settings.currency)} remaining`
                    : `${formatCurrency(Math.abs(remainingBudget), settings.currency)} over budget`}
            </span>
            <AdjustBudgetDialog />
        </div>
      </CardContent>
    </AnimatedCard>
  );
}
