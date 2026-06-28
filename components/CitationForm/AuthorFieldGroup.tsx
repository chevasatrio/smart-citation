"use client";

import React from "react";
import { Author } from "@/types/citation.types";

interface AuthorFieldGroupProps {
  authors: Author[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof Author, value: string) => void;
  errors?: Record<string, string>;
  required?: boolean;
}

export default function AuthorFieldGroup({
  authors,
  onAdd,
  onRemove,
  onUpdate,
  errors = {},
  required = true,
}: AuthorFieldGroupProps) {
  return (
    <div className="author-field-group">
      <div className="author-header">
        <label className="input-label">
          Penulis
          {required && <span className="required-mark">*</span>}
        </label>
        {authors.length < 10 && (
          <button
            type="button"
            onClick={onAdd}
            className="btn-add-author"
            id="btn-add-author"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Tambah Penulis
          </button>
        )}
      </div>

      {authors.map((author, index) => (
        <div key={index} className="author-row">
          <div className="author-number">{index + 1}</div>
          <div className="author-fields">
            <div className="author-input-group">
              <input
                id={`author-${index}-lastName`}
                type="text"
                value={author.lastName}
                onChange={(e) => onUpdate(index, "lastName", e.target.value)}
                placeholder="Nama Belakang"
                className={`input-field input-sm ${
                  index === 0 && errors.authorLastName ? "input-error" : ""
                }`}
                autoComplete="off"
              />
              <input
                id={`author-${index}-firstName`}
                type="text"
                value={author.firstName}
                onChange={(e) => onUpdate(index, "firstName", e.target.value)}
                placeholder="Nama Depan"
                className={`input-field input-sm ${
                  index === 0 && errors.authorFirstName ? "input-error" : ""
                }`}
                autoComplete="off"
              />
              <input
                id={`author-${index}-middleName`}
                type="text"
                value={author.middleName || ""}
                onChange={(e) => onUpdate(index, "middleName", e.target.value)}
                placeholder="Nama Tengah (opsional)"
                className="input-field input-sm"
                autoComplete="off"
              />
            </div>
            {index === 0 && errors.authorLastName && (
              <p className="error-text">{errors.authorLastName}</p>
            )}
            {index === 0 && errors.authorFirstName && (
              <p className="error-text">{errors.authorFirstName}</p>
            )}
          </div>
          {authors.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="btn-remove-author"
              aria-label={`Hapus penulis ${index + 1}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      ))}

      {authors.length >= 10 && (
        <p className="max-authors-text">Maksimum 10 penulis tercapai</p>
      )}
    </div>
  );
}
