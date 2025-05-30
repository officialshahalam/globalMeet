'use client';

import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from 'lucide-react';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
import { useMediaQuery } from 'react-responsive';


const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [showParticipants, setShowParticipants] = useState(false);
  const [layout, setLayout] = useState('speaker-left');
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  if (callingState !== CallingState.JOINED) return <Loader />;


  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-4 bg-blue-500 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
          {isMobile ? (<PaginatedGridLayout />) : (<CallLayout />)}
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {
          'show-block': showParticipants,
        })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* video layout and call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center flex-wrap px-5 gap-5">
        <CallControls onLeave={() => router.push(`/`)} />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.toLowerCase())}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom;