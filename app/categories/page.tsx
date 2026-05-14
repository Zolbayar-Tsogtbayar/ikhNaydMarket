"use client";

import { useState } from "react";
import { useStore } from "../lib/StoreContext";

export default function CategoriesPage() {
  const { categories, products, addCategory, deleteCategory } = useStore();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");

  function handleNameChange(val: string) {
    setName(val);
    setSlug(val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      setError("Нэр болон slug шаардлагатай");
      return;
    }
    if (categories.some((c) => c.slug === slug)) {
      setError("Энэ slug аль хэдийн байна");
      return;
    }
    addCategory(name.trim(), slug.trim());
    setName("");
    setSlug("");
    setError("");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Шинэ ангилал нэмэх</h2>
        {error && (
          <div className="bg-red-50 border border-red-100 text-[#D32F2F] px-4 py-2.5 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Нэр *
              </label>
              <input
                type="text"
                placeholder="жш: Зөөврийн компьютер"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Slug *
              </label>
              <input
                type="text"
                placeholder="жш: laptop"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Нэмэх
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Ангилалууд</h2>
          <span className="text-xs text-slate-400">{categories.length} ангилал</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-3">Нэр</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3">Бүтээгдэхүүн</th>
              <th className="px-6 py-3">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => {
              const count = products.filter((p) => p.category === c.slug).length;
              return (
                <tr
                  key={c.id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-3 text-sm font-medium text-slate-800">
                    {c.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-400 font-mono">
                    {c.slug}
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => {
                        if (confirm(`"${c.name}" устгах уу?`))
                          deleteCategory(c.id);
                      }}
                      className="text-xs bg-red-50 hover:bg-red-100 text-[#D32F2F] px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      Устгах
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
