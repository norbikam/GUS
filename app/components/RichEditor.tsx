"use client";
import React, { useRef, useState, useEffect } from 'react';
import { htmlToMarkdown, markdownToHtml } from '@/app/utils/htmlToMarkdown';

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichEditor: React.FC<RichEditorProps> = ({
  value,
  onChange,
  placeholder = "Wprowadź opis produktu..."
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Konwertuj Markdown na HTML dla edytora
  useEffect(() => {
    const html = markdownToHtml(value);
    setHtmlContent(html);
  }, [value]);

  // Sync HTML do edytora gdy się zmienia
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== htmlContent) {
      const selection = window.getSelection();
      const isEditorFocused = document.activeElement === editorRef.current;
      let savedSelection: { node: Node; offset: number } | null = null;
      
      if (isEditorFocused && selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        savedSelection = {
          node: range.startContainer,
          offset: range.startOffset
        };
      }
      
      editorRef.current.innerHTML = htmlContent;
      
      if (savedSelection && isEditorFocused) {
        setTimeout(() => {
          try {
            if (editorRef.current && savedSelection) {
              const range = document.createRange();
              range.setStart(savedSelection.node, savedSelection.offset);
              range.collapse(true);
              
              const newSelection = window.getSelection();
              if (newSelection) {
                newSelection.removeAllRanges();
                newSelection.addRange(range);
              }
            }
          } catch (error) {
            console.log(error);
            if (editorRef.current) {
              const range = document.createRange();
              range.selectNodeContents(editorRef.current);
              range.collapse(false);
              
              const selection = window.getSelection();
              if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
              }
            }
          }
        }, 0);
      }
    }
  }, [htmlContent]);

  const handleUpdate = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      let range: Range | null = null;
      let cursorOffset = 0;
      
      if (selection && selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
        cursorOffset = range.startOffset;
      }
      
      const html = editorRef.current.innerHTML;
      const markdown = htmlToMarkdown(html);
      setHtmlContent(html);
      onChange(markdown);
      
      setTimeout(() => {
        if (editorRef.current && range && selection) {
          try {
            const walker = document.createTreeWalker(
              editorRef.current,
              NodeFilter.SHOW_TEXT
            );
            
            let currentOffset = 0;
            let targetNode = null;
            let targetOffset = 0;
            
            while (walker.nextNode()) {
              const node = walker.currentNode;
              const nodeLength = node.textContent?.length || 0;
              
              if (currentOffset + nodeLength >= cursorOffset) {
                targetNode = node;
                targetOffset = cursorOffset - currentOffset;
                break;
              }
              currentOffset += nodeLength;
            }
            
            if (targetNode) {
              const newRange = document.createRange();
              newRange.setStart(targetNode, Math.min(targetOffset, targetNode.textContent?.length || 0));
              newRange.collapse(true);
              
              selection.removeAllRanges();
              selection.addRange(newRange);
            }
          } catch (error) {
            console.warn('Nie udało się przywrócić pozycji kursora:', error);
          }
        }
      }, 0);
    }
  };

  const execCommand = (command: string, commandValue: string = '') => {
    document.execCommand(command, false, commandValue);
    handleUpdate();
  };

  const handleInput = () => {
    handleUpdate();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        case 'z':
          if (e.shiftKey) {
            e.preventDefault();
            execCommand('redo');
          } else {
            e.preventDefault();
            execCommand('undo');
          }
          break;
      }
    }
    
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const listItem = range.startContainer.parentElement?.closest('li');
        if (listItem && !listItem.textContent?.trim()) {
          e.preventDefault();
          execCommand('outdent');
        }
      }
    }
  };

  const handleHtmlPaste = (html: string) => {
    let cleanHtml = html;
    
    cleanHtml = cleanHtml.replace(/<([^>]+)(\s+[^>]*)?>/g, (match, tag) => {
      const cleanTag = tag.toLowerCase().split(' ')[0];
      
      const allowedTags = [
        'p', 'br', 'div', 'span',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'strong', 'b', 'em', 'i', 'u', 's', 'del',
        'ul', 'ol', 'li',
        'blockquote',
        'hr',
        'a', 'img',
        'code', 'pre'
      ];
      
      if (allowedTags.includes(cleanTag)) {
        if (cleanTag === 'a') {
          const hrefMatch = match.match(/href=["']([^"']*)["']/i);
          return hrefMatch ? `<a href="${hrefMatch[1]}">` : `<${cleanTag}>`;
        }
        if (cleanTag === 'img') {
          const srcMatch = match.match(/src=["']([^"']*)["']/i);
          const altMatch = match.match(/alt=["']([^"']*)["']/i);
          let imgTag = '<img';
          if (srcMatch) imgTag += ` src="${srcMatch[1]}"`;
          if (altMatch) imgTag += ` alt="${altMatch[1]}"`;
          imgTag += '>';
          return imgTag;
        }
        return `<${cleanTag}>`;
      }
      
      return '';
    });
    
    cleanHtml = cleanHtml.replace(/<([^/>]+)><\/\1>/g, '');
    cleanHtml = cleanHtml.replace(/<div[^>]*>/gi, '<p>');
    cleanHtml = cleanHtml.replace(/<\/div>/gi, '</p>');
    cleanHtml = cleanHtml.replace(/<p>\s*<\/p>/g, '');
    cleanHtml = cleanHtml.replace(/<p>(\s*<br[^>]*>\s*)+<\/p>/g, '<p></p>');
    cleanHtml = cleanHtml.replace(/(<br[^>]*>\s*){2,}/g, '</p><p>');
    
    cleanHtml = cleanHtml
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    
    document.execCommand('insertHTML', false, cleanHtml);
    handleUpdate();
  };

  const handlePlainTextPaste = (text: string) => {
    const lines = text.split('\n');
    let formattedHtml = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line === '') {
        if (i < lines.length - 1 && lines[i + 1].trim() !== '') {
          formattedHtml += '<br>';
        }
      } else if (line.startsWith('# ')) {
        formattedHtml += `<h1>${line.substring(2)}</h1>`;
      } else if (line.startsWith('## ')) {
        formattedHtml += `<h2>${line.substring(3)}</h2>`;
      } else if (line.startsWith('### ')) {
        formattedHtml += `<h3>${line.substring(4)}</h3>`;
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        formattedHtml += `<ul><li>${line.substring(2)}</li></ul>`;
      } else if (line === '---') {
        formattedHtml += '<hr>';
      } else {
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        formattedHtml += `<p>${formatted}</p>`;
      }
    }
    
    document.execCommand('insertHTML', false, formattedHtml);
    handleUpdate();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const htmlData = e.clipboardData.getData('text/html');
    const plainText = e.clipboardData.getData('text/plain');
    
    if (htmlData && htmlData.trim()) {
      handleHtmlPaste(htmlData);
    } else if (plainText && plainText.trim()) {
      handlePlainTextPaste(plainText);
    }
  };

  const insertTemplate = () => {
    const template = `<h1>LUMIGLAM PRO – Podwójna długość fali</h1>
<p><strong>Innowacyjny system laserowy</strong> z unikalną technologią podwójnej długości fali, zaprojektowany dla profesjonalnych gabinetów medycyny estetycznej.</p>

<hr>

<h2>Rewolucyjna technologia podwójnej długości fali</h2>
<ul>
<li><strong>Laser Er:Glass 1550 nm</strong> – nieablacyjna wiązka o głębokiej penetracji</li>
<li><strong>Laser Thulium 1927 nm</strong> – nieablacyjna i sub‑ablacyjna technologia</li>
</ul>

<h2>Zastosowania kliniczne</h2>

<h3>Dermatologia</h3>
<ul>
<li>Usuwanie przebarwień naskórkowych</li>
<li>Redukcja rozszerzonych porów</li>
<li>Wygładzanie drobnych zmarszczek</li>
</ul>

<h3>Trychologia</h3>
<ul>
<li>Stymulacja odrostu włosów</li>
<li>Leczenie łysienia</li>
<li>Poprawa kondycji skóry głowy</li>
</ul>

<hr>

<h2>Specyfikacja techniczna</h2>
<p><strong>Typ lasera:</strong> Podwójny laser frakcyjny</p>
<p><strong>Moc wyjściowa:</strong> 15 W / 30 W</p>
<p><strong>Energia punktowa:</strong> 0,2–150 mJ</p>

<h2>Przewagi konkurencyjne</h2>
<ul>
<li>Wszechstronność – jedno urządzenie do wielu zabiegów</li>
<li>Skuteczność – połączenie dwóch długości fali</li>
<li>Bezpieczeństwo – nieablacyjny charakter zabiegów</li>
<li>Krótki czas rekonwalescencji</li>
</ul>`;
    
    if (editorRef.current) {
      editorRef.current.innerHTML = template;
      handleUpdate();
    }
  };

  const clearContent = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      handleUpdate();
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
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white text-black">
      <div className="border-b border-gray-300 p-2 bg-gray-50 flex flex-wrap gap-1 text-sm">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 font-bold transition-colors"
            title="Pogrubienie (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 italic transition-colors"
            title="Kursywa (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => execCommand('underline')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 underline transition-colors"
            title="Podkreślenie (Ctrl+U)"
          >
            U
          </button>
          <button
            type="button"
            onClick={() => execCommand('strikeThrough')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 line-through transition-colors"
            title="Przekreślenie"
          >
            S
          </button>
        </div>

        <div className="w-px bg-gray-300 mx-1"></div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h1')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 font-bold text-xs transition-colors"
            title="Nagłówek 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h2')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 font-semibold text-xs transition-colors"
            title="Nagłówek 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h3')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 font-medium text-xs transition-colors"
            title="Nagłówek 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'p')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Paragraf"
          >
            P
          </button>
        </div>

        <div className="w-px bg-gray-300 mx-1"></div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Lista punktowana"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Lista numerowana"
          >
            1.
          </button>
        </div>

        <div className="w-px bg-gray-300 mx-1"></div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => execCommand('justifyLeft')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Wyrównaj do lewej"
          >
            ⬅
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyCenter')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Wyśrodkuj"
          >
            ↔
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyRight')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Wyrównaj do prawej"
          >
            ➡
          </button>
        </div>

        <div className="w-px bg-gray-300 mx-1"></div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => execCommand('insertHorizontalRule')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Linia pozioma"
          >
            ―
          </button>
          <button
            type="button"
            onClick={() => execCommand('removeFormat')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Usuń formatowanie"
          >
            🧹
          </button>
          <button
            type="button"
            onClick={() => execCommand('undo')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Cofnij (Ctrl+Z)"
          >
            ↶
          </button>
          <button
            type="button"
            onClick={() => execCommand('redo')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-xs transition-colors"
            title="Powtórz (Ctrl+Shift+Z)"
          >
            ↷
          </button>
        </div>

        <div className="flex-1"></div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={insertTemplate}
            className="px-3 h-8 flex items-center justify-center rounded hover:bg-green-200 bg-green-100 text-xs transition-colors"
            title="Wstaw przykładowy szablon"
          >
            📝 Szablon
          </button>
          <button
            type="button"
            onClick={clearContent}
            className="px-3 h-8 flex items-center justify-center rounded hover:bg-red-200 bg-red-100 text-xs transition-colors"
            title="Wyczyść zawartość"
          >
            🗑️ Wyczyść
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="p-4 min-h-[300px] max-h-[400px] overflow-y-auto focus:outline-none bg-white text-gray-900 rich-editor-live"
        style={{ 
          minHeight: '300px',
          maxHeight: '400px'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      
      <div className="border-t border-gray-300 bg-gray-50 px-4 py-2 text-xs text-gray-600">
        <div className="flex justify-between items-center">
          <span>
            Zapisuje jako Markdown, wyświetla jako HTML. Wklej tekst lub użyj przycisków. 
            Skróty: Ctrl+B/I/U, Ctrl+Z/Shift+Z
          </span>
          <span className="text-green-600">● Markdown Compatible</span>
        </div>
      </div>
    </div>
  );
};

export default RichEditor;
