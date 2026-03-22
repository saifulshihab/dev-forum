import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 flex-1 bg-zinc-800" />
        <Skeleton className="h-9 w-44 bg-zinc-800" />
        <Skeleton className="h-9 w-16 bg-zinc-800" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
            >
              <div className="border-b border-zinc-800 p-4">
                <Skeleton className="mb-2 h-5 w-20 bg-zinc-800" />
                <Skeleton className="h-5 w-48 bg-zinc-800" />
              </div>
              <div className="p-4">
                <Skeleton className="mb-3 h-4 w-full bg-zinc-800" />
                <Skeleton className="mb-4 h-20 w-full rounded-md bg-zinc-800" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16 bg-zinc-800" />
                  <Skeleton className="h-4 w-12 bg-zinc-800" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Loading;
