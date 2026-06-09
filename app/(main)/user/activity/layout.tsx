import UserActivityLayoutNavbar from "@/components/user/activity/navbar";
import React from "react";

function ActivityLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="sticky top-0 z-10 flex h-[3.125rem] items-center border-b border-dashed bg-background px-4">
        <h1 className="text-xl font-semibold leading-none md:text-2xl">My Activity</h1>
      </div>
      <div className="sticky top-[3.125rem] z-10 bg-background">
        <UserActivityLayoutNavbar />
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

export default ActivityLayout;
