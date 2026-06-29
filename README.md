# CitasiCerdas

**Generator Sitasi & Daftar Pustaka Akademik — APA 7th Edition**

CitasiCerdas adalah aplikasi web yang membantu mahasiswa, peneliti, dan akademisi Indonesia dalam menyusun sitasi dan daftar pustaka secara otomatis mengikuti standar **APA 7th Edition**. Cukup isi formulir sesuai jenis sumber, dan sistem langsung menghasilkan teks sitasi yang siap pakai.

> 🎓 Dibangun untuk kebutuhan penulisan karya ilmiah — skripsi, tesis, makalah, dan jurnal.

---

##  Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📖 **Multi Sumber** | Mendukung tiga jenis sumber: Buku, Jurnal, dan Website |
| ⚡ **Live Preview** | Preview sitasi berubah secara real-time saat mengisi formulir (debounce 300ms) |
| 📋 **One-Click Copy** | Salin sitasi ke clipboard dengan satu klik dan feedback visual |
| 👥 **Multiple Authors** | Tambah hingga 10 penulis per entri dengan format APA otomatis |
| 💾 **Riwayat Lokal** | Simpan hingga 50 sitasi terbaru di browser (localStorage) |
| 📄 **Export Word** | Unduh seluruh daftar pustaka sebagai file `.docx` terurut alfabetis |
| 🌙 **Dark Theme** | Antarmuka premium dengan glassmorphism dan animasi halus |
| 📱 **Responsif** | Tampilan optimal di desktop maupun perangkat mobile |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Bahasa | [TypeScript 5](https://www.typescriptlang.org/) — strict mode, zero `any` |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) + Custom CSS Properties |
| State | React Hooks (`useState`, `useEffect`, `useCallback`, `useRef`) |
| Persistence | `localStorage` — tanpa backend/database |
| Export | [`docx`](https://www.npmjs.com/package/docx) — generate file Word |
| Font | [Inter](https://fonts.google.com/specimen/Inter) via `next/font` |

---

## 🚀 Memulai

### Prasyarat

- **Node.js** ≥ 18.x
- **npm** (bawaan Node.js)

### Instalasi

```bash
# Clone repositori
git clone https://github.com/username/ts-citation-builder.git
cd ts-citation-builder

# Install dependensi
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Produksi

```bash
npm run build
npm run start
```

---

## Struktur Proyek

```
ts-citation-builder/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout + metadata + font
│   ├── page.tsx                  # Halaman utama (form + preview)
│   ├── globals.css               # Design system (dark theme)
│   └── history/
│       └── page.tsx              # Halaman riwayat sitasi
│
├── components/                   # React Components
│   ├── CitationForm/             # Form input per jenis sumber
│   │   ├── CitationForm.tsx      # Form wrapper utama
│   │   ├── SourceTypeSelector.tsx
│   │   ├── AuthorFieldGroup.tsx  # Multi-author dinamis
│   │   ├── BookFields.tsx
│   │   ├── JournalFields.tsx
│   │   └── WebsiteFields.tsx
│   ├── CitationPreview/          # Live preview + copy
│   │   ├── CitationPreview.tsx
│   │   └── CopyButton.tsx
│   ├── HistoryPanel/             # Daftar riwayat + export
│   │   ├── HistoryPanel.tsx
│   │   └── HistoryItem.tsx
│   └── ui/                       # Komponen reusable
│       ├── InputField.tsx
│       └── Badge.tsx
│
├── hooks/                        # Custom React Hooks
│   ├── useCitation.ts            # State, validasi, formatter
│   ├── useHistory.ts             # CRUD localStorage
│   └── useClipboard.ts           # Clipboard API
│
├── lib/                          # Business Logic
│   ├── formatters/               # Format sitasi APA
│   │   ├── index.ts
│   │   ├── authorUtils.ts
│   │   ├── bookFormatter.ts
│   │   ├── journalFormatter.ts
│   │   └── websiteFormatter.ts
│   ├── validators/               # Validasi input
│   ├── exporters/                # Export .docx
│   └── storage/                  # localStorage abstraction
│
└── types/
    └── citation.types.ts         # TypeScript interfaces
```

---

## 📝 Format Sitasi APA 7th Edition

Aplikasi ini mengimplementasikan aturan format APA berikut:

### Buku
```
Penulis, I. N. (Tahun). Judul buku (Edisi ed.). Penerbit.
```
> Contoh: Sugiyono, D. (2019). *Metode penelitian kuantitatif, kualitatif, dan R&D* (2nd ed.). Alfabeta.

### Jurnal
```
Penulis, I. N. (Tahun). Judul artikel. Nama Jurnal, Volume(Issue), Halaman. DOI
```
> Contoh: Rahmat, A., & Sari, B. P. (2022). Implementasi machine learning. *Jurnal Teknologi Informasi*, *18*(2), 45–67.

### Website
```
Penulis/Organisasi. (Tahun). Judul halaman. Nama Website. URL
```
> Contoh: Kemdikbud. (2023). Panduan penulisan karya ilmiah. *Kemdikbud*. https://kemdikbud.go.id/panduan

### Aturan Penulis
| Jumlah | Format |
|---|---|
| 1 penulis | `Doe, J.` |
| 2 penulis | `Doe, J., & Smith, A.` |
| 3–20 penulis | Koma, `&` sebelum terakhir |
| 21+ penulis | 19 pertama, `...`, terakhir |

---

## 🔧 Skrip yang Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build produksi |
| `npm run start` | Jalankan build produksi |
| `npm run lint` | Jalankan ESLint |

---

## Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repositori ini
2. Buat branch fitur (`git checkout -b fitur/fitur-baru`)
3. Commit perubahan (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur/fitur-baru`)
5. Buat Pull Request

---

## Referensi

- American Psychological Association. (2020). *Publication manual of the American Psychological Association* (7th ed.). APA.
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

<p align="center">
  Dibuat dengan ❤️ untuk komunitas akademik Indonesia
</p>
