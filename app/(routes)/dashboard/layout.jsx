import React from "react";
import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/Dashboardheader";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="w-64 bg-slate-50  h-screen fixed">
        <SideBar />
      </div>
      <div className="md:block ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
