"use client";
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib';
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

const baseApi = `${process.env.NEXT_PUBLIC_API_URL}`;

function DashTransactionChart() {
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
      // Initialize an object to store aggregated values by month
      const aggregatedData = {};

      // Aggregate income data by month
      data.income.forEach((incomeItem) => {
        const month = new Date(incomeItem.date).toLocaleString('default', {
          month: 'long',
        });
        if (!aggregatedData[month]) {
          aggregatedData[month] = {
            month,
            income: incomeItem.amount,
            expense: 0,
          };
        } else {
          aggregatedData[month].income += incomeItem.amount;
        }
      });

      // Aggregate expense data by month
      data.expense.forEach((expenseItem) => {
        const month = new Date(expenseItem.date).toLocaleString('default', {
          month: 'long',
        });
        if (!aggregatedData[month]) {
          aggregatedData[month] = {
            month,
            income: 0,
            expense: expenseItem.amount,
          };
        } else {
          aggregatedData[month].expense += expenseItem.amount;
        }
      });

      // Convert aggregatedData object into an array of values for chartData
      const chartDataArray = Object.values(aggregatedData);

      setChartData(chartDataArray);
    }
  }, [data]);

  if (error) return <div>Error loading data</div>;
  if (!data) return (
    <div className="flex items-center space-x-4 pt-10">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-400" />
        <Skeleton className="h-4 w-[200px] bg-orange-300" />
      </div>
      
    </div>
  );

  return (
    <Card className='shadow-md'>
      <CardHeader>
        <CardTitle>Area Chart - Income/Expense</CardTitle>
        <CardDescription>
          Showing total income and expenses history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value}`} />
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
              Income/Expense comparison <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Year 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default DashTransactionChart;
