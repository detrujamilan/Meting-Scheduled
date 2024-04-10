"use client";

import React, { useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import MeetingType from "./meeting-type/page";

const Dashboard = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    user && isBusinessRegistered();
  }, [user]);

  const router = useRouter();

  const isBusinessRegistered = async () => {
    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
      router.replace("/create-business");
    }
  };

  return (
    <>
      <div>
        <MeetingType/>
      </div>
    </>
  );
};

export default Dashboard;
