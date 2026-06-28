"use client";

import React from "react";
import { JournalFormState, ValidationResult } from "@/types/citation.types";
import InputField from "@/components/ui/InputField";

interface JournalFieldsProps {
  form: JournalFormState;
  onUpdate: (field: keyof JournalFormState, value: string) => void;
  validation: ValidationResult;
}

export default function JournalFields({ form, onUpdate, validation }: JournalFieldsProps) {
  const errors = validation.errors;

  return (
    <div className="form-fields">
      <InputField
        id="journal-year"
        label="Tahun Terbit"
        value={form.year}
        onChange={(v) => onUpdate("year", v)}
        type="number"
        placeholder="2022"
        error={errors.year}
        required
      />

      <InputField
        id="journal-title"
        label="Judul Artikel"
        value={form.title}
        onChange={(v) => onUpdate("title", v)}
        placeholder="Implementasi machine learning pada sistem informasi akademik"
        error={errors.title}
        required
      />

      <InputField
        id="journal-name"
        label="Nama Jurnal"
        value={form.journalName}
        onChange={(v) => onUpdate("journalName", v)}
        placeholder="Jurnal Teknologi Informasi"
        error={errors.journalName}
        required
      />

      <div className="fields-row fields-row-3">
        <InputField
          id="journal-volume"
          label="Volume"
          value={form.volume}
          onChange={(v) => onUpdate("volume", v)}
          placeholder="18"
          error={errors.volume}
          required
        />
        <InputField
          id="journal-issue"
          label="Nomor Issue"
          value={form.issue}
          onChange={(v) => onUpdate("issue", v)}
          placeholder="2 (opsional)"
        />
        <InputField
          id="journal-pages"
          label="Halaman"
          value={form.pages}
          onChange={(v) => onUpdate("pages", v)}
          placeholder="45-67"
          error={errors.pages}
          required
        />
      </div>

      <InputField
        id="journal-doi"
        label="DOI"
        value={form.doi}
        onChange={(v) => onUpdate("doi", v)}
        type="url"
        placeholder="https://doi.org/10.1234/jti.2022.001 (opsional)"
        error={errors.doi}
      />
    </div>
  );
}
