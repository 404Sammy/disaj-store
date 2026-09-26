import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Disaj Electronics | Premium Phones & Accessories',
  description: 'Your trusted store for brand new and refurbished smartphones.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-disaj-light text-disaj-black antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}