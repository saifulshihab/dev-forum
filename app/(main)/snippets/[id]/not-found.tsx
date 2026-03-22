import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <Code size={32} className="text-zinc-600" />
      <h2 className="text-lg font-semibold">Snippet not found</h2>
      <p className="text-sm text-zinc-500">
        This snippet may have been deleted or doesn&apos;t exist.
      </p>
      <Button variant="secondary" size="sm" asChild>
        <Link href="/snippets">Browse snippets</Link>
      </Button>
    </div>
  );
}

export default NotFound;
