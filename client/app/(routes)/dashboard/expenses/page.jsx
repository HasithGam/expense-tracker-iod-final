import React from 'react'
import AddExpense from './_components/AddExpense'
import Footer from '@/app/_components/Footer'

function Expenses() {
  return (
    <>
      <div className='p-5'>
        <h2 className='font-bold text-3xl pb-3'>My Expenses</h2>
        <AddExpense transactionName={'expense'}/>
      </div>
      <Footer/>
    </>
  )
}
export default Expenses
