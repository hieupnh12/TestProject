import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductsProvider, useProducts } from "../state/products";
import { productUtils } from "../service";
import { ShoppingCart, Minus, Plus } from "lucide-react";

function ProductDetailInner() {
  const { id } = useParams();
  const { getById } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const product = id ? getById(id) : undefined;

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        <p className="text-gray-600 mt-2">The product you are looking for does not exist.</p>
        <Link to="/products" className="mt-6 inline-block bg-primary-red text-white px-6 py-2 rounded-lg font-semibold">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-red">Home</Link> / 
        <Link to="/products" className="hover:text-primary-red"> Products</Link> / 
        <span className="font-medium text-gray-700"> {product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <img
            src={productUtils.getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-4 mt-4">
            <p className="text-3xl font-bold text-primary-red">
              {productUtils.formatPrice(product.price)}
            </p>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              productUtils.isInStock(product) 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {productUtils.getStockStatus(product)}
            </span>
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>
          
          <div className="mt-8">
            <p className="font-semibold text-gray-800 mb-2">Quantity</p>
            <div className="flex items-center border border-gray-300 rounded-lg w-32">
              <button onClick={() => handleQuantityChange(-1)} className="p-3 text-gray-600 hover:bg-gray-100 rounded-l-lg">
                <Minus size={16} />
              </button>
              <input 
                type="text" 
                readOnly 
                value={quantity} 
                className="w-full text-center font-semibold text-gray-800 border-x border-gray-300" 
              />
              <button onClick={() => handleQuantityChange(1)} className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-lg">
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-primary-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="flex-1 px-6 py-4 bg-white text-primary-red border-2 border-primary-red rounded-lg font-semibold hover:bg-red-50 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductDetail() {
  return (
    <main className="bg-light-gray min-h-screen">
      <div className="container mx-auto px-4 py-8 pt-24">
        <ProductsProvider>
          <ProductDetailInner />
        </ProductsProvider>
      </div>
    </main>
  );
}
