"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useStore } from "../../../lib/StoreContext";

type FormState = {
  name: string;
  description: string;
  price: string;
  salePrice: string;
  category: string;
  brand: string;
  stock: string;
  image: string;
  isNew: boolean;
  isSale: boolean;
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { products, categories, brands, updateProduct } = useStore();
  const product = products.find((p) => p.id === params.id);

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    category: "",
    brand: "",
    stock: "",
    image: "",
    isNew: false,
    isSale: false,
  });
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (product && !loaded) {
      setForm({
        name: product.name,
        description: product.description,
        price: String(product.price),
        salePrice: product.salePrice ? String(product.salePrice) : "",
        category: product.category,
        brand: product.brand,
        stock: String(product.stock),
        image: product.image,
        isNew: product.isNew ?? false,
        isSale: product.isSale ?? false,
      });
      setLoaded(true);
    }
  }, [product, loaded]);

  function set<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.category || !form.brand || !form.stock) {
      setError("Нэр, үнэ, ангилал, брэнд, нөөц шаардлагатай");
      return;
    }
    updateProduct(params.id as string, {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : undefined,
      category: form.category,
      brand: form.brand,
      stock: Number(form.stock),
      image: form.image.trim(),
      isNew: form.isNew,
      isSale: form.isSale,
    });
    router.push("/products");
  }

  if (!product) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-100">
        <p className="text-slate-500 text-sm">Бүтээгдэхүүн олдсонгүй</p>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 text-[#D32F2F] text-sm font-medium hover:underline"
        >
          ← Буцах
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-100 text-[#D32F2F] px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800 border-b border-slate-100 pb-3">
          Үндсэн мэдээлэл
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Нэр <span className="text-[#D32F2F]">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Тайлбар
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Ангилал <span className="text-[#D32F2F]">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 bg-white"
            >
              <option value="">Сонгох...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Брэнд <span className="text-[#D32F2F]">*</span>
            </label>
            <select
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 bg-white"
            >
              <option value="">Сонгох...</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800 border-b border-slate-100 pb-3">
          Үнэ &amp; Нөөц
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Үнэ (₮) <span className="text-[#D32F2F]">*</span>
            </label>
            <input
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Хямдарсан үнэ (₮)
            </label>
            <input
              type="number"
              min={0}
              value={form.salePrice}
              onChange={(e) => set("salePrice", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Нөөц <span className="text-[#D32F2F]">*</span>
            </label>
            <input
              type="number"
              min={0}
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
            />
          </div>
        </div>

        <div className="flex gap-5 pt-1">
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.isNew}
              onChange={(e) => set("isNew", e.target.checked)}
              className="w-4 h-4 accent-[#D32F2F] rounded"
            />
            Шинэ бүтээгдэхүүн
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.isSale}
              onChange={(e) => set("isSale", e.target.checked)}
              className="w-4 h-4 accent-[#D32F2F] rounded"
            />
            Хямдралтай
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800 border-b border-slate-100 pb-3">
          Зураг
        </h2>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Зургийн URL
          </label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="https://..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
          />
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="mt-3 h-32 w-32 object-cover rounded-lg border border-slate-200"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>
      </div>

      <div className="flex gap-3 pb-4">
        <button
          type="submit"
          className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Хадгалах
        </button>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Болих
        </button>
      </div>
    </form>
  );
}
