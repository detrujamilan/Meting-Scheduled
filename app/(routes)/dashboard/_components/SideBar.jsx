"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/logo.svg";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Clock, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import classNames from "classnames";

const dropMenu = [
  {
    id: 1,
    name: "Meeting Type",
    path: "/dashboard/meeting-type",
    icon: Briefcase,
  },
  {
    id: 2,
    name: "Scheduled Meeting",
    path: "/dashboard/scheduled-meeting",
    icon: Calendar,
  },
  {
    id: 3,
    name: "Availability",
    path: "/dashboard/availability",
    icon: Clock,
  },
  {
    id: 4,
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const SideBar = () => {
  const path = usePathname();
  const [activePath, setActivePath] = useState(path);

  useEffect(() => {
    setActivePath(path);
  }, [path]);

  return (
    <div className="p-5 py-14">
      <div className="flex justify-center items-center">
        <Image width={150} height={150} src={logo} alt="Logo" />
      </div>
      <Link href={"/create-meeting"}>
        <Button className="flex gap-2 w-full mt-7 rounded-full">
          <Plus />
          Create
        </Button>
      </Link>
      <div className="mt-5 flex flex-col gap-5">
        {dropMenu.map((item) => (
          <Link href={item.path} key={item.id}>
            <Button
              className={classNames(
                "w-full hover:bg-blue-100 flex gap-1 justify-start",
                {
                  "text-primary bg-blue-100": activePath === item.path && activePath,
                }
              )}
              variant="ghost"
            >
              <item.icon /> {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
