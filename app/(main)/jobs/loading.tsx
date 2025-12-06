import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div>
      {/* Content */}
      <div className="h-[calc(100vh-3.125rem)] space-y-3 overflow-y-auto">
        {/* Filter Skeleton */}
        <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24 bg-zinc-800" />
            <Skeleton className="h-8 w-20 rounded-md bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-zinc-800" />
                  <Skeleton className="h-9 w-full rounded-md bg-zinc-800" />
                </div>
              ))}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Skeleton className="h-9 w-20 rounded-md bg-zinc-800" />
            <Skeleton className="h-9 w-24 rounded-md bg-zinc-800" />
          </div>
        </div>

        {/* Job Cards Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md"
              >
                {/* Header Section */}
                <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <Skeleton className="mb-2 h-6 w-3/4 bg-zinc-800" />
                      <Skeleton className="h-4 w-1/2 bg-zinc-800" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-md bg-zinc-800" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  {/* Key Info Grid */}
                  <div className="mb-3 grid grid-cols-2 gap-2.5">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton
                          key={i}
                          className="h-12 rounded-md bg-zinc-800"
                        />
                      ))}
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between gap-3 border-t border-zinc-800 pt-3">
                    <Skeleton className="h-3 w-20 bg-zinc-800" />
                    <Skeleton className="h-3 w-24 bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Loading;
