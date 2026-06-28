"use client";

import React from "react";
import { CitationHistoryEntry } from "@/types/citation.types";
import HistoryItem from "./HistoryItem";

interface HistoryPanelProps {
  history: CitationHistoryEntry[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onExport: () => void;
}

export default function HistoryPanel({
  history,
  onDelete,
  onClearAll,
  onExport,
}: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <div className="history-empty glass-card">
        <div className="empty-icon">📋</div>
        <h3 className="empty-title">Belum Ada Riwayat</h3>
        <p className="empty-text">
          Sitasi yang Anda buat dan simpan akan muncul di sini.
          Mulai buat sitasi di halaman utama!
        </p>
      </div>
    );
  }

  return (
    <div className="history-panel">
      <div className="history-toolbar">
        <span className="history-count">
          {history.length} sitasi tersimpan
        </span>
        <div className="history-toolbar-actions">
          <button
            id="btn-export-word"
            onClick={onExport}
            className="btn-export"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1V9M8 9L5 6M8 9L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 11V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Unduh .docx
          </button>
          <button
            id="btn-clear-all"
            onClick={onClearAll}
            className="btn-clear-all"
          >
            Hapus Semua
          </button>
        </div>
      </div>

      <div className="history-list">
        {history.map((entry) => (
          <HistoryItem
            key={entry.id}
            entry={entry}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
