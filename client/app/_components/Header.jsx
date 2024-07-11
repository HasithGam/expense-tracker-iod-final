import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <div className='pl-5 pr-5 flex justify-between items-center border shadow-md'>
      <span className='flex'><Image src={'./logo.svg'} alt='ExpTrack logo' width={90} height={50}/>
      <span className='text-2xl pt-10 text-orange-400'>ExpTrack</span></span>
      <Button>Get Started</Button>
    </div>
  )
}

export default Header
