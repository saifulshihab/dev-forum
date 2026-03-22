import { authCheck } from "@/auth";
import SnippetDetail from "@/components/snippet/snippet-detail";
import { getSnippet } from "@/lib/actions";
import { notFound } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const snippet = await getSnippet(params.id);

  if (!snippet || "error" in snippet) {
    notFound();
  }

  const { user: authUser } = await authCheck();
  const isOwner = authUser?.id === snippet.userId;

  return <SnippetDetail snippet={snippet} isOwner={isOwner} />;
}

export default Page;
