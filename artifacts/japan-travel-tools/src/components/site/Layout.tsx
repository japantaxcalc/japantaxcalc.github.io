import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--jp-paper)] font-sans text-[var(--jp-ink)]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
