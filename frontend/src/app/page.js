import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-disaj-black text-disaj-light py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between">
          
          {/* Hero Text */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Premium Phones & <span className="text-disaj-gold">Accessories</span>
            </h1>
            <p className="text-lg text-gray-300">
              Your trusted plug for brand new and refurbished smartphones. Get the best deals on top brands with reliable after-sales support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link href="/shop" className="bg-disaj-gold text-disaj-black px-8 py-3 rounded font-bold text-lg hover:bg-yellow-500 transition-colors">
                Shop Now
              </Link>
              <Link href="/contact" className="border-2 border-disaj-gold text-disaj-gold px-8 py-3 rounded font-bold text-lg hover:bg-disaj-gold hover:text-disaj-black transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Hero Graphic / Image Placeholder */}
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            {/* You can replace this div with an <Image /> tag later using image_fcd2d9.jpg to showcase the team and accessories */}
            <div className="w-72 h-72 md:w-96 md:h-96 bg-gray-900 rounded-full border-4 border-disaj-gold flex items-center justify-center relative shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              <span className="text-disaj-gold font-bold text-2xl tracking-widest text-center px-4">
                DISAJ LTD<br/>
                <span className="text-sm font-normal text-gray-400">At Your Service</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-16 px-4 bg-disaj-light flex-grow">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-disaj-black mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {['Smartphones', 'Screen Protectors', 'Chargers & Cables', 'Audio & Earbuds'].map((category) => (
              <Link href={`/shop?category=${category.toLowerCase().split(' ')[0]}`} key={category}>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md border border-gray-200 text-center cursor-pointer transition-all hover:border-disaj-gold group">
                  <h3 className="text-xl font-bold text-disaj-black group-hover:text-disaj-gold transition-colors">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}