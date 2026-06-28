"use client";

import React, { useState } from "react";
import Link from "next/link";
import HistoryPanel from "@/components/HistoryPanel/HistoryPanel";
import { useHistory } from "@/hooks/useHistory";
import { exportToWord } from "@/lib/exporters/wordExporter";

export default function HistoryPage() {
  const { history, removeEntry, clearAll, historyCount } = useHistory();
  const [toast, setToast] = useState<string | null>(null);

  const handleExport = async () => {
    if (history.length === 0) return;
    try {
      await exportToWord(history);
      setToast("Daftar pustaka berhasil diunduh!");
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast("Gagal mengunduh file. Silakan coba lagi.");
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat sitasi?")) {
      clearAll();
      setToast("Semua riwayat telah dihapus.");
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">CitasiCerdas</span>
          </Link>
          <nav className="nav-links">
            <Link href="/" className="nav-link">
              Beranda
            </Link>
            <Link href="/history" className="nav-link nav-link-active">
              Riwayat
              {historyCount > 0 && (
                <span className="nav-badge">{historyCount}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="page-hero">
          <h1>Riwayat Sitasi</h1>
          <p>
            Kelola sitasi yang telah Anda buat. Salin ulang atau unduh sebagai file .docx.
          </p>
        </div>

        <HistoryPanel
          history={history}
          onDelete={removeEntry}
          onClearAll={handleClearAll}
          onExport={handleExport}
        />
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="toast">
          ✅ {toast}
        </div>
      )}
    </div>
  );
}
