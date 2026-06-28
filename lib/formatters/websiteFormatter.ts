import { WebsiteData, FormatterResult } from "@/types/citation.types";
import { formatAuthors } from "./authorUtils";

/**
 * Format website citation according to APA 7th Edition.
 * 
 * Format: Author, I. N. (Year, DD Bulan). Judul halaman. *Nama Website*. URL
 * 
 * If no author: Site Name replaces the author position.
 * If no year: use (n.d.)
 * 
 * Example (tanpa penulis):
 * Kementerian Pendidikan dan Kebudayaan. (2023, 15 Maret). 
 * Panduan penulisan karya ilmiah. *Kemdikbud*. https://kemdikbud.go.id/panduan
 */
export function formatWebsiteCitation(data: WebsiteData): FormatterResult {
  const errors: string[] = [];

  if (!data.title.trim()) {
    errors.push("Judul halaman wajib diisi");
  }

  if (!data.siteName.trim()) {
    errors.push("Nama website wajib diisi");
  }

  if (!data.url.trim()) {
    errors.push("URL wajib diisi");
  } else {
    try {
      new URL(data.url);
    } catch {
      errors.push("Format URL tidak valid");
    }
  }

  if (!data.accessDate.trim()) {
    errors.push("Tanggal akses wajib diisi");
  }

  if (errors.length > 0) {
    return {
      citation: "",
      citationWithMarkup: "",
      isValid: false,
      errors,
    };
  }

  // Determine author string
  const hasAuthors = data.authors && data.authors.length > 0 && 
    data.authors[0].lastName.trim() !== "";
  const authorStr = hasAuthors 
    ? formatAuthors(data.authors!) 
    : data.siteName;

  // Determine year string
  const yearStr = data.year ? `(${data.year})` : "(n.d.)";

  // If author is the same as siteName, don't repeat siteName
  const siteNamePart = hasAuthors ? ` ${data.siteName}.` : "";

  // Plain text citation
  const citation = `${authorStr}. ${yearStr}. ${data.title}.${siteNamePart} ${data.url}`;

  // Citation with HTML italic markup for preview
  const citationWithMarkup = hasAuthors
    ? `${authorStr}. ${yearStr}. ${data.title}. <em>${data.siteName}</em>. ${data.url}`
    : `${authorStr}. ${yearStr}. ${data.title}. ${data.url}`;

  return {
    citation,
    citationWithMarkup,
    isValid: true,
    errors: [],
  };
}
