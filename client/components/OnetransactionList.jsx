"use client";
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib';
import { Skeleton } from './ui/skeleton';
import TransactionDataTable from './onetransaction/DataTable';
import columns from './onetransaction/columns';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const baseApi = `${process.env.NEXT_PUBLIC_API_URL}/income`;

function OnetransactionList() {
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

  const handleUpdate = async (updatedData) => {
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

  const handleDialogSave = async () => {
    // Implement your save functionality here
    // e.g., send updated data to the server
    handleDialogClose();
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
      
      {currentData && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={currentData.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value={currentData.username} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleDialogSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default OnetransactionList;


// "use client";
// import React from 'react';
// import useSWR, { mutate } from 'swr';
// import { fetcher } from '@/lib';
// import { Skeleton } from './ui/skeleton';
// import TransactionDataTable from './onetransaction/DataTable';
// import columns from './onetransaction/columns';

// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// const baseApi = `${process.env.NEXT_PUBLIC_API_URL}/income`;

// function OnetransactionList() {
//   const { data: incomes, error } = useSWR(baseApi, fetcher);

//   if (error) return <div>Failed to load</div>;
//   if (!incomes) return (
//     <div className="flex items-center space-x-4 pt-10">
//       <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
//       <div className="space-y-2">
//         <Skeleton className="h-4 w-[250px] bg-gray-400" />
//         <Skeleton className="h-4 w-[200px] bg-orange-300" />
//       </div>
//       <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
//       <div className="space-y-2">
//         <Skeleton className="h-4 w-[250px] bg-gray-400" />
//         <Skeleton className="h-4 w-[200px] bg-orange-300" />
//       </div>
//     </div>
//   );

//   const handleUpdate = async (updatedData) => {

//     return (
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="outline">Edit Profile</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Edit profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="name" className="text-right">
//                     Name
//                   </Label>
//                   <Input id="name" value="Pedro Duarte" className="col-span-3" />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="username" className="text-right">
//                     Username
//                   </Label>
//                   <Input id="username" value="@peduarte" className="col-span-3" />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button type="submit">Save changes</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//          )
//     // try {
//     //   const response = await fetch(`${baseApi}/${updatedData._id}`, {
//     //     method: 'PUT',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(updatedData),
//     //   });
//     //   if (!response.ok) {
//     //     throw new Error('Network response was not ok');
//     //   }
//     //   // Optimistically update the local data
//     //   mutate(baseApi);
//     // } catch (error) {
//     //   console.error('Error:', error);
//     // }
//   };

//   const handleDelete = async (deletedData) => {
//     try {
//       const response = await fetch(`${baseApi}/${deletedData._id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       // Optimistically update the local data
//       mutate(baseApi, (data) => ({
//         ...data,
//         data: data.data.filter(item => item._id !== deletedData._id),
//       }), false);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleEdit = (row) => {
//     // Implement your edit functionality here
//     console.log('Edit clicked for row:', row);
//   };

//   return (
//     <div>
//       <h1 className='pt-5 pb-5 text-2xl'>Income Statement</h1>
//       <TransactionDataTable
//         columns={columns}  // Pass columns as a function
//         data={incomes.data}
//         onUpdate={handleUpdate}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }

// export default OnetransactionList;
