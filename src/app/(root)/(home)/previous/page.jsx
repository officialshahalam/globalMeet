import CallList from '@/components/CallList';
import React from 'react'

const Previous = () => {
  return (
    <section className='bg-blue-500 min-h-screen'>
      <div className='w-[94%] max-w-7xl mx-auto flex flex-col gap-10 text-white py-20'>
        <h1 className='text-3xl font-bold'>
          Previous
        </h1>
        <CallList type="ended" />
      </div>
    </section>
  )
}

export default Previous;