"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { createQuestion } from "@/lib/actions";
import { QuestionValidator } from "@/lib/validators/question-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, X } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { Suspense, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof QuestionValidator>>({
    resolver: zodResolver(QuestionValidator)
  });
  const [tags, setTags] = useState<string[]>([]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      setIsLoading(true);
      const res = await createQuestion({
        ...data,
        tags: tags.filter((tag) => tag.trim() !== "")
      });
      if (res) {
        const { question, error } = res;
        if (error) {
          toast.error(error);
          return;
        }
        if (question) {
          router.push(`/questions/${question.id}`);
          form.reset();
        }
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Suspense fallback={<Spinner />}>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="mb-6 rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4 text-center">
          <h2 className="text-2xl font-bold">Ask a Question</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Get help from the community by sharing your question below.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-4"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={2}
                      {...field}
                      placeholder="Summarize your question in one sentence"
                    />
                  </FormControl>
                  <p className="mt-1 text-xs text-zinc-500">
                    Be specific and concise.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      {...field}
                      placeholder="Describe your question in detail, including any relevant context or code."
                    />
                  </FormControl>
                  <p className="mt-1 text-xs text-zinc-500">
                    Include details to help others understand and answer your
                    question.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormLabel>Tags</FormLabel>
              <div className="grid grid-cols-4 items-center gap-3">
                {tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="group col-span-1 flex">
                    <Input
                      value={tag}
                      placeholder="Tag"
                      onChange={(e) => {
                        const newTags = [...tags];
                        newTags[tagIndex] = e.target.value;
                        setTags(newTags);
                      }}
                    />
                    <Button
                      onClick={() => {
                        setTags(tags.filter((_, i) => i !== tagIndex));
                      }}
                      variant="ghost"
                      className="-translate-x-1 transform opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 hover:bg-transparent active:scale-95"
                      size="icon"
                    >
                      <X />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="secondary"
                  className="w-[8.9375rem] border-dashed"
                  onClick={() => setTags([...tags, ""])}
                >
                  <PlusIcon />
                  Add Tag
                </Button>
              </div>
            </div>
            <Separator />
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-2 font-semibold"
            >
              Submit Question
            </Button>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}

export default Page;
