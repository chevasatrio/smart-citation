import { WebsiteFormState, ValidationResult } from "@/types/citation.types";

export function validateWebsite(data: WebsiteFormState): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = "Judul halaman wajib diisi";
  }
  if (!data.siteName.trim()) {
    errors.siteName = "Nama website wajib diisi";
  }
  if (!data.url.trim()) {
    errors.url = "URL wajib diisi";
  } else {
    try {
      new URL(data.url);
    } catch {
      errors.url = "Format URL tidak valid (contoh: https://example.com)";
    }
  }
  if (!data.accessDate.trim()) {
    errors.accessDate = "Tanggal akses wajib diisi";
  }
  if (data.year.trim() && !/^\d{4}$/.test(data.year.trim())) {
    errors.year = "Tahun harus 4 digit angka";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
