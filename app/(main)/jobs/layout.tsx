import React from "react";

export default function Layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="flex h-[3.125rem] items-center border-b border-dashed px-4">
        <h1 className="text-2xl font-semibold leading-none">Jobs</h1>
      </div>
      <div className="h-[calc(100vh-3.125rem)] overflow-y-auto p-3">
        {children}
      </div>
    </div>
  );
}
