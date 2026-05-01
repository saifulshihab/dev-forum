"use client";

import BlogCard from "@/components/blog/blog-card";
import Empty from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteBlogPost, getUserBlogPosts } from "@/lib/actions";
import { BlogPostWithUser } from "@/types";
import { FileText, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UserBlogs() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | undefined>();
  const [posts, setPosts] = useState<BlogPostWithUser[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserBlogPosts();
        if (res?.error) {
          toast.error(res.error);
          return;
        }
        setPosts(res?.posts ?? []);
      } catch {
        toast.error("Failed to load blogs");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      setIsDeleting(postId);
      const res = await deleteBlogPost(postId);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Blog deleted successfully");
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch {
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(undefined);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">My Blogs</h1>
              <p className="mt-0.5 text-sm text-zinc-400">
                All blog posts you have published
              </p>
            </div>
          </div>

          <Button asChild size="sm" className="h-9">
            <Link href="/blogs/create">
              <PlusIcon size={14} />
              Add Blog
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md"
              >
                <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
                  <Skeleton className="mb-2 h-6 w-3/4 bg-zinc-800" />
                  <Skeleton className="h-4 w-1/2 bg-zinc-800" />
                </div>
                <div className="p-4">
                  <Skeleton className="mb-3 h-4 w-full bg-zinc-800" />
                  <Skeleton className="mb-3 h-4 w-5/6 bg-zinc-800" />
                  <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                    <Skeleton className="h-3 w-32 bg-zinc-800" />
                    <Skeleton className="h-3 w-10 bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : posts.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              creatorView
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      ) : (
        <Empty text="No blogs yet" />
      )}
    </div>
  );
}

export default UserBlogs;
