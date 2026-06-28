# 📚 CitasiCerdas — Academic Reference & Citation Generator

> **Software Requirements Specification (SRS)**
> Versi: 1.0.0 | Bahasa: TypeScript (Next.js Fullstack)

---

## 🧭 Daftar Isi

1. [Gambaran Umum Proyek](#1-gambaran-umum-proyek)
2. [Tujuan & Sasaran Pengguna](#2-tujuan--sasaran-pengguna)
3. [Tech Stack](#3-tech-stack)
4. [Arsitektur Proyek](#4-arsitektur-proyek)
5. [Struktur Folder](#5-struktur-folder)
6. [TypeScript Interfaces & Types](#6-typescript-interfaces--types)
7. [Fitur & Spesifikasi Fungsional](#7-fitur--spesifikasi-fungsional)
8. [Spesifikasi Format Sitasi APA](#8-spesifikasi-format-sitasi-apa)
9. [Komponen UI (Component Tree)](#9-komponen-ui-component-tree)
10. [Alur Data (Data Flow)](#10-alur-data-data-flow)
11. [Rencana Pengujian (Testing Plan)](#11-rencana-pengujian-testing-plan)
12. [Non-Functional Requirements](#12-non-functional-requirements)
13. [Panduan Instalasi & Menjalankan Proyek](#13-panduan-instalasi--menjalankan-proyek)
14. [Roadmap Pengembangan](#14-roadmap-pengembangan)

---

## 1. Gambaran Umum Proyek

**CitasiCerdas** adalah aplikasi web fullstack berbasis **Next.js + TypeScript** yang membantu mahasiswa, peneliti, dan akademisi Indonesia dalam menyusun sitasi dan daftar pustaka secara otomatis mengikuti standar **format APA 7th Edition**.

Pengguna cukup mengisi form sesuai jenis sumber (Buku, Jurnal, atau Website), dan sistem akan langsung menghasilkan teks sitasi yang siap palin—tanpa harus menghapal aturan penulisan yang rumit.

---

## 2. Tujuan & Sasaran Pengguna

### Tujuan
- Menghilangkan kesalahan manual dalam penulisan sitasi akademik
- Mempercepat proses penyusunan daftar pustaka
- Meningkatkan konsistensi format antar referensi

### Sasaran Pengguna
- Mahasiswa S1–S3 yang sedang mengerjakan skripsi, tesis, atau makalah
- Peneliti dan dosen yang sering menyusun karya ilmiah
- Siapapun yang membutuhkan sitasi cepat dan akurat

---

## 3. Tech Stack

| Layer | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSR + Client Components |
| **Bahasa** | TypeScript 5.x | Type safety ketat di seluruh kode |
| **Styling** | Tailwind CSS v3 | Utility-first, cepat, bersih |
| **State Management** | React `useState` / `useReducer` | Local state, cukup untuk MVP |
| **Persistence** | `localStorage` (browser) | Simpan riwayat tanpa database eksternal |
| **Export** | `docx` (npm package) | Generate file `.docx` daftar pustaka |
| **Unit Testing** | Jest + `@testing-library/react` | Uji logika formatter dan komponen |
| **E2E Testing** | Playwright | Uji alur lengkap pengguna di browser |
| **Linting** | ESLint + Prettier | Konsistensi kode |

---

## 4. Arsitektur Proyek

```
[Browser / Client]
      │
      ▼
[Next.js App Router — /app]
      │
      ├── Page Components (UI Layer)
      │         └── Menggunakan React Client Components
      │
      ├── Business Logic Layer
      │         └── /lib/formatters/  ← Logika format sitasi APA
      │
      ├── Custom Hooks
      │         └── /hooks/  ← useCitation, useHistory, useClipboard
      │
      └── localStorage (Persistence)
                └── Riwayat sitasi pengguna
```

> Tidak ada backend/API route yang wajib untuk MVP. Seluruh logika berjalan di sisi klien.

---

## 5. Struktur Folder

```
citasi-cerdas/
├── app/
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Halaman utama (Home)
│   └── history/
│       └── page.tsx            # Halaman riwayat sitasi
│
├── components/
│   ├── CitationForm/
│   │   ├── CitationForm.tsx    # Form utama (wrapper)
│   │   ├── SourceTypeSelector.tsx  # Pilihan: Buku | Jurnal | Website
│   │   ├── BookFields.tsx      # Field khusus Buku
│   │   ├── JournalFields.tsx   # Field khusus Jurnal
│   │   └── WebsiteFields.tsx   # Field khusus Website
│   │
│   ├── CitationPreview/
│   │   ├── CitationPreview.tsx # Live preview hasil sitasi
│   │   └── CopyButton.tsx      # Tombol salin ke clipboard
│   │
│   ├── HistoryPanel/
│   │   ├── HistoryPanel.tsx    # Panel daftar riwayat
│   │   └── HistoryItem.tsx     # Card satu entri riwayat
│   │
│   └── ui/
│       ├── InputField.tsx      # Reusable input component
│       ├── SelectField.tsx     # Reusable select component
│       └── Badge.tsx           # Label tipe sumber
│
├── lib/
│   ├── formatters/
│   │   ├── index.ts            # Entry point formatter
│   │   ├── bookFormatter.ts    # Format sitasi Buku → APA
│   │   ├── journalFormatter.ts # Format sitasi Jurnal → APA
│   │   └── websiteFormatter.ts # Format sitasi Website → APA
│   │
│   ├── validators/
│   │   ├── bookValidator.ts    # Validasi input Buku
│   │   ├── journalValidator.ts # Validasi input Jurnal
│   │   └── websiteValidator.ts # Validasi input Website
│   │
│   ├── exporters/
│   │   └── wordExporter.ts     # Generate file .docx
│   │
│   └── storage/
│       └── historyStorage.ts   # CRUD riwayat di localStorage
│
├── hooks/
│   ├── useCitation.ts          # State + logika form & preview
│   ├── useHistory.ts           # Baca/tulis riwayat localStorage
│   └── useClipboard.ts         # Salin teks ke clipboard
│
├── types/
│   └── citation.types.ts       # Semua TypeScript interfaces & types
│
├── __tests__/
│   ├── formatters/
│   │   ├── bookFormatter.test.ts
│   │   ├── journalFormatter.test.ts
│   │   └── websiteFormatter.test.ts
│   └── components/
│       ├── CitationForm.test.tsx
│       └── CopyButton.test.tsx
│
├── e2e/
│   ├── citation-flow.spec.ts   # E2E: alur lengkap pembuatan sitasi
│   ├── copy-button.spec.ts     # E2E: fungsi copy clipboard
│   └── history.spec.ts         # E2E: simpan & tampilkan riwayat
│
├── public/
│   └── favicon.ico
│
├── jest.config.ts
├── playwright.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## 6. TypeScript Interfaces & Types

File: `types/citation.types.ts`

```typescript
// ─── Tipe Sumber ─────────────────────────────────────────────
export type SourceType = "book" | "journal" | "website";

// ─── Data Penulis ────────────────────────────────────────────
export interface Author {
  lastName: string;       // Wajib
  firstName: string;      // Wajib
  middleName?: string;    // Opsional
}

// ─── Data Buku ───────────────────────────────────────────────
export interface BookData {
  sourceType: "book";
  authors: Author[];       // Min. 1 penulis
  year: number;            // Tahun terbit
  title: string;           // Judul buku (akan di-italic)
  edition?: string;        // Edisi (opsional), contoh: "2nd"
  city: string;            // Kota terbit
  publisher: string;       // Nama penerbit
}

// ─── Data Jurnal ─────────────────────────────────────────────
export interface JournalData {
  sourceType: "journal";
  authors: Author[];       // Min. 1 penulis
  year: number;            // Tahun terbit
  title: string;           // Judul artikel
  journalName: string;     // Nama jurnal (akan di-italic)
  volume: string;          // Volume jurnal (wajib)
  issue?: string;          // Nomor terbitan (opsional)
  pages: string;           // Halaman, contoh: "45-67"
  doi?: string;            // DOI (opsional)
}

// ─── Data Website ────────────────────────────────────────────
export interface WebsiteData {
  sourceType: "website";
  authors?: Author[];      // Opsional (bisa tanpa penulis)
  year?: number;           // Tahun publish (opsional)
  title: string;           // Judul halaman/artikel
  siteName: string;        // Nama website
  url: string;             // URL lengkap (wajib)
  accessDate: string;      // Tanggal akses, format: "DD Bulan YYYY"
}

// ─── Union Type ───────────────────────────────────────────────
export type CitationData = BookData | JournalData | WebsiteData;

// ─── Entri Riwayat ───────────────────────────────────────────
export interface CitationHistoryEntry {
  id: string;              // UUID unik
  createdAt: string;       // ISO timestamp
  sourceType: SourceType;
  data: CitationData;
  formattedCitation: string; // Hasil teks sitasi
}

// ─── Hasil Formatter ─────────────────────────────────────────
export interface FormatterResult {
  citation: string;         // Teks sitasi mentah
  citationWithMarkup: string; // Teks sitasi dengan markup italic
  isValid: boolean;
  errors: string[];
}

// ─── Validasi ─────────────────────────────────────────────────
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>; // field name → pesan error
}
```

---

## 7. Fitur & Spesifikasi Fungsional

### 7.1 Fitur Inti (MVP)

#### F-01: Pemilihan Tipe Sumber
- Pengguna memilih salah satu dari: **Buku**, **Jurnal**, atau **Website**
- Pilihan ditampilkan sebagai tab atau toggle button
- Pergantian tipe akan **mereset form** dan menampilkan field yang relevan

#### F-02: Formulir Input Dinamis

**Field Buku:**
| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| Nama Penulis (Belakang) | text | ✅ | Bisa tambah multiple penulis |
| Nama Penulis (Depan/Tengah) | text | ✅ | |
| Tahun Terbit | number | ✅ | Format 4 digit |
| Judul Buku | text | ✅ | Akan di-italic di output |
| Edisi | text | ❌ | Contoh: "2nd", "Revisi ke-3" |
| Kota Terbit | text | ✅ | |
| Penerbit | text | ✅ | |

**Field Jurnal:**
| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| Nama Penulis | text | ✅ | |
| Tahun Terbit | number | ✅ | |
| Judul Artikel | text | ✅ | |
| Nama Jurnal | text | ✅ | Akan di-italic di output |
| Volume | text | ✅ | |
| Nomor Issue | text | ❌ | Dalam tanda kurung |
| Halaman | text | ✅ | Contoh: "45-67" |
| DOI | text | ❌ | Format: `https://doi.org/...` |

**Field Website:**
| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| Nama Penulis | text | ❌ | Jika tidak ada, gunakan nama situs |
| Tahun Publikasi | number | ❌ | Jika tidak ada, tulis "n.d." |
| Judul Halaman | text | ✅ | |
| Nama Website | text | ✅ | |
| URL | url | ✅ | Validasi format URL |
| Tanggal Akses | date | ✅ | |

#### F-03: Live Preview
- Setiap perubahan input langsung memperbarui panel preview
- Preview menampilkan sitasi dengan **teks italic** pada bagian yang sesuai
- Jika ada field wajib yang kosong, preview menampilkan placeholder abu-abu

#### F-04: One-Click Copy
- Tombol "Salin Sitasi" di bawah preview
- Menyalin teks plain ke clipboard (tanpa markup HTML)
- Setelah berhasil: ikon berubah menjadi ✅ selama 2 detik
- Menggunakan `navigator.clipboard.writeText()`

### 7.2 Fitur Tambahan

#### F-05: Riwayat Sitasi (History)
- Setiap sitasi yang berhasil dibuat disimpan otomatis ke `localStorage`
- Panel riwayat menampilkan max. **50 entri** terbaru
- Setiap entri menampilkan: tipe sumber, preview teks, dan tombol salin ulang
- Pengguna bisa menghapus satu entri atau menghapus semua

#### F-06: Export ke Word
- Tombol "Unduh Daftar Pustaka (.docx)"
- Menggabungkan semua sitasi di riwayat
- Diurutkan **alfabetis** berdasarkan nama belakang penulis pertama
- Format file: `.docx` dengan judul "Daftar Pustaka" di atas

#### F-07: Multiple Authors
- Pengguna bisa menambah/menghapus penulis secara dinamis
- Tombol "+ Tambah Penulis" di bawah field penulis
- Maksimum 10 penulis per entri

---

## 8. Spesifikasi Format Sitasi APA

### Format Buku
```
Penulis, I. N. (Tahun). Judul buku (Edisi ed.). Penerbit.
```
**Contoh:**
```
Sugiyono, D. (2019). Metode penelitian kuantitatif, kualitatif, dan R&D (2nd ed.). Alfabeta.
```

### Format Jurnal
```
Penulis, I. N. (Tahun). Judul artikel. Nama Jurnal, Volume(Issue), Halaman. https://doi.org/xxx
```
**Contoh:**
```
Rahmat, A., & Sari, B. P. (2022). Implementasi machine learning pada sistem informasi akademik. Jurnal Teknologi Informasi, 18(2), 45–67. https://doi.org/10.1234/jti.2022.001
```

### Format Website
```
Penulis, I. N. (Tahun, DD Bulan). Judul halaman. Nama Website. URL
```
**Contoh (tanpa penulis):**
```
Kementerian Pendidikan dan Kebudayaan. (2023, 15 Maret). Panduan penulisan karya ilmiah. Kemdikbud. https://kemdikbud.go.id/panduan
```

### Aturan Khusus yang Harus Diimplementasikan
- Nama penulis: `Belakang, Inisial Depan.` (contoh: `Sugiyono, D.`)
- 2 penulis: gunakan `&` (contoh: `Rahmat, A., & Sari, B.`)
- 3–20 penulis: pisahkan dengan koma, `&` sebelum penulis terakhir
- Lebih dari 20 penulis: tulis 19 pertama, `...`, penulis terakhir
- Judul buku dan nama jurnal: **italic**
- Jika tidak ada tahun: gunakan `(n.d.)`
- Jika tidak ada penulis: nama organisasi/institusi sebagai penulis

---

## 9. Komponen UI (Component Tree)

```
<App>
 └── <Layout>
      ├── <Header>
      │    └── Logo + Navigasi (Home | Riwayat)
      │
      └── <main>
           ├── [Halaman: /]
           │    ├── <SourceTypeSelector />
           │    │    └── Tab: Buku | Jurnal | Website
           │    │
           │    ├── <CitationForm />
           │    │    ├── <AuthorFieldGroup />  ← multiple penulis
           │    │    ├── <BookFields />        ← conditional
           │    │    ├── <JournalFields />     ← conditional
           │    │    └── <WebsiteFields />     ← conditional
           │    │
           │    └── <CitationPreview />
           │         ├── <PreviewText />       ← live preview
           │         └── <CopyButton />
           │
           └── [Halaman: /history]
                ├── <ExportButton />
                └── <HistoryPanel />
                     └── <HistoryItem /> × N
```

---

## 10. Alur Data (Data Flow)

```
[User Input]
     │
     ▼
[CitationForm State]
  (useCitation hook)
     │
     ├──► [Validator]  → validationResult: { isValid, errors }
     │         └──► Tampilkan error per field
     │
     └──► [Formatter]  → formattedCitation: string
               │
               ├──► [CitationPreview]  ← Live preview
               │
               └──► [Saat user klik Simpan]
                         │
                         ├──► [historyStorage.ts]  → localStorage
                         │
                         └──► [HistoryPanel]  ← Update UI
```

---

## 11. Rencana Pengujian (Testing Plan)

### 11.1 Unit Tests (Jest)

**File: `__tests__/formatters/bookFormatter.test.ts`**

| Test Case | Skenario | Expected Output |
|---|---|---|
| TC-B-01 | 1 penulis, tanpa edisi | `Doe, J. (2020). Judul buku. Penerbit.` |
| TC-B-02 | 2 penulis | `Doe, J., & Smith, A. (2020). ...` |
| TC-B-03 | Dengan edisi | `... (2nd ed.). ...` |
| TC-B-04 | Tahun kosong | Validasi error |
| TC-B-05 | Judul dengan tanda kutip | Tidak ada escape issue |

**File: `__tests__/formatters/journalFormatter.test.ts`**

| Test Case | Skenario | Expected Output |
|---|---|---|
| TC-J-01 | Dengan DOI | `... https://doi.org/xxx` |
| TC-J-02 | Tanpa issue | `Jurnal, 18, 45–67.` |
| TC-J-03 | Dengan issue | `Jurnal, 18(2), 45–67.` |
| TC-J-04 | 3 penulis | `A, B., C, D., & E, F. (...)` |
| TC-J-05 | Halaman format salah | Validasi error |

**File: `__tests__/formatters/websiteFormatter.test.ts`**

| Test Case | Skenario | Expected Output |
|---|---|---|
| TC-W-01 | Tanpa penulis, tanpa tahun | `Nama Situs. (n.d.). ...` |
| TC-W-02 | URL tidak valid | Validasi error |
| TC-W-03 | Dengan tanggal akses | `... Diakses 10 Juni 2025, dari ...` |
| TC-W-04 | Tahun ada, penulis tidak ada | `Nama Situs. (2023). ...` |

### 11.2 E2E Tests (Playwright)

**File: `e2e/citation-flow.spec.ts`**
```
Skenario: Pengguna membuat sitasi buku dari awal
  1. Buka halaman utama
  2. Klik tab "Buku"
  3. Isi semua field yang wajib
  4. Verifikasi live preview muncul dan berubah
  5. Klik tombol "Salin Sitasi"
  6. Verifikasi teks ikon berubah menjadi "Tersalin!"
```

**File: `e2e/history.spec.ts`**
```
Skenario: Riwayat tersimpan dan dapat dihapus
  1. Buat 3 sitasi berturut-turut
  2. Navigasi ke halaman /history
  3. Verifikasi 3 entri tampil
  4. Hapus 1 entri
  5. Verifikasi hanya 2 entri tersisa
```

---

## 12. Non-Functional Requirements

| Kategori | Spesifikasi |
|---|---|
| **Performance** | Live preview update < 100ms setelah user berhenti mengetik (debounce 300ms) |
| **Responsiveness** | Tampilan optimal di desktop (≥ 768px) dan mobile (< 768px) |
| **Browser Support** | Chrome, Firefox, Edge (versi terbaru); Safari (basic support) |
| **Aksesibilitas** | Semua input memiliki `label` yang benar; warna kontras WCAG AA |
| **Type Safety** | Tidak ada penggunaan `any` di seluruh kode TypeScript |
| **Bundle Size** | First Load JS < 150kb (gzipped) |
| **localStorage** | Max. 50 entri riwayat; otomatis hapus yang terlama jika penuh |

---

## 13. Panduan Instalasi & Menjalankan Proyek

### Prasyarat
- Node.js >= 18.x
- npm atau pnpm

### Langkah Instalasi
```bash
# Clone repositori
git clone https://github.com/username/citasi-cerdas.git
cd citasi-cerdas

# Install dependensi
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Menjalankan Tests
```bash
# Unit Tests (Jest)
npm run test

# Unit Tests dengan watch mode
npm run test:watch

# E2E Tests (Playwright)
npm run test:e2e

# Semua test sekaligus
npm run test:all
```

### Build Produksi
```bash
npm run build
npm run start
```

---

## 14. Roadmap Pengembangan

### Phase 1 — MVP (Minggu 1–2)
- [x] Setup proyek Next.js + TypeScript + Tailwind
- [ ] Definisi semua TypeScript interfaces
- [ ] Implementasi formatter untuk Buku, Jurnal, Website
- [ ] Form dinamis dengan live preview
- [ ] Tombol copy clipboard
- [ ] Unit test untuk semua formatter

### Phase 2 — Fitur Tambahan (Minggu 3)
- [ ] Sistem riwayat dengan localStorage
- [ ] Halaman `/history`
- [ ] Multiple authors (tambah/hapus dinamis)
- [ ] E2E tests dengan Playwright

### Phase 3 — Polish & Export (Minggu 4)
- [ ] Export ke file `.docx`
- [ ] Responsif mobile
- [ ] Validasi input yang lebih ketat
- [ ] Deploy ke Vercel

---

## Catatan untuk Pengembangan (Vibecoding Notes)

> Bagian ini adalah panduan cepat agar AI coding assistant bisa langsung paham konteks proyekmu.

**Prioritas saat mulai coding:**
1. Buat semua types di `types/citation.types.ts` **dulu** sebelum apapun
2. Implementasi `lib/formatters/` karena ini adalah **jantung aplikasi** — pure functions, mudah ditest
3. Buat komponen dari bawah ke atas: mulai dari `ui/InputField.tsx`, lalu field groups, lalu form utama
4. Hubungkan semuanya di `hooks/useCitation.ts`

**Hal yang sering jadi bug:**
- Penanganan nama penulis dengan inisial ganda (contoh: "Muhammad Ali Hasan" → `Hasan, M. A.`)
- Em-dash `–` untuk range halaman (bukan hyphen biasa `-`)
- Italic markup di preview HTML vs teks plain di clipboard
- Reset form saat ganti tipe sumber (jangan lupa bersihkan errors juga)

**Keputusan desain yang sudah dibuat:**
- Tidak ada backend/database untuk MVP
- Format yang didukung hanya APA 7th Edition
- Bahasa antarmuka: Indonesia
- Tidak ada autentikasi/akun pengguna

---

*Dibuat untuk keperluan portofolio pengembangan aplikasi web akademik dengan TypeScript.*
*Format sitasi mengacu pada: American Psychological Association. (2020). Publication manual of the American Psychological Association (7th ed.).*
