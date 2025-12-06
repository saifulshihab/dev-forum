import { cn } from "@/lib/utils";
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
      className={cn(
        "relative flex items-center justify-between rounded-md px-3 py-2 transition-colors",
        isActive
          ? "bg-zinc-900 text-white"
          : "text-muted-foreground hover:bg-zinc-900/50 hover:text-white"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <span className="truncate text-sm font-medium">{text}</span>
      </div>
    </Link>
  );
}

export default NavItem;
