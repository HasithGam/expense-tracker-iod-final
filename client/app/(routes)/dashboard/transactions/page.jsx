import React from 'react'
import AllTransaction from './_components/AllTransaction'
import Footer from '@/app/_components/Footer'

function Transactions() {
  return (
    <>
      <div  className='p-10'>
        <h2 className='font-bold text-3xl pb-8'>My Transaction Statement</h2>
        <AllTransaction transactionName = 'data'/>
      </div>
      <Footer/>
    </>
  )
}

export default Transactions
