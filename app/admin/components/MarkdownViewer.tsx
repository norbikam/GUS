"use client";
import ReactMarkdown from "react-markdown";

export interface ViewerProps {
  value: string;
  className?: string;
}

export default function MarkdownViewer(props: ViewerProps) {
  return (
    <div className={`prose prose-sm max-w-none ${props.className || ''}`}>
      <ReactMarkdown>{props.value}</ReactMarkdown>
    </div>
  );
}
