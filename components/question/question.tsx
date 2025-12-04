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
  return (
    <div className="space-y-2 rounded-md bg-zinc-900 p-4 px-5">
      <Link
        href={`/questions/${question.id}${creatorView ? "?creatorView=true" : ""}`}
      >
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
      {!detailsView ? (
        creatorView ? null : (
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
        )
      ) : null}
      {creatorView ? (
        <div className="mt-2 flex items-center justify-end gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                isLoading={isDeleting === question.id}
              >
                <Trash />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your question.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    if (onDelete) onDelete(question.id);
                  }}
                >
                  Yes, Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : null}
    </div>
  );
}

export default Question;
