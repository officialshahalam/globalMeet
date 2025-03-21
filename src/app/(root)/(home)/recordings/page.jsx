import CallList from '@/components/CallList';
import React from 'react'

const Recordings = () => {
  return (
    <section className='bg-blue-500 min-h-screen py-25'>
      <div className='w-[94%] max-w-7xl mx-auto flex flex-col gap-10 text-white'>
        <h1 className='text-3xl font-bold'>
          Recordings
        </h1>
        <CallList type='recordings' />
      </div>
    </section>
  )
}

export default Recordings;