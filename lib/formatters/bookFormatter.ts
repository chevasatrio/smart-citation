import { BookData, FormatterResult } from "@/types/citation.types";
import { formatAuthors } from "./authorUtils";

/**
 * Format book citation according to APA 7th Edition.
 * 
 * Format: Author, I. N. (Year). *Judul buku* (Xth ed.). Penerbit.
 * 
 * Example:
 * Sugiyono, D. (2019). *Metode penelitian kuantitatif, kualitatif, dan R&D* (2nd ed.). Alfabeta.
 */
export function formatBookCitation(data: BookData): FormatterResult {
  const errors: string[] = [];

  // Validate required fields
  if (!data.authors || data.authors.length === 0) {
    errors.push("Minimal satu penulis diperlukan");
  } else if (!data.authors[0].lastName.trim() || !data.authors[0].firstName.trim()) {
    errors.push("Nama penulis tidak boleh kosong");
  }

  if (!data.year) {
    errors.push("Tahun terbit wajib diisi");
  }

  if (!data.title.trim()) {
    errors.push("Judul buku wajib diisi");
  }

  if (!data.city.trim()) {
    errors.push("Kota terbit wajib diisi");
  }

  if (!data.publisher.trim()) {
    errors.push("Penerbit wajib diisi");
  }

  if (errors.length > 0) {
    return {
      citation: "",
      citationWithMarkup: "",
      isValid: false,
      errors,
    };
  }

  const authorStr = formatAuthors(data.authors);
  const yearStr = `(${data.year})`;
  const editionStr = data.edition ? ` (${data.edition} ed.)` : "";

  // Plain text citation
  const citation = `${authorStr} ${yearStr}. ${data.title}${editionStr}. ${data.publisher}.`;

  // Citation with HTML italic markup for preview
  const citationWithMarkup = `${authorStr} ${yearStr}. <em>${data.title}</em>${editionStr}. ${data.publisher}.`;

  return {
    citation,
    citationWithMarkup,
    isValid: true,
    errors: [],
  };
}
