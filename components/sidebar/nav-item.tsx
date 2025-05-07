"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  icon: React.ReactNode;
  text: string;
  collapsed: boolean;
  href: string;
};

function NavItem(props: Props) {
  const { icon, text, href, collapsed = false } = props;
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  return (
    <Tooltip
      open={isTooltipOpen}
      onOpenChange={(open) => {
        if (!collapsed) setIsTooltipOpen(false);
        else setIsTooltipOpen(open);
      }}
    >
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`flex items-center px-4 py-3 ${
            isActive ? "bg-zinc-900" : "hover:bg-zinc-900"
          } ${collapsed ? "justify-center" : "justify-between"}`}
        >
          <div className="flex items-center">
            <div>{icon}</div>
            {!collapsed && (
              <span
                className={cn(
                  "text-sm font-medium",
                  collapsed ? "ml-0" : "ml-3"
                )}
              >
                {text}
              </span>
            )}
          </div>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default NavItem;
