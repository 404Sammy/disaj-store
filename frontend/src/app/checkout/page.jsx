"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, clearCart, isLoaded } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', address: '', city: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const cartTotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  useEffect(() => {
    if (isLoaded && cart.length === 0 && !success) router.push('/cart');
  }, [isLoaded, cart, success, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const formattedItems = cart.map((item) => ({ product: item.id, price: item.price, quantity: item.quantity }));
    const orderPayload = { ...formData, total_amount: cartTotal.toFixed(2), items: formattedItems };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/checkout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      if (!response.ok) throw new Error('Failed to process order. Please try again.');
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-zinc-950 text-xl font-medium tracking-wide">Loading Checkout...</div>;

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4">
        <div className="bg-white p-12 rounded-[3rem] border border-zinc-100 text-center max-w-lg w-full shadow-sm">
          <CheckCircle2 className="w-20 h-20 text-zinc-950 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-zinc-950 mb-4 tracking-tight">Order Confirmed!</h1>
          <p className="text-zinc-500 mb-8 font-medium leading-relaxed">
            Thank you for choosing Disaj. We've received your order and are preparing it for dispatch.
          </p>
          <Link href="/shop" className="inline-block bg-zinc-950 text-white px-10 py-4 rounded-full font-bold hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/10">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 pt-16 pb-24 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b border-zinc-200 pb-6">
          <h1 className="text-4xl font-black text-zinc-950 tracking-tighter">Checkout.</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl mb-8 font-bold flex items-center gap-3 shadow-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-sm border border-zinc-100 p-8 sm:p-10">
              <h2 className="text-2xl font-black text-zinc-950 mb-8 tracking-tight">Shipping Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">First Name</label>
                  <input required type="text" name="first_name" placeholder="Samwel" value={formData.first_name} onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-zinc-950 focus:bg-white text-zinc-950 placeholder-zinc-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">Last Name</label>
                  <input required type="text" name="last_name" placeholder="Kipkorir" value={formData.last_name} onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-zinc-950 focus:bg-white text-zinc-950 placeholder-zinc-400 transition-all" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">Email Address</label>
                <input required type="email" name="email" placeholder="samwel@example.com" value={formData.email} onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-zinc-950 focus:bg-white text-zinc-950 placeholder-zinc-400 transition-all" />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">Delivery Address</label>
                <input required type="text" name="address" placeholder="e.g., Kabarak University Road" value={formData.address} onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-zinc-950 focus:bg-white text-zinc-950 placeholder-zinc-400 transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">City</label>
                  <input required type="text" name="city" placeholder="Nakuru" value={formData.city} onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-zinc-950 focus:bg-white text-zinc-950 placeholder-zinc-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">Phone</label>
                  <input required type="tel" name="phone" placeholder="0712 345 678" value={formData.phone} onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-zinc-950 focus:bg-white text-zinc-950 placeholder-zinc-400 transition-all" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-zinc-950 text-white py-5 rounded-full font-bold text-lg hover:bg-zinc-800 active:scale-95 transition-all shadow-xl shadow-zinc-900/10 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Processing Securely...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-[2rem] p-8 border border-zinc-100 sticky top-24 shadow-sm">
              <h2 className="text-xl font-black text-zinc-950 mb-6 tracking-tight">Order Summary</h2>
              <div className="max-h-60 overflow-y-auto mb-6 pr-2 scrollbar-hide">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-4 border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-zinc-950">{item.name}</span>
                      <span className="text-xs text-zinc-500 font-bold">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-sm text-zinc-950">KSh {(parseFloat(item.price) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-100 pt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-lg font-bold text-zinc-600">Total</span>
                  <span className="text-2xl font-black text-zinc-950">KSh {cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-yellow-600 font-bold text-right">Taxes & shipping calculated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}