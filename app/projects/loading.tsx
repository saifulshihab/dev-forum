import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col gap-5">
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="flex h-[11.5625rem] flex-col justify-between gap-1 rounded-md bg-zinc-900 p-3"
          >
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-1/3 bg-zinc-800" />
              <Skeleton className="h-4 w-20 bg-zinc-800" />
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-10/12 bg-zinc-800" />
              <Skeleton className="h-5 w-1/2 bg-zinc-800" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <Skeleton className="h-4 w-20 bg-zinc-800" />
              <Skeleton className="h-4 w-20 bg-zinc-800" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Loading;
