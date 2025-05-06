import { Button } from "@/components/ui/button";

function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-gray-200 p-2 px-4">
        <p className="font-semibold">Latest questions</p>
        <Button size="sm">Ask Question</Button>
      </div>
      <div className="flex h-[calc(100vh-49px)]">
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        <div className="h-full w-64 border-l border-gray-200 p-4">
          <p className="text-sm font-semibold">Top questions</p>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
