import dayjs from "@/lib/dayjs";
import { cn, getTagColor } from "@/lib/utils";
import { FullQuestion } from "@/types";
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
  question: FullQuestion;
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
        <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
          <Link
            href={`/questions/${question.id}?creatorView=true`}
            className="block"
          >
            <h2 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
              {question.title}
            </h2>
          </Link>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-4">
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-zinc-300">
            {question.content}
          </p>

          {/* Stats */}
          <div className="mb-4 flex items-center gap-4 border-t border-zinc-800 pt-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <MessageCircle size={14} />
              <span className="font-medium text-zinc-400">
                {question.answers?.length || 0}
              </span>
              <span>
                {(question.answers?.length || 0) === 1 ? "answer" : "answers"}
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
    <div className="space-y-2 rounded-md bg-zinc-900 p-4 px-5">
      <Link href={`/questions/${question.id}`}>
        <h2 className={cn("text-xl font-semibold", { "text-lg": creatorView })}>
          {question.title}
        </h2>
      </Link>
      <p
        className={cn("line-clamp-2 text-sm text-muted-foreground", {
          "line-clamp-none": detailsView
        })}
      >
        {question.content}
      </p>
      {!detailsView && (
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
          <div className="inline-flex max-w-[40%] flex-wrap items-center gap-4 text-xs text-zinc-500">
            <div className="inline-flex items-center gap-2">
              <Clock size={14} />
              <p>{dayjs(question.createdAt).fromNow()}</p>
            </div>
            <div className="inline-flex items-center gap-2">
              <MessageCircle size={14} />
              <p>{question.answers?.length || 0} answers</p>
            </div>
            <div className="inline-flex items-center gap-2">
              <User size={14} />
              <Link
                href={`/users/${question.userId}`}
                className="hover:text-primary"
              >
                <p>{question.user?.fullName}</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
