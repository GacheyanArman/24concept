export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  hoverImage?: string;
  gallery?: string[];
  label?: string;
  description: string;
  sizes: string[];
  featured: boolean;
  published: boolean;
  instagramUrl?: string;
  createdAt: string;
};

export type ProductInput = Omit<Product, "id" | "createdAt">;
