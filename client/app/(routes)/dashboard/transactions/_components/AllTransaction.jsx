"use client";
import { fetcher } from '@/lib';
import useSWR from 'swr';
import columns from './trnColumns';
import { Skeleton } from '@/components/ui/skeleton';
import TranDataTable from './trnDataTable';

const AllTransaction = ({ transactionName }) => {
  const baseApi = `${process.env.NEXT_PUBLIC_API_URL}/${transactionName}`;
  const { data: transactions, error } = useSWR(baseApi, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!transactions) return (
    <div className="flex items-center space-x-4 pt-10">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-400" />
        <Skeleton className="h-4 w-[200px] bg-orange-300" />
      </div>
      <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-400" />
        <Skeleton className="h-4 w-[200px] bg-orange-300" />
      </div>
    </div>
  );

  const combinedData = [
    ...transactions.income.map(item => ({ ...item, type: 'income' })),
    ...transactions.expense.map(item => ({ ...item, type: 'expense' })),
  ];

  console.log(combinedData);

  return (
    <div>
      <TranDataTable
        columns={columns}
        data={combinedData}
      />
    </div>
  );
}

export default AllTransaction;
