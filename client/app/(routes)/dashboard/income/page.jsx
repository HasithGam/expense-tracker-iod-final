import React from 'react'
import AddIncome from './_components/AddIncome'

function Income() {
  return (
    <div className='p-5'>
      <h2 className='font-bold text-3xl pb-3'>My Income</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <AddIncome/>
      </div>
      
    </div>
  )
}

export default Income
