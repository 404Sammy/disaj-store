import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-disaj-black text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-bold text-disaj-gold tracking-wider">
          DISAJ LTD
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link href="/" className="hover:text-disaj-gold transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-disaj-gold transition-colors">Shop</Link>
          <Link href="/contact" className="hover:text-disaj-gold transition-colors">Contact</Link>
        </div>

        {/* Cart Button */}
        <div>
          <Link href="/cart" className="bg-disaj-gold text-disaj-black px-4 py-2 rounded font-bold hover:bg-yellow-500 transition-colors">
            Cart (0)
          </Link>
        </div>
      </div>
    </nav>
  );
}