import { CitationData, FormatterResult } from "@/types/citation.types";
import { formatBookCitation } from "./bookFormatter";
import { formatJournalCitation } from "./journalFormatter";
import { formatWebsiteCitation } from "./websiteFormatter";

/**
 * Main formatter entry point.
 * Delegates to the appropriate formatter based on sourceType.
 */
export function formatCitation(data: CitationData): FormatterResult {
  switch (data.sourceType) {
    case "book":
      return formatBookCitation(data);
    case "journal":
      return formatJournalCitation(data);
    case "website":
      return formatWebsiteCitation(data);
    default:
      return {
        citation: "",
        citationWithMarkup: "",
        isValid: false,
        errors: ["Tipe sumber tidak dikenal"],
      };
  }
}

export { formatBookCitation } from "./bookFormatter";
export { formatJournalCitation } from "./journalFormatter";
export { formatWebsiteCitation } from "./websiteFormatter";
export { formatAuthors, normalizePageRange } from "./authorUtils";
