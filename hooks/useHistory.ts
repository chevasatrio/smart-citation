"use client";

import { useState, useEffect, useCallback } from "react";
import { CitationHistoryEntry } from "@/types/citation.types";
import {
  getHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
} from "@/lib/storage/historyStorage";

interface UseHistoryReturn {
  history: CitationHistoryEntry[];
  addEntry: (entry: CitationHistoryEntry) => void;
  removeEntry: (id: string) => void;
  clearAll: () => void;
  historyCount: number;
}

/**
 * Hook for managing citation history in localStorage.
 */
export function useHistory(): UseHistoryReturn {
  const [history, setHistory] = useState<CitationHistoryEntry[]>([]);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const addEntry = useCallback((entry: CitationHistoryEntry) => {
    addToHistory(entry);
    setHistory(getHistory());
  }, []);

  const removeEntry = useCallback((id: string) => {
    removeFromHistory(id);
    setHistory(getHistory());
  }, []);

  const clearAll = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  return {
    history,
    addEntry,
    removeEntry,
    clearAll,
    historyCount: history.length,
  };
}
