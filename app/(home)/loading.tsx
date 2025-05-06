import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col gap-5">
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="flex h-[138px] flex-col justify-between gap-1 rounded-md bg-gray-200 p-3"
          >
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-40 bg-gray-300" />
              <Skeleton className="h-5 w-72 bg-gray-300" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-10 bg-gray-300" />
              <Skeleton className="h-4 w-40 bg-gray-300" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Loading;
