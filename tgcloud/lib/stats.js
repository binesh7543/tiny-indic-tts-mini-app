// lib/stats.js
export function getStats(text) {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  
  return `📊 **Stats:** ${charCount} characters | ${wordCount} words`;
}
