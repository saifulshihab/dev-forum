import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-4 w-32 bg-zinc-800" />
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="border-b border-zinc-800 p-5">
          <div className="mb-3 flex items-start justify-between">
            <Skeleton className="h-5 w-24 bg-zinc-800" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 bg-zinc-800" />
            </div>
          </div>
          <Skeleton className="mb-2 h-7 w-64 bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <div className="mt-4 flex gap-4">
            <Skeleton className="h-4 w-24 bg-zinc-800" />
            <Skeleton className="h-4 w-20 bg-zinc-800" />
          </div>
        </div>
        <div className="p-5">
          <Skeleton className="h-64 w-full rounded-lg bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
