"use client";

import React from "react";
import { SourceType } from "@/types/citation.types";

const BADGE_CONFIG: Record<SourceType, { label: string; className: string }> = {
  book: { label: "Buku", className: "badge-book" },
  journal: { label: "Jurnal", className: "badge-journal" },
  website: { label: "Website", className: "badge-website" },
};

interface BadgeProps {
  type: SourceType;
  size?: "sm" | "md";
}

export default function Badge({ type, size = "sm" }: BadgeProps) {
  const config = BADGE_CONFIG[type];

  return (
    <span className={`badge ${config.className} ${size === "md" ? "badge-md" : ""}`}>
      {config.label}
    </span>
  );
}
