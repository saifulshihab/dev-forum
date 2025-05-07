import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

function Spinner({ size, className }: { size?: number; className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <LoaderIcon
        size={size}
        className={cn("animate-spin text-zinc-500", className)}
      />
    </div>
  );
}

export default Spinner;
