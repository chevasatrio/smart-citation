"use client";

import React from "react";
import { SourceType } from "@/types/citation.types";

interface SourceTypeSelectorProps {
  selected: SourceType;
  onSelect: (type: SourceType) => void;
}

const SOURCE_TYPES: { value: SourceType; label: string; icon: string; description: string }[] = [
  {
    value: "book",
    label: "Buku",
    icon: "📚",
    description: "Buku, e-book, atau monografi",
  },
  {
    value: "journal",
    label: "Jurnal",
    icon: "📰",
    description: "Artikel jurnal ilmiah",
  },
  {
    value: "website",
    label: "Website",
    icon: "🌐",
    description: "Halaman web atau artikel online",
  },
];

export default function SourceTypeSelector({ selected, onSelect }: SourceTypeSelectorProps) {
  return (
    <div className="source-type-selector">
      <h2 className="selector-title">Pilih Jenis Sumber</h2>
      <div className="selector-grid">
        {SOURCE_TYPES.map((type) => (
          <button
            key={type.value}
            id={`source-type-${type.value}`}
            onClick={() => onSelect(type.value)}
            className={`selector-card ${selected === type.value ? "selector-active" : ""}`}
          >
            <span className="selector-icon">{type.icon}</span>
            <span className="selector-label">{type.label}</span>
            <span className="selector-desc">{type.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
