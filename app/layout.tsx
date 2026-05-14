import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "./lib/StoreContext";
import ClientLayout from "./components/ClientLayout";

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
          <ClientLayout>{children}</ClientLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
