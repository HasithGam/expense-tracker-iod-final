"use client"
import Link from 'next/link';
import React, { useEffect } from 'react';
import useAuth from '@/lib/useAuth';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

function DashboardHeader() {
  const { logOut, user } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    await logOut();
    router.push('/');
  };

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
      <div>
        {/* <h1>Dashboard</h1> */}
      </div>
      <div>
        <Link 
          className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
          focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
          dark:hover:bg-gray-700 hover:text-orange-300 dark:focus:ring-gray-700 dark:border-gray-700' 
          href="/">Home</Link>
        <Button 
          onClick={handleLogOut} 
          className='text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 
          focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
          dark:hover:bg-black-700 hover:text-black-300 dark:focus:ring-gray-700 dark:border-gray-700'>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default DashboardHeader;
