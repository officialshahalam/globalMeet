'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import MobileNav from './MobileNav';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { navLink } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className='fixed backdrop-blur-xl bg-white/5 top-5 max-md:top-0  left-1/2 w-full max-w-[680px] translate-x-[-50%] flex justify-between items-center py-4 px-4 rounded-xl z-100'>
      <div className='flex flex-row gap-2'>
        {
          navLink.map((link)=>{
            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
            return (
              <Link href={link?.route} key={link?.id} className={cn('text-blue-300 hover:text-blue-200 transition-all duration-200',{'text-blue-200':isActive,'max-md:hidden':link.route !== '/'})}>
                {link?.title}
              </Link>
            )
          })
        }
      </div>

      <div className='flex-between gap-5'>
        {/* clerk user management  */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar;