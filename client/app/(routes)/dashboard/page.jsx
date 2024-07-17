"use client";
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
const baseApi = `${process.env.NEXT_PUBLIC_API_URL}`;
const fetcher = (url) => fetch(url).then((res) => res.json());

function Dashboard() {
  const { data, error } = useSWR(`${baseApi}/data`, fetcher);
  const [chartData, setChartData] = useState([]);
  
  // Define chartConfig for ChartContainer
  const chartConfig = {
    incomeclr: {
      label: "Income",
      color: "hsl(var(--chart-2))",
    },
    expenseclr: {
      label: "Expense",
      color: "hsl(var(--chart-1))",
    }
  };

  useEffect(() => {
    if (data) {
      // Combine income and expense data into chartData
      const incomeData = data.income;
      const expenseData = data.expense;
      const combinedData = [];

      incomeData.forEach((incomeItem) => {
        const month = new Date(incomeItem.date).toLocaleString('default', {
          month: 'long',
        });
        combinedData.push({
          month,
          income: incomeItem.amount,
          expense: 0,
        });
      });

      expenseData.forEach((expenseItem) => {
        const month = new Date(expenseItem.date).toLocaleString('default', {
          month: 'long',
        });
        const existingEntry = combinedData.find((entry) => entry.month === month);
        if (existingEntry) {
          existingEntry.expense += expenseItem.amount;
        } else {
          combinedData.push({
            month,
            income: 0,
            expense: expenseItem.amount,
          });
        }
      });

      setChartData(combinedData);
    }
  }, [data]);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total income and expenses for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="expense"
              stackId="1"
              fill="var(--color-expenseclr)"
              stroke="var(--color-expenseclr)"
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              fill="var(--color-incomeclr)"
              stroke="var(--color-incomeclr)"
              fillOpacity={0.4}
            />
            
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Dashboard;
