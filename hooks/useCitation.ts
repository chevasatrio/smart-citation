"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  SourceType,
  Author,
  BookFormState,
  JournalFormState,
  WebsiteFormState,
  FormatterResult,
  ValidationResult,
  BookData,
  JournalData,
  WebsiteData,
  CitationHistoryEntry,
} from "@/types/citation.types";
import { formatCitation } from "@/lib/formatters";
import { validateBook } from "@/lib/validators/bookValidator";
import { validateJournal } from "@/lib/validators/journalValidator";
import { validateWebsite } from "@/lib/validators/websiteValidator";

const createEmptyAuthor = (): Author => ({
  lastName: "",
  firstName: "",
  middleName: "",
});

const createBookState = (): BookFormState => ({
  authors: [createEmptyAuthor()],
  year: "",
  title: "",
  edition: "",
  city: "",
  publisher: "",
});

const createJournalState = (): JournalFormState => ({
  authors: [createEmptyAuthor()],
  year: "",
  title: "",
  journalName: "",
  volume: "",
  issue: "",
  pages: "",
  doi: "",
});

const createWebsiteState = (): WebsiteFormState => ({
  authors: [createEmptyAuthor()],
  year: "",
  title: "",
  siteName: "",
  url: "",
  accessDate: "",
});

interface UseCitationReturn {
  sourceType: SourceType;
  setSourceType: (type: SourceType) => void;
  bookForm: BookFormState;
  journalForm: JournalFormState;
  websiteForm: WebsiteFormState;
  updateBookField: (field: keyof BookFormState, value: string) => void;
  updateJournalField: (field: keyof JournalFormState, value: string) => void;
  updateWebsiteField: (field: keyof WebsiteFormState, value: string) => void;
  authors: Author[];
  addAuthor: () => void;
  removeAuthor: (index: number) => void;
  updateAuthor: (index: number, field: keyof Author, value: string) => void;
  formatterResult: FormatterResult;
  validationResult: ValidationResult;
  generateCitation: () => CitationHistoryEntry | null;
  resetForm: () => void;
}

export function useCitation(): UseCitationReturn {
  const [sourceType, setSourceTypeRaw] = useState<SourceType>("book");
  const [bookForm, setBookForm] = useState<BookFormState>(createBookState());
  const [journalForm, setJournalForm] = useState<JournalFormState>(createJournalState());
  const [websiteForm, setWebsiteForm] = useState<WebsiteFormState>(createWebsiteState());
  const [formatterResult, setFormatterResult] = useState<FormatterResult>({
    citation: "",
    citationWithMarkup: "",
    isValid: false,
    errors: [],
  });
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: false,
    errors: {},
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get current authors based on source type
  const authors = sourceType === "book"
    ? bookForm.authors
    : sourceType === "journal"
    ? journalForm.authors
    : websiteForm.authors;

  // Source type change resets form
  const setSourceType = useCallback((type: SourceType) => {
    setSourceTypeRaw(type);
    setBookForm(createBookState());
    setJournalForm(createJournalState());
    setWebsiteForm(createWebsiteState());
    setFormatterResult({ citation: "", citationWithMarkup: "", isValid: false, errors: [] });
    setValidationResult({ isValid: false, errors: {} });
  }, []);

  // Update functions
  const updateBookField = useCallback((field: keyof BookFormState, value: string) => {
    setBookForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateJournalField = useCallback((field: keyof JournalFormState, value: string) => {
    setJournalForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateWebsiteField = useCallback((field: keyof WebsiteFormState, value: string) => {
    setWebsiteForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Author management
  const addAuthor = useCallback(() => {
    const updateAuthors = (prev: Author[]): Author[] => {
      if (prev.length >= 10) return prev;
      return [...prev, createEmptyAuthor()];
    };

    if (sourceType === "book") {
      setBookForm((prev) => ({ ...prev, authors: updateAuthors(prev.authors) }));
    } else if (sourceType === "journal") {
      setJournalForm((prev) => ({ ...prev, authors: updateAuthors(prev.authors) }));
    } else {
      setWebsiteForm((prev) => ({ ...prev, authors: updateAuthors(prev.authors) }));
    }
  }, [sourceType]);

  const removeAuthor = useCallback((index: number) => {
    const filterAuthors = (prev: Author[]): Author[] => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    };

    if (sourceType === "book") {
      setBookForm((prev) => ({ ...prev, authors: filterAuthors(prev.authors) }));
    } else if (sourceType === "journal") {
      setJournalForm((prev) => ({ ...prev, authors: filterAuthors(prev.authors) }));
    } else {
      setWebsiteForm((prev) => ({ ...prev, authors: filterAuthors(prev.authors) }));
    }
  }, [sourceType]);

  const updateAuthor = useCallback((index: number, field: keyof Author, value: string) => {
    const update = (prev: Author[]): Author[] => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    };

    if (sourceType === "book") {
      setBookForm((prev) => ({ ...prev, authors: update(prev.authors) }));
    } else if (sourceType === "journal") {
      setJournalForm((prev) => ({ ...prev, authors: update(prev.authors) }));
    } else {
      setWebsiteForm((prev) => ({ ...prev, authors: update(prev.authors) }));
    }
  }, [sourceType]);

  // Live preview with debounce (300ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      let result: FormatterResult;
      let validation: ValidationResult;

      if (sourceType === "book") {
        validation = validateBook(bookForm);
        if (validation.isValid) {
          const data: BookData = {
            sourceType: "book",
            authors: bookForm.authors,
            year: parseInt(bookForm.year),
            title: bookForm.title,
            edition: bookForm.edition || undefined,
            city: bookForm.city,
            publisher: bookForm.publisher,
          };
          result = formatCitation(data);
        } else {
          result = { citation: "", citationWithMarkup: "", isValid: false, errors: [] };
        }
      } else if (sourceType === "journal") {
        validation = validateJournal(journalForm);
        if (validation.isValid) {
          const data: JournalData = {
            sourceType: "journal",
            authors: journalForm.authors,
            year: parseInt(journalForm.year),
            title: journalForm.title,
            journalName: journalForm.journalName,
            volume: journalForm.volume,
            issue: journalForm.issue || undefined,
            pages: journalForm.pages,
            doi: journalForm.doi || undefined,
          };
          result = formatCitation(data);
        } else {
          result = { citation: "", citationWithMarkup: "", isValid: false, errors: [] };
        }
      } else {
        validation = validateWebsite(websiteForm);
        if (validation.isValid) {
          const data: WebsiteData = {
            sourceType: "website",
            authors: websiteForm.authors[0]?.lastName ? websiteForm.authors : undefined,
            year: websiteForm.year ? parseInt(websiteForm.year) : undefined,
            title: websiteForm.title,
            siteName: websiteForm.siteName,
            url: websiteForm.url,
            accessDate: websiteForm.accessDate,
          };
          result = formatCitation(data);
        } else {
          result = { citation: "", citationWithMarkup: "", isValid: false, errors: [] };
        }
      }

      setValidationResult(validation);
      setFormatterResult(result);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [sourceType, bookForm, journalForm, websiteForm]);

  // Generate citation and create history entry
  const generateCitation = useCallback((): CitationHistoryEntry | null => {
    if (!formatterResult.isValid) return null;

    const currentForm = sourceType === "book" ? bookForm : sourceType === "journal" ? journalForm : websiteForm;

    let data: BookData | JournalData | WebsiteData;
    if (sourceType === "book") {
      const bf = currentForm as BookFormState;
      data = {
        sourceType: "book",
        authors: bf.authors,
        year: parseInt(bf.year),
        title: bf.title,
        edition: bf.edition || undefined,
        city: bf.city,
        publisher: bf.publisher,
      };
    } else if (sourceType === "journal") {
      const jf = currentForm as JournalFormState;
      data = {
        sourceType: "journal",
        authors: jf.authors,
        year: parseInt(jf.year),
        title: jf.title,
        journalName: jf.journalName,
        volume: jf.volume,
        issue: jf.issue || undefined,
        pages: jf.pages,
        doi: jf.doi || undefined,
      };
    } else {
      const wf = currentForm as WebsiteFormState;
      data = {
        sourceType: "website",
        authors: wf.authors[0]?.lastName ? wf.authors : undefined,
        year: wf.year ? parseInt(wf.year) : undefined,
        title: wf.title,
        siteName: wf.siteName,
        url: wf.url,
        accessDate: wf.accessDate,
      };
    }

    const entry: CitationHistoryEntry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      sourceType,
      data,
      formattedCitation: formatterResult.citation,
    };

    return entry;
  }, [sourceType, bookForm, journalForm, websiteForm, formatterResult]);

  const resetForm = useCallback(() => {
    if (sourceType === "book") setBookForm(createBookState());
    else if (sourceType === "journal") setJournalForm(createJournalState());
    else setWebsiteForm(createWebsiteState());
    setFormatterResult({ citation: "", citationWithMarkup: "", isValid: false, errors: [] });
    setValidationResult({ isValid: false, errors: {} });
  }, [sourceType]);

  return {
    sourceType,
    setSourceType,
    bookForm,
    journalForm,
    websiteForm,
    updateBookField,
    updateJournalField,
    updateWebsiteField,
    authors,
    addAuthor,
    removeAuthor,
    updateAuthor,
    formatterResult,
    validationResult,
    generateCitation,
    resetForm,
  };
}
