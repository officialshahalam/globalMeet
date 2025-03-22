import React from 'react'

const Experimant = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border p-4 items-start">
      <div className="bg-yellow-500 p-4">
        <div className='w-full h-[400px] bg-gray-300'></div>
      </div>
      <div className="bg-red-500 p-4">
        <div className='w-full h-[500px] bg-gray-300'></div>
      </div>
      <div className="bg-green-500 p-4">
        <div className='w-full h-[700px] bg-gray-300'></div>
      </div>
    </div>
  )
}

export default Experimant;