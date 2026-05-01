"use client";

import { Badge } from "@/components/ui/badge";
import dayjs from "@/lib/dayjs";
import { getTagColor } from "@/lib/utils";
import { BlogPostWithUser } from "@/types";
import { Clock, MessageSquare, Trash, User } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type Props = {
  post: BlogPostWithUser;
  creatorView?: boolean;
  isDeleting?: string;
  onDelete?: (postId: string) => void;
};

function BlogCard(props: Props) {
  const { post, creatorView, isDeleting, onDelete } = props;

  const preview =
    post.content.length > 220
      ? post.content.slice(0, 220) + "..."
      : post.content;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:border-zinc-700 hover:shadow-xl">
      <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
        <Link
          href={
            creatorView
              ? `/blogs/${post.slug}?creatorView=true`
              : `/blogs/${post.slug}`
          }
          className="block"
        >
          <h2 className="line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
            {post.title}
          </h2>
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-3 line-clamp-4 text-sm leading-relaxed text-zinc-400">
          {preview}
        </p>

        {post.tags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag, index) => (
              <Badge
                key={tag}
                variant="secondary"
                className={`border text-xs ${getTagColor(index)}`}
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 4 && (
              <Badge variant="secondary" className="border text-xs">
                +{post.tags.length - 4}
              </Badge>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-zinc-800 pt-3">
          {creatorView ? (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock size={12} />
              <span>{dayjs(post.createdAt).fromNow(false)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <User size={12} />
                <Link
                  href={`/users/${post.user.id}`}
                  className="transition-colors hover:text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.user.fullName}
                </Link>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Clock size={12} />
                <span>{dayjs(post.createdAt).fromNow(false)}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <MessageSquare size={12} />
            <span>{post._count.comments}</span>
          </div>
        </div>

        {creatorView && onDelete && (
          <div className="mt-4 flex items-center justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  isLoading={isDeleting === post.id}
                  className="min-w-[100px]"
                >
                  <Trash size={14} />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your blog post and its
                    comments. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onDelete(post.id);
                    }}
                  >
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
