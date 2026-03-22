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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { updateSnippet } from "@/lib/actions";
import { SNIPPET_LANGUAGES } from "@/lib/data";
import { SnippetValidator } from "@/lib/validators/snippet-validator";
import { SnippetWithUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, X } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { Suspense, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

function SnippetEditForm({ snippet }: { snippet: SnippetWithUser }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(snippet.tags);

  const form = useForm<z.infer<typeof SnippetValidator>>({
    resolver: zodResolver(SnippetValidator),
    defaultValues: {
      title: snippet.title,
      description: snippet.description ?? "",
      code: snippet.code,
      language: snippet.language
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof SnippetValidator>> = async (
    data
  ) => {
    try {
      setIsLoading(true);
      const res = await updateSnippet(snippet.id, data, tags);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      if (res?.snippet) {
        toast.success("Snippet updated");
        router.push(`/snippets/${res.snippet.id}`);
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
          <h2 className="text-2xl font-bold">Edit Snippet</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Update your code snippet.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-4"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Debounce hook in React"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="language"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SNIPPET_LANGUAGES.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description{" "}
                    <span className="text-xs text-zinc-500">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={2}
                      {...field}
                      placeholder="Briefly describe what this snippet does"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={14}
                      {...field}
                      placeholder="Paste your code here..."
                      className="font-mono text-sm"
                    />
                  </FormControl>
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
                      type="button"
                      onClick={() =>
                        setTags(tags.filter((_, i) => i !== tagIndex))
                      }
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
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}

export default SnippetEditForm;
