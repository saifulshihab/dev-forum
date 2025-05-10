function ProjectsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex h-[3.125rem] items-center justify-between border-b border-dashed px-3">
        <p className="font-semibold">Find work</p>
      </div>
      <div className="flex h-[calc(100vh-6.25rem)]">
        <div className="flex-1 overflow-y-auto p-3">{children}</div>
      </div>
    </div>
  );
}

export default ProjectsLayout;
