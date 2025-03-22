'use client';

import { Button } from '@/components/ui/button';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';


const Table = ({ title, description }) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId);

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className='text-white bg-blue-500 min-h-screen'>
      <div className='w-[94%] max-w-7xl mx-auto gap-10 pt-20 flex flex-col '>
        <h1 className='text-3xl font-bold '>
          PersonalRoom
        </h1>
        <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
          <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
          <Table title="Meeting ID" description={meetingId} />
          <Table title="Invite Link" description={meetingLink} />
        </div>
        <div className="flex gap-5">
          <Button className="bg-violet-100" onClick={startRoom}>
            Start Meeting
          </Button>
          <Button
            className="bg-blue-400"
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast.success("Link Copied");
            }}
          >
            Copy Invitation
          </Button>
        </div>
      </div>

    </section>
  )
}

export default PersonalRoom;