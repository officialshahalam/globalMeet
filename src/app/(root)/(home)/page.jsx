'use client';
import { avatarImages } from "@/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";
import MeetingTypeList from "@/components/MeetingTypeList";
import HomeCard from "@/components/HomeCard";
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function Home() {
  const router = useRouter();
  return (
    <section className="bg-blue-500 h-full lg:h-screen w-screen">
      <div className="h-full lg:h-screen w-[94%] max-w-[1400px] mx-auto">
        <div className="w-full lg:h-full grid grid-cols-1 grid-rows-3 lg:grid-cols-4 lg:grid-rows-1 gap-2 lg:items-start">
          {/* left */}
          <div className="order-2 lg:order-1 lg:h-full flex flex-col gap-3 justify-between py-4 h-fit">
            <div className="flex flex-col gap-2 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl px-4 py-5">
              <Image src='/icons/logo.svg' alt="logo" width={50} height={30} />
              <h1 className="text-5xl font-serif text-gradient">Effortless create an meeting </h1>
              <p className="text-xl text-gradient">Free of cost</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl px-4 py-5">
              <h1 className="text-6xl text-center bg-gradient-to-br from-orange-100 to-orange-200 text-transparent bg-clip-text">
                12K
              </h1>
              <p className="text-2xl text-center text-gradient">Happy user</p>
              <div style={{ width: "180px" }} className="relative h-10">
                {avatarImages.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt="attendees"
                    width={40}
                    height={40}
                    className={cn("rounded-full absolute")}
                    style={{ top: 0, left: index * 32 }}
                  />
                ))}
              </div>
            </div>

            <div
              className={cn(
                'bg-gradient-to-br from-blue-300 to-blue-400 px-4 py-6 flex flex-col justify-between gap-10 rounded-[14px] cursor-pointer',
              )}
              onClick={() => router.push('/recordings')}
            >
              <div className="flex-center bg-blue-500 size-12 rounded-[10px]">
                <Image src={'/icons/recordings.svg'} alt="meeting" width={20} height={20} />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gradient">View Recordings</h1>
                <p className="text-md font-normal text-gradient">Meeting Recordings</p>
              </div>
            </div>
          </div>
          {/* between */}
          <div className="col-span-1 lg:col-span-2 order-1 lg:order-2 ">
            <div className=""></div>
          </div>
          {/* right */}
          <MeetingTypeList />
        </div>
      </div>
    </section>
  );
}


{/* <section className="w-screen min-h-screen bg-blue-500">
  <div className="grid grid-cols-4 grid-rows-1 w-full h-screen p-4 relative">
    <Image src='/icons/violetDot.svg' alt="leftCard" width={60} height={60} className="absolute top-1/3 left-1/4 bottom-0" />
    <Image src='/icons/violetDot.svg' alt="leftCard" width={60} height={60} className="absolute top-1/5 right-1/4 bottom-0" />
    

    <div className="col-span-2 text-white pt-20 flex flex-col justify-between items-center relative">
      <p className="text-center text-[46px] leading-11 max-w-[420px] z-10">Your Ultimate Video Conferencing Solution</p>
      <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center absolute top-45">
        <Globe
          height={500}
          width={450}
          backgroundColor='rgba(0,0,0,0)'
          backgroundImageOpacity={0.5}
          showAtmosphere
          showGraticules
          globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
          labelsData={[{ lat: 28.9845, lng: 77.7064, text: 'I am here at meerut', color: 'white', size: 100 }]}
        />
      </div>
      <div className="flex gap-5">
        <div className="w-[290px] h-[374px] pb-10 relative flex items-end">
          <Image src='/icons/leftCard.svg' alt="leftCard" width={290} height={374} className="absolute bottom-0" />
          <Image src='/icons/orangeDrop.svg' alt="leftCard" width={60} height={60} className="absolute top-15 z-10" />
          <Image src='/icons/orangeDot.svg' alt="leftCard" width={60} height={60} className="absolute top-0 left-12 bottom-0" />
          <Image src='/icons/orangeDot.svg' alt="leftCard" width={60} height={60} className="absolute top-30 left-16 bottom-0" />

          <p className="z-10 px-6 text-2xl text-gradient">
            Connect with Anyone, Anywhere in the World!
          </p>
        </div>
        <div className="w-[290px] h-[374px] pb-10 relative flex items-end">
          <Image src='/icons/rightCard.svg' alt="leftCard" width={290} height={374} className="absolute bottom-0" />
          <Image src='/icons/violetDrop.svg' alt="leftCard" width={60} height={60} className="absolute top-15 right-0 z-10" />
          <Image src='/icons/violetDot.svg' alt="leftCard" width={60} height={60} className="absolute top-0 right-12 bottom-0" />
          <Image src='/icons/violetDot.svg' alt="leftCard" width={60} height={60} className="absolute top-35 right-16 bottom-0" />

          <p className="z-10 px-6 text-2xl text-gradient">
            Join Meetings Globally—No Boundaries, Just Conversations!
          </p>
        </div>
      </div>
    </div>

    <div className="flex flex-col">
      
    </div>
  </div>
</section> */}
