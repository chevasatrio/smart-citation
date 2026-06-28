import { JournalData, FormatterResult } from "@/types/citation.types";
import { formatAuthors, normalizePageRange } from "./authorUtils";

/**
 * Format journal citation according to APA 7th Edition.
 * 
 * Format: Author, I. N. (Year). Judul artikel. *Nama Jurnal*, Volume(Issue), Halaman. DOI
 * 
 * Example:
 * Rahmat, A., & Sari, B. P. (2022). Implementasi machine learning pada sistem informasi akademik. 
 * *Jurnal Teknologi Informasi*, 18(2), 45–67. https://doi.org/10.1234/jti.2022.001
 */
export function formatJournalCitation(data: JournalData): FormatterResult {
  const errors: string[] = [];

  if (!data.authors || data.authors.length === 0) {
    errors.push("Minimal satu penulis diperlukan");
  } else if (!data.authors[0].lastName.trim() || !data.authors[0].firstName.trim()) {
    errors.push("Nama penulis tidak boleh kosong");
  }

  if (!data.year) {
    errors.push("Tahun terbit wajib diisi");
  }

  if (!data.title.trim()) {
    errors.push("Judul artikel wajib diisi");
  }

  if (!data.journalName.trim()) {
    errors.push("Nama jurnal wajib diisi");
  }

  if (!data.volume.trim()) {
    errors.push("Volume wajib diisi");
  }

  if (!data.pages.trim()) {
    errors.push("Halaman wajib diisi");
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
  const issueStr = data.issue ? `(${data.issue})` : "";
  const pagesStr = normalizePageRange(data.pages);
  const doiStr = data.doi ? ` ${data.doi}` : "";

  // Plain text citation
  const citation = `${authorStr} ${yearStr}. ${data.title}. ${data.journalName}, ${data.volume}${issueStr}, ${pagesStr}.${doiStr}`;

  // Citation with HTML italic markup for preview
  const citationWithMarkup = `${authorStr} ${yearStr}. ${data.title}. <em>${data.journalName}</em>, <em>${data.volume}</em>${issueStr}, ${pagesStr}.${doiStr}`;

  return {
    citation,
    citationWithMarkup,
    isValid: true,
    errors: [],
  };
}
