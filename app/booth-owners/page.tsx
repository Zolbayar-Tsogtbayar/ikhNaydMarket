"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "../lib/StoreContext";

export default function BoothOwnersPage() {
  const { boothOwners, addBoothOwner, deleteBoothOwner } = useStore();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    boothNumber: "",
    boothLocation: "",
    marketSection: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = boothOwners.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.boothNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.boothLocation.toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.boothNumber.trim() || !form.boothLocation.trim()) {
      setError("Нэр, утас, сандал дугаар, байршил шаардлагатай");
      return;
    }
    addBoothOwner({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      boothNumber: form.boothNumber.trim(),
      boothLocation: form.boothLocation.trim(),
      marketSection: form.marketSection.trim() || undefined,
      notes: form.notes.trim() || undefined,
    });
    setForm({ name: "", phone: "", email: "", boothNumber: "", boothLocation: "", marketSection: "", notes: "" });
    setError("");
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
          />
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Эзэмшигч нэмэх
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Шинэ эзэмшигч нэмэх</h2>
          {error && (
            <div className="bg-red-50 border border-red-100 text-[#D32F2F] px-4 py-2.5 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Эзэмшигчийн нэр *</label>
                <input
                  type="text"
                  placeholder="жш: Болд Баатар"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Утасны дугаар *</label>
                <input
                  type="text"
                  placeholder="жш: 99001122"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Сандал дугаар *</label>
                <input
                  type="text"
                  placeholder="жш: A-01"
                  value={form.boothNumber}
                  onChange={(e) => handleChange("boothNumber", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Байршил *</label>
                <input
                  type="text"
                  placeholder="жш: 2-р давхар, баруун хэсэг"
                  value={form.boothLocation}
                  onChange={(e) => handleChange("boothLocation", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">И-мэйл</label>
                <input
                  type="email"
                  placeholder="жш: bold@email.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Зах хэсэг / секц</label>
                <input
                  type="text"
                  placeholder="жш: Электроник хэсэг"
                  value={form.marketSection}
                  onChange={(e) => handleChange("marketSection", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Нэмэлт тэмдэглэл</label>
              <textarea
                placeholder="Нэмэлт мэдээлэл..."
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={2}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Нэмэх
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setError(""); }}
                className="px-5 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Болих
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Сандал эзэмшигчид</h2>
          <span className="text-xs text-slate-400">{boothOwners.length} эзэмшигч</span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">
            {search ? "Хайлтанд тохирох үр дүн олдсонгүй" : "Одоогоор эзэмшигч бүртгэгдээгүй байна"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-3">Эзэмшигч</th>
                  <th className="px-6 py-3">Сандал</th>
                  <th className="px-6 py-3">Байршил</th>
                  <th className="px-6 py-3">Утас</th>
                  <th className="px-6 py-3">Бүртгэсэн</th>
                  <th className="px-6 py-3">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#D32F2F]/10 flex items-center justify-center shrink-0">
                          <span className="text-[#D32F2F] text-xs font-bold">
                            {o.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{o.name}</p>
                          {o.email && <p className="text-xs text-slate-400">{o.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-block bg-[#D32F2F]/10 text-[#D32F2F] text-xs font-bold px-2.5 py-1 rounded-lg">
                        {o.boothNumber}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <p className="text-sm text-slate-700">{o.boothLocation}</p>
                      {o.marketSection && (
                        <p className="text-xs text-slate-400">{o.marketSection}</p>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-700">{o.phone}</td>
                    <td className="px-6 py-3 text-sm text-slate-400">{o.registrationDate}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/booth-owners/${o.id}`}
                          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                        >
                          Профайл
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm(`"${o.name}" устгах уу?`)) deleteBoothOwner(o.id);
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
        )}
      </div>
    </div>
  );
}
