import Link from 'next/link'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
      <div>
        Search Bar
      </div>
      <div>
        <Link className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
        dark:hover:bg-gray-700 hover:text-orange-300 dark:focus:ring-gray-700 dark:border-gray-700' href="/">Home</Link>
      </div>
    </div>
  )
}

export default DashboardHeader
