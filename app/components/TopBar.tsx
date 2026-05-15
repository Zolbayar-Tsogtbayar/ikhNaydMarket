"use client";

import { usePathname } from "next/navigation";

const TITLES: Record<string, string> = {
  "/": "Хянах самбар",
  "/products": "Бүтээгдэхүүн",
  "/products/add": "Бүтээгдэхүүн нэмэх",
  "/categories": "Ангилал",
  "/brands": "Брэнд",
  "/booth-owners": "Сандал эзэмшигч",
};

export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const path = usePathname();
  const title =
    TITLES[path] ??
    (path.includes("/edit") ? "Бүтээгдэхүүн засах" :
     path.startsWith("/booth-owners/") ? "Эзэмшигчийн профайл" : "");

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 md:px-6 sticky top-0 z-40 shadow-sm">
      <button
        onClick={onMenuClick}
        className="mr-3 p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors md:hidden"
        aria-label="Цэс нээх"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 bg-[#D32F2F] rounded-full" />
        <h1 className="text-base font-semibold text-slate-800">{title}</h1>
      </div>
    </header>
  );
}
