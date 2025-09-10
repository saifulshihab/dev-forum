"use client";

import { CircleUser, User } from "lucide-react";
import NavItem from "../nav-item";

export function SettingsSidebar() {
  const navItems = [
    {
      text: "Profile",
      icon: <User size={16} />,
      href: "/user/settings/profile"
    },
    {
      text: "Account",
      icon: <CircleUser size={16} />,
      href: "/user/settings/account"
    }
  ];
  return (
    <div className="h-screen border-r border-dashed">
      <p className="mt-3 px-3 text-xs font-medium text-muted-foreground">
        Settings
      </p>
      <nav className="w-52 space-y-1 p-3">
        {navItems.map((item, idx) => (
          <NavItem
            collapsed={false}
            key={idx}
            icon={item.icon}
            text={item.text}
            href={item.href}
          />
        ))}
      </nav>
    </div>
  );
}
