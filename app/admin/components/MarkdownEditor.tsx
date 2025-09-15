"use client";
import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import { markdownToHtml, htmlToMarkdown } from "@/app/utils/parser";

import "react-quill-new/dist/quill.snow.css";

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
  placeholder?: string;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["clean"]
];

export default function MarkdownEditor(props: EditorProps) {
  const [value, setValue] = useState<string>(markdownToHtml(props.value || ""));
  const reactQuillRef = useRef<ReactQuill>(null);

  const onChange = (content: string) => {
    setValue(content);

    if (props.onChange) {
      props.onChange({
        html: content,
        markdown: htmlToMarkdown(content)
      });
    }
  };

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      placeholder={props.placeholder || "Start writing..."}
      modules={{
        toolbar: {
          container: TOOLBAR_OPTIONS
        }
      }}
      value={value}
      onChange={onChange}
    />
  );
}
