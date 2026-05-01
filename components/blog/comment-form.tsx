"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addBlogComment } from "@/lib/actions";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import toast from "react-hot-toast";

function AddComment(props: { postId: string }) {
  const { postId } = props;
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    try {
      setIsLoading(true);
      const res = await addBlogComment(postId, content);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      setContent("");
      router.refresh();
      toast.success("Comment added");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Write a comment..."
        className="text-sm"
      />
      <div className="flex justify-end">
        <Button
          size="sm"
          onClick={submit}
          isLoading={isLoading}
          disabled={!content.trim()}
        >
          Post Comment
        </Button>
      </div>
    </div>
  );
}

export default AddComment;
