import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import google from "../../public/google.png";
import facebook from "../../public/facebook.png";

const HeroSection = () => {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div className="text-center mx-w-2xl">
        <h2 className="font-bold text-[60px] text-slate-500">
          Easy scheduling ahead
        </h2>
        <h2 className="font-bold text-[60px] text-slate-500">
          Easy scheduling ahead
        </h2>
        <div className="flex gap-4 flex-col mt-5">
          <h3 className="text-sm">Sign Up free with Google abd Facebook</h3>
          <div className="flex justify-center gap-8">
            <Button className="p-6 flex gap-4">
              <Image src={google} alt="" width={35} />
              Sign up with Google
            </Button>
            <Button className="p-6 flex gap-4">
              <Image src={facebook} alt="" width={35} />
              Sign up with Facebook
            </Button>
          </div>
          <hr></hr>
          <h2>
            <Link href="" className="text-primary">
              Sign up Free with Email.
            </Link>
            No Credit card required
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
