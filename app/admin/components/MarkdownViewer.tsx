"use client";
import { useState, useEffect } from 'react';

interface MarkdownViewerProps {
  value: string;
  className?: string;
}

export default function MarkdownViewer({ value, className = "" }: MarkdownViewerProps) {
  const [ReactMarkdown, setReactMarkdown] = useState<any>(null);

  useEffect(() => {
    import('react-markdown').then((module) => {
      setReactMarkdown(() => module.default);
    });
  }, []);

  if (!ReactMarkdown) {
    return (
      <div className="animate-pulse bg-gray-100 rounded p-4">
        <span className="text-gray-500">Ładowanie podglądu...</span>
      </div>
    );
  }

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({children}: {children: React.ReactNode}) => (
            <h1 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">{children}</h1>
          ),
          h2: ({children}: {children: React.ReactNode}) => (
            <h2 className="text-xl font-semibold mb-3 text-gray-800 mt-6">{children}</h2>
          ),
          h3: ({children}: {children: React.ReactNode}) => (
            <h3 className="text-lg font-medium mb-2 text-gray-800 mt-4">{children}</h3>
          ),
          p: ({children}: {children: React.ReactNode}) => (
            <p className="mb-3 leading-relaxed text-gray-700">{children}</p>
          ),
          ul: ({children}: {children: React.ReactNode}) => (
            <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-1">{children}</ul>
          ),
          ol: ({children}: {children: React.ReactNode}) => (
            <ol className="list-decimal pl-6 mb-3 text-gray-700 space-y-1">{children}</ol>
          ),
          li: ({children}: {children: React.ReactNode}) => (
            <li className="mb-1">{children}</li>
          ),
          blockquote: ({children}: {children: React.ReactNode}) => (
            <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 mb-3 bg-blue-50 py-3 rounded-r">
              {children}
            </blockquote>
          ),
          code: ({children}: {children: React.ReactNode}) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600 border">
              {children}
            </code>
          ),
          pre: ({children}: {children: React.ReactNode}) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-3 border">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-6 border-gray-300" />,
          strong: ({children}: {children: React.ReactNode}) => (
            <strong className="font-bold text-gray-900">{children}</strong>
          ),
          em: ({children}: {children: React.ReactNode}) => (
            <em className="italic text-gray-800">{children}</em>
          ),
          a: ({children, href}: {children: React.ReactNode, href?: string}) => (
            <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          img: ({src, alt}: {src?: string, alt?: string}) => (
            <img src={src} alt={alt} className="max-w-full h-auto rounded-lg border border-gray-200 my-4" />
          )
        }}
      >
        {value || ""}
      </ReactMarkdown>
    </div>
  );
}
