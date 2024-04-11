"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateBusiness = () => {
  const [createBusiness, setCreateBusiness] = useState("");
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();



  const routeExists = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      router.replace("/create-business");
    }
  }

  useEffect(() => {
    routeExists()
  }, [user, db])

  const onCreateBusiness = async () => {
    await setDoc(doc(db, "Business", user.email), {
      businessName: createBusiness,
      email: user.email,
      userName: user.given_name + "" + user.family_name,
    }).then(() => {
      setCreateBusiness("");
      toast("New Business created successfully");
      router.replace("/dashboard/meeting-type");
    });
  };

  return (
    <>
      <div className="p-14 items-center flex flex-col gap-20 my-10">
        <Image src={logo} alt="" width={200} height={200} />
        <div className="flex flex-col items-center gap-4 max-w-3xl">
          <h2 className="text-4xl font-bold">
            What should we call your business?
          </h2>
          <p className="text-slate-500">
            You can always change this later from setting
          </p>
          <div className="w-full">
            <label className="text-slate-400"> Team Name</label>
            <Input
              placeholder="Ex. Milan"
              className="mt-2"
              onChange={(event) => {
                setCreateBusiness(event.target.value);
              }}
            />
          </div>
          <Button
            className="w-full"
            disabled={!createBusiness}
            onClick={onCreateBusiness}
          >
            Create Business
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateBusiness;
