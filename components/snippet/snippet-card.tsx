"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dayjs from "@/lib/dayjs";
import { getTagColor } from "@/lib/utils";
import { SnippetWithUser } from "@/types";
import { Check, Clock, Code, Copy, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

function SnippetCard(props: { snippet: SnippetWithUser }) {
  const { snippet } = props;
  const [copied, setCopied] = useState(false);

  const codePreview = snippet.code.split("\n").slice(0, 4).join("\n");

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:border-zinc-700 hover:shadow-xl">
      {/* Header */}
      <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className={`border text-xs font-medium ${getLanguageColor(snippet.language)}`}
          >
            <Code size={10} className="mr-1" />
            {snippet.language}
          </Badge>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleCopy}
            title="Copy code"
          >
            {copied ? (
              <Check size={13} className="text-green-400" />
            ) : (
              <Copy size={13} />
            )}
          </Button>
        </div>
        <Link href={`/snippets/${snippet.id}`} className="block">
          <h2 className="line-clamp-2 font-bold text-white transition-colors group-hover:text-primary">
            {snippet.title}
          </h2>
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {snippet.description && (
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {snippet.description}
          </p>
        )}

        {/* Code preview */}
        <div className="mb-4 overflow-hidden rounded-md border border-zinc-800 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
          <SyntaxHighlighter
            language={normalizeLanguage(snippet.language)}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "0.75rem",
              fontSize: "0.75rem",
              lineHeight: "1.625",
              background: "rgb(9 9 11)"
            }}
            PreTag="div"
          >
            {codePreview}
          </SyntaxHighlighter>
        </div>

        {/* Tags */}
        {snippet.tags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {snippet.tags.slice(0, 4).map((tag, index) => (
              <Badge
                key={tag}
                variant="secondary"
                className={`border text-xs ${getTagColor(index)}`}
              >
                {tag}
              </Badge>
            ))}
            {snippet.tags.length > 4 && (
              <Badge variant="secondary" className="border text-xs">
                +{snippet.tags.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center gap-4 border-t border-zinc-800 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <User size={12} />
            <Link
              href={`/users/${snippet.user.id}`}
              className="transition-colors hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              {snippet.user.fullName}
            </Link>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock size={12} />
            <span>{dayjs(snippet.createdAt).fromNow(false)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnippetCard;
