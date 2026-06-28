// ─── Tipe Sumber ─────────────────────────────────────────────
export type SourceType = "book" | "journal" | "website";

// ─── Data Penulis ────────────────────────────────────────────
export interface Author {
  lastName: string;       // Wajib
  firstName: string;      // Wajib
  middleName?: string;    // Opsional
}

// ─── Data Buku ───────────────────────────────────────────────
export interface BookData {
  sourceType: "book";
  authors: Author[];       // Min. 1 penulis
  year: number;            // Tahun terbit
  title: string;           // Judul buku (akan di-italic)
  edition?: string;        // Edisi (opsional), contoh: "2nd"
  city: string;            // Kota terbit
  publisher: string;       // Nama penerbit
}

// ─── Data Jurnal ─────────────────────────────────────────────
export interface JournalData {
  sourceType: "journal";
  authors: Author[];       // Min. 1 penulis
  year: number;            // Tahun terbit
  title: string;           // Judul artikel
  journalName: string;     // Nama jurnal (akan di-italic)
  volume: string;          // Volume jurnal (wajib)
  issue?: string;          // Nomor terbitan (opsional)
  pages: string;           // Halaman, contoh: "45-67"
  doi?: string;            // DOI (opsional)
}

// ─── Data Website ────────────────────────────────────────────
export interface WebsiteData {
  sourceType: "website";
  authors?: Author[];      // Opsional (bisa tanpa penulis)
  year?: number;           // Tahun publish (opsional)
  title: string;           // Judul halaman/artikel
  siteName: string;        // Nama website
  url: string;             // URL lengkap (wajib)
  accessDate: string;      // Tanggal akses, format: "DD Bulan YYYY"
}

// ─── Union Type ───────────────────────────────────────────────
export type CitationData = BookData | JournalData | WebsiteData;

// ─── Entri Riwayat ───────────────────────────────────────────
export interface CitationHistoryEntry {
  id: string;              // UUID unik
  createdAt: string;       // ISO timestamp
  sourceType: SourceType;
  data: CitationData;
  formattedCitation: string; // Hasil teks sitasi
}

// ─── Hasil Formatter ─────────────────────────────────────────
export interface FormatterResult {
  citation: string;         // Teks sitasi mentah
  citationWithMarkup: string; // Teks sitasi dengan markup italic
  isValid: boolean;
  errors: string[];
}

// ─── Validasi ─────────────────────────────────────────────────
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>; // field name → pesan error
}

// ─── Form State ───────────────────────────────────────────────
export interface BookFormState {
  authors: Author[];
  year: string;
  title: string;
  edition: string;
  city: string;
  publisher: string;
}

export interface JournalFormState {
  authors: Author[];
  year: string;
  title: string;
  journalName: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
}

export interface WebsiteFormState {
  authors: Author[];
  year: string;
  title: string;
  siteName: string;
  url: string;
  accessDate: string;
}

export type FormState = BookFormState | JournalFormState | WebsiteFormState;
