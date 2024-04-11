"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  Clock,
  Copy,
  Delete,
  MapIcon,
  MapPin,
  Pen,
  Settings,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MeetingEventList = () => {
  const [eventList, setEventList] = useState([]);
  const [businessInfo, setBusinessInfo] = useState();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const router = useRouter();

  useEffect(() => {
    user && getEventList();
    user && businessInformation();
  }, [user]);

  const getEventList = async () => {
    setEventList([]);
    const q = query(
      collection(db, "MeetingEvent"),
      where("createBy", "==", user?.email),
      orderBy("id", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEventList((preEvent) => [...preEvent, doc.data()]);
    });
  };

  const onEventDelete = async (event) => {
    await deleteDoc(doc(db, "MeetingEvent", event?.id)).then((res) => {
      toast("Delete event Successfully");
      getEventList();
    });
  };

  const businessInformation = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data());
  };

  const onCopyElementHandler = async (event) => {
    const meetingBaseUrl =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/" +
      businessInfo?.businessName +
      "/" +
      event?.id;
    navigator.clipboard.writeText(meetingBaseUrl);
    toast("Url Copied on clipboard");
  };
  return (
    <>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {eventList.length > 0 ? (
          eventList?.map((event, index) => (
            <div
              key={index}
              style={{ borderTopColor: event?.themeColor }}
              className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
            >
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Settings className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => {
                        router.push("/create-meeting", {
                          scroll: false,
                          query: event,
                        });
                      }}
                    >
                      <Pen className="w-4 h-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => onEventDelete(event)}
                    >
                      <Trash className="w-4 h-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h2 className="font-medium text-xl">{event?.eventName}</h2>
              <div className="flex justify-between items-center">
                <h2 className="flex gap-2 items-center text-gray-500">
                  <Clock />
                  {event?.duration} Min
                </h2>
                <h2 className="flex gap-2 items-center text-gray-500">
                  <MapPin />
                  {event?.locationType}
                </h2>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <h2
                  className="flex cursor-pointer gap-2 text-sm items-center"
                  onClick={() => {
                    onCopyElementHandler(event);
                  }}
                >
                  <Copy className="  h-4 w-4" /> Copy Link
                </h2>
                <Button
                  variant="outline"
                  className="rounded-full text-primary border-primary"
                >
                  Share
                </Button>
              </div>
            </div>
          ))
        ) : (
          <h2>Loading Data....</h2>
        )}
      </div>
    </>
  );
};

export default MeetingEventList;
