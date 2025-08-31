"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type Props = {
  isLoading: boolean;
  handleAddAnswer: (content: string, cb?: (() => void) | undefined) => void;
  replyMode?:
    | {
        answerId: string;
      }
    | undefined;
};

function AddReply(props: Props) {
  const { isLoading, handleAddAnswer } = props;
  const [content, setContent] = useState("");
  return (
    <div className="flex w-full items-start gap-2">
      <Textarea
        value={content}
        disabled={isLoading}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[2.25rem] bg-zinc-950 text-zinc-400 dark:placeholder-zinc-500"
        placeholder="Write your answer..."
        onKeyDown={(e) => {
          if (!content.trim().length) return;
          if (e.key === "Enter") handleAddAnswer(content, () => setContent(""));
        }}
      />
      <Button
        size="icon"
        disabled={isLoading}
        onClick={() => {
          if (!content.trim().length) return;
          handleAddAnswer(content, () => setContent(""));
        }}
      >
        <Send />
      </Button>
    </div>
  );
}

export default AddReply;
