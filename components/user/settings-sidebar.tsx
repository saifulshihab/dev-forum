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
    <div className="border-b border-dashed md:h-screen md:border-b-0 md:border-r">
      <p className="mt-3 px-3 text-xs font-medium text-muted-foreground">
        Settings
      </p>
      <nav className="flex flex-row flex-wrap gap-1 p-3 md:w-52 md:flex-col">
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
