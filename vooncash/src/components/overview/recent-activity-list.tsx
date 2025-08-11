"use client";

import { useAppContext } from "@/context/AppContext";
import { getRecentTransactions } from "@/lib/financial-utils";
import { Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function RecentActivityList() {
  const { state } = useAppContext();
  const recentTransactions = getRecentTransactions(state.transactions, 6);

  if (recentTransactions.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No recent transactions.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentTransactions.map((tx: Transaction) => (
        <div key={tx.id} className="flex items-center">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-secondary">
            {tx.type === 'income' ? <ArrowUpRight className="h-5 w-5 text-green-500" /> : <ArrowDownLeft className="h-5 w-5 text-red-500" />}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{tx.category}</p>
            <p className="text-sm text-muted-foreground">{tx.description || 'No description'}</p>
          </div>
          <div className={cn(
            "ml-auto font-medium",
            tx.type === 'income' ? 'text-green-500' : 'text-red-500'
          )}>
            {tx.type === 'income' ? '+' : '-'}
            {formatCurrency(tx.amount, state.settings.currency)}
          </div>
        </div>
      ))}
    </div>
  );
}
