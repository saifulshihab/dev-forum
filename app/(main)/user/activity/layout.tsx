import UserActivityLayoutNavbar from "@/components/user/activity/navbar";
import React from "react";

function ActivityLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="space-y-3">
        <div className="flex h-[3.125rem] items-center border-b border-dashed px-4">
          <h1 className="text-2xl font-semibold leading-none">My Activity</h1>
        </div>
      </div>
      <UserActivityLayoutNavbar />
      <div className="h-full max-h-full flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
}

export default ActivityLayout;
