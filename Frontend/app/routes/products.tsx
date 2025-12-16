import React from "react";
import { ProductsProvider, useProducts } from "../state/products";
import ProductCard from "../components/ProductCard";

function ProductsList() {
  const { products } = useProducts();
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <ProductsProvider>
      <ProductsList />
    </ProductsProvider>
  );
}
