"use client";

import React, { useState } from "react";
import Link from "next/link";
import SourceTypeSelector from "@/components/CitationForm/SourceTypeSelector";
import CitationForm from "@/components/CitationForm/CitationForm";
import CitationPreview from "@/components/CitationPreview/CitationPreview";
import { useCitation } from "@/hooks/useCitation";
import { useHistory } from "@/hooks/useHistory";

export default function HomePage() {
  const citation = useCitation();
  const { addEntry, historyCount } = useHistory();
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = () => {
    const entry = citation.generateCitation();
    if (entry) {
      addEntry(entry);
      setToast("Sitasi berhasil disimpan ke riwayat!");
      citation.resetForm();
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">CitasiCerdas</span>
          </Link>
          <nav className="nav-links">
            <Link href="/" className="nav-link nav-link-active">
              Beranda
            </Link>
            <Link href="/history" className="nav-link">
              Riwayat
              {historyCount > 0 && (
                <span className="nav-badge">{historyCount}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero */}
        <div className="page-hero">
          <h1>Generator Sitasi Akademik</h1>
          <p>
            Buat sitasi dan daftar pustaka otomatis mengikuti standar APA 7th
            Edition. Pilih jenis sumber, isi formulir, dan salin hasilnya!
          </p>
        </div>

        {/* Source Type Selector */}
        <SourceTypeSelector
          selected={citation.sourceType}
          onSelect={citation.setSourceType}
        />

        {/* Two-column layout: Form + Preview */}
        <div className="citation-page-grid">
          <CitationForm
            sourceType={citation.sourceType}
            bookForm={citation.bookForm}
            journalForm={citation.journalForm}
            websiteForm={citation.websiteForm}
            updateBookField={citation.updateBookField}
            updateJournalField={citation.updateJournalField}
            updateWebsiteField={citation.updateWebsiteField}
            authors={citation.authors}
            addAuthor={citation.addAuthor}
            removeAuthor={citation.removeAuthor}
            updateAuthor={citation.updateAuthor}
            validation={citation.validationResult}
          />

          <CitationPreview
            result={citation.formatterResult}
            onSave={handleSave}
            onReset={citation.resetForm}
          />
        </div>
      </main>

      {/* Toast Notification */}
      {toast && <div className="toast">✅ {toast}</div>}
    </div>
  );
}
