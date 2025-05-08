"use client";

import { Content } from "@tiptap/react";
import { useState } from "react";
import { MinimalTiptapEditor } from "../ui/minimal-tiptap";

function TextEditor() {
  const [value, setValue] = useState<Content>("");
  return (
    <MinimalTiptapEditor
      value={value}
      output="html"
      onChange={setValue}
      editorContentClassName="p-4 text-sm text-zinc-400"
      placeholder="Enter your description..."
      editorClassName="focus:outline-hidden"
    />
  );
}

export default TextEditor;
