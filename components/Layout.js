import { useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children, title = 'Moonbrew Coffee' }) {
  // Handle mobile viewport height
  useEffect(() => {
    const setVH = () => {
      try {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      } catch (error) {
        console.error('Error setting viewport height:', error);
      }
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <div className="min-h-[calc(var(--vh,1vh)*100)] flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Premium coffee delivered to your door" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Enjoy premium quality coffee delivered straight to your door" />
        <meta property="og:image" content="/path/to/your/image.jpg" /> {/* Add an image for social media preview */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://cdn-icons-png.freepik.com/256/3289/3289063.png?semt=ais_hybrid" /> {/* Add favicon */}
      </Head>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
