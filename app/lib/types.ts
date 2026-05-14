export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  stock: number;
  description: string;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
};
