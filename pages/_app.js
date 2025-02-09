import { CartProvider } from '../components/CartContext';
import { AuthProvider } from '../contexts/AuthContext';
import { FavoritesProvider } from '../components/FavoritesContext';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="google-site-verification" content="PZ7tspF0Dsl_d9Zt1_aOoDmIVuEsPV2PJtCERRBzKH8" />
    <title>Moonbrew Coffee | Coffee Experience</title>  
<meta name="description" content="Discover Moonbrew, a full-stack coffee website offering premium coffee blends, seamless ordering, and a rich coffee experience. Freshly brewed, just for you!" />

      </Head>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col">
              <Component {...pageProps} />
              <Toaster 
                position="top-right"
                toastOptions={{
                  success: { duration: 2000 },
                  error: { duration: 3000 }
                }}
              />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
