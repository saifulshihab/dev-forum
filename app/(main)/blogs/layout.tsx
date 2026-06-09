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
      <div className="sticky top-0 z-10 flex h-[3.125rem] items-center justify-between border-b border-dashed bg-background px-4">
        <h1 className="text-xl font-semibold leading-none md:text-2xl">Blogs</h1>
        {isAuthenticated && (
          <Button asChild variant="outline" size="sm">
            <Link href="/blogs/create">
              <PlusIcon size={14} />
              New Blog
            </Link>
          </Button>
        )}
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
}

