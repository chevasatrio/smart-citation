"use client";

import React from "react";
import { BookFormState, ValidationResult } from "@/types/citation.types";
import InputField from "@/components/ui/InputField";

interface BookFieldsProps {
  form: BookFormState;
  onUpdate: (field: keyof BookFormState, value: string) => void;
  validation: ValidationResult;
}

export default function BookFields({ form, onUpdate, validation }: BookFieldsProps) {
  const errors = validation.errors;

  return (
    <div className="form-fields">
      <div className="fields-row">
        <InputField
          id="book-year"
          label="Tahun Terbit"
          value={form.year}
          onChange={(v) => onUpdate("year", v)}
          type="number"
          placeholder="2023"
          error={errors.year}
          required
        />
        <InputField
          id="book-edition"
          label="Edisi"
          value={form.edition}
          onChange={(v) => onUpdate("edition", v)}
          placeholder='contoh: 2nd (opsional)'
        />
      </div>

      <InputField
        id="book-title"
        label="Judul Buku"
        value={form.title}
        onChange={(v) => onUpdate("title", v)}
        placeholder="Metode penelitian kuantitatif, kualitatif, dan R&D"
        error={errors.title}
        required
      />

      <div className="fields-row">
        <InputField
          id="book-city"
          label="Kota Terbit"
          value={form.city}
          onChange={(v) => onUpdate("city", v)}
          placeholder="Bandung"
          error={errors.city}
          required
        />
        <InputField
          id="book-publisher"
          label="Penerbit"
          value={form.publisher}
          onChange={(v) => onUpdate("publisher", v)}
          placeholder="Alfabeta"
          error={errors.publisher}
          required
        />
      </div>
    </div>
  );
}
