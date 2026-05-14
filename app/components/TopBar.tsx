"use client";

import { usePathname } from "next/navigation";

const TITLES: Record<string, string> = {
  "/": "Хянах самбар",
  "/products": "Бүтээгдэхүүн",
  "/products/add": "Бүтээгдэхүүн нэмэх",
  "/categories": "Ангилал",
  "/brands": "Брэнд",
};

export default function TopBar() {
  const path = usePathname();
  const title =
    TITLES[path] ?? (path.includes("/edit") ? "Бүтээгдэхүүн засах" : "");

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 bg-[#D32F2F] rounded-full" />
        <h1 className="text-base font-semibold text-slate-800">{title}</h1>
      </div>
    </header>
  );
}
