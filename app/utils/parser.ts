import { remark } from "remark";
import remarkHtml from "remark-html";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

export function markdownToHtml(markdownText: string): string {
  if (!markdownText || markdownText.trim() === '') {
    return '';
  }
  
  try {
    const file = remark().use(remarkHtml).processSync(markdownText);
    return String(file);
  } catch (error) {
    console.error('Błąd konwersji Markdown → HTML:', error);
    return markdownText; // Fallback do oryginalnego tekstu
  }
}

export function htmlToMarkdown(htmlText: string): string {
  if (!htmlText || htmlText.trim() === '') {
    return '';
  }
  
  try {
    const file = remark()
      .use(rehypeParse, { 
        emitParseErrors: true, 
        duplicateAttribute: false 
      })
      .use(rehypeRemark)
      .use(remarkStringify, {
        bullet: '-',
        fences: true,
        incrementListMarker: true
      })
      .processSync(htmlText);

    return String(file);
  } catch (error) {
    console.error('Błąd konwersji HTML → Markdown:', error);
    return htmlText; // Fallback do oryginalnego tekstu
  }
}
