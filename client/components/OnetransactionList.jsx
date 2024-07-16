"use client";
import React from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib';
import { Skeleton } from './ui/skeleton';
import TransactionDataTable from './onetransaction/DataTable';
import columns from './onetransaction/columns';  // Correct import as default export

const baseApi = `${process.env.NEXT_PUBLIC_API_URL}/income`;

function OnetransactionList() {
  const { data: incomes, error } = useSWR(baseApi, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!incomes) return (
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

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(`${baseApi}/${updatedData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Optimistically update the local data
      mutate(baseApi);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (deletedData) => {
    try {
      const response = await fetch(`${baseApi}/${deletedData._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Optimistically update the local data
      mutate(baseApi, (data) => ({
        ...data,
        data: data.data.filter(item => item._id !== deletedData._id),
      }), false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (row) => {
    // Implement your edit functionality here
    console.log('Edit clicked for row:', row);
  };

  return (
    <div>
      <h1 className='pt-5 pb-5 text-2xl'>Income Statement</h1>
      <TransactionDataTable
        columns={columns}  // Pass columns as a function
        data={incomes.data}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default OnetransactionList;
