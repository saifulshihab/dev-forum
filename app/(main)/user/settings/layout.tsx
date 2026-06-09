import { SettingsSidebar } from "@/components/user/settings-sidebar";
import React from "react";

function SidebarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col md:flex-row">
      <SettingsSidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

export default SidebarLayout;
