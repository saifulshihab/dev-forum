import { SettingsSidebar } from "@/components/user/settings-sidebar";
import React from "react";

function SidebarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full">
      <SettingsSidebar />
      <div className="h-full max-h-full flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

export default SidebarLayout;
