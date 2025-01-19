import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const featuredProducts = [
  {
    name: "Cappuccino",
    description: "Espresso topped with foamy milk and a sprinkle of cocoa powder",
    price: 4.49,
    category: "Hot Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100419.webp",
    ingredients: ["Espresso", "Steamed Milk", "Milk Foam"]
  },
  {
    name: "Iced Americano",
    description: "Chilled espresso with cold water and ice",
    price: 3.99,
    category: "Iced Coffee",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100441.webp",
    ingredients: ["Espresso", "Water", "Ice"]
  },
  {
    name: "Butter Croissant",
    description: "Flaky, buttery layers of freshly baked croissant",
    price: 3.49,
    category: "Bakery",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/114550_1.webp",
    ingredients: ["Flour", "Butter", "Yeast"]
  },
  {
    name: "Chai Tea Latte",
    description: "Spiced black tea with steamed milk",
    price: 4.49,
    category: "Specialty",
    image: "https://starbucksstatic.cognizantorderserv.com/Items/Large/webP/100367.webp",
    ingredients: ["Chai Tea Blend", "Steamed Milk"]
  }
];

const heroImage = 'https://sea-stones.com/cdn/shop/products/CZY-CozyCoffeeCoaster.jpg';

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <main>
        <section className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-12 md:py-24">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">THE BEST COFFEE IS HERE IN YOUR CITY</h1>
              <p className="mb-8 text-lg sm:text-xl text-emerald-100">Premium beans, expertly roasted, delivered fresh to your door.</p>
              <Link href="/menu">
                <button className="bg-yellow-500 text-brown-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105">
                  Order Now
                </button>
              </Link>
            </div>
            <div className="relative w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[600px] transform hover:scale-102 transition-transform mt-8 md:mt-0">
              <Image 
                src={heroImage}
                alt="Coffee Cup" 
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section className="bg-cream-50 py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-12 text-brown-900">Featured Products</h2>
            <div className="overflow-hidden relative">
              <div className="flex space-x-4 md:space-x-8 py-4 animate-carousel">
                {[...featuredProducts, ...featuredProducts].map((product, index) => (
                  <div key={index} className="flex-none w-60 sm:w-64 md:w-72">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="relative h-48 sm:h-56 md:h-72 w-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-5 md:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-brown-900">{product.name}</h3>
                        <p className="text-brown-600 mt-2">${product.price}</p>
                        <button className="mt-4 w-full bg-yellow-500 text-brown-900 py-2 rounded-full hover:bg-yellow-400">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
