'use client';

import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import MeetingCard from './MeetingCard';
import { toast } from 'sonner';

const CallList = ({ type }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  useEffect(()=>{
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
        );
  
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
  
        setRecordings(recordings);
      } catch (error) {
        console.log(error)
        toast.error('Recordings are not fetch');
      }
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  },[type,callRecordings]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {
        calls && calls.length > 0 ? (
          calls.slice(0,9).map((meeting,index) => (
            <MeetingCard
              key={index}
              icon={
                type === 'ended'
                  ? '/icons/previous.svg'
                  : type === 'upcoming'
                    ? '/icons/upcoming.svg'
                    : '/icons/recordings.svg'
              }
              title={
                meeting.state?.custom?.description ||
                meeting.filename?.substring(0, 20) ||
                'No Description'
              }
              date={
                meeting.state?.startsAt?.toLocaleString() ||
                meeting.start_time?.toLocaleString()
              }
              isPreviousMeeting={type === 'ended'}
              link={
                type === 'recordings'
                  ? meeting.url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
              }
              buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
              buttonText={type === 'recordings' ? 'Play' : 'Start'}
              handleClick={
                type === 'recordings'
                  ? () => router.push(`${meeting.url}`)
                  : () => router.push(`/meeting/${meeting.id}`)
              }
            />
          ))
        ) : (
          <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
        )
      }
    </div>
  )
}

export default CallList;