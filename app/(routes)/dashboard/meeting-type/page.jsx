"use client";
import { Input } from "@/components/ui/input";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import MeetingEventList from "./_components/MeetingEventList";

const MeetingType = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    user && getEventList();
  }, [user]);

  const getEventList = async () => {
    const q = query(
      collection(db, "MeetingEvent"),
      where("createBy", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };
  return (
    <div className="p-5">
      <div className="flex flex-col gap-5 w-full">
        <h2 className="font-bold text-3xl">Meeting Event Type</h2>
        <Input placeholder="Search" className="max-w-xs mt-5" />
        <hr />
      </div>
      <MeetingEventList />
    </div>
  );
};

export default MeetingType;
