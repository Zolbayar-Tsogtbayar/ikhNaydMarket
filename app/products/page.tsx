"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "../lib/StoreContext";

export default function ProductsPage() {
  const { products, deleteProduct } = useStore();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"table" | "grid">("grid");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
            className="border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-1">
            <button
              onClick={() => setView("grid")}
              title="Карт харагдалт"
              className={`p-1.5 rounded-md transition-colors ${
                view === "grid"
                  ? "bg-[#D32F2F] text-white"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setView("table")}
              title="Хүснэгт харагдалт"
              className={`p-1.5 rounded-md transition-colors ${
                view === "table"
                  ? "bg-[#D32F2F] text-white"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
          <Link
            href="/products/add"
            className="flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Нэмэх
          </Link>
        </div>
      </div>

      {view === "grid" ? (
        filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-6 py-16 text-center text-slate-400 text-sm">
            Бүтээгдэхүүн олдсонгүй
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group"
              >
                <div className="relative bg-slate-50 aspect-square overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <div className={`${p.image ? "hidden" : ""} w-full h-full flex items-center justify-center`}>
                    <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {p.isNew && (
                      <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded font-medium shadow-sm">
                        Шинэ
                      </span>
                    )}
                    {p.isSale && (
                      <span className="text-xs bg-[#D32F2F] text-white px-1.5 py-0.5 rounded font-medium shadow-sm">
                        Хямдрал
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className={`text-xs font-semibold px-1.5 py-0.5 rounded shadow-sm ${
                        p.stock < 5
                          ? "bg-orange-100 text-orange-600"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {p.stock}ш
                    </span>
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <p className="text-xs text-slate-400 mb-0.5">{p.brand} · {p.category}</p>
                  <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 flex-1">
                    {p.name}
                  </p>
                  <div className="mt-2">
                    {p.salePrice ? (
                      <div>
                        <span className="text-sm font-bold text-[#D32F2F]">
                          {p.salePrice.toLocaleString("mn-MN")}₮
                        </span>
                        <span className="text-xs text-slate-400 line-through ml-1.5">
                          {p.price.toLocaleString("mn-MN")}₮
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-slate-800">
                        {p.price.toLocaleString("mn-MN")}₮
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1.5 mt-3">
                    <Link
                      href={`/products/${p.id}/edit`}
                      className="flex-1 text-center text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      Засах
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(`"${p.name}" устгах уу?`)) deleteProduct(p.id);
                      }}
                      className="flex-1 text-xs bg-red-50 hover:bg-red-100 text-[#D32F2F] py-1.5 rounded-lg transition-colors font-medium"
                    >
                      Устгах
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-3">Зураг</th>
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
                    <td colSpan={8} className="px-6 py-16 text-center text-slate-400 text-sm">
                      Бүтээгдэхүүн олдсонгүй
                    </td>
                  </tr>
                )}
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="text-sm font-medium text-slate-800 max-w-xs truncate">{p.name}</div>
                      <div className="flex gap-1 mt-0.5">
                        {p.isNew && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">Шинэ</span>
                        )}
                        {p.isSale && (
                          <span className="text-xs bg-red-100 text-[#D32F2F] px-1.5 py-0.5 rounded font-medium">Хямдрал</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-500">{p.category}</td>
                    <td className="px-6 py-3 text-sm text-slate-500 font-medium">{p.brand}</td>
                    <td className="px-6 py-3 text-sm">
                      <div className="text-slate-800 font-medium">{p.price.toLocaleString("mn-MN")}₮</div>
                      {p.salePrice && (
                        <div className="text-[#D32F2F] text-xs font-medium">{p.salePrice.toLocaleString("mn-MN")}₮</div>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center justify-center w-8 h-7 rounded-md text-sm font-semibold ${
                        p.stock < 5 ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-700"
                      }`}>
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
                            if (confirm(`"${p.name}" устгах уу?`)) deleteProduct(p.id);
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
        </div>
      )}

      <p className="text-xs text-slate-400 text-right">
        Нийт: {filtered.length} / {products.length} бүтээгдэхүүн
      </p>
    </div>
  );
}
