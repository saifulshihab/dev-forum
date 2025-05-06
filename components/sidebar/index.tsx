"use client";

import {
  Briefcase,
  Home,
  Layers,
  PanelRightClose,
  PanelRightOpen
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import NavItem from "./nav-item";

export function AppSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    {
      text: "Home",
      icon: <Home size={16} />,
      href: "/"
    },
    {
      text: "Projects",
      icon: <Layers size={16} />,
      href: "/projects"
    },
    {
      text: "Jobs",
      icon: <Briefcase size={16} />,
      href: "/jobs"
    }
  ];

  return (
    <div
      className={`bg-gray-200 transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="group relative flex h-16 items-center justify-between px-4">
        <div className="inline-flex items-center gap-2">
          <Image
            width={32}
            height={32}
            alt="app-logo"
            src={"/images/code.png"}
          />
          <p
            className={`line-clamp-1 text-xl font-bold ${!sidebarOpen && "hidden"}`}
          >
            Dev Forum
          </p>
        </div>
        <button
          onClick={toggleSidebar}
          className="absolute right-[-2px] rounded-md p-1 opacity-0 group-hover:opacity-100"
        >
          {sidebarOpen ? (
            <PanelRightOpen size={16} />
          ) : (
            <PanelRightClose size={16} />
          )}
        </button>
      </div>
      <nav className="mt-6">
        {navItems.map((item, idx) => (
          <NavItem
            key={idx}
            icon={item.icon}
            text={item.text}
            href={item.href}
            collapsed={!sidebarOpen}
          />
        ))}
      </nav>
    </div>
  );
}
