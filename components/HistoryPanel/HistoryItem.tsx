"use client";

import React from "react";
import { CitationHistoryEntry } from "@/types/citation.types";
import Badge from "@/components/ui/Badge";
import CopyButton from "@/components/CitationPreview/CopyButton";

interface HistoryItemProps {
  entry: CitationHistoryEntry;
  onDelete: (id: string) => void;
}

export default function HistoryItem({ entry, onDelete }: HistoryItemProps) {
  const date = new Date(entry.createdAt);
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="history-item glass-card-sm">
      <div className="history-item-header">
        <Badge type={entry.sourceType} />
        <span className="history-date">{formattedDate}</span>
      </div>
      <p className="history-citation">{entry.formattedCitation}</p>
      <div className="history-item-actions">
        <CopyButton text={entry.formattedCitation} variant="ghost" />
        <button
          onClick={() => onDelete(entry.id)}
          className="btn-delete"
          aria-label="Hapus sitasi"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4H12M5 4V2.5C5 2.22 5.22 2 5.5 2H8.5C8.78 2 9 2.22 9 2.5V4M10.5 4V11.5C10.5 12.05 10.05 12.5 9.5 12.5H4.5C3.95 12.5 3.5 12.05 3.5 11.5V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Hapus
        </button>
      </div>
    </div>
  );
}
