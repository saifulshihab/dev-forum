import QuestionAnswers from "@/components/question/answers";
import Question from "@/components/question/question";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dayjs from "@/lib/dayjs";
import prisma from "@/lib/prisma";
import { getTagColor } from "@/lib/utils";
import { FullQuestion } from "@/types";
import { ArrowLeft, Clock, User } from "lucide-react";
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
      answers: { where: { parentId: null } }
    }
  });

  if (!question) notFound();

  return (
    <div className="space-y-3">
      <Button
        asChild
        variant="link"
        className="px-0 text-muted-foreground hover:no-underline"
      >
        <Link href={creatorView ? "/user/activity/questions" : "/questions"}>
          <ArrowLeft className="mr-1" />
          Back
        </Link>
      </Button>
      <Question detailsView question={question as FullQuestion} />
      <div className="flex items-center justify-between">
        <div className="inline-flex max-w-[60%] flex-wrap items-center gap-2">
          {question.tags?.length
            ? question.tags.map((tag, index) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`cursor-pointer border text-xs transition-all duration-200 ${getTagColor(index)}`}
                >
                  {tag}
                </Badge>
              ))
            : null}
        </div>
        <div className="inline-flex max-w-[40%] flex-wrap items-center gap-5 text-xs text-muted-foreground text-zinc-500">
          <div className="inline-flex items-center gap-3">
            <Clock size={14} />
            <p>Asked {dayjs(question.createdAt).fromNow()} </p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm">
            <User className="text-zinc-500" size={14} />
            <Link
              href={`/users/${question.userId}`}
              className="text-zinc-500 hover:text-primary"
            >
              <p>{question.user?.fullName}</p>
            </Link>
          </div>
        </div>
      </div>
      <QuestionAnswers questionId={question.id} />
    </div>
  );
}

export default Page;
