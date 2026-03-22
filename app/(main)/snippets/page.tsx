import { authCheck } from "@/auth";
import SnippetList from "@/components/snippet/snippet-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { getSnippets } from "@/lib/actions";
import { SNIPPET_LANGUAGES } from "@/lib/data";
import { PlusIcon, Search } from "lucide-react";
import Link from "next/link";

type SearchParams = {
  search?: string;
  language?: string;
};

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { search, language } = searchParams;
  const { isAuthenticated } = await authCheck();

  const result = await getSnippets({
    search: search?.trim() || undefined,
    language: language === "all" ? undefined : language
  });
  const snippets = result?.snippets ?? [];

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <form className="flex flex-1 items-center gap-2" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="search"
              defaultValue={search}
              placeholder="Search snippets..."
              className="h-9 border-dashed bg-muted/50 pl-9 text-sm"
            />
          </div>
          <Select name="language" defaultValue={language || "all"}>
            <SelectTrigger className="h-9 w-44 border-dashed bg-muted/50 text-sm">
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All languages</SelectItem>
              {SNIPPET_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" variant="secondary" size="sm" className="h-9">
            Filter
          </Button>
        </form>
        {isAuthenticated && (
          <Button size="sm" className="h-9" asChild>
            <Link href="/snippets/create">
              <PlusIcon size={14} />
              New Snippet
            </Link>
          </Button>
        )}
      </div>

      <SnippetList snippets={snippets} />
    </div>
  );
}

export default Page;
