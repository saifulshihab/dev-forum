"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  icon: React.ReactNode;
  text: string;
  href: string;
};

function NavItem(props: Props) {
  const { icon, text, href } = props;
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-4 py-3 ${
        isActive ? "bg-zinc-900" : "hover:bg-zinc-900"
      } `}
    >
      <div className="flex items-center">
        <div>{icon}</div>

        <span className="ml-3 text-sm font-medium">{text}</span>
      </div>
    </Link>
  );
}

export function SettingsSidebar() {
  const navItems = [
    {
      text: "Profile",
      icon: <User size={16} />,
      href: "/user/settings/profile"
    }
  ];
  return (
    <nav className="w-52 border-r border-dashed">
      {navItems.map((item, idx) => (
        <NavItem key={idx} icon={item.icon} text={item.text} href={item.href} />
      ))}
    </nav>
  );
}
