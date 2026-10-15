"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { MessageCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, isLoaded } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({ first_name: '', last_name: '', address: '', city: '' });

  const cartTotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  useEffect(() => {
    if (isLoaded && cart.length === 0) router.push('/cart');
  }, [isLoaded, cart, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    
    // Replace this with your actual business WhatsApp number (format: 254...)
    const businessWhatsAppNumber = "254700000000"; 
    
    let message = `*NEW ORDER FROM DISAJ ELECTRONICS* 🛍️\n\n`;
    message += `*Customer:* ${formData.first_name} ${formData.last_name}\n`;
    message += `*Delivery To:* ${formData.address}, ${formData.city}\n\n`;
    message += `*ORDER DETAILS:*\n`;
    message += `-------------------------\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Quantity: ${item.quantity}\n`;
      if (item.accessories && item.accessories.length > 0) {
        message += `   Add-ons: ${item.accessories.join(', ')}\n`;
      }
      message += `   Price: KSh ${(parseFloat(item.price) * item.quantity).toLocaleString()}\n\n`;
    });

    message += `-------------------------\n`;
    message += `*TOTAL AMOUNT: KSh ${cartTotal.toLocaleString()}*\n`;
    message += `-------------------------\n\n`;
    message += `Please confirm stock and provide payment instructions.`;

    const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 pt-16 pb-24 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b border-zinc-200 pb-6">
          <h1 className="text-4xl font-black tracking-tighter">Finalize Order.</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3">
            <form onSubmit={handleWhatsAppCheckout} className="bg-white rounded-[2rem] shadow-sm border border-zinc-100 p-8 sm:p-10">
              <h2 className="text-2xl font-black mb-8 tracking-tight">Delivery Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">First Name</label>
                  <input required type="text" name="first_name" onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-zinc-950 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Last Name</label>
                  <input required type="text" name="last_name" onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-zinc-950 focus:bg-white transition-all" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Delivery Address</label>
                <input required type="text" name="address" placeholder="e.g., Kabarak University Road" onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-zinc-950 focus:bg-white transition-all" />
              </div>

              <div className="mb-10">
                <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase">City / Town</label>
                <input required type="text" name="city" placeholder="Nakuru" onChange={handleInputChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-zinc-950 focus:bg-white transition-all" />
              </div>

              <button type="submit" className="w-full bg-[#0f7654] text-white py-5 rounded-full font-bold text-lg hover:bg-[#0c6145] active:scale-95 transition-all shadow-xl shadow-green-900/10 flex items-center justify-center gap-2">
                Send Order via WhatsApp <MessageCircle className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-[2rem] p-8 border border-zinc-100 sticky top-24 shadow-sm">
              <h2 className="text-xl font-black mb-6">Order Summary</h2>
              <div className="max-h-60 overflow-y-auto mb-6 scrollbar-hide">
                {cart.map((item) => (
                  <div key={item.id} className="mb-4 border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm leading-tight pr-2">{item.name}</span>
                      <span className="font-bold text-sm whitespace-nowrap">KSh {(parseFloat(item.price) * item.quantity).toLocaleString()}</span>
                    </div>
                    {item.accessories && item.accessories.length > 0 && (
                      <p className="text-xs text-zinc-500 font-medium leading-tight">
                        + {item.accessories.join(', ')}
                      </p>
                    )}
                    <span className="text-xs text-zinc-400 font-bold mt-1 block">Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-100 pt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-lg font-bold text-zinc-600">Total</span>
                  <span className="text-2xl font-black">KSh {cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}