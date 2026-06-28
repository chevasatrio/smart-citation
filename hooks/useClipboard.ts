"use client";

import { useState, useCallback } from "react";

interface ClipboardState {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}

/**
 * Hook for copying text to clipboard with success feedback.
 * Shows "copied" state for 2 seconds after successful copy.
 */
export function useClipboard(): ClipboardState {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return { copied, copyToClipboard };
}
