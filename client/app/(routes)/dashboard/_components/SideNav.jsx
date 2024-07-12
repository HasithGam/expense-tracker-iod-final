"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, HandCoins } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
    const menuList=[
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Transactions',
            icon: ReceiptText,
            path: '/dashboard/transactions'
        },
        {
            id: 3,
            name: 'Income',
            icon: PiggyBank,
            path: '/dashboard/income'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: HandCoins,
            path: '/dashboard/expenses'
        }

    ]
    const path = usePathname();
    useEffect(() => {
        console.log(path);
    })
  return (
    <div className='h-screen p-5 border shadow-md'>
        <span className='flex'><Image src={'../../logo.svg'} alt='ExpTrack logo' width={90} height={50}/>
        <span className='text-2xl pt-10 text-orange-400'>ExpTrack</span></span>
        <div className='mt-5'>
            {menuList.map((menu) => (
                <Link href={menu.path}>
                    <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 
                    cursor-pointer rounded-md mb-1
                     hover:bg-gray-400 hover:text-black  ${path == menu.path && ' text-orange-300 bg-gray-500'}`} key={menu.id}>
                        <menu.icon/>
                        {menu.name}
                    </h2>
                </Link>
            ))}
        </div>
        <div>

        </div>
    </div>
  )
}

export default SideNav
