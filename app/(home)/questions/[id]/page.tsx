import { getQuestion } from "@/app/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  EyeIcon,
  MessageCircle,
  MessageCircleOff,
  User
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function Page(props: { params: Promise<{ id: string }> }) {
  const id = (await props.params).id;
  const question = await getQuestion(id);

  if (!question) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-col gap-2 rounded-md bg-zinc-900 p-3">
        <h2 className="text-sm font-semibold">{question.title}</h2>
        <p className="text-sm text-zinc-400">{question.description}</p>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            {question.tags?.length
              ? question.tags.map((tag, idx) => (
                  <p
                    key={idx}
                    className="rounded bg-zinc-800 px-1 py-[1px] text-xs font-semibold"
                  >
                    {tag}
                  </p>
                ))
              : null}
          </div>
          <div className="inline-flex items-center gap-4">
            <div className="inline-flex items-center gap-1 text-xs text-zinc-500">
              <EyeIcon size={12} />
              <p>{question.views} views</p>
            </div>
            <div className="inline-flex items-center gap-1 text-xs text-zinc-500">
              <MessageCircle size={12} />
              <p>{question.answers?.length || "0"} answers</p>
            </div>
            <div className="inline-flex items-center gap-1 text-xs text-zinc-500">
              <User size={12} />
              <Link href={"#"} className="hover:text-black">
                <p>{question.user}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-md bg-zinc-900 p-3">
        <h2 className="text-sm font-semibold">Answers</h2>
        <div className="my-3 h-[1px] bg-zinc-800" />
        <div className="my-2">
          {question.answers?.length ? (
            <div className="flex flex-col gap-5">
              {question.answers.map((ans) => (
                <div key={ans.id} className="flex w-full flex-col gap-2">
                  <div className="rounded-md bg-zinc-800 p-2">
                    <p className="text-sm font-semibold">{ans.user}</p>
                    <p className="text-sm text-zinc-400">{ans.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex cursor-pointer items-center gap-1">
                      <ChevronUp size={16} />
                      <span className="text-xs">{ans.upvote || "0"}</span>
                    </button>
                    <button className="flex cursor-pointer items-center gap-1">
                      <ChevronDown size={16} />
                      <span className="text-xs">{ans.downvote || "0"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 flex flex-col items-center justify-center gap-1">
              <MessageCircleOff size={16} />
              <p className="text-xs text-zinc-600">No answers yet</p>
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t pt-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="answer">Your Answer</Label>
            <Textarea
              id="answer"
              rows={1}
              placeholder="Type your answer here"
            />
          </div>
          <div className="flex justify-end">
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
