import { BookFormState, ValidationResult } from "@/types/citation.types";

export function validateBook(data: BookFormState): ValidationResult {
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
    errors.title = "Judul buku wajib diisi";
  }
  if (!data.city.trim()) {
    errors.city = "Kota terbit wajib diisi";
  }
  if (!data.publisher.trim()) {
    errors.publisher = "Penerbit wajib diisi";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
