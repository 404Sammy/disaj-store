"use client";
import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount, isLoaded } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/50 py-4 px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Identity */}
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-black tracking-tighter leading-none text-zinc-950">
            DISAJ<span className="text-yellow-500">.</span>
          </span>
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-500 mt-0.5">
            Electronics
          </span>
        </Link>

        {/* Clean Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-zinc-500">
          <Link href="/shop" className="hover:text-zinc-950 transition-colors">Catalog</Link>
          <Link href="/shop" className="hover:text-zinc-950 transition-colors">Smartphones</Link>
          <Link href="/shop" className="hover:text-zinc-950 transition-colors">Laptops</Link>
          <Link href="/shop" className="hover:text-zinc-950 transition-colors">Audio</Link>
        </div>

        {/* Actions & Cart */}
        <div className="flex items-center gap-6">
          <button className="text-zinc-950 hover:text-yellow-500 transition-colors group hidden sm:block">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
          </button>
          
          <Link href="/cart" className="flex items-center gap-2 text-zinc-950 hover:text-yellow-500 transition-colors group relative">
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            
            {/* Safe Cart Count with Floating Dot */}
            {isLoaded && cartCount > 0 && (
              <>
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-zinc-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              </>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}