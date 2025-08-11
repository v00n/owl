"use client";

import { useAppContext } from "@/context/AppContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1943"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function CategoryPieChart() {
  const { state } = useAppContext();
  const { transactions, settings } = state;

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const monthlySpending = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return t.type === 'expense' && transactionDate.getMonth() === thisMonth && transactionDate.getFullYear() === thisYear;
  });

  const data = monthlySpending.reduce((acc, t) => {
    const existingCategory = acc.find(item => item.name === t.category);
    if (existingCategory) {
      existingCategory.value += t.amount;
    } else {
      acc.push({ name: t.category, value: t.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  if (data.length === 0) {
    return <div className="text-center text-muted-foreground py-8 h-[300px] flex items-center justify-center">No spending data for this month.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={86}
          innerRadius={42}
          paddingAngle={3}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [new Intl.NumberFormat('en-US', { style: 'currency', currency: settings.currency }).format(value), 'Amount']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
