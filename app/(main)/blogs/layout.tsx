import { authCheck } from "@/auth";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const { isAuthenticated } = await authCheck();

  return (
    <div>
      <div className="flex h-[3.125rem] items-center justify-between border-b border-dashed px-4">
        <h1 className="text-2xl font-semibold leading-none">Blogs</h1>
        {isAuthenticated && (
          <Button asChild variant="outline">
            <Link href="/blogs/create">
              <PlusIcon size={14} />
              New Blog
            </Link>
          </Button>
        )}
      </div>
      <div className="h-[calc(100vh-3.125rem)] overflow-y-auto p-3">
        {children}
      </div>
    </div>
  );
}

