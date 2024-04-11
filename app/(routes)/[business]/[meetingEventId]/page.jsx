"use client"
import React, { useEffect, useState } from 'react'
import MeetingTimeDateSelection from '../_components/MeetingTimeDateSelection';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';

const ShareMeetingEvent = ({ params }) => {
  const [businessInfo, setBusinessInfo] = useState();
  const [eventInfo, setEventInfo] = useState();

  const db = getFirestore(app);

  useEffect(() => {
    params & getMeetingInformation()
  }, [params]);


  const getMeetingInformation = async () => {
    const q = query(collection(db, "Business"), where("businessName", "==", params.business));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      setBusinessInfo(doc.data())
    })
    const docRef = doc(db, "MeetingEvent", params.meetingEventId);
    const result = await getDoc(docRef);
    setEventInfo(result.data())
  }

  return (
    <div>
      <MeetingTimeDateSelection />
    </div>
  )
}

export default ShareMeetingEvent;