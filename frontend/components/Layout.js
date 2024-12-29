import { useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children, title = 'Moonbrew Coffee' }) {
  // Handle mobile viewport height
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
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