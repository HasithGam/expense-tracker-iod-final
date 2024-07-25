"use client";
import { fetcher } from '@/lib';
import useSWR from 'swr';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

function TotalIncome() {
  const baseApi = `${process.env.NEXT_PUBLIC_API_URL}/data`;
  const { data: transactions, error } = useSWR(baseApi, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!transactions) return (
    <div className="flex items-center space-x-4 pt-10">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-400" />
        <Skeleton className="h-4 w-[200px] bg-orange-300" />
      </div>
    </div>
  );

  const incomeData = transactions.income
    .map(item => ({ ...item, type: 'income' }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const expenseData = transactions.expense
    .map(item => ({ ...item, type: 'expense' }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div className='pb-5'>
        <strong>Recent Incomes 💵</strong>
        <div className='flex items-center gap-6 p-5 border shadow-md'>
            {incomeData.slice(0, 3).map((item) => (
            <div key={item._id} className="transaction-item">
                <p>{item.title}: ${item.amount}</p>
                <p>{format(new Date(item.date), 'yyyy-MM-dd')}</p>
            </div>
            ))}
        </div>
      </div>
      <div>
        <strong>Recent Expenses 💸</strong>
        <div className='flex items-center gap-6 p-5 border shadow-md'>
            {expenseData.slice(0, 3).map((item) => (
            <div key={item._id} className="transaction-item">
                <p>{item.title}: ${item.amount}</p>
                <p>{format(new Date(item.date), 'yyyy-MM-dd')}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TotalIncome;
