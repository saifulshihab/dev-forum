"use client";

import Empty from "@/components/ui/empty";
import { SnippetWithUser } from "@/types";
import SnippetCard from "./snippet-card";

function SnippetList(props: { snippets: SnippetWithUser[] }) {
  const { snippets } = props;

  if (!snippets.length) {
    return <Empty text="No snippets found" />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}

export default SnippetList;
