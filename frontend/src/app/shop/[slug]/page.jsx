"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-zinc-950 text-xl font-medium tracking-wide">Loading Product...</div>;
  if (error) return <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center text-red-500 font-medium tracking-wide"><p>Error: {error}</p><Link href="/shop" className="mt-4 text-zinc-950 underline font-bold">Return to Store</Link></div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 pt-24 pb-20 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link href="/shop" className="inline-flex items-center gap-2 text-zinc-500 font-bold hover:text-zinc-950 mb-10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Catalog
        </Link>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          
          <div className="w-full lg:w-1/2 bg-white rounded-[3rem] border border-zinc-100 p-12 lg:p-16 flex items-center justify-center aspect-square relative shadow-sm">
            {product.image ? (
              <img src={product.image} alt={product.name} className="object-contain h-full w-full drop-shadow-xl transition-transform duration-500 hover:scale-105" />
            ) : (
              <span className="text-zinc-400 font-medium text-xl">No Image Available</span>
            )}
            <span className="absolute top-8 left-8 bg-zinc-50 text-zinc-950 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-zinc-200 shadow-sm">
              {product.condition || 'New'}
            </span>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-2">
            <div className="mb-2 text-yellow-600 font-bold tracking-wider uppercase text-sm">
              {product.brand} • {product.category_name || 'Electronics'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-zinc-950 mb-6 leading-[1.1] tracking-tighter">
              {product.name}
            </h1>
            <div className="text-3xl font-black text-zinc-950 mb-8 pb-8 border-b border-zinc-200">
              KSh {product.price ? parseFloat(product.price).toLocaleString() : '0'}
            </div>
            <div className="prose max-w-none mb-10">
              <p className="text-zinc-500 text-lg leading-relaxed font-medium tracking-tight">
                {product.description || 'Experience premium technology. This device is engineered for maximum performance and reliability, featuring cutting-edge specifications and a sleek design that fits perfectly into your lifestyle.'}
              </p>
            </div>
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 text-zinc-700">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-200">
                  <Check className="w-5 h-5 text-zinc-950" />
                </div>
                <span className="font-bold">In stock and ready to ship</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-700">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-200">
                  <ShieldCheck className="w-5 h-5 text-zinc-950" />
                </div>
                <span className="font-bold">Includes 1-year standard warranty</span>
              </div>
            </div>
            <button 
              onClick={() => {
                addToCart(product);
                toast.success(`${product.name} added to cart!`, {
                  icon: '🛒',
                  style: { background: '#FAFAFA', color: '#09090b', border: '1px solid #e4e4e7', fontWeight: 'bold' }
                });
              }}
              className="w-full bg-zinc-950 text-white py-5 rounded-full font-bold text-lg hover:bg-zinc-800 active:scale-95 transition-all shadow-xl shadow-zinc-900/10"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}