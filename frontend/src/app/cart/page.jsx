"use client";
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, isLoaded } = useCart();
  const cartTotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  if (!isLoaded) return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-zinc-950 text-xl font-medium tracking-wide">Loading Cart...</div>;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4">
        <div className="bg-white p-12 rounded-[3rem] border border-zinc-100 text-center max-w-lg w-full shadow-sm">
          <div className="text-6xl mb-6">🛍️</div>
          <h1 className="text-3xl font-black text-zinc-950 mb-4 tracking-tight">Your Bag is Empty</h1>
          <p className="text-zinc-500 mb-8 font-medium">Looks like you haven't added any premium tech yet.</p>
          <Link href="/shop" className="inline-block bg-zinc-950 text-white px-10 py-4 rounded-full font-bold hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/10">
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 pt-16 pb-24 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b border-zinc-200 pb-6">
          <h1 className="text-4xl font-black text-zinc-950 tracking-tighter">Your Bag.</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center p-6 border-b border-zinc-100 last:border-b-0">
                  <div className="h-28 w-28 bg-zinc-50 rounded-2xl flex items-center justify-center p-4 mb-4 sm:mb-0 border border-zinc-100">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="object-contain h-full w-full drop-shadow-sm" />
                    ) : (
                      <span className="text-xs text-zinc-400 font-medium">No Image</span>
                    )}
                  </div>
                  <div className="sm:ml-6 flex-grow text-center sm:text-left">
                    <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-1">{item.brand}</p>
                    <h3 className="text-xl font-bold text-zinc-950 mb-1">{item.name}</h3>
                    <p className="text-sm text-zinc-500 font-medium">{item.condition || 'New'}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-right flex flex-col sm:items-end">
                    <p className="text-xl font-black text-zinc-950 mb-2">
                      KSh {parseFloat(item.price).toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-600 font-bold mb-4 bg-zinc-50 px-3 py-1 rounded-full border border-zinc-200">
                      Qty: {item.quantity}
                    </p>
                    <button onClick={() => removeFromCart(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-bold">
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={clearCart} className="mt-6 text-zinc-500 font-bold hover:text-zinc-950 transition-colors text-sm">
              Clear Entire Bag
            </button>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-[2rem] p-8 border border-zinc-100 sticky top-24 shadow-sm">
              <h2 className="text-2xl font-black text-zinc-950 mb-8 tracking-tight">Summary</h2>
              <div className="flex justify-between text-zinc-600 font-medium mb-4">
                <span>Subtotal</span>
                <span className="text-zinc-950 font-bold">KSh {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600 font-medium mb-6 pb-6 border-b border-zinc-100">
                <span>Shipping</span>
                <span className="text-yellow-600 text-sm font-bold">Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-zinc-950">Total</span>
                <span className="text-3xl font-black text-zinc-950">KSh {cartTotal.toLocaleString()}</span>
              </div>
              <Link href="/checkout" className="w-full flex justify-center bg-zinc-950 text-white py-4 rounded-full font-bold text-lg hover:bg-zinc-800 active:scale-95 transition-all shadow-xl shadow-zinc-900/10">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}