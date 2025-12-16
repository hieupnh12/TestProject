import React from "react";
import { Link } from "react-router-dom";
import { ProductsProvider, useProducts } from "../state/products";
import ProductCard from "../components/ProductCard";

function FeaturedProducts() {
  const { products } = useProducts();
  const featured = products.slice(0, 3);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {featured.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function Welcome() {
  return (
    <main className="pt-16">
      <section className="text-black rounded-md shadow-md mb-12">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Hiếu Phones
            </h1>
            <p className="text-lg text-blue-600 mb-6">
              Trusted smartphone store — best prices, fast shipping, reliable
              support.
            </p>
            <div className="flex gap-3">
              <Link
                to="/products"
                className="bg-white text-blue-700 px-4 py-2 rounded shadow-md font-semibold"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="border border-white text-white px-4 py-2 rounded"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://via.placeholder.com/600x360?text=Latest+Phones"
              alt="phones"
              className="w-full rounded shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Phones</h2>
        <ProductsProvider>
          <FeaturedProducts />
        </ProductsProvider>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">About Hiếu Phones</h2>
          <p className="text-gray-700 mb-4">
            Hiếu Phones is a family-run retailer specializing in quality
            smartphones and accessories. We focus on competitive pricing, honest
            support, and a curated selection of devices.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <li className="p-4 bg-white rounded shadow">Fast delivery</li>
            <li className="p-4 bg-white rounded shadow">1-year warranty</li>
            <li className="p-4 bg-white rounded shadow">Secure payments</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Welcome;
