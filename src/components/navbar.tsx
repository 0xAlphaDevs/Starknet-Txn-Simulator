"use client"

import React from 'react'
import WalletBar from './WalletBar'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='px-24 py-8'>
      <div className='sticky shadow-md flex flex-1 flex-grow items-center justify-between rounded-[50px] border border-stone-300 bg-white bg-opacity-10 py-4 px-8 backdrop-blur-2xl'>
        <div className='flex gap-4 items-center'>
          <Image src='/logo.svg' width={30}
            height={30} alt='Logo'
          />
          <p className='font-bold text-xl'>Stark Simulator AI</p>
        </div>
        <WalletBar />
      </div>
    </div>
  )
}

export default Navbar