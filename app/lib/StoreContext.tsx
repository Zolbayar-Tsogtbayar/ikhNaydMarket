"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { BoothOwner, Brand, Category, Product } from "./types";
import { DEFAULT_BRANDS, DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from "./defaults";

const KEYS = {
  products: "ikm_products",
  categories: "ikm_categories",
  brands: "ikm_brands",
  boothOwners: "ikm_booth_owners",
};

function load<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T[]) : fallback;
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

type StoreCtx = {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  boothOwners: BoothOwner[];
  addProduct: (p: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, p: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (name: string, slug: string) => void;
  deleteCategory: (id: string) => void;
  addBrand: (name: string, slug: string) => void;
  deleteBrand: (id: string) => void;
  addBoothOwner: (o: Omit<BoothOwner, "id" | "registrationDate">) => void;
  updateBoothOwner: (id: string, o: Partial<Omit<BoothOwner, "id">>) => void;
  deleteBoothOwner: (id: string) => void;
};

const StoreContext = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [boothOwners, setBoothOwners] = useState<BoothOwner[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProducts(load(KEYS.products, DEFAULT_PRODUCTS));
    setCategories(load(KEYS.categories, DEFAULT_CATEGORIES));
    setBrands(load(KEYS.brands, DEFAULT_BRANDS));
    setBoothOwners(load(KEYS.boothOwners, []));
    setReady(true);
  }, []);

  function addProduct(p: Omit<Product, "id" | "createdAt">) {
    const next = [
      ...products,
      { ...p, id: `p${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) },
    ];
    setProducts(next);
    save(KEYS.products, next);
  }

  function updateProduct(id: string, p: Partial<Omit<Product, "id">>) {
    const next = products.map((x) => (x.id === id ? { ...x, ...p } : x));
    setProducts(next);
    save(KEYS.products, next);
  }

  function deleteProduct(id: string) {
    const next = products.filter((x) => x.id !== id);
    setProducts(next);
    save(KEYS.products, next);
  }

  function addCategory(name: string, slug: string) {
    const next = [...categories, { id: `cat${Date.now()}`, name, slug }];
    setCategories(next);
    save(KEYS.categories, next);
  }

  function deleteCategory(id: string) {
    const next = categories.filter((x) => x.id !== id);
    setCategories(next);
    save(KEYS.categories, next);
  }

  function addBrand(name: string, slug: string) {
    const next = [...brands, { id: `br${Date.now()}`, name, slug }];
    setBrands(next);
    save(KEYS.brands, next);
  }

  function deleteBrand(id: string) {
    const next = brands.filter((x) => x.id !== id);
    setBrands(next);
    save(KEYS.brands, next);
  }

  function addBoothOwner(o: Omit<BoothOwner, "id" | "registrationDate">) {
    const next = [
      ...boothOwners,
      { ...o, id: `bo${Date.now()}`, registrationDate: new Date().toISOString().slice(0, 10) },
    ];
    setBoothOwners(next);
    save(KEYS.boothOwners, next);
  }

  function updateBoothOwner(id: string, o: Partial<Omit<BoothOwner, "id">>) {
    const next = boothOwners.map((x) => (x.id === id ? { ...x, ...o } : x));
    setBoothOwners(next);
    save(KEYS.boothOwners, next);
  }

  function deleteBoothOwner(id: string) {
    const next = boothOwners.filter((x) => x.id !== id);
    setBoothOwners(next);
    save(KEYS.boothOwners, next);
  }

  if (!ready) return null;

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        brands,
        boothOwners,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
        addBrand,
        deleteBrand,
        addBoothOwner,
        updateBoothOwner,
        deleteBoothOwner,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
