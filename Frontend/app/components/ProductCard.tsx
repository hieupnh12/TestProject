import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../state/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="border rounded-md overflow-hidden shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <div className="mt-3 flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="px-3 py-1 text-red-600 rounded-md shadow-md border border-red-600 font-medium"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
