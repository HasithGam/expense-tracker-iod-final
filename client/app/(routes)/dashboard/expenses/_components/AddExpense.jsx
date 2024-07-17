"use client"
import React, { useState } from 'react';
import useSWR, { mutate } from "swr";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OnetransactionList from '../../../../../components/OnetransactionList';

const categories = ["Select Category", "House Rent", "Bills", "Grocery", "Vehicle", "Bitcoin", "Adsense", "Gift", "Other"];

const AddExpense = ({transactionName}) => {
    const baseApi = `${process.env.NEXT_PUBLIC_API_URL}/${transactionName}`;
    const [emojiIcon, setEmojiIcon] = useState('💲');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('Select Category');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState('');

    const [errors, setErrors] = useState({});

    

    const validateFields = () => {

        
        const newErrors = {};
        if (!expenseTitle) newErrors.title = 'Title is required';
        if (!expenseAmount) newErrors.amount = 'Amount is required';
        if (expenseCategory === 'Select Category') newErrors.category = 'Please select a category';
        if (!expenseDescription) newErrors.description = 'Description is required';
        if (!expenseDate) newErrors.date = 'Date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onInsertExpense = async () => {
        if (!validateFields()) return;

        const expenseData = {
            title: emojiIcon + ' ' + expenseTitle,
            amount: expenseAmount,
            category: expenseCategory,
            description: expenseDescription,
            date: expenseDate
        };
        console.log("Expense Data", expenseData);
        setIsLoading(true);

        // Optimistically update the SWR cache
        const tempId = Math.random().toString(36).substring(2, 15);
        mutate(baseApi, (expenses) => {
            return { ...expenses, data: [...expenses.data, { ...expenseData, _id: tempId }] };
        }, false);
        setIsDialogOpen(false);

        try {
            const response = await fetch(`${baseApi}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expenseData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            mutate(baseApi);
        } catch (error) {
            console.error('Error:', error);
            // Revert the SWR cache to its previous state
            mutate(baseApi);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                            <h2 className='text-3xl'>+</h2>
                            <h2>Add Expense</h2>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Expense</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2 required'>Title:</h2>
                                    <div className='flex gap-3'>
                                        <Button variant="outline" className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                                        <div className='absolute'>
                                            {openEmojiPicker && (
                                                <EmojiPicker
                                                    onEmojiClick={(e) => { setEmojiIcon(e.emoji); setOpenEmojiPicker(false); }}
                                                />
                                            )}
                                        </div>
                                        <Input placeholder="e.g. Salary" onChange={(e) => setExpenseTitle(e.target.value)} />
                                    </div>
                                    {errors.title && <p className='text-red-500'>{errors.title}</p>}
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2'>Amount:</h2>
                                    <Input placeholder="e.g. 5000" type="number" onChange={(e) => setExpenseAmount(e.target.value)} />
                                    {errors.amount && <p className='text-red-500'>{errors.amount}</p>}
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2'>Category:</h2>
                                    <select onChange={(e) => setExpenseCategory(e.target.value)} className='border rounded px-2 py-1' value={expenseCategory}>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className='text-red-500'>{errors.category}</p>}
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2'>Description:</h2>
                                    <Input placeholder="e.g. Job Fortnight Pay" onChange={(e) => setExpenseDescription(e.target.value)} />
                                    {errors.description && <p className='text-red-500'>{errors.description}</p>}
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium text-lg my-1 pr-2'>Date:</h2>
                                    <Input type="date" onChange={(e) => setExpenseDate(e.target.value)} />
                                    {errors.date && <p className='text-red-500'>{errors.date}</p>}
                                </div>
                                <Button
                                    onClick={onInsertExpense}
                                    className="mt-3 w-full">{isLoading ? "Saving..." : "Save"}</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div>
                <OnetransactionList transactionName={transactionName}/>
            </div>
        </div>
    );
}

export default AddExpense;
