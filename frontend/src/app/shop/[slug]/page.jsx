"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Plus, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Customization States
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Midnight');
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading || !product) return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-zinc-950 font-bold">Loading...</div>;

  const basePrice = parseFloat(product.price) || 0;

  // LOGICAL STORAGE GENERATOR
  const getStorageOptions = (productName) => {
    const name = productName.toLowerCase();
    
    // Pro/Ultra Models & Newest Gens (Base: 256GB or 128GB)
    if (name.includes('pro max') || name.includes('ultra') || name.includes('fold')) {
      return [
        { label: '256GB', addonPrice: 0 },
        { label: '512GB', addonPrice: 20000 },
        { label: '1TB', addonPrice: 45000 },
      ];
    }
    
    if (name.includes('iphone 15') || name.includes('iphone 14') || name.includes('s23') || name.includes('s24')) {
      return [
        { label: '128GB', addonPrice: 0 },
        { label: '256GB', addonPrice: 15000 },
        { label: '512GB', addonPrice: 35000 },
      ];
    }
    
    // Older Models (Base: 64GB)
    if (name.includes('iphone 11') || name.includes('iphone 12') || name.includes('se')) {
      return [
        { label: '64GB', addonPrice: 0 },
        { label: '128GB', addonPrice: 10000 },
        { label: '256GB', addonPrice: 20000 },
      ];
    }
    
    // Default Fallback
    return [
      { label: '128GB', addonPrice: 0 },
      { label: '256GB', addonPrice: 15000 },
    ];
  };

  const storageOptions = getStorageOptions(product.name);
  
  const colorOptions = ['Midnight', 'Starlight', 'Space Gray', 'Silver', 'Natural Titanium'];
  const accessoryOptions = [
    { id: 'screen-protector', name: 'Tempered Glass Screen Protector', price: 1000 },
    { id: 'clear-case', name: 'Premium Clear Case', price: 1500 },
    { id: 'charger-brick', name: '20W Fast Charging Adapter', price: 2500 },
  ];

  // Dynamic Price Calculation
  const accessoriesTotal = selectedAccessories.reduce((total, accId) => {
    const acc = accessoryOptions.find(a => a.id === accId);
    return total + (acc ? acc.price : 0);
  }, 0);
  const finalPrice = basePrice + (storageOptions[selectedStorage]?.addonPrice || 0) + accessoriesTotal;

  const toggleAccessory = (id) => {
    setSelectedAccessories(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    const selectedStorageLabel = storageOptions[selectedStorage]?.label || 'Base';
    const cartItemId = `${product.id}-${selectedStorageLabel}-${selectedColor}-${selectedAccessories.join('-')}`;
    const accessoryNames = selectedAccessories.map(id => accessoryOptions.find(a => a.id === id).name);
    
    addToCart({
      ...product,
      id: cartItemId, 
      actualProductId: product.id,
      name: `${product.name} (${selectedStorageLabel}, ${selectedColor})`,
      price: finalPrice,
      accessories: accessoryNames,
    });

    toast.success('Added to your bag.', { icon: '🛍️' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 pt-24 pb-20 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link href="/shop" className="inline-flex items-center gap-2 text-zinc-500 font-bold hover:text-zinc-950 mb-10 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Catalog
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 bg-white rounded-[2rem] border border-zinc-200 p-12 lg:p-16 flex items-center justify-center aspect-square sticky top-32 shadow-sm">
            {product.image ? (
              <img src={product.image} alt={product.name} className="object-contain h-full w-full drop-shadow-xl" />
            ) : (
              <span className="text-zinc-400 font-medium">No Image</span>
            )}
            <span className="absolute top-8 left-8 bg-zinc-50 text-zinc-950 text-xs font-bold uppercase px-4 py-1.5 rounded-full border border-zinc-200">
              {product.condition || 'Brand new'}
            </span>
          </div>
          
          {/* Configuration Menu */}
          <div className="w-full lg:w-1/2 flex flex-col pt-2">
            <h1 className="text-4xl md:text-5xl font-black text-zinc-950 mb-2 leading-tight tracking-tighter">
              {product.brand} {product.name}
            </h1>
            
            <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wide mb-6 w-fit">
              <AlertCircle className="w-4 h-4" /> 
              Availability subject to stock confirmation
            </div>
            
            <div className="text-3xl font-black text-zinc-950 mb-10 pb-8 border-b border-zinc-200">
              KSh {finalPrice.toLocaleString()}
            </div>

            {/* Storage Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-zinc-500 mb-4 tracking-wide uppercase">01 / Storage Capacity</h3>
              <div className="space-y-3">
                {storageOptions.map((opt, idx) => (
                  <div 
                    key={idx} onClick={() => setSelectedStorage(idx)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${selectedStorage === idx ? 'border-zinc-950 bg-zinc-50/50' : 'border-zinc-200 hover:border-zinc-400 bg-white'}`}
                  >
                    <div>
                      <p className="font-bold text-zinc-950">{opt.label}</p>
                      <p className="text-sm text-zinc-500 font-medium">
                        {opt.addonPrice > 0 ? `+ KSh ${opt.addonPrice.toLocaleString()}` : 'Base Price'}
                      </p>
                    </div>
                    {selectedStorage === idx && <Check className="w-5 h-5 text-zinc-950" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-zinc-500 mb-4 tracking-wide uppercase">02 / Color Finish</h3>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <div 
                    key={color} onClick={() => setSelectedColor(color)}
                    className={`px-4 py-3 rounded-xl border-2 cursor-pointer text-center font-bold transition-all flex-grow ${selectedColor === color ? 'border-zinc-950 text-zinc-950 bg-zinc-50/50' : 'border-zinc-200 text-zinc-500 hover:border-zinc-400 bg-white'}`}
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Accessories */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-zinc-500 mb-4 tracking-wide uppercase">03 / Add Essentials (Optional)</h3>
              <div className="space-y-3">
                {accessoryOptions.map((acc) => {
                  const isSelected = selectedAccessories.includes(acc.id);
                  return (
                    <div 
                      key={acc.id} onClick={() => toggleAccessory(acc.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${isSelected ? 'border-yellow-500 bg-yellow-50/30' : 'border-zinc-200 hover:border-zinc-400 bg-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-yellow-500 border-yellow-500' : 'border-zinc-300'}`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <p className="font-bold text-zinc-950">{acc.name}</p>
                      </div>
                      <p className="text-sm text-zinc-600 font-bold">+KSh {acc.price.toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart */}
            <button 
              onClick={handleAddToCart}
              className="w-full bg-zinc-950 text-white py-5 rounded-full font-bold text-lg hover:bg-zinc-800 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              Add to Bag <Plus className="w-5 h-5" />
            </button>
            
            <div className="mt-8 pt-8 border-t border-zinc-200 space-y-4">
              <div className="flex items-start gap-4 text-zinc-700">
                <ShieldCheck className="w-5 h-5 text-zinc-400" />
                <span className="font-medium text-sm">Original devices, inspected before sale. Includes warranty.</span>
              </div>
              <div className="flex items-start gap-4 text-zinc-700">
                <MapPin className="w-5 h-5 text-zinc-400" />
                <span className="font-medium text-sm">Fast delivery across Kenya. Payment secured.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}