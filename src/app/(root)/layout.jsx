import StreamVideoProvider from '@/Provider/StreamClientProvider';
import React from 'react'

export const metadata = {
  title: "WebEd",
  description: "Digital education platform",
  icons:{
    icon: "/icons/logo.svg", // Favicon
    shortcut: "/icons/logo.svg",
    apple: "/icons/logo.svg",
  }
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout;