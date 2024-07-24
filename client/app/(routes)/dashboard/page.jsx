import React from 'react'
import TransactionChart from './_components/DashTransactionChart'
import WeatherNow from '@/components/WeatherNow'

function page() {
  return (
    <div className='flex items-center gap-6 p-5'>
      <TransactionChart/>
      <WeatherNow/>
      
    </div>
  )
}

export default page
