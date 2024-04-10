"use client";
import DaysList from "@/app/_utils/DaysList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Availability = () => {
  const [daysAvailable, setDaysAvailable] = useState(
    {
      Sunday: false,
    },
    {
      Monday: false,
    },
    {
      Tuesday: false,
    },
    {
      Wednesday: false,
    },
    {
      Thursday: false,
    },
    {
      Friday: false,
    }
  );
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const onCheckedChange = (day, value) => {
    setDaysAvailable({
      ...daysAvailable,
      [day]: value,
    });
  };
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const handleClick = async () => {
    const docRef = doc(db, "Business", user?.email);
    await updateDoc(docRef, {
      daysAvailable: daysAvailable,
      startTime: startTime,
      endTime: endTime,
    }).then((res) => {
      toast("Change Updated !");
    });
  };

  useEffect(() => {
    user && getBusinessInfo();
  }, [user]);

  const getBusinessInfo = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setDaysAvailable(result?.daysAvailable);
    setStartTime(result?.startTime);
    setEndTime(result?.endTime);
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList.map((days, index) => (
            <div key={index}>
              <h2 className="flex gap-2 items-center">
                <Checkbox
                  checked={
                    daysAvailable[days.day] ? daysAvailable[days.day] : false
                  }
                  onCheckedChange={(e) => onCheckedChange(days.day, e)}
                />
                {days.day}
              </h2>
            </div>
          ))}
        </div>
        <h2 className="font-bold">Availability Time</h2>
        <div className="flex gap-10 items-center">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input
              type="time"
              defaultValue={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input
              type="time"
              defaultValue={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <Button className="mt-10" onClick={() => handleClick()}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default Availability;
