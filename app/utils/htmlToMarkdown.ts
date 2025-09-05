export const htmlToMarkdown = (html: string): string => {
  if (!html || html.trim() === '') return '';
  
  let markdown = html;
  
  markdown = markdown.replace(/<([^>]+)(\s+[^>]*)?>/g, (match: string, tag: string) => {
    const cleanTag = tag.split(' ')[0];
    return `<${cleanTag}>`;
  });
  
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');
  
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  markdown = markdown.replace(/<u[^>]*>(.*?)<\/u>/gi, '$1');
  markdown = markdown.replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~');
  markdown = markdown.replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~');
  markdown = markdown.replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~');
  
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n');
  markdown = markdown.replace(/<pre[^>]*>(.*?)<\/pre>/gi, '```\n$1\n```\n\n');
  
  markdown = markdown.replace(/<ul[^>]*>/gi, '');
  markdown = markdown.replace(/<\/ul>/gi, '\n');
  markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  
  let olCounter = 1;
  markdown = markdown.replace(/<ol[^>]*>/gi, () => {
    olCounter = 1;
    return '';
  });
  markdown = markdown.replace(/<\/ol>/gi, '\n');
  markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, (match: string, content: string) => {
    return `${olCounter++}. ${content}\n`;
  });
  
  markdown = markdown.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  markdown = markdown.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '![$2]($1)');
  markdown = markdown.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*>/gi, '![$1]($2)');
  markdown = markdown.replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, '![]($1)');
  
  markdown = markdown.replace(/<hr[^>]*>/gi, '\n---\n\n');
  
  markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, (match: string, content: string) => {
    const lines = content.split('\n').filter((line: string) => line.trim());
    return lines.map((line: string) => `> ${line.trim()}`).join('\n') + '\n\n';
  });
  
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  markdown = markdown.replace(/<div[^>]*>(.*?)<\/div>/gi, '$1\n\n');
  markdown = markdown.replace(/<br[^>]*>/gi, '\n');
  
  markdown = markdown.replace(/<table[^>]*>/gi, '');
  markdown = markdown.replace(/<\/table>/gi, '\n');
  markdown = markdown.replace(/<thead[^>]*>/gi, '');
  markdown = markdown.replace(/<\/thead>/gi, '');
  markdown = markdown.replace(/<tbody[^>]*>/gi, '');
  markdown = markdown.replace(/<\/tbody>/gi, '');
  markdown = markdown.replace(/<tr[^>]*>/gi, '');
  markdown = markdown.replace(/<\/tr>/gi, '\n');
  markdown = markdown.replace(/<th[^>]*>(.*?)<\/th>/gi, '| $1 ');
  markdown = markdown.replace(/<td[^>]*>(.*?)<\/td>/gi, '| $1 ');
  
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  markdown = markdown.replace(/&nbsp;/g, ' ');
  markdown = markdown.replace(/&amp;/g, '&');
  markdown = markdown.replace(/&lt;/g, '<');
  markdown = markdown.replace(/&gt;/g, '>');
  markdown = markdown.replace(/&quot;/g, '"');
  markdown = markdown.replace(/&#39;/g, "'");
  markdown = markdown.replace(/&apos;/g, "'");
  
  markdown = markdown.replace(/[ \t]+/g, ' ');
  markdown = markdown.replace(/\n[ \t]+/g, '\n');
  markdown = markdown.replace(/[ \t]+\n/g, '\n');
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  markdown = markdown.replace(/^\n+/, '');
  markdown = markdown.replace(/\n+$/, '');
  
  return markdown.trim();
};

export const markdownToHtml = (markdown: string): string => {
  if (!markdown || markdown.trim() === '') return '';
  
  let html = markdown;
  
  html = html.replace(/&/g, '&amp;');
  html = html.replace(/</g, '&lt;');
  html = html.replace(/>/g, '&gt;');
  html = html.replace(/&amp;/g, '&');
  
  html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  html = html.replace(/^###### (.*$)/gm, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gm, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
  
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  
  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/^\*\*\*$/gm, '<hr>');
  
  const lines = html.split('\n');
  const result = [];
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('> ')) {
      if (!inBlockquote) {
        if (inUl) { result.push('</ul>'); inUl = false; }
        if (inOl) { result.push('</ol>'); inOl = false; }
        result.push('<blockquote>');
        inBlockquote = true;
      }
      result.push(`<p>${trimmedLine.substring(2)}</p>`);
      continue;
    } else if (inBlockquote) {
      result.push('</blockquote>');
      inBlockquote = false;
    }
    
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (inOl) { result.push('</ol>'); inOl = false; }
      if (!inUl) { result.push('<ul>'); inUl = true; }
      result.push(`<li>${trimmedLine.substring(2)}</li>`);
      continue;
    }
    
    if (trimmedLine.match(/^\d+\. /)) {
      if (inUl) { result.push('</ul>'); inUl = false; }
      if (!inOl) { result.push('<ol>'); inOl = true; }
      result.push(`<li>${trimmedLine.replace(/^\d+\. /, '')}</li>`);
      continue;
    }
    
    if (inUl) { result.push('</ul>'); inUl = false; }
    if (inOl) { result.push('</ol>'); inOl = false; }
    
    if (trimmedLine === '') {
      result.push('');
      continue;
    }
    
    if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
      result.push(line);
      continue;
    }
    
    result.push(`<p>${trimmedLine}</p>`);
  }
  
  if (inUl) result.push('</ul>');
  if (inOl) result.push('</ol>');
  if (inBlockquote) result.push('</blockquote>');
  
  html = result.join('\n');
  html = html.replace(/\n\n+/g, '\n');
  
  return html.trim();
};

export const isMarkdown = (content: string): boolean => {
  if (!content) return false;
  
  const markdownPatterns = [
    /^#{1,6}\s/,
    /^\s*[-*+]\s/,
    /^\s*\d+\.\s/,
    /\*\*.*\*\*/,
    /\*.*\*/,
    /`.*`/,
    /```/,
    /^\s*>/,
    /^---$|^\*\*\*$/m
  ];
  
  const htmlPatterns = [
    /<[^>]+>/
  ];
  
  const hasMarkdownSyntax = markdownPatterns.some(pattern => pattern.test(content));
  const hasHtmlTags = htmlPatterns.some(pattern => pattern.test(content));
  
  if (hasHtmlTags && !hasMarkdownSyntax) return false;
  if (hasMarkdownSyntax) return true;
  
  return true;
};
