"use client";

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
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dayjs from "@/lib/dayjs";
import { deleteSnippet } from "@/lib/actions";
import { getTagColor } from "@/lib/utils";
import { SnippetWithUser } from "@/types";
import { ArrowLeft, Check, Clock, Code, Copy, Pencil, Trash, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const LANGUAGE_COLORS: Record<string, string> = {
  typescript: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  javascript: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  python: "bg-green-500/10 text-green-300 border-green-500/20",
  rust: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  go: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  java: "bg-red-500/10 text-red-300 border-red-500/20",
  cpp: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  c: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  css: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  html: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  sql: "bg-teal-500/10 text-teal-300 border-teal-500/20",
  bash: "bg-zinc-500/10 text-zinc-300 border-zinc-500/20",
  shell: "bg-zinc-500/10 text-zinc-300 border-zinc-500/20"
};

const LANGUAGE_MAP: Record<string, string> = {
  shell: "bash",
  html: "markup"
};

function getLanguageColor(language: string) {
  return (
    LANGUAGE_COLORS[language.toLowerCase()] ||
    "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
  );
}

function normalizeLanguage(language: string) {
  const lower = language.toLowerCase();
  return LANGUAGE_MAP[lower] ?? lower;
}

function SnippetDetail(props: {
  snippet: SnippetWithUser;
  isOwner: boolean;
}) {
  const { snippet, isOwner } = props;
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteSnippet(snippet.id);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Snippet deleted");
      router.push("/snippets");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Back link */}
      <div>
        <Link
          href="/snippets"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft size={14} />
          Back to snippets
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        {/* Header */}
        <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <Badge
              variant="secondary"
              className={`border text-xs font-medium ${getLanguageColor(snippet.language)}`}
            >
              <Code size={10} className="mr-1" />
              {snippet.language}
            </Badge>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 gap-1.5"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-green-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy
                  </>
                )}
              </Button>
              {isOwner && (
                <Button size="sm" variant="secondary" className="h-8 gap-1.5" asChild>
                  <Link href={`/snippets/${snippet.id}/edit`}>
                    <Pencil size={13} />
                    Edit
                  </Link>
                </Button>
              )}
              {isOwner && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      isLoading={isDeleting}
                      className="h-8"
                    >
                      <Trash size={13} />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Snippet?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this snippet. This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Yes, Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
          {snippet.description && (
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {snippet.description}
            </p>
          )}

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <User size={12} />
              <Link
                href={`/users/${snippet.user.id}`}
                className="transition-colors hover:text-primary"
              >
                {snippet.user.fullName}
              </Link>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock size={12} />
              <span>{dayjs(snippet.createdAt).fromNow(false)}</span>
            </div>
          </div>

          {/* Tags */}
          {snippet.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {snippet.tags.map((tag, index) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`border text-xs ${getTagColor(index)}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Code block */}
        <div className="p-5">
          <SyntaxHighlighter
            language={normalizeLanguage(snippet.language)}
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              border: "1px solid rgb(39 39 42)",
              fontSize: "0.875rem",
              lineHeight: "1.625"
            }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default SnippetDetail;
