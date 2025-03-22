'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard';
import MeetingModel from './MeetingModel';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast } from "sonner"
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input"



const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState(undefined);
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [callDetail, setCallDetail] = useState();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast("Please select date and time");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      })
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast("Meeting created");
    }
    catch (e) {
      console.log(e);
      toast("Failed to create meeting");
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <div className='order-3 lg:order-3 lg:h-full flex flex-col gap-3 justify-between py-4 h-fit max-md:mt-[-32px] max-lg:mt-[-48px]'>
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      {
        !callDetail ? (
          <MeetingModel
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => { setMeetingState(undefined) }}
            title='Create Meeting'
            handleClick={createMeeting}>
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-gradient">
                Add a description
              </label>
              <Textarea
                className="border-none bg-violet-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-gradient">
                Select Date and Time
              </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded text-gradient p-2 focus:outline-none"
              />
            </div>
          </MeetingModel>
        ) : (
          <MeetingModel
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => { setMeetingState(undefined) }}
            title='Meeting Created'
            image={'/icons/checked.svg'}
            buttonIcon="/icons/copy.svg"
            buttonText="Copy Meeting Link"
            className='text-center'
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast('Link Copied');
            }}
          />
        )
      }
      {
        < MeetingModel
          isOpen={meetingState === 'isInstantMeeting'}
          onClose={() => { setMeetingState(undefined) }}
          title='Start an Instant Meeting'
          className='text-center'
          buttonText='start meeting'
          handleClick={createMeeting}
        />
      }
      {
        < MeetingModel
          isOpen={meetingState === 'isJoiningMeeting'}
          onClose={() => { setMeetingState(undefined) }}
          title='Type the link here'
          className='text-center'
          buttonText='Join Meeting'
          handleClick={()=>{
            console.log(values.link);
            router.push(values.link)
          }}
        >
          <Input 
            placeholder="meeting link"
            className="border-none bg-blue-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setValues({ ...values, link: e.target.value })}
          />
        </MeetingModel>
      }
    </div>
  )
}

export default MeetingTypeList;