"use client";

import Question from "@/components/question/question";
import Empty from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Prisma } from "@/generated/prisma";
import { deleteQuestion, getUserQuestions } from "@/lib/actions";
import { MessageCircleQuestionMark } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UserQuestions() {
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const [isQuestionDeleting, setIsQuestionDeleting] = useState<
    string | undefined
  >();
  const [questions, setQuestions] = useState<
    Prisma.QuestionGetPayload<{
      include: { user: true; _count: { select: { answers: true } } };
    }>[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserQuestions();
        if (res) {
          const { error, questions } = res;
          if (error) {
            toast.error(error);
            return;
          }
          setQuestions(questions || []);
        }
      } catch {
      } finally {
        setIsQuestionsLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (questionId: string) => {
    try {
      setIsQuestionDeleting(questionId);
      await deleteQuestion(questionId);
      toast.success("Question deleted successfully");
      setQuestions((prev) =>
        prev.filter((question) => question.id !== questionId)
      );
    } catch {
      toast.error("Failed to delete question");
    } finally {
      setIsQuestionDeleting(undefined);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <MessageCircleQuestionMark size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">My Questions</h1>
            <p className="mt-0.5 text-sm text-zinc-400">
              Manage and track your questions
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {isQuestionsLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    <Skeleton className="h-3 w-20 bg-zinc-800" />
                    <Skeleton className="h-8 w-20 rounded-md bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : questions.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {questions.map((question) => (
            <Question
              creatorView
              key={question.id}
              onDelete={handleDelete}
              isDeleting={isQuestionDeleting}
              question={question as any}
            />
          ))}
        </div>
      ) : (
        <Empty text="No questions yet" />
      )}
    </div>
  );
}

export default UserQuestions;
