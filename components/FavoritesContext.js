import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(true);

  useEffect(() => {
    try {
      localStorage.getItem('favorites');
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      setIsLocalStorageAvailable(false);
      console.error('localStorage not available:', error);
    }
  }, []);

  useEffect(() => {
    if (isLocalStorageAvailable) {
      try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    }
  }, [favorites, isLocalStorageAvailable]);

  const toggleFavorite = (item) => {
    setFavorites(currentFavorites => {
      const existingIndex = currentFavorites.findIndex(
        fav => fav.id === item.id && fav.size === item.size
      );

      if (existingIndex > -1) {
        // Remove from favorites
        const updatedFavorites = currentFavorites.filter(
          (_, index) => index !== existingIndex
        );
        toast.success('Removed from favorites');
        return updatedFavorites;
      } else {
        // Add to favorites
        toast.success('Added to favorites');
        return [...currentFavorites, item];
      }
    });
  };

  const isInFavorites = (itemId) => {
    return favorites.some(fav => fav.id === itemId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    if (isLocalStorageAvailable) {
      localStorage.removeItem('favorites');
    }
    toast.success('Favorites cleared');
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isInFavorites,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
