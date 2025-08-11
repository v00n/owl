import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryPieChart } from "@/components/analytics/category-pie-chart";
import { CashflowAreaChart } from "@/components/analytics/cashflow-area-chart";

export function AnalyticsScreen() {
  return (
    <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Analytics</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Spending by Category (This Month)</CardTitle>
                </CardHeader>
                <CardContent>
                    <CategoryPieChart />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Daily Cashflow (This Month)</CardTitle>
                </CardHeader>
                <CardContent>
                    <CashflowAreaChart />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
