import React, { createContext, useContext, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  stock?: number;
};

type ProductsContextType = {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => Product | undefined;
  deleteProduct: (id: string) => void;
  getById: (id: string) => Product | undefined;
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Phone Alpha",
    price: 599,
    description: "A reliable smartphone with great battery life.",
    image: "https://th.bing.com/th/id/OIP.dMHehF1BUWqEKjGFBeseNgHaKE?w=146&h=198&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    stock: 12,
  },
  {
    id: "2",
    name: "Phone Beta",
    price: 799,
    description: "High performance camera and fast charging.",
    image: "https://th.bing.com/th/id/OIP.KePpwILc-Wj_XlvkAvNU6wHaKE?w=146&h=198&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    stock: 5,
  },
];

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  function addProduct(p: Omit<Product, "id">) {
    const id = String(Date.now());
    const newP: Product = { id, ...p };
    setProducts((s) => [newP, ...s]);
    return newP;
  }

  function updateProduct(id: string, patch: Partial<Product>) {
    let updated: Product | undefined;
    setProducts((s) =>
      s.map((x) => {
        if (x.id === id) {
          updated = { ...x, ...patch };
          return updated;
        }
        return x;
      })
    );
    return updated;
  }

  function deleteProduct(id: string) {
    setProducts((s) => s.filter((x) => x.id !== id));
  }

  function getById(id: string) {
    return products.find((p) => p.id === id);
  }

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getById }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}