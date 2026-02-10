// Utility function to sanitize HTML and prevent XSS attacks
export const sanitizeHTML = (html) => {
  if (!html) return '';
  
  // Create a temporary div element
  const tempDiv = document.createElement('div');
  tempDiv.textContent = html;
  
  // Return the sanitized text
  return tempDiv.innerHTML;
};

// Function to strip HTML tags and return plain text
export const stripHTMLTags = (html) => {
  if (!html) return '';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

// Function to create safe HTML with allowed tags only
export const createSafeHTML = (html) => {
  if (!html) return '';
  
  // List of allowed tags
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre'];
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Remove script tags and event handlers
  const scripts = tempDiv.querySelectorAll('script');
  scripts.forEach(script => script.remove());
  
  // Remove all event attributes
  const allElements = tempDiv.getElementsByTagName('*');
  for (let i = 0; i < allElements.length; i++) {
    const attributes = allElements[i].attributes;
    for (let j = attributes.length - 1; j >= 0; j--) {
      const attrName = attributes[j].name;
      if (attrName.startsWith('on')) {
        allElements[i].removeAttribute(attrName);
      }
    }
    
    // Remove elements not in allowed list
    if (!allowedTags.includes(allElements[i].tagName.toLowerCase())) {
      const textNode = document.createTextNode(allElements[i].textContent);
      allElements[i].parentNode.replaceChild(textNode, allElements[i]);
    }
  }
  
  return tempDiv.innerHTML;
};
