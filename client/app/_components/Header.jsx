import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='pl-5 pr-5 flex justify-between items-center border shadow-md'>
      <span className='flex'><Image src={'./logo.svg'} alt='ExpTrack logo' width={90} height={50}/>
      <span className='text-2xl pt-10 text-orange-500'>ExpTrack</span></span>
      <Link className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-orange-300 dark:focus:ring-gray-700 dark:border-gray-700' href="/login">Sign In</Link>
    </div>
  )
}

export default Header
