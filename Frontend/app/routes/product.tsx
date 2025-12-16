import React from "react";
import { useParams } from "react-router-dom";
import { ProductsProvider, useProducts } from "../state/products";

function ProductDetailInner() {
  const { id } = useParams();
  const { getById } = useProducts();
  const product = id ? getById(id) : undefined;

  if (!product) {
    return (
      <main className="container mx-auto p-4">
        <h1>Product not found</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded"
        />
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-2">${product.price}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-4">Stock: {product.stock ?? 0}</p>
        </div>
      </div>
    </main>
  );
}

export default function ProductDetail() {
  return (
    <ProductsProvider>
      <ProductDetailInner />
    </ProductsProvider>
  );
}
