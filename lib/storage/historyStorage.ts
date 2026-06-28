import { CitationHistoryEntry } from "@/types/citation.types";

const STORAGE_KEY = "citasi-cerdas-history";
const MAX_ENTRIES = 50;

/**
 * Get all citation history entries from localStorage.
 */
export function getHistory(): CitationHistoryEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CitationHistoryEntry[];
  } catch {
    return [];
  }
}

/**
 * Add a new citation to history.
 * Automatically removes oldest entries if max is exceeded.
 */
export function addToHistory(entry: CitationHistoryEntry): void {
  const history = getHistory();
  history.unshift(entry);
  
  // Enforce max entries limit
  if (history.length > MAX_ENTRIES) {
    history.splice(MAX_ENTRIES);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * Remove a single entry from history by ID.
 */
export function removeFromHistory(id: string): void {
  const history = getHistory().filter((entry) => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * Clear all citation history.
 */
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get the count of history entries.
 */
export function getHistoryCount(): number {
  return getHistory().length;
}
