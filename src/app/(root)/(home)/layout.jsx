import Navbar from '@/components/Navbar';
import React from 'react'

export const metadata = {
  title: "WebEd",
  description: "Digital education platform",
  icons: {
    icon: "/icons/logo.svg", // Favicon
    shortcut: "/icons/logo.svg",
    apple: "/icons/logo.svg",
  }
};

const HomeLayout = ({ children }) => {
  return (
    <main className='relative '>
      <Navbar/>
      {children}
    </main>
  )
}

export default HomeLayout;
