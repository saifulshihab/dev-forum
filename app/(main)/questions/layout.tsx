import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="flex h-[3.125rem] items-center justify-between border-b border-dashed px-4">
        <h1 className="text-2xl font-semibold leading-none">Questions</h1>
        <Button asChild variant="outline">
          <Link href="/questions/create">Ask Question</Link>
        </Button>
      </div>
      <div className="h-[calc(100vh-3.125rem)] overflow-y-auto p-3">
        {children}
      </div>
    </div>
  );
}
