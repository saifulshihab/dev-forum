import { authCheck } from "@/auth";
import BlogDetail from "@/components/blog/blog-detail";
import { getBlogComments, getBlogPostBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Record<string, string | undefined>;
};

async function Page(props: Props) {
  const slug = (await props.params).slug;
  const post = await getBlogPostBySlug(slug);
  const creatorView = props.searchParams.creatorView === "true";

  if (!post || "error" in post) notFound();

  const commentsResult = await getBlogComments(post.id);
  const comments = commentsResult?.comments ?? [];

  const { isAuthenticated } = await authCheck();

  return (
    <BlogDetail
      post={post}
      comments={comments}
      canComment={isAuthenticated}
      creatorView={creatorView}
    />
  );
}

export default Page;
