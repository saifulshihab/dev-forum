import { Badge } from "@/components/ui/badge";
import dayjs from "@/lib/dayjs";
import { getTagColor } from "@/lib/utils";
import { BlogCommentWithUser, BlogPostWithUser } from "@/types";
import { ArrowLeft, Clock, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import AddComment from "./comment-form";
import CommentList from "./comment-list";

function BlogDetail(props: {
  post: BlogPostWithUser;
  comments: BlogCommentWithUser[];
  canComment: boolean;
  creatorView: boolean;
}) {
  const { post, comments, canComment, creatorView } = props;
  return (
    <div className="space-y-3">
      {/* Back Button */}
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="text-zinc-400 hover:text-white"
      >
        <Link href={creatorView ? "/user/activity/blogs" : "/blogs"}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Link>
      </Button>
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-5">
          <h1 className="text-2xl font-bold text-white">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <User size={12} />
              <Link
                href={`/users/${post.user.id}`}
                className="transition-colors hover:text-primary"
              >
                {post.user.fullName}
              </Link>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock size={12} />
              <span>{dayjs(post.createdAt).fromNow(false)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <MessageSquare size={12} />
              <span>{post._count.comments}</span>
            </div>
          </div>

          {post.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag, index) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`border text-xs ${getTagColor(index)}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
              {post.content}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-5">
          <h2 className="text-lg font-semibold text-white">Comments</h2>
          <p className="mt-1 text-xs text-zinc-500">
            Be respectful and keep it constructive.
          </p>
        </div>
        <div className="flex flex-col gap-4 p-5">
          {canComment ? (
            <AddComment postId={post.id} />
          ) : (
            <p className="text-sm text-zinc-500">
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>{" "}
              to comment.
            </p>
          )}
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
