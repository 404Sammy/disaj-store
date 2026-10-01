import { Inter } from 'next/font/google';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import './globals.css';

// Initialize the Inter font (closest match to Apple's San Francisco)
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Disaj Electronics',
  description: 'Premium electronics store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Apply the font globally and ensure macOS-level anti-aliasing */}
      <body className={`${inter.className} antialiased bg-white`}>
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1d1d1f', // Apple's dark gray
              color: '#f5f5f7',      // Apple's off-white
              fontWeight: '500',
              borderRadius: '9999px', // Pill shape
            },
          }} 
        />
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}