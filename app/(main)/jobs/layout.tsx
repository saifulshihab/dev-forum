function JobsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex h-[3.125rem] items-center justify-between border-b border-dashed px-3">
        <p className="font-semibold">Find Job</p>
      </div>
      <div className="flex">
        <div className="flex-1 overflow-y-auto p-3">{children}</div>
      </div>
    </div>
  );
}

export default JobsLayout;
