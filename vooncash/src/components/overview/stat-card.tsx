import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { AnimatedCard } from "../ui/animated-card";

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StatCard({ title, value, icon, footer, className, delay }: StatCardProps) {
  return (
    <AnimatedCard className={cn("w-full", className)} delay={delay}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {footer}
      </CardContent>
    </AnimatedCard>
  );
}
