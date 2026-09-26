"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the Django API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-20 text-xl font-bold text-disaj-black">Loading catalog...</div>;
  if (error) return <div className="text-center py-20 text-red-500 font-bold">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold text-disaj-black mb-8 border-b-4 border-disaj-gold pb-2 inline-block">
        Our Catalog
      </h1>
      
      {products.length === 0 ? (
        <p className="text-lg text-gray-600">No products available at the moment. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col group hover:border-disaj-gold">
              
              {/* Product Image Area */}
              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
                ) : (
                  <span className="text-gray-400 text-sm">No Image Available</span>
                )}
                
                {/* Condition Badge */}
                <span className="absolute top-2 right-2 bg-disaj-black text-disaj-gold text-xs font-bold px-2 py-1 rounded">
                  {product.condition || 'New'}
                </span>
              </div>
              
              {/* Product Details */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">
                    {product.category_name || 'Electronics'}
                  </p>
                  <h2 className="text-lg font-bold text-disaj-black mb-1 line-clamp-2">
                    {product.brand} {product.name}
                  </h2>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-disaj-black">
                    KSh {product.price ? parseFloat(product.price).toLocaleString() : '0'}
                  </span>
                </div>
                
                <button className="w-full mt-4 bg-disaj-gold text-disaj-black py-2 rounded font-bold hover:bg-yellow-500 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}