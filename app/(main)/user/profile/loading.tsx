import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-dashed border-teal-900 bg-primary/5 px-8 py-8">
        <div className="mb-4 flex flex-col items-center gap-5 md:flex-row md:items-start md:justify-between md:gap-0">
          <Skeleton className="h-40 w-40 rounded-md" />
          <div className="flex flex-col items-center gap-2 md:items-end">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>
        <div className="text-center md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="mt-2 h-4 w-3/4 md:max-w-[70%]" />
          <Skeleton className="mt-1 h-4 w-24" />
          <div className="mt-2 flex items-center gap-3">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>
      </div>
      <div className="px-8 py-6">
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
            <Skeleton className="w-18 h-6" />
            <Skeleton className="h-6 w-12" />
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-56" />
          </div>
          <div className="space-y-6">
            <div className="border-l border-dashed pl-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="mt-1 h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="border-l border-dashed pl-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="mt-1 h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="mt-2 h-4 w-full" />
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-6">
              <div className="border-l border-dashed pl-4">
                <div>
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="mt-1 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-24" />
                </div>
              </div>
              <div className="border-l border-dashed pl-4">
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="mt-1 h-4 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-28" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-28" />
          </div>
          <div className="space-y-6">
            <div className="border-l border-dashed pl-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Skeleton className="h-5 w-40" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="mt-1 h-4 w-full" />
              </div>
            </div>
            <div className="border-l border-dashed pl-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Skeleton className="h-5 w-36" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="mt-1 h-4 w-3/4" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Loading;
