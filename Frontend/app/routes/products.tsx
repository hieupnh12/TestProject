import React from "react";
import { Link } from "react-router-dom";
import { ProductService } from "../service";
import ProductCard from "../components/ProductCard";

function ProductsList() {
  const { products, loading, error } = ProductService.useProducts(20, 0);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-50 p-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Could not load products</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      {products.length === 0 ? (
        <div className="text-center text-gray-500 col-span-full">
          There are no products available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <div className="bg-light-gray">
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-2">
            <Link to="/" className="hover:text-primary-red">Home</Link> / <span>Products</span>
          </p>
          <h1 className="text-4xl font-bold text-gray-900">Explore Our Collection</h1>
        </div>
        
        <ProductsList />
      </main>
    </div>
  );
}
