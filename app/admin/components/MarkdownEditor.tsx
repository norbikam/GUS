"use client";
import { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import { markdownToHtml, htmlToMarkdown } from "@/app/utils/parser";

import "react-quill-new/dist/quill.snow.css";

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface MarkdownEditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
  placeholder?: string;
  height?: string;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  ["link", "image"],
  ["clean"]
];

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const [value, setValue] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const reactQuillRef = useRef<ReactQuill>(null);

  // Montowanie komponentu
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Inicjalizacja wartości z Markdown
  useEffect(() => {
    if (props.value !== undefined) {
      const htmlContent = markdownToHtml(props.value);
      setValue(htmlContent);
    }
  }, [props.value]);

  const onChange = (content: string) => {
    setValue(content);

    if (props.onChange) {
      props.onChange({
        html: content,
        markdown: htmlToMarkdown(content)
      });
    }
  };


  const clearContent = () => {
    setValue('');
    if (props.onChange) {
      props.onChange({
        html: '',
        markdown: ''
      });
    }
  };

  // Insert quick formatting
  const insertQuickFormat = (type: string) => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    if (!range) return;

    switch (type) {
      case 'specs':
        quill.insertText(range.index, '**Specyfikacja:**\n• Parametr 1: Wartość\n• Parametr 2: Wartość\n\n');
        break;
      case 'features':
        quill.insertText(range.index, '## Główne cechy\n\n- ✅ Cecha 1\n- ✅ Cecha 2\n- ✅ Cecha 3\n\n');
        break;
      case 'benefits':
        quill.insertText(range.index, '### Korzyści dla pacjenta\n\n1. Pierwsza korzyść\n2. Druga korzyść\n3. Trzecia korzyść\n\n');
        break;
    }
  };

  if (!isMounted) {
    return (
      <div className="h-[350px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Ładowanie edytora...</span>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar z akcjami */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <span className="text-sm text-gray-600 font-medium">Rich Text Editor</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Markdown Compatible
            </span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              React 19 Ready
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={clearContent}
              className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
              title="Wyczyść zawartość"
            >
              🗑️ Wyczyść
            </button>
          </div>
        </div>
        
        {/* Quick formatting buttons */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs text-gray-500 mr-2">Szybkie wstawki:</span>
          <button
            type="button"
            onClick={() => insertQuickFormat('specs')}
            className="px-2 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded transition-colors"
          >
            📋 Specyfikacja
          </button>
          <button
            type="button"
            onClick={() => insertQuickFormat('features')}
            className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors"
          >
            ⭐ Cechy
          </button>
          <button
            type="button"
            onClick={() => insertQuickFormat('benefits')}
            className="px-2 py-1 text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 rounded transition-colors"
          >
            💫 Korzyści
          </button>
        </div>
      </div>

      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        placeholder={props.placeholder || "Wprowadź opis produktu..."}
        modules={{
          toolbar: {
            container: TOOLBAR_OPTIONS
          }
        }}
        formats={[
          'header', 'bold', 'italic', 'underline', 'strike',
          'color', 'background',
          'list', 'bullet', 'indent', 'align',
          'blockquote', 'code-block',
          'link', 'image'
        ]}
        value={value}
        onChange={onChange}
        style={{
          height: props.height || '300px'
        }}
      />

      {/* Informacja o funkcjonalnościach */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-600">
        <div className="flex justify-between items-center">
          <span>
            💡 Obsługuje Markdown, formatowanie tekstu, wklejanie sformatowanego contentu
          </span>
          <div className="flex gap-4">
            <span className="text-green-600">● Live Markdown</span>
            <span className="text-blue-600">● WYSIWYG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
