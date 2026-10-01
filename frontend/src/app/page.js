import Link from 'next/link';
import { Star, ArrowRight, Sparkles, ShieldCheck, Zap, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 font-sans selection:bg-yellow-500 selection:text-zinc-950 pb-20 overflow-hidden relative">
      
      {/* Abstract Creative Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] bg-zinc-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Disaj Premium Announcement Bar */}
      <div className="bg-zinc-950 text-white px-6 py-2.5 text-xs font-semibold flex justify-between items-center z-40 relative">
        <div className="hidden md:flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span className="text-zinc-300">Experience the new standard in tech retail.</span>
        </div>
        <div className="flex items-center justify-center w-full md:w-auto gap-2 tracking-widest uppercase">
          <span className="text-yellow-500 font-bold">100% Genuine</span>
          <span className="text-zinc-600">•</span>
          <span>Nationwide Delivery</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 flex flex-col items-center text-center max-w-5xl mx-auto relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold tracking-wide text-zinc-600 mb-8 hover:bg-zinc-200 transition-colors cursor-pointer">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          New Arrivals in Stock
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.95] text-zinc-950 drop-shadow-sm">
          Exceptional tech. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500">
            Authentically yours.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-500 font-medium tracking-tight mb-10 max-w-2xl">
          Discover brilliant devices at a smarter price. Premium smartphones, laptops, and accessories delivered directly to your door.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link 
            href="/shop" 
            className="w-full sm:w-auto bg-zinc-950 text-white px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-zinc-900/10"
          >
            Shop the Collection <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/shop" 
            className="w-full sm:w-auto bg-white text-zinc-950 px-10 py-4 rounded-full font-bold text-lg border border-zinc-200 hover:border-zinc-950 transition-colors"
          >
            Explore Categories
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-bold bg-white px-6 py-3 rounded-2xl shadow-sm border border-zinc-100">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-950">4.9/5 Average Rating</span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-500">Based on 500+ reviews</span>
          </div>
        </div>

      </section>

      {/* Modern Features Grid */}
      <section className="px-6 max-w-6xl mx-auto relative z-10 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 hover:shadow-xl hover:border-yellow-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 border border-zinc-100 group-hover:bg-yellow-50 transition-colors">
              <Zap className="w-6 h-6 text-zinc-950 group-hover:text-yellow-600 transition-colors" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2 text-zinc-950">Express Delivery</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">Swift nationwide shipping. Your devices arrive securely packaged and on time, every time.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 hover:shadow-xl hover:border-yellow-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 border border-zinc-100 group-hover:bg-yellow-50 transition-colors">
              <ShieldCheck className="w-6 h-6 text-zinc-950 group-hover:text-yellow-600 transition-colors" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2 text-zinc-950">Verified Authentic</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">No compromises. Every product is 100% genuine, fully inspected, and backed by warranty.</p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2 text-white">Premium Support</h3>
            <p className="text-zinc-400 font-medium leading-relaxed">Expert guidance before and after your purchase. We are here to help you get the most out of your tech.</p>
          </div>
        </div>
      </section>

      {/* Minimalist Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-zinc-950 text-white p-4 rounded-full flex items-center justify-center hover:bg-zinc-800 hover:scale-110 active:scale-95 transition-all shadow-2xl z-50 group">
        <MessageSquare className="w-6 h-6 group-hover:text-yellow-500 transition-colors" />
      </button>

    </div>
  );
}