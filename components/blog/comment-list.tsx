import Empty from "@/components/ui/empty";
import dayjs from "@/lib/dayjs";
import { BlogCommentWithUser } from "@/types";
import { Clock, User } from "lucide-react";
import Link from "next/link";

function CommentList(props: { comments: BlogCommentWithUser[] }) {
  const { comments } = props;

  if (!comments.length) return <Empty text="No comments yet" />;

  return (
    <div className="flex flex-col gap-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-lg border border-zinc-800 bg-zinc-950/30 p-4"
        >
          <div className="mb-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <User size={12} />
              <Link
                href={`/users/${comment.user.id}`}
                className="transition-colors hover:text-primary"
              >
                {comment.user.fullName}
              </Link>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock size={12} />
              <span>{dayjs(comment.createdAt).fromNow(false)}</span>
            </div>
          </div>

          <p className="whitespace-pre-wrap text-sm text-zinc-200">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;

