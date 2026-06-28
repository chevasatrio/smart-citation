import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { CitationHistoryEntry } from "@/types/citation.types";

/**
 * Generate a .docx file containing the bibliography (Daftar Pustaka).
 * Entries are sorted alphabetically by the first author's last name.
 */
export async function exportToWord(entries: CitationHistoryEntry[]): Promise<void> {
  // Sort alphabetically by formatted citation (which starts with author's last name)
  const sorted = [...entries].sort((a, b) =>
    a.formattedCitation.localeCompare(b.formattedCitation, "id")
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: "Daftar Pustaka",
                bold: true,
                size: 28, // 14pt
                font: "Times New Roman",
              }),
            ],
          }),
          // Empty line
          new Paragraph({
            spacing: { after: 200 },
            children: [],
          }),
          // Citation entries
          ...sorted.map(
            (entry) =>
              new Paragraph({
                spacing: { after: 200, line: 360 },
                indent: { hanging: 720 }, // hanging indent for APA
                children: [
                  new TextRun({
                    text: entry.formattedCitation,
                    size: 24, // 12pt
                    font: "Times New Roman",
                  }),
                ],
              })
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  // Trigger download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "daftar-pustaka.docx";
  link.click();
  URL.revokeObjectURL(url);
}
