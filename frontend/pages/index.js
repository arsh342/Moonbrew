import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { featuredProducts, heroImage, icons } from '../data/products';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-emerald-800 text-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-20">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-4">THE BEST COFFEE IS HERE IN YOUR CITY</h1>
            <p className="mb-8">Premium beans, expertly roasted, delivered fresh to your door.</p>
            <Link href="/menu">
              <button className="bg-yellow-500 text-brown-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400">
                Order Now
              </button>
            </Link>
          </div>
          <div className="relative w-1/2 h-[600px]">
            <Image 
              src={heroImage}
              alt="Coffee Cup" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Recent Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={200} 
                  height={200}
                  className="w-full mb-4"
                />
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-500">{'★'.repeat(product.rating)}</span>
                  <span className="font-bold">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why We Are Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <Image src="https://www.iconsdb.com/icons/preview/soylent-red/coffee-bean-2-xxl.png" alt="Beans" width={64} height={64} />
              </div>
              <h3 className="font-bold mb-2">Premium Selection</h3>
              <p>Only the finest coffee beans from sustainable sources.</p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <Image src="https://www.iconsdb.com/icons/preview/guacamole-green/coffee-2-xxl.png" alt="Cup" width={64} height={64} />
              </div>
              <h3 className="font-bold mb-2">From Farm to Cup</h3>
              <p>Direct trade relationships with farmers ensure quality.</p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <Image src="https://www.iconsdb.com/icons/preview/royal-blue/page-quality-3-xxl.png" alt="Quality" width={64} height={64} />
              </div>
              <h3 className="font-bold mb-2">Commitment to Quality</h3>
              <p>Rigorous quality control at every step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-cream-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-4">48</h2>
            <p className="text-xl">Offline Stores In This Country</p>
          </div>
        </div>
      </section>
    </Layout>
  );
} 