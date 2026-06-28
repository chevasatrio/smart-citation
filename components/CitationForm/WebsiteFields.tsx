"use client";

import React from "react";
import { WebsiteFormState, ValidationResult } from "@/types/citation.types";
import InputField from "@/components/ui/InputField";

interface WebsiteFieldsProps {
  form: WebsiteFormState;
  onUpdate: (field: keyof WebsiteFormState, value: string) => void;
  validation: ValidationResult;
}

export default function WebsiteFields({ form, onUpdate, validation }: WebsiteFieldsProps) {
  const errors = validation.errors;

  return (
    <div className="form-fields">
      <InputField
        id="website-year"
        label="Tahun Publikasi"
        value={form.year}
        onChange={(v) => onUpdate("year", v)}
        type="number"
        placeholder='2023 (opsional, kosongkan jika tidak ada)'
        error={errors.year}
      />

      <InputField
        id="website-title"
        label="Judul Halaman"
        value={form.title}
        onChange={(v) => onUpdate("title", v)}
        placeholder="Panduan penulisan karya ilmiah"
        error={errors.title}
        required
      />

      <InputField
        id="website-siteName"
        label="Nama Website"
        value={form.siteName}
        onChange={(v) => onUpdate("siteName", v)}
        placeholder="Kemdikbud"
        error={errors.siteName}
        required
      />

      <InputField
        id="website-url"
        label="URL"
        value={form.url}
        onChange={(v) => onUpdate("url", v)}
        type="url"
        placeholder="https://kemdikbud.go.id/panduan"
        error={errors.url}
        required
      />

      <InputField
        id="website-accessDate"
        label="Tanggal Akses"
        value={form.accessDate}
        onChange={(v) => onUpdate("accessDate", v)}
        type="date"
        error={errors.accessDate}
        required
      />
    </div>
  );
}
