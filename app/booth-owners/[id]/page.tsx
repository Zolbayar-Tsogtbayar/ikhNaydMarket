"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "../../lib/StoreContext";

export default function BoothOwnerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { boothOwners, updateBoothOwner, deleteBoothOwner } = useStore();

  const owner = boothOwners.find((o) => o.id === id);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: owner?.name ?? "",
    phone: owner?.phone ?? "",
    email: owner?.email ?? "",
    boothNumber: owner?.boothNumber ?? "",
    boothLocation: owner?.boothLocation ?? "",
    marketSection: owner?.marketSection ?? "",
    notes: owner?.notes ?? "",
  });
  const [error, setError] = useState("");

  if (!owner) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-slate-500 text-sm mb-4">Эзэмшигч олдсонгүй</p>
        <Link
          href="/booth-owners"
          className="text-[#D32F2F] text-sm font-medium hover:underline"
        >
          Буцах
        </Link>
      </div>
    );
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.boothNumber.trim() || !form.boothLocation.trim()) {
      setError("Нэр, утас, сандал дугаар, байршил шаардлагатай");
      return;
    }
    updateBoothOwner(id, {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      boothNumber: form.boothNumber.trim(),
      boothLocation: form.boothLocation.trim(),
      marketSection: form.marketSection.trim() || undefined,
      notes: form.notes.trim() || undefined,
    });
    setError("");
    setEditing(false);
  }

  function handleDelete() {
    if (confirm(`"${owner.name}" устгах уу?`)) {
      deleteBoothOwner(owner.id);
      router.push("/booth-owners");
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/booth-owners"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Жагсаалт руу буцах
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#D32F2F]/10 flex items-center justify-center shrink-0">
              <span className="text-[#D32F2F] text-xl font-bold">
                {owner.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">{owner.name}</h2>
              <p className="text-sm text-slate-500">Бүртгэсэн: {owner.registrationDate}</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Засах
              </button>
            )}
            <button
              onClick={handleDelete}
              className="text-sm bg-red-50 hover:bg-red-100 text-[#D32F2F] px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Устгах
            </button>
          </div>
        </div>
      </div>

      {editing ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Мэдээлэл засах</h3>
          {error && (
            <div className="bg-red-50 border border-red-100 text-[#D32F2F] px-4 py-2.5 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Нэр *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Утас *</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Сандал дугаар *</label>
                <input
                  type="text"
                  value={form.boothNumber}
                  onChange={(e) => handleChange("boothNumber", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Байршил *</label>
                <input
                  type="text"
                  value={form.boothLocation}
                  onChange={(e) => handleChange("boothLocation", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">И-мэйл</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Зах хэсэг / секц</label>
                <input
                  type="text"
                  value={form.marketSection}
                  onChange={(e) => handleChange("marketSection", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Нэмэлт тэмдэглэл</label>
              <textarea
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Хадгалах
              </button>
              <button
                type="button"
                onClick={() => { setEditing(false); setError(""); }}
                className="px-5 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Болих
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Сандал / Байршлын мэдээлэл
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="Сандал дугаар" value={owner.boothNumber} highlight />
              <InfoRow label="Байршил" value={owner.boothLocation} />
              {owner.marketSection && (
                <InfoRow label="Зах хэсэг / секц" value={owner.marketSection} />
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Эзэмшигчийн мэдээлэл
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="Нэр" value={owner.name} />
              <InfoRow label="Утас" value={owner.phone} />
              {owner.email && <InfoRow label="И-мэйл" value={owner.email} />}
              <InfoRow label="Бүртгэсэн огноо" value={owner.registrationDate} />
            </div>
          </div>

          {owner.notes && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Нэмэлт тэмдэглэл
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{owner.notes}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      {highlight ? (
        <span className="inline-block bg-[#D32F2F]/10 text-[#D32F2F] text-sm font-bold px-2.5 py-1 rounded-lg">
          {value}
        </span>
      ) : (
        <p className="text-sm font-medium text-slate-800">{value}</p>
      )}
    </div>
  );
}
