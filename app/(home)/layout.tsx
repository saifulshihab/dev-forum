import TopQuestions from "@/components/home/top-questions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="flex h-[3.125rem] items-center justify-between border-b border-dashed p-2 px-4">
        <p className="font-semibold">Latest questions</p>
        <Button>Ask Question</Button>
      </div>
      <div className="flex h-[calc(100vh-3.125rem)]">
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        <div className="h-full w-56 shrink-0 border-l border-dashed p-4">
          <p className="mb-2 text-sm font-semibold">Top questions</p>
          <Suspense
            fallback={
              <div className="flex flex-col gap-3">
                {Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <Skeleton
                      key={idx}
                      className="h-[4.25rem] w-full rounded-md bg-zinc-900"
                    />
                  ))}
              </div>
            }
          >
            <TopQuestions />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
