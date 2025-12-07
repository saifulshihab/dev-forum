import QuestionAnswers from "@/components/question/answers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dayjs from "@/lib/dayjs";
import prisma from "@/lib/prisma";
import { getTagColor } from "@/lib/utils";
import {
  ArrowLeft,
  Clock,
  MessageCircle,
  MessageCircleQuestionMark,
  User
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Record<string, string | undefined>;
};

async function Page(props: Props) {
  const id = (await props.params).id;
  const creatorView = props.searchParams.creatorView === "true";

  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, fullName: true } },
      _count: { select: { answers: { where: { parentId: null } } } }
    }
  });

  if (!question) notFound();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="text-zinc-400 hover:text-white"
      >
        <Link href={creatorView ? "/user/activity/questions" : "/questions"}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Link>
      </Button>
      {/* Question Card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
        {/* Header Section */}
        <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MessageCircleQuestionMark
                    size={20}
                    className="text-primary"
                  />
                </div>
                <h1 className="text-2xl font-bold text-white">
                  {question.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <User size={16} className="text-zinc-500" />
              <Link
                href={`/users/${question.userId}`}
                className="font-medium transition-colors hover:text-primary"
              >
                {question.user?.fullName}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-zinc-500" />
              <span>Asked {dayjs(question.createdAt).fromNow(false)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-zinc-500" />
              <span className="font-medium text-zinc-300">
                {question._count.answers}
              </span>
              <span>
                {question._count.answers === 1 ? "answer" : "answers"}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">
              Description
            </h2>
            <div className="rounded-lg bg-zinc-800/30 p-4">
              <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-300">
                {question.content}
              </p>
            </div>
          </div>

          {/* Tags */}
          {question.tags?.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag, index) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={`cursor-pointer border text-xs transition-all duration-200 ${getTagColor(index)}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Answers Section */}
      <QuestionAnswers questionId={question.id} />
    </div>
  );
}

export default Page;
