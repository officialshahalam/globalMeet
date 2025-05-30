import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';


const MeetingModel = ({ isOpen, onClose, title, className, children, buttonText, handleClick, image, buttonIcon }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-blue-400 px-6 py-9 text-white">
        <DialogHeader className='hidden'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          {
            image && (
              <div className='flex justify-center'>
                <Image src={image} alt='image' width={72} height={72} />
              </div>
            )
          }
          <h1 className={cn('text-3xl font-bold leading-[42px] text-gradient', className)}>{title}</h1>
          {children}
          <Button className='bg-violet-100 focus-visible:ring-0 focus-visible:ring-offset-0'
            onClick={handleClick}
            >
            {
              buttonIcon && (
                <Image src={buttonIcon} alt='icon' width={13} height={13} />
              )
            } &nbsp;
            {buttonText || 'schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default MeetingModel;