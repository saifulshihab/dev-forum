import { SettingsSidebar } from "@/components/user/settings-sidebar";
import React from "react";

function SidebarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <SettingsSidebar />
      <div className="h-full flex-1">{children}</div>
    </div>
  );
}

export default SidebarLayout;
