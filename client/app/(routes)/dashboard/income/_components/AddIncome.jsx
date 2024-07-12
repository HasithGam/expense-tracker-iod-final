"use client"
import React, { useState } from 'react'
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const categories = ["Salary", "Freelancing", "Investments", "Stocks", "Bitcoin", "Adsense", "Gift", "Other"];

const AddIncome = () => {
    const [emojiIcon, setEmojiIcon] = useState('😀');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [incomeTitle, setIncomeTitle] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [incomeCategory, setIncomeCategory] = useState('');
    const [incomeDescription, setIncomeDescription] = useState('');
    const [incomeDate, setIncomeDate] = useState('');

    const baseApi = `${process.env.NEXT_PUBLIC_API_URL}/income`;

    const onInsertIncome = async () => {
        const incomeData = {
            title: incomeTitle,
            amount: incomeAmount,
            category: incomeCategory,
            description: incomeDescription,
            date: incomeDate
        };

        try {
            const response = await fetch(`${baseApi}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(incomeData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Update the SWR cache
            mutate(baseApi);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const { data: incomes, error } = useSWR(baseApi, fetcher);
    if (error) return <div>Failed to load</div>;
    if (!incomes) return <div>Loading...</div>;

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Add Income</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Income</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button variant="outline" className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                                <div className='absolute'>
                                    {openEmojiPicker && (
                                        <EmojiPicker 
                                            onEmojiClick={(e) => { setEmojiIcon(e.emoji); setOpenEmojiPicker(false); }}
                                        />
                                    )}
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2'>Title:</h2>
                                    <Input placeholder="e.g. Salary" onChange={(e) => setIncomeTitle(e.target.value)} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2'>Amount:</h2>
                                    <Input placeholder="e.g. 5000" type="number" onChange={(e) => setIncomeAmount(e.target.value)} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2'>Category:</h2>
                                    <select onChange={(e) => setIncomeCategory(e.target.value)} className='border rounded px-2 py-1'>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2'>Description:</h2>
                                    <Input placeholder="e.g. Job Fortnight Pay" onChange={(e) => setIncomeDescription(e.target.value)} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2'>Date:</h2>
                                    <Input type="date" onChange={(e) => setIncomeDate(e.target.value)} />
                                </div>
                                <Button disabled={!(incomeTitle && incomeAmount && incomeCategory && incomeDescription && incomeDate)}
                                    onClick={onInsertIncome}
                                    className="mt-3 w-full">Save</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div>
                <h1>Fetch Data</h1>
                <div>
                    <ul>
                        {incomes.data.map((income) => (
                            <li key={income._id}>
                                <div>{income.title}</div>
                                <div>{income.amount}</div>
                                <div>{income.category}</div>
                                <div>{income.date}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AddIncome;










// "use client"
// import React, { useState } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import EmojiPicker from 'emoji-picker-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'


// function AddIncome() {
//     const[emojiIcon, setEmojiIcon] = useState('😀');
//     const [openEmojiPicker,setOpenEmojiPicker] = useState(false);

//     const [incomeTitle,setIncomeTitle] = useState();
//     const [incomeAmount,setIncomeAmount] = useState();
//     const [incomeCategory,setIncomeCategory] = useState();
//     const [incomeDescription,setIncomeDescription] = useState();
//     const [incomeDate,setIncomeDate] = useState();

//     const onInsertIncome =() => {
//         const result = await
//     }


//   return (
//     <div>
      
//         <Dialog>
//             <DialogTrigger asChild>
//                 <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
//                     <h2 className='text-3xl'>+</h2>
//                     <h2>Add Income</h2>
//                 </div>
//             </DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                 <DialogTitle>Add New Income</DialogTitle>
//                     <DialogDescription>
//                         <div className='mt-5'>
//                             <Button variant = "outline"  className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
//                             <div className='absolute'>
//                                 <EmojiPicker 
//                                 open={openEmojiPicker}
//                                 // onEmojiClick={(e) =>  console.log(e.emoji)}
//                                 onEmojiClick={(e) =>  {setEmojiIcon(e.emoji); setOpenEmojiPicker(false)}}
//                                 />
//                             </div>
//                             <div className='mt-2'>
//                                 <h2 className='text-black font-medium text-lg my-1 pr-2'>Title:</h2>
//                                 <Input placeholder = "e.g. Salary" onChange={(e) => setIncomeTitle(e.target.value)}/>
//                             </div>
//                             <div className='mt-2'>
//                                 <h2 className='text-black font-medium text-lg my-1 pr-2'>Amount:</h2>
//                                 <Input placeholder = "e.g. 5000" type="number" onChange={(e) => setIncomeAmount(e.target.value)}/>
//                             </div>
//                             <div className='mt-2'>
//                                 <h2 className='text-black font-medium text-lg my-1 pr-2'>Category:</h2>
//                                 <Input placeholder = "Select Category" onChange={(e) => setIncomeCategory(e.target.value)}/>
//                             </div>
//                             <div className='mt-2'>
//                                 <h2 className='text-black font-medium text-lg my-1 pr-2'>Description:</h2>
//                                 <Input placeholder = "e.g. Job Fortnight Pay" onChange={(e) => setIncomeDescription(e.target.value)}/>
//                             </div>
//                             <div className='mt-2'>
//                                 <h2 className='text-black font-medium text-lg my-1 pr-2'>Date:</h2>
//                                 <Input placeholder = "Select Date" onChange={(e) => setIncomeDate(e.target.value)}/>
//                             </div>
//                             <Button disabled={!(incomeTitle && incomeAmount && incomeCategory && incomeDescription && incomeDate)} 
//                             onClick={() => onInsertIncome()}
//                             className="mt-3 w-full">Save</Button>
//                         </div>
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     </div>
//   )
// }

// export default AddIncome
