import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/logo.svg";
import classNames from "classnames";
import { format } from "date-fns";

const MeetingTimeDateSelection = ({ eventInfo, businessInfo }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();
  const [selectTimeSlots, setSelectTimeSlots] = useState();
  const [enableTimeSlots, setEnableTimeSlots] = useState(false);

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60;
    const endTime = 22 * 60;
    const totalSlot = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlot }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}${period}`;
    });
    setTimeSlots(slots);
  };

  const handleSelectDate = (date) => {
    setDate(date);

    const day = format(date, "EEEE");
    console.log(businessInfo?.daysAvailable?.[day], "datyaaa");
    if (businessInfo?.daysAvailable) {
      if (businessInfo?.daysAvailable?.[day]) {
        setEnableTimeSlots(true);
      } else {
        setEnableTimeSlots(false);
      }
    }
  };
  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8
      mx-10
      md:mx-26
      lg:mx-56
      my-10"
      style={{ borderColor: eventInfo?.themeColor }}
    >
      <Image src={logo} alt="" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* {Meeting Info} */}

        <div className="p-5 border-r">
          <h2>{businessInfo.businessName}</h2>
          <h2 className="font-bold text-2xl">
            {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
          </h2>
          <div className=" mt-2 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock /> {eventInfo?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />{" "}
              {eventInfo?.locationType
                ? `${eventInfo?.locationType} Meeting`
                : "Meeting Name"}
            </h2>
            <Link
              href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
              className="text-primary"
            >
              {eventInfo?.locationUrl}
            </Link>
          </div>
        </div>
        {/* Time and date selection  */}
        <div className="md:col-span-2 flex px-4">
          <div className="flex flex-col">
            <h2 className="font-bold">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => handleSelectDate(date)}
              disabled={(date) => date <= new Date()}
              className="rounded-md border mt-3"
            />
          </div>
          <div
            className="flex flex-col w-full overflow-auto gap-4 p-5"
            style={{ maxHeight: 400 }}
          >
            {timeSlots?.map((time, index) => (
              <Button
                variant="outline"
                className={classNames("text-primary border-primary", {
                  "bg-blue-100 text-black": selectTimeSlots === time,
                })}
                disabled={!enableTimeSlots}
                key={index}
                onClick={() => setSelectTimeSlots(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingTimeDateSelection;
