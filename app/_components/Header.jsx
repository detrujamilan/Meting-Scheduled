  "use client"
  import React from "react";
  import Image from "next/image";
  import logo from "../../public/logo.svg";
  import { Button } from "@/components/ui/button";
  import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

  const Header = () => {
    return (
      <div className="flex justify-between items-center p-3 shadow-sm">
        <div>
          <Image src={logo} alt="" />
        </div>
        <ul className="hidden md:flex gap-14">
          <li>Product</li>
          <li>Pricing</li>
          <li>Contact us</li>
          <li>About us</li>
        </ul>
        <div className="flex items-center gap-5">
          <LoginLink>
            <Button variant="normal">Login</Button>
          </LoginLink>
          
          <Button>Get Started</Button>
        </div>
      </div>
    );
  };

  export default Header;
