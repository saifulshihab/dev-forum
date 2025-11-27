"use client";

import { Answer as TAnswer } from "@/generated/prisma";
import {
  addReply,
  deleteAnswer,
  getAnswerReplies,
  toggleDislike,
  toggleLike
} from "@/lib/actions";
import dayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { FullAnswer } from "@/types";
import Link from "next/link";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/auth-provider";
import { Skeleton } from "../ui/skeleton";
import AddReply from "./add-reply";
import Reaction from "./reaction";

type Props = {
  answer: FullAnswer;
  handleLike(answerId: string): Promise<void>;
  handleDislike(answerId: string): Promise<void>;
  handleDeleteAnswer: (answerId: string) => Promise<void>;
};

function Answer(props: Props) {
  const { answer } = props;
  const { requireAuth } = useAuth();
  const [showReplies, setShowReplies] = useState(false);
  const [isReplyMode, setReplyMode] = useState(false);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [replies, setReplies] = useState<TAnswer[]>(answer.replies || []);
  const [isRepliesPending, startRepliesTransition] = useTransition();
  const [isDeleteAnswerLoading, setDeleteAnswersLoading] = useState(false);

  async function viewReplies() {
    if (!showReplies) {
      setShowReplies(true);
      startRepliesTransition(async () => {
        const replies = await getAnswerReplies(answer.id);
        setReplies(replies);
      });
    } else {
      setShowReplies(false);
    }
  }

  async function handleAddAnswer(content: string, cb?: () => void) {
    try {
      if (requireAuth()) return;
      setIsRepliesLoading(true);
      const replies = await addReply(answer.questionId, answer.id, content);
      setReplies(replies as TAnswer[]);
      if (!showReplies) setShowReplies(true);
      setReplyMode(false);
      if (cb) cb();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsRepliesLoading(false);
    }
  }

  async function handleDeleteAnswer(answerId: string) {
    try {
      if (requireAuth()) return;
      if (answerId === answer.id) {
        await props.handleDeleteAnswer(answerId);
      } else {
        setDeleteAnswersLoading(true);
        await deleteAnswer(answerId);
        setReplies((prev) => prev.filter((answer) => answer.id !== answerId));
        setDeleteAnswersLoading(false);
      }
    } catch {
      toast.error("Something went wrong.");
      setDeleteAnswersLoading(false);
    }
  }

  async function handleLike(answerId: string) {
    try {
      if (requireAuth()) return;
      if (answerId === answer.id) {
        // Like for this answer
        await props.handleLike(answerId);
      } else {
        // Like for a reply
        const res = await toggleLike(answerId);
        if (!res) return;
        const { answer: updatedReply, error } = res;
        if (error) {
          toast.error(error);
          return;
        }
        setReplies((prev) =>
          prev.map((reply) =>
            reply.id === updatedReply?.id ? updatedReply : reply
          )
        );
      }
    } catch {
      toast.error("Something went wrong.");
    }
  }

  async function handleDislike(answerId: string) {
    try {
      if (requireAuth()) return;
      if (answerId === answer.id) {
        // Dislike for this answer
        await props.handleDislike(answerId);
      } else {
        // Dislike for a reply
        const res = await toggleDislike(answerId);
        if (!res) return;
        const { answer: updatedReply, error } = res;
        if (error) {
          toast.error(error);
          return;
        }
        setReplies((prev) =>
          prev.map((reply) =>
            reply.id === updatedReply?.id ? updatedReply : reply
          )
        );
      }
    } catch {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className={cn(replies.length && "flex")}>
      {replies.length && showReplies ? (
        <div className="my-2 mr-2 border-l bg-zinc-600" />
      ) : null}
      <div key={answer.id} className="w-fit">
        <div className="space-y-1 rounded-xl bg-zinc-800/50 p-3 px-4">
          <div className="flex items-center justify-between gap-1">
            <Link href={`/users/${answer.user.id}`}>
              <p className="text-xs font-semibold">{answer.user.fullName}</p>
            </Link>
            <p className="text-xs text-zinc-500">
              {dayjs(answer.createdAt).fromNow(true)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{answer.content}</p>
        </div>
        <Reaction
          answerId={answer.id}
          handleLike={handleLike}
          answerUserId={answer.user.id}
          likeCount={answer.likeCount}
          handleDislike={handleDislike}
          dislikeCount={answer.dislikeCount}
          reactions={answer.reactions as any}
          handleDelete={handleDeleteAnswer}
          handleReplyClick={() => setReplyMode(true)}
          isDeleteAnswerLoading={isDeleteAnswerLoading}
        />
        {replies.length ? (
          <div className="ml-2">
            <button
              onClick={viewReplies}
              className="mb-1 text-xs font-semibold leading-none text-zinc-400"
            >
              {showReplies
                ? `Hide ${replies.length > 1 ? "replies" : "reply"}`
                : `View ${replies.length > 1 ? `all ${replies.length} replies` : "1 reply"}`}
            </button>
          </div>
        ) : null}
        {showReplies ? (
          isRepliesPending ? (
            <Skeleton className="my-1 ml-5 h-16 bg-zinc-800" />
          ) : (
            <div className="ml-5">
              {replies.map((reply) => (
                <Answer
                  key={reply.id}
                  answer={reply as FullAnswer}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                  handleDeleteAnswer={handleDeleteAnswer}
                />
              ))}
            </div>
          )
        ) : null}
        {isReplyMode ? (
          <div className="group my-1 ml-2">
            <AddReply
              isLoading={isRepliesLoading}
              replyMode={{ answerId: answer.id }}
              handleAddAnswer={handleAddAnswer}
            />
            <button
              className="text-xs text-muted-foreground opacity-0 transition-opacity duration-100 group-hover:opacity-100 hover:text-white"
              onClick={() => setReplyMode(false)}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Answer;
