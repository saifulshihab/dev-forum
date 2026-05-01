import BlogList from "@/components/blog/blog-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBlogPosts } from "@/lib/actions";
import { Search } from "lucide-react";

type SearchParams = { search?: string };

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { search } = searchParams;

  const result = await getBlogPosts({
    search: search?.trim() || undefined
  });
  const posts = result?.posts ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <form className="flex items-center gap-2" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="search"
              defaultValue={search}
              placeholder="Search blogs..."
              className="h-9 border-dashed bg-muted/50 pl-9 text-sm"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm" className="h-9">
            Filter
          </Button>
        </form>
      </div>

      <BlogList posts={posts} />
    </div>
  );
}

export default Page;
