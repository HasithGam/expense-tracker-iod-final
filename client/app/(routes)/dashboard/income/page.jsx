import React from 'react'
import AddIncome from './_components/AddIncome'
import Footer from '@/app/_components/Footer'

function Income() {
  return (
    <div className='p-5'>
      <h2 className='font-bold text-3xl pb-3'>My Income</h2>
      <div>
        <AddIncome transactionName = {'income'}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Income
