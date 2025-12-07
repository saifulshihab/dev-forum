"use client";

import { useAuth } from "@/components/contexts/auth-provider";
import { UserType } from "@/generated/prisma";
import { Briefcase, MessageCircleQuestionMark } from "lucide-react";
import React, { useEffect, useState } from "react";
import NavItem from "./nav-item";

function UserActivityLayoutNavbar() {
  const { user } = useAuth();
  const [navItems, setNavItems] = useState<
    { text: string; icon: React.ReactNode; href: string }[]
  >([]);

  useEffect(() => {
    if (user?.type === UserType.DEVELOPER) {
      setNavItems([
        {
          text: "Questions Asked",
          href: "/user/activity/questions",
          icon: <MessageCircleQuestionMark size={16} />
        },
        {
          text: "Applied Jobs",
          href: "/user/activity/jobs",
          icon: <Briefcase size={16} />
        }
      ]);
    } else if (user?.type === UserType.RECRUITER) {
      setNavItems([
        {
          text: "Job Openings",
          href: "/user/activity/jobs",
          icon: <Briefcase size={16} />
        }
      ]);
    }
  }, [user?.type]);

  return (
    <nav className="flex items-center gap-4 border-b border-dashed px-4 py-2">
      {navItems.map((item, idx) => (
        <NavItem key={idx} text={item.text} href={item.href} icon={item.icon} />
      ))}
    </nav>
  );
}

export default UserActivityLayoutNavbar;
