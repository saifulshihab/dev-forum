import TopQuestions from "@/components/home/top-questions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";

function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-dashed px-4 py-[5.5px]">
        <p className="font-semibold">Latest questions</p>
        <Link href="/questions/create">
          <Button>Ask Question</Button>
        </Link>
      </div>
      <div className="flex h-[calc(100vh-6.25rem)]">
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        <div className="box-border h-full w-56 shrink-0 border-l border-dashed p-4">
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
