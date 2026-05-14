import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { StoreProvider } from "./lib/StoreContext";

export const metadata: Metadata = {
  title: "ikhNayd Market",
  description: "Бүтээгдэхүүн удирдлагын самбар",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body>
        <StoreProvider>
          <Sidebar />
          <div className="ml-60 min-h-screen bg-[#f1f5f9]">
            <TopBar />
            <main className="p-6">{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
