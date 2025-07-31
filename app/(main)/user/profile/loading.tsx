import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col">
      <Skeleton className="relative h-60 w-full rounded-none">
        <Skeleton className="absolute left-[2.5rem] top-1/2 h-40 w-40 rounded-sm" />
      </Skeleton>
      <div className="w-full p-10">
        <div className="mt-5 flex flex-col gap-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
