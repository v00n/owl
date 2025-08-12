"use client";

import { useAppContext } from "@/context/AppContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

export function CashflowAreaChart() {
  const { state } = useAppContext();
  const { transactions, settings } = state;

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate();

  const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    income: 0,
    expense: 0,
  }));

  transactions.forEach(t => {
    const transactionDate = new Date(t.date);
    if (transactionDate.getMonth() === thisMonth && transactionDate.getFullYear() === thisYear) {
      const dayOfMonth = transactionDate.getDate();
      if (t.type === 'income') {
        dailyData[dayOfMonth - 1].income += t.amount;
      } else {
        dailyData[dayOfMonth - 1].expense += t.amount;
      }
    }
  });

  const chartData = dailyData.filter(d => d.income > 0 || d.expense > 0);

  if (chartData.length === 0) {
    return <div className="text-center text-muted-foreground py-8 h-[300px] flex items-center justify-center">No transaction data for this month.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={dailyData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis tickFormatter={(value: number) => formatCurrency(value, settings.currency).replace(/(\.00|,\d+)$/, '')} />
        <Tooltip formatter={(value: number) => [formatCurrency(value, settings.currency), 'Amount']} />
        <Legend />
        <Area type="monotone" dataKey="income" stroke="#10B981" fillOpacity={1} fill="url(#colorIncome)" />
        <Area type="monotone" dataKey="expense" stroke="#EF4444" fillOpacity={1} fill="url(#colorExpense)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
