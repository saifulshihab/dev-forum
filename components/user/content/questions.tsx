"use client";

import Question from "@/components/question/question";
import Empty from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Question as TQuestion } from "@/generated/prisma";
import { deleteQuestion, getUserQuestions } from "@/lib/actions";
import { FullQuestion } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UserQuestions() {
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const [isQuestionDeleting, setIsQuestionDeleting] = useState<
    string | undefined
  >();
  const [questions, setQuestions] = useState<TQuestion[]>([]);

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
      toast.success("Question deleted");
      setQuestions((prev) =>
        prev.filter((question) => question.id !== questionId)
      );
    } catch {
    } finally {
      setIsQuestionDeleting(undefined);
    }
  };

  return isQuestionsLoading ? (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="flex h-[8.625rem] flex-col justify-between gap-1 rounded-md bg-zinc-900 p-4 px-5"
          >
            <div className="flex flex-col gap-3">
              <Skeleton className="h-[1.75rem] w-40 bg-zinc-800" />
              <Skeleton className="h-5 w-72 bg-zinc-800" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 bg-zinc-800" />
              <Skeleton className="h-4 w-40 bg-zinc-800" />
            </div>
          </div>
        ))}
    </div>
  ) : questions.length ? (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {questions.map((question) => (
        <Question
          creatorView
          key={question.id}
          onDelete={handleDelete}
          isDeleting={isQuestionDeleting}
          question={question as FullQuestion}
        />
      ))}
    </div>
  ) : (
    <Empty text="No questions yet" />
  );
}

export default UserQuestions;
