/**
 * Convert plain text to HTML
 */
export const textToHtml = (text: string): string => {
  return text
    .split('\n')
    .map((line) => `<p>${line || '<br>'}</p>`)
    .join('');
};

/**
 * Convert HTML to plain text
 */
export const htmlToText = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.innerText || div.textContent || '';
};

/**
 * Format HTML with proper indentation
 */
export const formatHtml = (html: string): string => {
  let formatted = '';
  let indent = 0;
  
  html.split(/(<[^>]+>)/g).forEach((node) => {
    if (node.match(/^<\/\w/)) {
      indent -= 2;
    }
    
    if (node.trim()) {
      formatted += ' '.repeat(Math.max(0, indent)) + node.trim() + '\n';
    }
    
    if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent += 2;
    }
  });
  
  return formatted.trim();
};

/**
 * Get word count from HTML content
 */
export const getWordCount = (html: string): number => {
  const text = htmlToText(html);
  return text.trim().split(/\s+/).filter(Boolean).length;
};

/**
 * Get character count from HTML content
 */
export const getCharacterCount = (html: string, excludeSpaces = false): number => {
  const text = htmlToText(html);
  return excludeSpaces ? text.replace(/\s/g, '').length : text.length;
};
