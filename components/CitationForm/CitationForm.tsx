"use client";

import React from "react";
import {
  SourceType,
  BookFormState,
  JournalFormState,
  WebsiteFormState,
  Author,
  ValidationResult,
} from "@/types/citation.types";
import AuthorFieldGroup from "./AuthorFieldGroup";
import BookFields from "./BookFields";
import JournalFields from "./JournalFields";
import WebsiteFields from "./WebsiteFields";

interface CitationFormProps {
  sourceType: SourceType;
  bookForm: BookFormState;
  journalForm: JournalFormState;
  websiteForm: WebsiteFormState;
  updateBookField: (field: keyof BookFormState, value: string) => void;
  updateJournalField: (field: keyof JournalFormState, value: string) => void;
  updateWebsiteField: (field: keyof WebsiteFormState, value: string) => void;
  authors: Author[];
  addAuthor: () => void;
  removeAuthor: (index: number) => void;
  updateAuthor: (index: number, field: keyof Author, value: string) => void;
  validation: ValidationResult;
}

export default function CitationForm({
  sourceType,
  bookForm,
  journalForm,
  websiteForm,
  updateBookField,
  updateJournalField,
  updateWebsiteField,
  authors,
  addAuthor,
  removeAuthor,
  updateAuthor,
  validation,
}: CitationFormProps) {
  return (
    <div className="citation-form glass-card">
      <div className="form-header">
        <h2 className="form-title">
          {sourceType === "book" && "📚 Detail Buku"}
          {sourceType === "journal" && "📰 Detail Jurnal"}
          {sourceType === "website" && "🌐 Detail Website"}
        </h2>
        <p className="form-subtitle">
          Isi informasi di bawah ini untuk menghasilkan sitasi APA 7th Edition
        </p>
      </div>

      <AuthorFieldGroup
        authors={authors}
        onAdd={addAuthor}
        onRemove={removeAuthor}
        onUpdate={updateAuthor}
        errors={validation.errors}
        required={sourceType !== "website"}
      />

      <div className="form-divider" />

      {sourceType === "book" && (
        <BookFields form={bookForm} onUpdate={updateBookField} validation={validation} />
      )}
      {sourceType === "journal" && (
        <JournalFields form={journalForm} onUpdate={updateJournalField} validation={validation} />
      )}
      {sourceType === "website" && (
        <WebsiteFields form={websiteForm} onUpdate={updateWebsiteField} validation={validation} />
      )}
    </div>
  );
}
