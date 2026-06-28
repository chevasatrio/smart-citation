"use client";

import React from "react";
import { FormatterResult } from "@/types/citation.types";
import CopyButton from "./CopyButton";

interface CitationPreviewProps {
  result: FormatterResult;
  onSave: () => void;
  onReset: () => void;
}

export default function CitationPreview({ result, onSave, onReset }: CitationPreviewProps) {
  const hasResult = result.isValid && result.citation;

  return (
    <div className="citation-preview glass-card">
      <div className="preview-header">
        <h2 className="preview-title">✨ Hasil Sitasi</h2>
        <span className="preview-format-badge">APA 7th</span>
      </div>

      <div className={`preview-box ${hasResult ? "preview-active" : ""}`}>
        {hasResult ? (
          <p
            className="preview-text"
            dangerouslySetInnerHTML={{ __html: result.citationWithMarkup }}
          />
        ) : (
          <p className="preview-placeholder">
            Isi formulir di atas untuk melihat preview sitasi Anda di sini...
          </p>
        )}
      </div>

      {result.errors.length > 0 && (
        <div className="preview-errors">
          {result.errors.map((err, i) => (
            <p key={i} className="error-text">⚠️ {err}</p>
          ))}
        </div>
      )}

      <div className="preview-actions">
        <CopyButton text={result.citation} disabled={!hasResult} />
        <button
          id="btn-save-citation"
          onClick={onSave}
          disabled={!hasResult}
          className="btn-save"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1V11M8 11L4 7M8 11L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Simpan ke Riwayat
        </button>
        <button
          id="btn-reset-form"
          onClick={onReset}
          className="btn-reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
