import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col gap-5">
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="flex h-[138px] flex-col justify-between gap-1 rounded-md bg-zinc-900 p-3"
          >
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-40 bg-zinc-800" />
              <Skeleton className="h-5 w-72 bg-zinc-800" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-10 bg-zinc-800" />
              <Skeleton className="h-4 w-40 bg-zinc-800" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Loading;
