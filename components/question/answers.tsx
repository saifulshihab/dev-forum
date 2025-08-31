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
import { MessageCircleOff } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/auth-provider";
import Empty from "../ui/empty";
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
    <div className="space-y-3 rounded-md bg-zinc-900">
      <div className="border-b border-dashed px-5 py-4">
        <h2 className="items-center text-lg font-semibold leading-none">
          Answers
          <span className="font-normal text-muted-foreground">
            {answers.length ? ` (${answers.length})` : null}
          </span>
        </h2>
      </div>
      <div className="min-h-20 px-5 py-2">
        {isAnswersLoading ? (
          <Skeleton className="h-16 w-1/3 bg-zinc-800" />
        ) : answers.length ? (
          <div className="max-h-[calc(100vh-27.125rem)] space-y-4 overflow-y-auto">
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
          <Empty icon={<MessageCircleOff size={16} />} text="No answers yet" />
        )}
      </div>
      <div className="flex items-start gap-2 border-t border-dashed p-4 px-5">
        <AddReply
          isLoading={isAddAnswerLoading}
          handleAddAnswer={handleAddAnswer}
        />
      </div>
    </div>
  );
}

export default QuestionAnswers;
