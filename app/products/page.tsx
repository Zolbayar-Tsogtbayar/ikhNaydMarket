"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "../lib/StoreContext";

export default function ProductsPage() {
  const { products, deleteProduct } = useStore();
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Нэр, брэнд, ангилалаар хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 bg-white"
          />
        </div>
        <Link
          href="/products/add"
          className="flex items-center gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Бүтээгдэхүүн нэмэх
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-3">Бүтээгдэхүүн</th>
              <th className="px-6 py-3">Ангилал</th>
              <th className="px-6 py-3">Брэнд</th>
              <th className="px-6 py-3">Үнэ</th>
              <th className="px-6 py-3">Нөөц</th>
              <th className="px-6 py-3">Огноо</th>
              <th className="px-6 py-3">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-16 text-center text-slate-400 text-sm"
                >
                  Бүтээгдэхүүн олдсонгүй
                </td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-3">
                  <div className="text-sm font-medium text-slate-800 max-w-xs truncate">
                    {p.name}
                  </div>
                  <div className="flex gap-1 mt-0.5">
                    {p.isNew && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                        Шинэ
                      </span>
                    )}
                    {p.isSale && (
                      <span className="text-xs bg-red-100 text-[#D32F2F] px-1.5 py-0.5 rounded font-medium">
                        Хямдрал
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-slate-500">{p.category}</td>
                <td className="px-6 py-3 text-sm text-slate-500 font-medium">{p.brand}</td>
                <td className="px-6 py-3 text-sm">
                  <div className="text-slate-800 font-medium">
                    {p.price.toLocaleString("mn-MN")}₮
                  </div>
                  {p.salePrice && (
                    <div className="text-[#D32F2F] text-xs font-medium">
                      {p.salePrice.toLocaleString("mn-MN")}₮
                    </div>
                  )}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-7 rounded-md text-sm font-semibold ${
                      p.stock < 5
                        ? "bg-orange-100 text-orange-600"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-slate-400">{p.createdAt}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${p.id}/edit`}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      Засах
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(`"${p.name}" устгах уу?`))
                          deleteProduct(p.id);
                      }}
                      className="text-xs bg-red-50 hover:bg-red-100 text-[#D32F2F] px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      Устгах
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 text-right">
        Нийт: {filtered.length} / {products.length} бүтээгдэхүүн
      </p>
    </div>
  );
}
