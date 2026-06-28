"use client";

import React from "react";
import { useClipboard } from "@/hooks/useClipboard";

interface CopyButtonProps {
  text: string;
  disabled?: boolean;
  variant?: "primary" | "ghost";
}

export default function CopyButton({ text, disabled = false, variant = "primary" }: CopyButtonProps) {
  const { copied, copyToClipboard } = useClipboard();

  return (
    <button
      id="btn-copy-citation"
      onClick={() => copyToClipboard(text)}
      disabled={disabled || !text}
      className={`btn-copy ${variant === "ghost" ? "btn-copy-ghost" : ""} ${copied ? "btn-copied" : ""}`}
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Tersalin!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 5V3.5C11 2.67 10.33 2 9.5 2H3.5C2.67 2 2 2.67 2 3.5V9.5C2 10.33 2.67 11 3.5 11H5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Salin Sitasi
        </>
      )}
    </button>
  );
}
