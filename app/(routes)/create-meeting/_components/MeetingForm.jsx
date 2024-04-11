"use client";
import LocationOption from "@/app/_utils/LocationOption";
import Minuteoptions from "@/app/_utils/Minuteoptions";
import Themeoptions from "@/app/_utils/Themeoptions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import classNames from "classnames";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const MeetingForm = ({ setFormValue }) => {
  const [location, setLocation] = useState("");
  const [themeColor, setThemeColor] = useState("");
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState(15);
  const [locationType, setLocationType] = useState("");
  const [locationUrl, setLocationUrl] = useState("");

  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const buttonDisabled =
    !themeColor || !eventName || !duration || !locationType || !locationUrl;

  const router = useRouter();
  


  useEffect(() => {
    setFormValue({
      themeColor: themeColor,
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
    });
  }, [themeColor, eventName, duration, locationType, locationUrl]);

  const onCreateMeeting = async () => {
    const id = Date.now().toString();
    await setDoc(doc(db, "MeetingEvent", id), {
      id: id,
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
      themeColor: themeColor,
      businessid: "Business/" + user?.email,
      createBy: user?.email,
    }).then((res) => {
      toast("New Meeting Event Created");
      router.replace("/dashboard/meeting-type");
    });
  };

  return (
    <div className="p-4">
      <Link href={"/dashboard"}>
        <h2 className="flex gap-2">
          <ChevronLeft /> Cancel
        </h2>
      </Link>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr></hr>
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h1 className="font-bold">Event Name *</h1>
        <Input
          placeholder="Name of your meeting event"
          onChange={(event) => setEventName(event.target.value)}
        />
        <h2 className="font-bold">Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {duration} Mint
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Minuteoptions.map((minute, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setDuration(minute.time)}
              >
                {minute.time} Mint
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location *</h2>
        <div className="font-bold grid grid-cols-4 gap-2">
          {LocationOption.map((option, index) => (
            <div
              key={index}
              className={classNames(
                "border flex flex-col hover:bg-blue-100 hover:border-primary justify-center items-center p-3 rounded-lg",
                {
                  "bg-blue-100 border-primary": locationType === option.name,
                }
              )}
              onClick={() => setLocationType(option.name)}
            >
              <Image
                src={option.icon}
                alt={option.name}
                key=""
                width={50}
                height={50}
              />
              <h2> {option.name} </h2>
            </div>
          ))}
        </div>

        {locationType && (
          <>
            <h2 className="font-bold">Add {locationType} Url</h2>
            <Input
              placeholder={`Add ${locationType} `}
              onChange={(location) => setLocationUrl(location.target.value)}
            />
          </>
        )}

        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly items-center">
          {Themeoptions.map((color, index) => (
            <div
              onClick={() => setThemeColor(color)}
              key={index}
              className={classNames("h-5 w-5 rounded-full", {
                "border-black border-2": themeColor === color,
              })}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
      <Button
        className="w-full mt-9"
        variant=""
        disabled={buttonDisabled}
        onClick={onCreateMeeting}
      >
        Create
      </Button>
    </div>
  );
};

export default MeetingForm;
