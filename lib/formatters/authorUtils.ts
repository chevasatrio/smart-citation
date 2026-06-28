import { Author } from "@/types/citation.types";

/**
 * Format array of authors into APA 7th Edition author string.
 * 
 * Rules:
 * - 1 author: "LastName, F. M."
 * - 2 authors: "LastName, F. M., & LastName, F. M."
 * - 3–20 authors: comma separated, "& " before last
 * - 21+ authors: first 19, "...", last author
 */
export function formatAuthors(authors: Author[]): string {
  if (!authors || authors.length === 0) return "";

  const formatted = authors.map((a) => formatSingleAuthor(a));

  if (formatted.length === 1) {
    return formatted[0];
  }

  if (formatted.length === 2) {
    return `${formatted[0]}, & ${formatted[1]}`;
  }

  if (formatted.length <= 20) {
    const allButLast = formatted.slice(0, -1).join(", ");
    const last = formatted[formatted.length - 1];
    return `${allButLast}, & ${last}`;
  }

  // 21+ authors: first 19, "...", last author
  const first19 = formatted.slice(0, 19).join(", ");
  const last = formatted[formatted.length - 1];
  return `${first19}, . . . ${last}`;
}

/**
 * Format a single author: "LastName, F. M."
 */
function formatSingleAuthor(author: Author): string {
  const { lastName, firstName, middleName } = author;
  
  if (!lastName.trim()) return "";
  
  let result = `${lastName.trim()}, ${getInitial(firstName)}`;
  
  if (middleName && middleName.trim()) {
    result += ` ${getInitial(middleName)}`;
  }
  
  return result;
}

/**
 * Get initial from a name: "John" → "J."
 */
function getInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "";
  return `${trimmed.charAt(0).toUpperCase()}.`;
}

/**
 * Normalize page range: replace regular hyphen with em-dash.
 */
export function normalizePageRange(pages: string): string {
  return pages.replace(/-/g, "–");
}
