import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="space-y-3">
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="flex h-[8.625rem] flex-col justify-between gap-1 rounded-md bg-zinc-900 p-4 px-5"
          >
            <div className="flex flex-col gap-3">
              <Skeleton className="h-[1.75rem] w-40 bg-zinc-800" />
              <Skeleton className="h-5 w-72 bg-zinc-800" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 bg-zinc-800" />
              <Skeleton className="h-4 w-40 bg-zinc-800" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Loading;
