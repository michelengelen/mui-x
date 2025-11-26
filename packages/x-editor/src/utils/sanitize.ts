/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (html: string): string => {
  // Basic sanitization - in production, use a library like DOMPurify
  const div = document.createElement('div');
  div.innerHTML = html;
  
  // Remove script tags
  const scripts = div.getElementsByTagName('script');
  for (let i = scripts.length - 1; i >= 0; i--) {
    scripts[i].parentNode?.removeChild(scripts[i]);
  }
  
  // Remove event handlers
  const allElements = div.getElementsByTagName('*');
  for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i];
    const attributes = element.attributes;
    for (let j = attributes.length - 1; j >= 0; j--) {
      const attr = attributes[j];
      if (attr.name.startsWith('on')) {
        element.removeAttribute(attr.name);
      }
    }
  }
  
  return div.innerHTML;
};

/**
 * Strip HTML tags from content
 */
export const stripHtml = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};
