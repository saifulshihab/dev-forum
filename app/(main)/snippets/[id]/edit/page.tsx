import { authCheck } from "@/auth";
import SnippetEditForm from "@/components/snippet/snippet-edit-form";
import { getSnippet } from "@/lib/actions";
import { notFound, redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const snippet = await getSnippet(params.id);

  if (!snippet || "error" in snippet) {
    notFound();
  }

  const { user } = await authCheck();
  if (!user || user.id !== snippet.userId) {
    redirect(`/snippets/${params.id}`);
  }

  return <SnippetEditForm snippet={snippet} />;
}

export default Page;
