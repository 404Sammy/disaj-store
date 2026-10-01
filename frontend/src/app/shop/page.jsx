"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/');
        if (!response.ok) throw new Error('Failed to fetch products');
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

  if (loading) return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-zinc-950 text-xl font-medium tracking-wide">Loading...</div>;
  if (error) return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-red-500 font-medium tracking-wide">Error: {error}</div>;

  const uniqueCategories = ['All', ...new Set(products.map((p) => p.category_name || 'Uncategorized'))];
  const filteredProducts = selectedCategory === 'All' ? products : products.filter((p) => (p.category_name || 'Uncategorized') === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 pt-16 pb-20 px-4 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-zinc-200 pb-8">
          <div>
            <h1 className="text-5xl font-black text-zinc-950 mb-3 tracking-tighter">Our Catalog.</h1>
            <p className="text-zinc-500 text-xl font-medium tracking-tight">
              Premium tech, exceptionally priced.
            </p>
          </div>
        </div>
        
        {/* Category Pill Filters */}
        <div className="flex gap-4 overflow-x-auto pb-6 mb-8 scrollbar-hide">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-950 hover:text-zinc-950'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-zinc-100 shadow-sm">
            <p className="text-xl text-zinc-500 font-medium mb-4">No products found in this category.</p>
            <button onClick={() => setSelectedCategory('All')} className="text-zinc-950 font-bold hover:underline">
              View all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link 
                href={`/shop/${product.slug}`} 
                key={product.id} 
                className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden flex flex-col group hover:shadow-xl hover:border-zinc-200 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Minimalist Image Container */}
                <div className="h-64 bg-zinc-50 flex items-center justify-center relative p-8 border-b border-zinc-100">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="object-contain h-full w-full drop-shadow-sm group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-zinc-400 font-medium">No Image</span>
                  )}
                  <span className="absolute top-4 right-4 bg-white text-zinc-950 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
                    {product.condition || 'New'}
                  </span>
                </div>
                
                {/* Product Info */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-2">
                      {product.category_name || 'Electronics'}
                    </p>
                    <h2 className="text-xl font-bold text-zinc-950 mb-1 line-clamp-2 tracking-tight">
                      {product.brand} {product.name}
                    </h2>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-2xl font-black text-zinc-950 mb-4">
                      KSh {product.price ? parseFloat(product.price).toLocaleString() : '0'}
                    </div>
                    <span className="w-full bg-zinc-50 text-zinc-950 border border-zinc-200 py-3 rounded-full font-bold text-center group-hover:bg-zinc-950 group-hover:text-white transition-colors block">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}