import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="sticky top-0 z-10 flex h-[3.125rem] items-center justify-between border-b border-dashed bg-background px-4">
        <h1 className="text-xl font-semibold leading-none md:text-2xl">Questions</h1>
        <Button asChild variant="outline" size="sm">
          <Link href="/questions/create">Ask Question</Link>
        </Button>
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
}
