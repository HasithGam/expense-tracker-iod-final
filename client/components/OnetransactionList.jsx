"use client";
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib';
import { Skeleton } from './ui/skeleton';
import TransactionDataTable from './onetransaction/DataTable';
import columns from './onetransaction/columns';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



const OnetransactionList = ({transactionName}) => {
  const baseApi = `${process.env.NEXT_PUBLIC_API_URL}/${transactionName}`;
  console.log(baseApi);
  console.log(transactionName);
  const { data: incomes, error } = useSWR(baseApi, fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

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

  const handleUpdate = (updatedData) => {
    setCurrentData(updatedData);
    setIsDialogOpen(true);
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

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentData(null);
  };

  const handleDialogUpdate = async () => {
    try {
      const response = await fetch(`${baseApi}/${currentData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      mutate(baseApi);
    } catch (error) {
      console.error('Error:', error);
      mutate(baseApi);
    } 
    handleDialogClose();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCurrentData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div>
      <h1 className='pt-5 pb-5 text-2xl'>Statement</h1>
      <TransactionDataTable
        columns={columns}
        data={incomes.data}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      
      {currentData && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Details</DialogTitle>
              <DialogDescription>
                Make changes to your transaction here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="_id" className="text-right">
                  ID:
                </Label>
                <Input id="_id" value={currentData._id} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title:
                </Label>
                <Input id="title" value={currentData.title} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount:
                </Label>
                <Input id="amount" value={currentData.amount} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category:
                </Label>
                <Input id="category" value={currentData.category} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description:
                </Label>
                <Input id="description" value={currentData.description} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date:
                </Label>
                <Input id="date" value={currentData.date} onChange={handleInputChange} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleDialogUpdate}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default OnetransactionList;
