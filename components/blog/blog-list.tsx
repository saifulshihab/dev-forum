"use client";

import Empty from "@/components/ui/empty";
import { BlogPostWithUser } from "@/types";
import BlogCard from "./blog-card";

function BlogList(props: { posts: BlogPostWithUser[] }) {
  const { posts } = props;

  if (!posts.length) return <Empty text="No blog posts found" />;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default BlogList;

