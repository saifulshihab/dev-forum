import { SettingsSidebar } from "@/components/user/settings-sidebar";
import React from "react";

function SidebarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full">
      <SettingsSidebar />
      <div className="h-full max-h-[calc(100vh-3.125rem)] flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default SidebarLayout;
