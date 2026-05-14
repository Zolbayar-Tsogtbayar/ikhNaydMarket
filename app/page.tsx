"use client";

import Link from "next/link";
import { useStore } from "./lib/StoreContext";

export default function Dashboard() {
  const { products, categories, brands } = useStore();
  const lowStock = products.filter((p) => p.stock < 5).length;
  const recent = [...products]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  const stats = [
    {
      label: "Нийт бүтээгдэхүүн",
      value: products.length,
      color: "text-[#D32F2F]",
      bg: "bg-red-50",
      border: "border-red-100",
      icon: (
        <svg className="w-6 h-6 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      label: "Ангилал",
      value: categories.length,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      label: "Брэнд",
      value: brands.length,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      label: "Бага нөөц (< 5)",
      value: lowStock,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`bg-white rounded-xl p-5 shadow-sm border ${s.border}`}
          >
            <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${s.bg} mb-4`}>
              {s.icon}
            </div>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Сүүлийн бүтээгдэхүүн</h2>
          <Link
            href="/products"
            className="text-[#D32F2F] text-sm font-medium hover:underline"
          >
            Бүгдийг харах →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase border-b border-slate-100">
                <th className="px-6 py-3">Нэр</th>
                <th className="px-6 py-3">Ангилал</th>
                <th className="px-6 py-3">Брэнд</th>
                <th className="px-6 py-3">Үнэ</th>
                <th className="px-6 py-3">Нөөц</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-3 text-sm font-medium text-slate-800 max-w-xs truncate">
                    {p.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-500">{p.category}</td>
                  <td className="px-6 py-3 text-sm text-slate-500">{p.brand}</td>
                  <td className="px-6 py-3 text-sm text-slate-800">
                    {p.price.toLocaleString("mn-MN")}₮
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-sm font-semibold ${
                        p.stock < 5 ? "text-orange-500" : "text-emerald-600"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-400 text-sm"
                  >
                    Бүтээгдэхүүн байхгүй байна
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
