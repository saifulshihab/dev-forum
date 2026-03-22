import { Prisma } from "@/generated/prisma";
import dayjs from "@/lib/dayjs";
import { cn, getTagColor } from "@/lib/utils";
import { Clock, MessageCircle, Trash, User } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function Question(props: {
  question: Prisma.QuestionGetPayload<{
    include: { user: true; _count: { select: { answers: true } } };
  }>;
  detailsView?: boolean;
  creatorView?: boolean;
  isDeleting?: string;
  onDelete?: (questionId: string) => void;
}) {
  const { question, detailsView, creatorView, isDeleting, onDelete } = props;

  if (creatorView) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:border-zinc-700 hover:shadow-xl">
        {/* Header Section */}
        <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
          <Link
            href={`/questions/${question.id}?creatorView=true`}
            className="block"
          >
            <h2 className="line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
              {question.title}
            </h2>
          </Link>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-4">
          <p className="mb-4 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-zinc-300">
            {question.content}
          </p>

          {/* Stats */}
          <div className="mb-4 flex items-center gap-4 border-t border-zinc-800 pt-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <MessageCircle size={14} />
              <span className="font-medium text-zinc-400">
                {question._count.answers}
              </span>
              <span>
                {question._count.answers === 1 ? "answer" : "answers"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock size={14} />
              <span>{dayjs(question.createdAt).fromNow(false)}</span>
            </div>
          </div>

          {/* Tags */}
          {question.tags?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
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
          )}

          {/* Actions - Always at bottom */}
          <div className="mt-auto flex items-center justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  isLoading={isDeleting === question.id}
                  className="min-w-[100px]"
                >
                  <Trash size={14} />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Question?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your question and all its
                    answers. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (onDelete) onDelete(question.id);
                    }}
                  >
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:border-zinc-700 hover:shadow-xl">
      {/* Header Section */}
      <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
        <Link href={`/questions/${question.id}`} className="block">
          <h2 className="line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
            {question.title}
          </h2>
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p
          className={cn(
            "mb-4 whitespace-pre-line text-sm leading-relaxed text-zinc-300",
            {
              "line-clamp-3": !detailsView,
              "line-clamp-none": detailsView
            }
          )}
        >
          {question.content}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 border-t border-zinc-800 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <MessageCircle size={14} />
            <span className="font-medium text-zinc-400">
              {question._count.answers}
            </span>
            <span>{question._count.answers === 1 ? "answer" : "answers"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock size={14} />
            <span>{dayjs(question.createdAt).fromNow(false)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <User size={14} />
            <Link
              href={`/users/${question.userId}`}
              className="transition-colors hover:text-primary"
            >
              <span>{question.user?.fullName}</span>
            </Link>
          </div>
        </div>

        {/* Tags */}
        {question.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
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
        )}
      </div>
    </div>
  );
}

export default Question;
