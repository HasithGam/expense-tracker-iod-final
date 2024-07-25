import React from 'react'
import TransactionChart from './_components/DashTransactionChart'
import WeatherNow from '@/components/WeatherNow'
import TotalIncome from './_components/TotalIncome'
import Footer from '@/app/_components/Footer'

function page() {
  return (
    <>
      <div className='flex items-center gap-6 p-5'>
      <TransactionChart/>
      <TotalIncome/>
      </div>
      <div className='w-auto items-center gap-6 p-5'>
        <WeatherNow/>
      </div>
      <Footer/>
    </>
  )
}

export default page
