import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  icon: React.ReactNode;
  text: string;
  collapsed: boolean;
  href: string;
  badge?: string | null;
};

function NavItem(props: Props) {
  const { icon, text, href, collapsed = false, badge } = props;
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
          className={cn(
            "relative flex items-center rounded-md px-3 py-2 transition-colors",
            isActive
              ? "bg-zinc-900 text-white"
              : "text-muted-foreground hover:bg-zinc-900/50 hover:text-white",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">{icon}</div>
            {!collapsed && (
              <span className="truncate text-sm font-medium">{text}</span>
            )}
          </div>

          {/* Badge */}
          {!collapsed && badge && (
            <Badge
              variant={badge === "New" ? "default" : "secondary"}
              className={cn(
                "ml-auto px-2 py-0.5 text-xs",
                badge === "New"
                  ? "bg-blue-500 text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {badge}
            </Badge>
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{text}</p>
        {badge && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {badge}
          </Badge>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export default NavItem;
