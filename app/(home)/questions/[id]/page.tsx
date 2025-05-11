import { getQuestion } from "@/app/api";
import { Button } from "@/components/ui/button";
import Empty from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import TextEditor from "@/components/ui/text-editor";
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
        <h2 className="text-2xl font-bold">{question.title}</h2>
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
            <div className="inline-flex items-center gap-2 text-sm text-zinc-500">
              <EyeIcon size={14} />
              <p>{question.views} views</p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-zinc-500">
              <MessageCircle size={14} />
              <p>{question.answers?.length || "0"} answers</p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-zinc-500">
              <User size={14} />
              <Link href={"#"} className="hover:text-black">
                <p>{question.user}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-md bg-zinc-900 p-3">
        <h2 className="text-sm font-semibold">Answers</h2>
        <Separator className="my-3" />
        <div className="my-2">
          {question.answers?.length ? (
            <div className="flex flex-col gap-4">
              {question.answers.map((ans) => (
                <div key={ans.id} className="flex w-full flex-col gap-2">
                  <div className="rounded-md bg-zinc-800 p-2">
                    <p className="text-sm font-semibold">{ans.user}</p>
                    <p className="text-sm text-zinc-400">{ans.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex transform cursor-pointer items-center gap-1 rounded p-1 transition hover:bg-zinc-700 active:scale-95">
                      <ChevronUp size={16} />
                      <span className="text-xs">{ans.upvote || "0"}</span>
                    </button>
                    <button className="flex transform cursor-pointer items-center gap-1 rounded p-1 transition hover:bg-zinc-700 active:scale-95">
                      <ChevronDown size={16} />
                      <span className="text-xs">{ans.downvote || "0"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty
              icon={<MessageCircleOff size={16} />}
              text="No answers yet"
            />
          )}
        </div>
        <Separator className="my-5" />
        <div className="mt-8 flex flex-col gap-3">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="answer">Your Answer</Label>
            <TextEditor />
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
