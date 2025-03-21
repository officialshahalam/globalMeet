import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

const HomeCard = ({ className, img, title, description, handleClick }) => {
  return (
    <section
      className={cn(
        'bg-gradient-to-br from-blue-300 to-blue-400 px-4 py-6 flex flex-col justify-between gap-16 w-full max-w-[270px] rounded-[14px] cursor-pointer',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center bg-blue-500 size-12 rounded-[10px]">
        <Image src={img} alt="meeting" width={20} height={20} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gradient">{title}</h1>
        <p className="text-md font-normal text-gradient">{description}</p>
      </div>
    </section>
  )
}

export default HomeCard;