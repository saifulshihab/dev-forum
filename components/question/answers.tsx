"use client";

import { Answer as TAnswer } from "@/generated/prisma";
import {
  addAnswer,
  deleteAnswer,
  getQuestionAnswers,
  toggleDislike,
  toggleLike
} from "@/lib/actions";
import { FullAnswer } from "@/types";
import { MessageCircle, MessageCircleOff } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/auth-provider";
import { Skeleton } from "../ui/skeleton";
import AddReply from "./add-reply";
import Answer from "./answer";

type Props = {
  questionId: string;
};

function QuestionAnswers(props: Props) {
  const { questionId } = props;
  const { requireAuth } = useAuth();
  const [answers, setAnswers] = useState<TAnswer[]>([]);
  const [isAnswersLoading, setIsAnswerLoading] = useState(true);
  const [isAddAnswerLoading, setAddAnswersLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { answers } = await getQuestionAnswers(questionId);
        if (answers) setAnswers(answers);
      } catch {
        toast.error("Something went wrong.");
      } finally {
        setIsAnswerLoading(false);
      }
    })();
  }, [questionId]);

  async function handleAddAnswer(content: string, cb?: () => void) {
    try {
      if (requireAuth()) return;
      setAddAnswersLoading(true);
      const res = await addAnswer(questionId, content);
      if (!res) return;
      const { answer } = res;
      if (answer) setAnswers((prev) => [answer, ...prev]);
      if (cb) cb();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setAddAnswersLoading(false);
    }
  }

  async function handleDeleteAnswer(answerId: string) {
    try {
      if (requireAuth()) return;
      await deleteAnswer(answerId);
      setAnswers((prev) => prev.filter((answer) => answer.id !== answerId));
    } catch {
      toast.error("Something went wrong.");
    }
  }

  async function handleLike(answerId: string) {
    try {
      if (requireAuth()) return;
      const res = await toggleLike(answerId);
      if (!res) return;
      const { answer: updatedAnswer, error } = res;
      if (error) {
        toast.error(error);
        return;
      }
      setAnswers((prev) =>
        prev.map((answer) =>
          answer.id === updatedAnswer?.id ? updatedAnswer : answer
        )
      );
    } catch {
      toast.error("Something went wrong.");
    }
  }

  async function handleDislike(answerId: string) {
    try {
      if (requireAuth()) return;
      const res = await toggleDislike(answerId);
      if (!res) return;
      const { answer: updatedAnswer, error } = res;
      if (error) {
        toast.error(error);
        return;
      }
      setAnswers((prev) =>
        prev.map((answer) =>
          answer.id === updatedAnswer?.id ? updatedAnswer : answer
        )
      );
    } catch {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
      {/* Header Section */}
      <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <MessageCircle size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Answers
              {answers.length > 0 && (
                <span className="ml-2 text-lg font-normal text-zinc-400">
                  ({answers.length})
                </span>
              )}
            </h2>
            <p className="mt-0.5 text-sm text-zinc-400">
              {answers.length === 0
                ? "Be the first to answer this question"
                : "Community responses and solutions"}
            </p>
          </div>
        </div>
      </div>

      {/* Answers List */}
      <div className="max-h-[calc(100vh-20rem)] space-y-4 overflow-y-auto p-6">
        {isAnswersLoading ? (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full bg-zinc-700" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32 bg-zinc-700" />
                      <Skeleton className="h-3 w-24 bg-zinc-700" />
                    </div>
                  </div>
                  <Skeleton className="mb-2 h-4 w-full bg-zinc-700" />
                  <Skeleton className="h-4 w-5/6 bg-zinc-700" />
                </div>
              ))}
          </div>
        ) : answers.length ? (
          <div className="space-y-4">
            {answers.map((answer) => (
              <Answer
                key={answer.id}
                handleLike={handleLike}
                handleDislike={handleDislike}
                answer={answer as unknown as FullAnswer}
                handleDeleteAnswer={handleDeleteAnswer}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageCircleOff size={48} className="mb-4 text-zinc-600" />
            <p className="text-sm font-medium text-zinc-400">No answers yet</p>
            <p className="mt-1 text-xs text-zinc-500">
              Share your knowledge and help the community
            </p>
          </div>
        )}
      </div>

      {/* Add Answer Section */}
      <div className="border-t border-zinc-800 bg-zinc-800/30 p-6">
        <AddReply
          isLoading={isAddAnswerLoading}
          handleAddAnswer={handleAddAnswer}
        />
      </div>
    </div>
  );
}

export default QuestionAnswers;
