import { JournalFormState, ValidationResult } from "@/types/citation.types";

export function validateJournal(data: JournalFormState): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.authors[0]?.lastName.trim()) {
    errors.authorLastName = "Nama belakang penulis wajib diisi";
  }
  if (!data.authors[0]?.firstName.trim()) {
    errors.authorFirstName = "Nama depan penulis wajib diisi";
  }
  if (!data.year.trim()) {
    errors.year = "Tahun terbit wajib diisi";
  } else if (!/^\d{4}$/.test(data.year.trim())) {
    errors.year = "Tahun harus 4 digit angka";
  }
  if (!data.title.trim()) {
    errors.title = "Judul artikel wajib diisi";
  }
  if (!data.journalName.trim()) {
    errors.journalName = "Nama jurnal wajib diisi";
  }
  if (!data.volume.trim()) {
    errors.volume = "Volume wajib diisi";
  }
  if (!data.pages.trim()) {
    errors.pages = "Halaman wajib diisi";
  } else if (!/^\d+[-–]\d+$/.test(data.pages.trim())) {
    errors.pages = "Format halaman: contoh 45-67";
  }
  if (data.doi.trim() && !data.doi.trim().startsWith("https://doi.org/")) {
    errors.doi = "DOI harus dimulai dengan https://doi.org/";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
